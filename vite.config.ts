import { defineConfig } from "vite";
import vinextPlugin from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import type { Plugin } from "vite";

function cloudflareWorkersShim(): Plugin {
  return {
    name: "cloudflare-workers-shim",
    apply: "serve",
    enforce: "pre",
    resolveId(id) {
      if (id === "cloudflare:workers") {
        return "\0virtual:cloudflare-workers";
      }
    },
    load(id) {
      if (id === "\0virtual:cloudflare-workers") {
        return `
import { DatabaseSync } from "node:sqlite";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const dbDir = join(process.cwd(), ".wrangler/state/v3/d1/miniflare-D1DatabaseObject");
const files = readdirSync(dbDir).filter(f => f.endsWith(".sqlite") && f !== "metadata.sqlite");
if (!files.length) throw new Error("No local D1 SQLite file found in " + dbDir);
const sqlite = new DatabaseSync(join(dbDir, files[0]));

function convertBigInt(val) {
  if (typeof val === "bigint") return Number(val);
  if (val && typeof val === "object" && !Array.isArray(val)) {
    return Object.fromEntries(Object.entries(val).map(([k, v]) => [k, convertBigInt(v)]));
  }
  return val;
}

function makeStatement(query, boundValues) {
  return {
    bind(...values) {
      return makeStatement(query, values);
    },
    async all() {
      const stmt = sqlite.prepare(query);
      const raw = stmt.all(...boundValues);
      const results = raw.map(convertBigInt);
      return { results, success: true, meta: {} };
    },
    async run() {
      const stmt = sqlite.prepare(query);
      const info = stmt.run(...boundValues);
      return { success: true, meta: { changes: Number(info.changes), last_row_id: Number(info.lastInsertRowid) } };
    },
    async first(col) {
      const stmt = sqlite.prepare(query);
      const row = stmt.get(...boundValues);
      if (row === undefined) return null;
      const converted = convertBigInt(row);
      if (col !== undefined) return converted[col] ?? null;
      return converted;
    },
    async raw({ columnNames } = {}) {
      const stmt = sqlite.prepare(query);
      const rows = stmt.all(...boundValues).map(convertBigInt);
      if (!rows.length) {
        return columnNames ? { columnNames: [], rows: [] } : [];
      }
      const cols = Object.keys(rows[0]);
      const rawRows = rows.map(r => cols.map(c => r[c]));
      if (columnNames) return { columnNames: cols, rows: rawRows };
      return rawRows;
    },
  };
}

const DB = {
  prepare(query) {
    return makeStatement(query, []);
  },
  async batch(statements) {
    return Promise.all(statements.map(s => s.all()));
  },
  async exec(query) {
    sqlite.exec(query);
    return { count: 0, duration: 0 };
  },
};

export const env = { DB };
`;
      }
    },
  };
}

export default defineConfig(({ command }) => ({
  build: {
    rollupOptions: {
      external: ["cloudflare:workers"],
    },
  },
  plugins: [
    vinextPlugin(),
    ...(command === "build"
      ? [
          cloudflare({
            viteEnvironment: {
              name: "rsc",
              childEnvironments: ["ssr"],
            },
          }),
        ]
      : []),
    cloudflareWorkersShim(),
  ],
}));
