# Developer Experience Review

## Scope

- Skill: `/plan-devex-review`
- Date: 2026-04-24
- Branch: `master`
- Commit reviewed: `c2cebed`
- Product type: Documentation + Platform workflow
- Mode: DX EXPANSION
- Output file: `DEVEX_REVIEW.md`

This review covers the developer experience for running, verifying, and deploying Togoo. Togoo is not a public SDK or CLI. Its developer-facing surface is the repo itself: `README.md`, `DEPLOY.md`, `TRD.md`, `package.json`, migrations, Cloudflare D1 setup, local development, production deploy, and debugging.

## Developer Persona Card

| Field | Value |
| --- | --- |
| Who | Solo maintainer or close collaborator |
| Context | Returns to the repo after days or weeks, wants to run locally, verify scheduling behavior, and deploy safely |
| Tolerance | About 5 minutes before trust drops |
| Expects | `npm install`, one local database command, one dev command, one verification command, one safe deploy path |
| Main fear | Changing scheduling math without a one-command confidence check |

## Developer Empathy Narrative

I open `README.md`. It tells me Togoo is a token-based group scheduling app, then I jump to `Local development`. I see Node 22, Wrangler CLI, Cloudflare account, then `npm install`, `npm run db:migrate:local`, `npm run dev`.

Good start. Short. No ceremony.

But I do not know whether Wrangler must already be logged in for local D1, whether `.env` is needed for local development, or what success looks like after migration. I open `package.json` and see `typecheck`, `build`, and deploy scripts, but no `test`. If I change scheduling math, I have no one-command confidence check beyond typecheck. Typecheck tells me the code compiles. It does not tell me recommendations still work.

I open `DEPLOY.md`. Production deploy is clear enough: login, migrate remote D1, deploy. But rollback is missing. Post-deploy verification checks `/`, `/events/new`, and `/faq`, which proves the shell loads, not that the scheduling product works. If a route returns `Internal server error`, I need logs and a next command, not a generic response.

The repo is close. The gap is confidence.

## Competitive DX Benchmark

| Tool | TTHW | Notable DX choice | Source |
| --- | --- | --- | --- |
| Cloudflare Workers + Wrangler | 2-5 min for a basic Worker, longer with D1 | CLI-led setup and deploy, D1 commands documented separately | Cloudflare Workers docs, 2026 search result |
| Vercel | 2-5 min | Three-step deploy story: install CLI, configure, deploy | Vercel getting started docs, 2025 search result |
| Supabase CLI | 5-10 min for full local stack | CLI owns database lifecycle, migrations, and local services | Supabase CLI local-dev references, 2025 search results |
| Togoo today | 6-10 min | Short README setup, but no smoke test or expected output | Current repo |
| Togoo target | <2 min | One command proves the core scheduling loop works | This review |

Target tier: Champion, under 2 minutes for a returning maintainer.

## Magical Moment Specification

The magical moment is not deployment. It is local confidence.

The maintainer should run one command and see that the product's hard path still works:

1. Create a plan.
2. Add a participant.
3. Submit availability.
4. Compute recommendations.
5. Finalize a slot.
6. Print the organizer, response, summary, and final URLs.

Recommended delivery vehicle: smoke test command.

Proposed command:

```bash
npm run smoke:local
```

Expected output shape:

```text
Togoo local smoke test
✓ local D1 reachable
✓ event created
✓ participant invite generated
✓ response submitted
✓ recommendations returned 3 candidates
✓ final slot accepted

Organizer: http://localhost:3000/e/...
Response:  http://localhost:3000/r/...
Final:     http://localhost:3000/e/.../final
```

This is the moment where future-you stops guessing and starts shipping.

## Developer Journey Map

| Stage | Developer does | Friction points | Status |
| --- | --- | --- | --- |
| Discover | Opens `README.md` | Product summary is clear, but maintainer target is implicit | Improve docs |
| Install | Runs `npm install` | Node 22 listed, but no `engines` enforcement | Add guard |
| Local DB | Runs `npm run db:migrate:local` | No expected success output, no local D1 troubleshooting | Add expected output and troubleshooting |
| Hello World | Runs `npm run dev` and opens `/` | App shell loads, but core scheduling loop is unverified | Add `smoke:local` |
| Real Usage | Edits scheduling logic | No `test` script, no regression tests for date math or scoring | Add test harness |
| Debug | Hits API failure | Many routes return `Internal server error` without request IDs or next steps | Improve error contract/logging guidance |
| Deploy | Runs `npm run deploy` or `deploy:prod` | Deploy path is clear, rollback and product-level smoke checks are thin | Add release checklist |
| Upgrade | Updates dependencies | No changelog or upgrade notes | Add `CHANGELOG.md` |

