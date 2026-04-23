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
npx wrangler d1 create togoo-db
```

Copy the returned `database_id` into `wrangler.toml`.

This project expects a D1 binding named `DB`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "togoo-db"
database_id = "REPLACE_WITH_YOUR_DATABASE_ID"
migrations_dir = "drizzle/migrations"
```

## 5. Local verification

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

In another terminal, run the automated local scheduling smoke test:

```bash
npm run smoke:local
```

It should print pass/fail status, duration, and organizer, response, summary, and final URLs. It verifies the create, participant, response, recommendation, and finalization path against local D1.

Run the full pre-deploy check before production:

```bash
npm run check
```

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

That runs `npm run check`, applies remote D1 migrations, then deploys the Worker.

## 7. Verify production

After deploy, Wrangler prints a `*.workers.dev` URL.

Check at least these routes:

- `/`
- `/events/new`
- `/faq`

Also verify the product path:

- Create a plan.
- Add one participant.
- Submit availability from the participant response link.
- Open the organizer dashboard and refresh best-time recommendations.
- Finalize a valid slot.
- Open the final page and confirm it says `Plan confirmed`.

Production smoke data is safe only if you can tolerate a test event in the real database. Until cleanup automation exists, prefer a clearly named manual test plan such as `Production smoke YYYY-MM-DD` and delete it only if an admin deletion path is available.

For production debugging, stream Worker logs while reproducing the issue:

```bash
npx wrangler tail
```

Use the route name and timestamp from the failing request to correlate client-visible errors with server logs.

## 8. Rollback

For an app-code regression, redeploy the previous known-good commit:

```bash
git switch <known-good-branch-or-commit>
npm run build
npm run deploy
```

For D1 schema regressions, do not assume app rollback also rolls back data. Before applying risky remote migrations, create or confirm a D1 backup/export in Cloudflare. If a migration breaks production data shape, restore from the backup or apply a forward-fix migration that preserves existing data.

Keep rollback notes in the release record whenever a deploy includes schema changes.

## 9. Add a custom domain

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

## 10. Optional remote Drizzle tooling

For `drizzle-kit` remote access, create a local `.env` file with:

```env
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_DATABASE_ID=your_database_id
CLOUDFLARE_D1_TOKEN=your_api_token
```

These values are for local tooling only. Do not commit them.

## 11. Normal release flow

For later deploys, use:

```bash
npm run deploy:prod
```

If you changed only app code and no schema, this also still works safely.

## Notes

- The app uses Cloudflare bindings directly through `cloudflare:workers`.
- `DB` must stay named `DB` unless you also update the server code.
- `dist/`, `.wrangler/`, `.env`, and other local artifacts should stay uncommitted.
