# Togoo

Togoo is a token-based group scheduling app.

It helps one organizer collect availability and lightweight preferences from a group, rank candidate meeting times, and publish a final confirmed slot.

## What it does

- create a plan with title, type, timezone, date range, allowed hours, duration, slot spacing, scoring mode, optional suggested time, and response deadline
- add invitees and generate one private reply link per participant
- let invitees respond without creating an account
- collect availability windows plus optional preferences
- show the organizer ranked meeting-time recommendations and an overlap heatmap
- let the organizer edit the plan after creation
- finalize one slot and publish a final shareable page

## Main flows

1. Organizer creates a plan at `/events/new`
2. Organizer adds participants and shares invite links
3. Invitees reply at `/r/[token]`
4. Organizer reviews the dashboard at `/e/[eventId]/organizer/[token]`
5. Organizer finalizes one slot
6. Final page is available at `/e/[eventId]/final`

## Stack

- Vinext
- React 19
- Cloudflare Workers
- Cloudflare D1
- Drizzle ORM
- Tailwind CSS

## Project structure

```text
app/
  page.tsx                                 Landing page
  faq/page.tsx                             FAQ
  events/new/page.tsx                      Multi-step create flow
  r/[token]/page.tsx                       Participant reply flow
  e/[eventId]/organizer/[token]/page.tsx   Organizer dashboard
  e/[eventId]/summary/[token]/page.tsx     Token-gated live summary
  e/[eventId]/final/page.tsx               Final confirmed page
  api/
    events/route.ts                        Create event
    events/[eventId]/route.ts              Get or update event
    events/[eventId]/participants/         List or add participants
    events/[eventId]/participants/[id]/    Update or delete participant
    events/[eventId]/participants/[id]/token/ Regenerate participant token
    events/[eventId]/respond/              Submit or update participant reply
    events/[eventId]/recommendations/      Compute ranked recommendations
    events/[eventId]/finalize/             Finalize selected slot
    events/[eventId]/reopen/               Reopen a finalized event
    events/[eventId]/overrides/            Manage organizer overrides
    validate-token/                        Validate organizer or participant token

components/
  availability-picker.tsx                  Availability UI
  preference-form.tsx                      Preference UI
  recommendation-cards.tsx                 Ranked recommendation cards
  overlap-heatmap.tsx                      Availability overlap heatmap
  my-events.tsx                            Local recent-plan shortcuts
  share-buttons.tsx                        Share helpers
  ui/                                      Shared UI primitives

lib/
  db/schema.ts                             Drizzle schema
  scheduling.ts                            Availability normalization and scoring
  validation.ts                            Zod schemas
  auth.ts                                  Organizer/participant token lookup
  event-settings.ts                        Preference parsing helpers
  utils.ts                                 Date and formatting helpers

drizzle/migrations/
  0001_init.sql                            Current single migration
```

## Local development

### Prerequisites

- Node.js 18+
- Wrangler CLI
- Cloudflare account

### Setup

```bash
npm install
npm run db:migrate:local
npm run dev
```

Open `http://localhost:3000`.

### Optional demo data

```bash
npm run seed:local
```

## Database

This repo currently uses a single migration:

- `drizzle/migrations/0001_init.sql`

Apply it with:

```bash
npm run db:migrate:local
npm run db:migrate:remote
```

## Environment

`wrangler.toml` must define the D1 binding:

```toml
[[d1_databases]]
binding = "DB"
database_name = "where-to-go-db"
database_id = "YOUR_DATABASE_ID"
migrations_dir = "drizzle/migrations"
```

For `drizzle-kit` and remote migration commands, create `.env`:

```env
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_DATABASE_ID=your_database_id
CLOUDFLARE_D1_TOKEN=your_api_token
```

## Data model

| Table | Purpose |
| --- | --- |
| `events` | plan settings, timing rules, scoring mode, status |
| `participants` | organizer and invitees |
| `invite_tokens` | private organizer and participant access tokens |
| `availability_windows` | raw submitted availability windows |
| `participant_preferences` | optional preference data |
| `organizer_overrides` | manual include/exclude/block rules |
| `normalized_slots` | slotized availability used for scoring |
| `recommendation_snapshots` | stored recommendation responses |
| `final_selections` | finalized chosen slot |
| `activity_log` | audit log |

## Recommendation logic

Recommendations are based on:

- attendance overlap
- required attendee coverage
- time-of-day preference match
- weekday/weekend preference match
- optional VIP weighting through `priority_tier`

Current scoring modes:

- `maximize_attendance`
- `prioritize_required`
- `vip_priority`
- `time_optimized`

Current limitation:

- food, budget, location, travel distance, and indoor/outdoor preferences are stored but not used in scoring yet

## Current constraints

- no account system
- no email or SMS delivery
- no calendar export
- no venue recommendation flow
- organizer overrides exist in the backend, but there is no dashboard UI for them yet
- recommendation snapshots are stored on every recommendations request

## Related docs

- `PRD.md` for product requirements
- `TRD.md` for architecture, APIs, schema, and implementation details