## First-Time Developer Confusion Report

Persona: solo maintainer.

Attempting: run Togoo locally and verify the scheduling loop.

| Time | What happens |
| --- | --- |
| T+0:00 | I open `README.md` and understand the app quickly. |
| T+0:30 | I find `npm install`, `npm run db:migrate:local`, `npm run dev`. Good. |
| T+1:00 | I wonder whether Wrangler auth is required for local D1. README does not say. |
| T+2:00 | I run migration, but the docs do not show what success output looks like. |
| T+3:00 | I open `/`, but that only proves the shell. I still do not know whether scheduling works. |
| T+5:00 | I look for `npm test`. It does not exist. I use `npm run typecheck`, which is necessary but not enough. |
| T+8:00 | I manually click through the app or deploy with incomplete confidence. Not great. |

Addressed in this plan: add one-command smoke test, add regression tests, add expected outputs, add rollback and smoke verification docs.

## What Already Exists

- `README.md` has concise local setup and project structure.
- `DEPLOY.md` has clear Cloudflare login, D1 creation, migration, deploy, and route-check steps.
- `TRD.md` documents routes, access model, core flows, schema, and recommendation logic.
- `package.json` has `dev`, `build`, `deploy`, `deploy:prod`, `typecheck`, migration, seed, and Cloudflare typegen scripts.
- `scripts/seed.sql` exists and can populate local or remote D1.
- API route handlers return structured JSON errors for many validation/auth failures.

## NOT In Scope

- Public API docs for third-party developers. Togoo is not currently a public developer platform.
- SDK generation. No SDK surface exists.
- Full hosted playground. The target developer is the maintainer, not external evaluators.
- Replacing Cloudflare Workers. The platform choice is already set.

## Review Passes

### Pass 1: Getting Started Experience

Score: 5/10 now, target 9/10.

Evidence:

- `README.md:96-112` gives a short setup path.
- `package.json:6-17` has the right commands for local dev, migrations, deploy, and seed.
- No command proves the core create/respond/recommend/finalize loop.
- Current TTHW is 6-10 minutes, mostly because verification is manual.

What makes it a 10:

- `npm run setup:local` or `npm run smoke:local` gets from clone to verified scheduling loop in under 2 minutes.
- README shows expected output for migrations and smoke test.
- Local D1 troubleshooting is one section, not tribal memory.

Plan fixes:

- Add `npm run smoke:local`.
- Add a README quickstart that ends with `npm run smoke:local`.
- Add expected success output for `db:migrate:local` and `smoke:local`.

### Pass 2: API/CLI/Script Design

Score: 6/10 now, target 9/10.

Evidence:

- Scripts are understandable: `dev`, `build`, `deploy`, `deploy:prod`, `typecheck`, `db:migrate:*`, `seed:*`.
- Missing scripts: `test`, `smoke:local`, `check`, `clean`.
- `deploy:prod` runs remote migrations and deploys, but no preflight typecheck/build gate.

What makes it a 10:

- `npm run check` runs typecheck, tests, and build.
- `npm run smoke:local` verifies product behavior.
- `npm run deploy:prod` either depends on `check` or docs say exactly when to run `check` first.

Plan fixes:

- Add `test` script for scheduling and validation logic.
- Add `check` script: `npm run typecheck && npm test && npm run build`.
- Add `smoke:local` script.

### Pass 3: Error Messages and Debugging

Score: 5/10 now, target 8/10.

Evidence:

- Validation errors often return useful `details`, for example `Invalid input` with flattened Zod errors.
- Many catch blocks return `Internal server error`, for example recommendations, respond, finalize, participants export.
- Server logs include route-specific prefixes, but user-facing responses lack request IDs or next debugging command.
- `vite.config.ts` throws `No local D1 SQLite file found in ...`, which is direct but not actionable enough.

What makes it a 10:

- Every developer-facing failure says problem, likely cause, and next command.
- Internal errors include a request ID in logs and response.
- README has a troubleshooting table for local D1, Wrangler auth, missing `.env`, and remote migration failures.

Plan fixes:

- Add a shared API error helper with optional request ID.
- Keep client-safe messages user-friendly, but document the exact log command for production debugging.
- Add troubleshooting examples to README/DEPLOY.

