# where to go

A production-ready group scheduling app built on vinext, Cloudflare Workers, and Cloudflare D1. Find the perfect time and place for your group meetup by collecting availability windows and preferences, then surfacing smart ranked recommendations.

## What it does

- Organizers create an event with a date range, duration, timezone, and scheduling settings
- Participants receive unique invite links and submit broad availability windows (no account needed)
- Participants optionally add preferences: food, budget, location, time of day, indoors/outdoors
- A scoring engine computes ranked recommendations based on attendance overlap and preference fit
- Organizers view a live dashboard with recommendations, an overlap heatmap, and participant management
- Per-participant share actions: copy link, QR code modal, WhatsApp direct message, email
- Organizers finalize the chosen slot, generating a shareable result page

## Why vinext + Workers + D1

- **vinext**: Drop-in Next.js App Router replacement built on Vite, deploys to Cloudflare Workers in one command. Cloudflare bindings available via `import { env } from "cloudflare:workers"` natively in server components and route handlers.
- **Cloudflare Workers**: Edge-first serverless runtime — zero cold starts, globally distributed, Workers-compatible APIs only (no Node.js dependencies).
- **Cloudflare D1**: SQLite at the edge. Low latency reads via D1's HTTP API, Drizzle ORM for type-safe queries, and Wrangler for migrations.

## Architecture overview

```
app/
  page.tsx                          Landing page (server component)
  events/new/page.tsx               Create event (client component, multi-step form)
  e/[eventId]/
    organizer/[token]/page.tsx      Organizer dashboard (client component)
    respond/[token]/page.tsx        Participant response flow (client component)
    summary/[token]/page.tsx        Public summary page (server component)
    final/page.tsx                  Finalized result page (server component)
  api/
    events/                         Create event
    events/[eventId]/               Get event
      participants/                 List/add participants
      participants/[id]/            Update/delete participant
      participants/[id]/token/      Regenerate invite token
      respond/                      Submit/update availability + preferences
      recommendations/              Compute and return ranked recommendations
      finalize/                     Finalize the chosen slot
      reopen/                       Reopen a finalized event
      overrides/                    Manage organizer scheduling overrides
    validate-token/                 Validate a participant or organizer token

lib/
  db/schema.ts                      Drizzle schema (10 tables)
  db/index.ts                       DB factory function
  scheduling.ts                     Normalization + recommendation engine
  tokens.ts                         Secure token generation (Web Crypto)
  validation.ts                     Zod schemas for all API inputs
  utils.ts                          Date/time helpers (Intl-based, Workers-compatible)

drizzle/migrations/0001_init.sql    Full schema migration
drizzle/migrations/0003_add_phone.sql  Add phone column to participants
scripts/seed.sql                    Demo event with participants and responses
```

## Local development

### Prerequisites

- Node.js 18+
- Wrangler CLI: `npm install -g wrangler`
- A Cloudflare account (free tier works)

### Setup

```bash
# Install dependencies
npm install

# Create the D1 database
wrangler d1 create where-to-go-db

# Copy the database_id from the output into wrangler.toml

# Apply migrations locally
npm run db:migrate:local

# (Optional) Load demo data
npm run seed:local

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The demo event organizer dashboard is accessible at:
```
http://localhost:3000/e/demo-event-001/organizer/demo-organizer-token-aaabbbcccdddeeefffggg0001
```

Participant links:
```
http://localhost:3000/e/demo-event-001/respond/demo-participant-token-jordan-0001aaabbb
http://localhost:3000/e/demo-event-001/respond/demo-participant-token-sam-000111aaabbb
http://localhost:3000/e/demo-event-001/respond/demo-participant-token-riley-0001aaabbbc
```

## D1 migrations

```bash
# Generate migrations from schema changes
npm run db:generate

# Apply locally
npm run db:migrate:local

# Apply to production
npm run db:migrate:remote
```

## Wrangler deployment

```bash
# Deploy to Cloudflare Workers
npm run deploy
```

This runs `vinext deploy`, which builds the app and deploys to Workers using your wrangler.toml configuration.

## Environment / binding setup

The only required binding is `DB` (D1). Set it in `wrangler.toml`:

```toml
[[ d1_databases ]]
binding = "DB"
database_name = "where-to-go-db"
database_id = "YOUR_DATABASE_ID"
migrations_dir = "drizzle/migrations"
```

For `drizzle-kit studio` and remote migrations, create a `.env` file:

```env
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_DATABASE_ID=your_database_id
CLOUDFLARE_D1_TOKEN=your_api_token
```

## Data model

| Table | Purpose |
|---|---|
| `events` | Event settings, timezone, duration, scoring mode |
| `participants` | Attendees, role (organizer/participant), response status, optional phone |
| `invite_tokens` | Secure per-participant access tokens |
| `availability_windows` | Raw submitted windows (start/end timestamps) |
| `participant_preferences` | Structured preferences (food, budget, location, time) |
| `organizer_overrides` | Block times, force include/exclude specific slots |
| `normalized_slots` | Pre-computed 30-min availability slots for fast scoring |
| `recommendation_snapshots` | Cached recommendation results |
| `final_selections` | The finalized chosen meeting slot |
| `activity_log` | Audit trail of all actions |

## Recommendation engine

The engine scores candidate meeting windows using weighted factors:

- **Attendance score** (50%): fraction of responded participants available
- **Required attendee score** (30%): fraction of required participants available
- **Time preference fit** (12%): match to participants' preferred time of day
- **Day type fit** (8%): weekday vs weekend preference match

Scoring modes (configurable per event):
- `maximize_attendance`: default weights above
- `prioritize_required`: 55% weight on required attendees
- `vip_priority`: boosts score based on key-person (★★) tier attendance
- `time_optimized`: 30% weight on time-of-day preference fit

Output surfaces: best overall, best attendance, best required-attendee match, best time fit, most popular.

## Future enhancements

- Location-aware scoring using geocoding
- Email/SMS notifications when event is finalized
- Calendar export (ICS)
- Multiple event templates
- Real-time updates using Cloudflare Durable Objects
- Organizer analytics across events
