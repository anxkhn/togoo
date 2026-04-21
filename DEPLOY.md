# Deploy Guide

This project is a `vinext` app deployed to Cloudflare Workers with a Cloudflare D1 database bound as `DB`.

## 1. Prerequisites

- Node.js `22+`
- npm
- A Cloudflare account
- Wrangler access via `npx wrangler`

Check your Node version:

```bash
node -v
```

## 2. Install dependencies

```bash
npm install
```

## 3. Log in to Cloudflare

```bash
npx wrangler login
```

## 4. Create or confirm the D1 database

If you already have a D1 database for this app, keep using it.

If you need a new one:

```bash
npx wrangler d1 create where-to-go-db
```

Copy the returned `database_id` into `wrangler.toml`.

This project expects a D1 binding named `DB`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "where-to-go-db"
database_id = "REPLACE_WITH_YOUR_DATABASE_ID"
migrations_dir = "drizzle/migrations"
```

## 5. Optional local smoke test

Apply the local schema:

```bash
npm run db:migrate:local
```

Optional demo data:

```bash
npm run seed:local
```

Start the app:

```bash
npm run dev
```

Open `http://localhost:3000` and verify the main flow works.

## 6. First production deploy

Apply migrations to the remote D1 database:

```bash
npm run db:migrate:remote
```

Deploy the Worker:

```bash
npm run deploy
```

Recommended shortcut for future production releases:

```bash
npm run deploy:prod
```

That runs remote D1 migrations first, then deploys the Worker.

## 7. Verify production

After deploy, Wrangler prints a `*.workers.dev` URL.

Check at least these routes:

- `/`
- `/events/new`
- `/api/events`

## 8. Add a custom domain

Add a route to `wrangler.toml`:

```toml
[[routes]]
pattern = "app.yourdomain.com"
custom_domain = true
```

Deploy again:

```bash
npm run deploy
```

Cloudflare will provision the custom domain for the Worker.

## 9. Optional remote Drizzle tooling

For `drizzle-kit` remote access, create a local `.env` file with:

```env
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_DATABASE_ID=your_database_id
CLOUDFLARE_D1_TOKEN=your_api_token
```

These values are for local tooling only. Do not commit them.

## 10. Normal release flow

For later deploys, use:

```bash
npm run deploy:prod
```

If you changed only app code and no schema, this also still works safely.

## Notes

- The app uses Cloudflare bindings directly through `cloudflare:workers`.
- `DB` must stay named `DB` unless you also update the server code.
- `dist/`, `.wrangler/`, `.env`, and other local artifacts should stay uncommitted.