### Pass 4: Documentation and Learning

Score: 6/10 now, target 9/10.

Evidence:

- README is concise and accurate after recent doc fixes.
- TRD gives good architecture detail.
- DEPLOY is practical.
- No `docs/` directory, no contributor guide, no smoke-test walkthrough, no testing guide.

What makes it a 10:

- README is the fast path.
- TRD is architecture reference.
- DEPLOY is release/runbook.
- `DEVEX_REVIEW.md` or a future `CONTRIBUTING.md` explains test and smoke workflows.

Plan fixes:

- Add `CONTRIBUTING.md` or a README section with the maintainer workflow.
- Add a `Troubleshooting` section.
- Add `How to verify scheduling changes` with exact commands.

### Pass 5: Upgrade and Migration Path

Score: 4/10 now, target 8/10.

Evidence:

- No `CHANGELOG.md` found.
- D1 migration commands exist.
- Migration docs now list only `0001_init.sql`, but there is no policy for future migrations.
- No rollback guidance for deploys or schema changes.

What makes it a 10:

- Every schema change ships with migration notes.
- `CHANGELOG.md` records user-facing and operator-facing changes.
- DEPLOY includes rollback and D1 backup/restore expectations.

Plan fixes:

- Add `CHANGELOG.md`.
- Add migration policy to README or TRD.
- Add rollback section to DEPLOY.

### Pass 6: Developer Environment and Tooling

Score: 5/10 now, target 9/10.

Evidence:

- TypeScript and Cloudflare types are configured.
- `cf-typegen` exists.
- No automated tests.
- No CI config found in the audited docs/files.
- No cross-platform notes for Windows or ARM edge cases.

What makes it a 10:

- Tests cover scheduling math, timezone conversion, validation, and finalization.
- CI runs `npm run check`.
- Local setup documents Node, npm, Wrangler, Cloudflare auth, local D1 location, and `.env` boundaries.

Plan fixes:

- Add test harness, probably Vitest or Node test runner.
- Add scheduling regression tests first.
- Add GitHub Actions or equivalent when remote exists.

### Pass 7: Community and Ecosystem

Score: 3/10 now, target 6/10.

Evidence:

- Repo footer links to GitHub.
- No `CONTRIBUTING.md`, `LICENSE`, issue templates, examples, or community channel found.
- For a private/solo app this is not fatal.

What makes it a 10:

- If Togoo becomes open source: license, contribution guide, issue templates, examples, and public roadmap.
- For current solo use: a small contributor guide is enough.

Plan fixes:

- Add `CONTRIBUTING.md` only if collaborators are expected.
- Otherwise document maintainer workflow in README.

### Pass 8: DX Measurement and Feedback Loops

Score: 2/10 now, target 8/10.

Evidence:

- No TTHW tracking.
- No `devex-review` smoke script to compare planned TTHW against reality.
- Deploy verification checks routes, not product behavior.

What makes it a 10:

- `npm run smoke:local` prints duration and pass/fail.
- DEPLOY includes post-deploy smoke steps for create/respond/recommend/finalize.
- Future `/devex-review` can measure actual TTHW against the <2 minute target.

Plan fixes:

- Make smoke test duration visible.
- Add post-deploy product smoke checklist.
- Add a habit: rerun this review after implementing the smoke path.

## DX Scorecard

| Dimension | Score | Prior | Trend |
| --- | ---: | ---: | --- |
| Getting Started | 5/10 | 3/10 | up |
| API/CLI/Scripts | 6/10 | 3/10 | up |
| Error Messages | 5/10 | 3/10 | up |
| Documentation | 6/10 | 3/10 | up |
| Upgrade Path | 4/10 | 2/10 | up |
| Dev Environment | 5/10 | 3/10 | up |
| Community | 3/10 | n/a | flat |
| DX Measurement | 2/10 | n/a | flat |

| Summary | Value |
| --- | --- |
| Current TTHW | 6-10 min |
| Target TTHW | <2 min |
| Competitive rank today | Needs Work |
| Competitive rank target | Champion for solo maintainer workflow |
| Magical moment | Missing today, planned via `npm run smoke:local` |
| Product type | Documentation + Platform workflow |
| Mode | DX EXPANSION |
| Overall DX | 4.5/10 now, 8.5/10 after plan fixes |

## DX Principle Coverage

| Principle | Coverage | Gap |
| --- | --- | --- |
| Zero friction at T0 | Partial | Setup is short, verification is manual |
| Learn by doing | Partial | Seed exists, but no guided smoke path |
| Fight uncertainty | Gap | Generic internal errors and thin troubleshooting |
| Opinionated defaults + escape hatches | Partial | Scripts exist, but no `check` or smoke default |
| Show code in context | Partial | TRD is good, tests/examples missing |
| Magical moments | Gap | Need smoke test command |

## DX Implementation Checklist

- [ ] Time to hello world under 2 minutes for a returning maintainer
- [ ] Installation is one command after prerequisites: `npm install`
- [ ] First verification command exists: `npm run smoke:local`
- [ ] Smoke test creates plan, participant, response, recommendation, and final selection
- [ ] `npm test` exists
- [ ] `npm run check` runs typecheck, tests, and build
- [ ] README shows expected output for local migration and smoke test
- [ ] README explains whether `.env` is needed for local development
- [ ] README has local D1 and Wrangler troubleshooting
- [ ] DEPLOY has rollback guidance
- [ ] DEPLOY has product-level post-deploy smoke checks
- [ ] Every API error has problem, cause, and fix where safe
- [ ] Internal server errors include a request ID or log correlation path
- [ ] `CHANGELOG.md` exists and records user/operator-facing changes
- [ ] Migration policy exists for future schema changes
- [ ] CI runs `npm run check` if/when a remote is configured

## Recommended Plan Additions

1. Add `npm run smoke:local`.
   - What: a script that exercises the full local scheduling loop.
   - Why: gives the maintainer confidence in under 2 minutes.
   - Pros: catches broken scheduling, token, recommendation, and finalization paths.
   - Cons: requires a small test harness and local server/database assumptions.
   - Depends on: stable local D1 setup.

2. Add a real `test` script.
   - What: unit/regression tests for scheduling, timezone conversion, validation, and finalization.
   - Why: the highest-risk code is date math and scoring, not type shape.
   - Pros: catches regressions before deploy.
   - Cons: initial fixture setup cost.
   - Depends on: choosing test runner.

3. Add `npm run check`.
   - What: typecheck, tests, build.
   - Why: one command before deploy.
   - Pros: simple muscle memory.
   - Cons: slower than typecheck alone.
   - Depends on: `npm test`.

4. Add local setup expected outputs and troubleshooting.
   - What: README section for migration success, local D1 failures, Wrangler auth, `.env` boundaries.
   - Why: removes guesswork from setup.
   - Pros: fewer repeated debugging sessions.
   - Cons: docs need upkeep.
   - Depends on: verifying current command output.

5. Add rollback and post-deploy smoke checks.
   - What: DEPLOY section for rollback plus product-level verification after deploy.
   - Why: homepage checks are not enough for a scheduling product.
   - Pros: safer releases.
   - Cons: requires a production-safe smoke path or manual checklist.
   - Depends on: deciding whether smoke data can be created in production.

6. Add `CHANGELOG.md`.
   - What: track shipped user, operator, and schema changes.
   - Why: future-you needs upgrade context.
   - Pros: reduces upgrade fear.
   - Cons: maintenance habit.
   - Depends on: none.

## TODOs.md Updates

No `TODOS.md` exists. If one is created, add these DX debt items:

- Add `npm run smoke:local` for the full scheduling loop.
- Add regression tests for scheduling/timezone/finalization.
- Add deploy rollback and post-deploy smoke checklist.
- Add `CHANGELOG.md` and migration policy.

## Unresolved Decisions

- Test runner choice is unresolved. Recommendation: Vitest if the repo wants fast TypeScript unit tests, Node test runner if minimal dependency count matters more.
- Production smoke strategy is unresolved. Recommendation: start with a manual checklist, then automate once test data cleanup is safe.

## Review Readiness

| Review | Status | Finding |
| --- | --- | --- |
| CEO/Product | concerns | Prior product correctness issues were found and mostly fixed. |
| Design | clear | Design plan review improved score to 9/10. |
| Engineering | stale concerns | Latest correctness fixes landed after earlier eng review. Rerun recommended before a larger ship. |
| DX | issues open | Current DX is usable for maintainer, but not confidence-grade until smoke/test/check exist. |

## Final Verdict

STATUS: DONE_WITH_CONCERNS

Togoo's developer experience is short but under-instrumented. The repo is easy to start, hard to trust after touching scheduling logic. The complete fix is not a docs rewrite. It is one smoke command, one test command, one check command, and deploy docs that verify the product path, not just the homepage.

Build the smoke test first.
