# Repo Review: where-to-go

> Status note: this review drove the fixes now present in the current working tree. Re-run the review if you want a fresh post-fix report.

Review date: 2026-04-20
Current branch: `master`
Base branch used for comparison context: `main` (fallback, no remote configured)
Scope: full repository review across product, design, engineering, security, and developer experience

## Executive Summary

This repo has a strong product shell: the core user journey is easy to understand, the visual system is consistent, and the scheduling engine has the right basic shape.

But the repo is not in ship shape. The biggest problems are auth boundary breaks around event summaries and recommendations, token expiry that is modeled but never enforced, a ranking mode that lies to organizers, and a build setup that currently does not build.

## Review Scores

| Area | Score | Notes |
|---|---:|---|
| CEO / Product | 5/10 | Good wedge, but several headline promises and settings do not match shipped behavior |
| Design | 7/10 | Clean, cohesive UI, but some visible affordances are dead ends |
| Engineering | 3/10 | Real auth, data integrity, and consistency bugs in core flows |
| DX | 3/10 | Build is broken, typecheck is broken, and local setup is more fragile than the docs imply |

## Top Findings

### 1. Critical: any active token can unlock another event's summary page

`app/e/[eventId]/summary/[token]/page.tsx:37-48` validates only that the token exists and is active, then separately loads whatever `eventId` is in the URL.

It never verifies that the token belongs to that event. That means someone with any still-active token can combine it with a different event ID and read another event's participant counts, overlap data, and preference-informed recommendations.

Why it matters: this breaks the main privacy boundary of the product.

### 2. High: participant tokens can call the organizer recommendations API

`app/api/events/[eventId]/recommendations/route.ts:19-26` checks `token`, `event_id`, and `is_active`, but unlike the organizer-only routes it does not require `role === "organizer"`.

That means a participant token can fetch the organizer recommendation set even when participant-visible results are supposed to stay hidden.

Why it matters: the product says only people with the right access should see event internals, but this route hands out the most sensitive organizer output.

### 3. High: token expiry is modeled, exposed in the UI, and still ignored everywhere

The repo stores token expirations in `app/api/events/[eventId]/participants/route.ts:83-107` and even defines `isTokenExpired` in `lib/tokens.ts:13-16`.

But the actual checks in `app/api/validate-token/route.ts:14-18`, `app/api/events/[eventId]/respond/route.ts:27-37`, and the organizer token validators across the API only look at `is_active`. `expires_at` is never enforced.

Why it matters: organizers can think a link died after 24 hours when it actually still works.

### 4. High: `vip_priority` is silently broken in the main organizer dashboard

The product exposes `vip_priority` in the create flow at `app/events/new/page.tsx:397-408`, and the engine relies on `priority_tier` in `lib/scheduling.ts:172` and `lib/scheduling.ts:206-210`.

But `app/api/events/[eventId]/recommendations/route.ts:57-63` strips `priority_tier` when mapping participants into `computeRecommendations()`. The organizer dashboard therefore computes results without the very weighting the organizer selected.

The summary page does pass `priority_tier` at `app/e/[eventId]/summary/[token]/page.tsx:50-56`, so two parts of the product can disagree about the same event.

Why it matters: ranking modes are part of the product promise. If one of them is fake, organizers will stop trusting the recommendations.

### 5. High: the repo does not currently build

`npm run build` fails because `vinext` expects the Cloudflare Vite plugin, but `vite.config.ts:93-98` only registers `vinextPlugin()` plus a custom dev shim.

Build error observed:

```text
Missing @cloudflare/vite-plugin in vite.config.ts.
Cloudflare Workers builds require the cloudflare() plugin.
```

Why it matters: this blocks the documented deploy path in `README.md:114-121`.

### 6. High: the repo does not typecheck in a fresh state

`tsc --noEmit` fails with 30 errors because the code imports `next/*` from many files, but `package.json:17-43` does not include `next`.

Representative failures:

- `app/page.tsx:1` cannot find `next/link`
- `app/layout.tsx:1` cannot find `next`
- `app/api/events/route.ts:1` cannot find `next/server`

Why it matters: even before app logic bugs, the repo fails a basic maintainer sanity check.

### 7. Medium: finalization is not idempotent and can create multiple final answers

`app/api/events/[eventId]/finalize/route.ts:37-50` always inserts a new `final_selections` row. `lib/db/schema.ts:181-195` has no uniqueness constraint on `event_id`, and `app/e/[eventId]/final/page.tsx:54-56` just does `findFirst()`.

If finalize is retried, double-clicked, or raced, one event can end up with multiple final rows and the public final page may show an arbitrary one.

Why it matters: the one moment the organizer needs certainty, the data model allows drift.

### 8. Medium: "prioritize required attendees" is exposed, but organizers cannot really use it

The README sells this mode in `README.md:167-170`, and the create flow exposes it in `app/events/new/page.tsx:397-408`.

But participant creation from both the event setup flow and organizer dashboard hardcodes `is_required: false` at `app/events/new/page.tsx:204-209` and `app/e/[eventId]/organizer/[token]/page.tsx:378-385`. The edit UI only changes name, email, and phone at `app/e/[eventId]/organizer/[token]/page.tsx:187-203`.

Why it matters: one of the core scheduling modes is practically unusable from the shipped UI.

### 9. Medium: multiple stored settings are dead and will mislead users

These fields exist in schema and validation, but repo-wide review found no meaningful enforcement:

- `show_results_to_participants`: `lib/validation.ts:17`, `lib/db/schema.ts:21`
- `preferences_required`: `lib/validation.ts:18`, `lib/db/schema.ts:22`
- `response_deadline`: `lib/validation.ts:25`, `lib/db/schema.ts:27`
- `min_attendance_threshold`: `lib/validation.ts:14`, `lib/db/schema.ts:18`
- `force_include`: accepted in `lib/validation.ts:77-80`, but ignored in `lib/scheduling.ts:106-121`

Why it matters: settings that do nothing are worse than missing settings. They train users to distrust the product.

### 10. Medium: the activity tab is visible but never gets data

The organizer dashboard defines `activityLog` in `app/e/[eventId]/organizer/[token]/page.tsx:298` and renders an Activity tab at `app/e/[eventId]/organizer/[token]/page.tsx:688-711`.

But there is no fetch path for activity data and no `setActivityLog(...)` call anywhere in the repo.

Why it matters: users click into a polished empty shell instead of a working audit trail.

### 11. Medium: the product promise still says "time and place", but the app only helps with time

The README and landing page promise the best "time and place" or "when and where" in `README.md:3,7-13` and `app/page.tsx:30-32`.

But the shipped recommendation surfaces in `components/recommendation-cards.tsx:31-119`, `app/e/[eventId]/summary/[token]/page.tsx:124-176`, and `app/e/[eventId]/final/page.tsx:103-118` only rank time slots. There is no venue scoring or place recommendation flow.

Why it matters: this is a positioning gap, not just copy drift. It changes what a user thinks they are buying.

### 12. Medium: participant routing is duplicated and inconsistent

The repo ships both `/e/[eventId]/respond/[token]` and `/r/[token]` response flows in:

- `app/e/[eventId]/respond/[token]/page.tsx`
- `app/r/[token]/page.tsx`

New participant invites return `/r/${token}` in `app/api/events/[eventId]/participants/route.ts:121-123`, but regenerated links return `/e/${eventId}/respond/${newToken}` in `app/api/events/[eventId]/participants/[participantId]/token/route.ts:61-64`.

Why it matters: this is easy to maintain incorrectly and confusing for a new maintainer reading logs, links, or docs.

## CEO / Product Review

### What already exists

- Event creation with timezone, date range, duration, and ranking mode: `app/events/new/page.tsx`
- Invite and response flow with no account requirement: `app/r/[token]/page.tsx`, `app/e/[eventId]/respond/[token]/page.tsx`
- Organizer dashboard with participant management and recommendation display: `app/e/[eventId]/organizer/[token]/page.tsx`
- Scheduling engine with weighted scoring: `lib/scheduling.ts`
- D1-backed data model with audit log and final selections: `lib/db/schema.ts`

### Strengths

- The core wedge is good. "No account, send a link, collect windows, get ranked suggestions" is simple and useful.
- The participant flow is low-friction and easy to understand.
- Invite sharing is thoughtful for a v1: copy, QR, WhatsApp, and email are all present.

### Product Gaps

- The repo sells place selection but only implements time selection.
- Multiple advanced controls exist in the schema, but the product does not actually honor them.
- One of the main ranking modes, required-attendee prioritization, is not meaningfully usable in the UI.
- Finalization ends in a weak organizer payoff. The API returns `final_url`, but the dashboard never walks the organizer into sharing it.

### Dream State Delta

Current state:

```text
Collect windows -> rank times -> organizer manually interprets results
```

What this repo claims:

```text
Collect windows + preferences -> rank times and places -> finalize -> share clean result
```

What the code actually reaches:

```text
Collect windows + a few preferences -> rank times only -> finalize -> public final page exists
```

The delta is mostly in truthful scope and complete behavior, not raw UI polish.

## Design Review

### Strengths

- Consistent visual language across landing, create, respond, organizer, FAQ, and final pages.
- Good pacing and hierarchy on the main participant and organizer flows.
- Timezone handling is carefully surfaced where users actually need it.

### Design Findings

- The activity tab looks real but is empty by construction. That is a classic trust hit.
- The create flow gives the appearance of highly configurable participant preferences, but not all supported preference types are actually configurable. `day_type` is missing from the picker in `app/events/new/page.tsx:29-35`, while the participant form supports it in `components/preference-form.tsx:171-177`.
- Notes always render in `components/preference-form.tsx:207-213` even when the organizer is supposed to be deciding which fields are shown.
- Finalization lacks a crisp "success and share" moment for organizers. The backend has the URL, the UI drops it.

## Engineering Review

### Architecture Map

```text
Browser UI
  |
  +-- app/page.tsx
  +-- app/events/new/page.tsx
  +-- app/r/[token]/page.tsx
  +-- app/e/[eventId]/respond/[token]/page.tsx
  +-- app/e/[eventId]/organizer/[token]/page.tsx
  +-- app/e/[eventId]/summary/[token]/page.tsx
  +-- app/e/[eventId]/final/page.tsx
        |
        v
Route Handlers
  +-- app/api/events/route.ts
  +-- app/api/events/[eventId]/route.ts
  +-- app/api/events/[eventId]/participants/**/*.ts
  +-- app/api/events/[eventId]/respond/route.ts
  +-- app/api/events/[eventId]/recommendations/route.ts
  +-- app/api/events/[eventId]/finalize/route.ts
  +-- app/api/events/[eventId]/reopen/route.ts
  +-- app/api/validate-token/route.ts
        |
        v
Core Logic
  +-- lib/scheduling.ts
  +-- lib/validation.ts
  +-- lib/tokens.ts
  +-- lib/utils.ts
        |
        v
Persistence
  +-- lib/db/index.ts
  +-- lib/db/schema.ts
  +-- Cloudflare D1
```

### Failure Modes Registry

| Failure mode | Where | Impact |
|---|---|---|
| Foreign token can unlock summary data | `app/e/[eventId]/summary/[token]/page.tsx:37-48` | Cross-event privacy leak |
| Participant token can fetch organizer recommendations | `app/api/events/[eventId]/recommendations/route.ts:19-26` | Private scheduling output leaks to attendees |
| Expired token still works | `app/api/validate-token/route.ts:14-18`, `app/api/events/[eventId]/respond/route.ts:27-37` | Revocation by time is fake |
| Duplicate final rows | `app/api/events/[eventId]/finalize/route.ts:37-50`, `lib/db/schema.ts:181-195` | Public final page can show the wrong answer |
| VIP weighting silently ignored | `app/api/events/[eventId]/recommendations/route.ts:57-63` | Organizer sees wrong ranking |
| Dead settings stored but not enforced | schema + validation + API | Product behavior diverges from user configuration |
| Activity tab never populates | `app/e/[eventId]/organizer/[token]/page.tsx:298,688-711` | Users see dead UI |
| No buildable deploy path | `vite.config.ts:93-98` | Cannot ship reliably |

### Error and Rescue Registry

| Problem | Likely user-visible symptom | Rescue |
|---|---|---|
| Broken auth boundary | Participant sees data they should not see | Centralize token validation by role, event binding, expiry |
| Broken finalize semantics | Organizer finalizes twice, result page becomes unreliable | Make finalize single-row and idempotent |
| Broken ranking mode | Organizer chooses VIP weighting, gets unchanged results | Pass `priority_tier` through every recommendation path |
| Dead settings | Organizer toggles a control and nothing changes | Either enforce it or remove it from model/UI/docs |
| Build failure | Maintainer cannot deploy | Fix Vite Cloudflare plugin wiring and document the expected stack |

## DX Review

### Verification Evidence

Commands run:

```bash
npm run build
tsc --noEmit
```

Observed results:

- `npm run build` failed because `vinext` requires `@cloudflare/vite-plugin`, but `vite.config.ts` does not register `cloudflare()`.
- `tsc --noEmit` failed with 30 errors because `next/*` imports are unresolved.
- No tests were found under `**/*.{test,spec}.{ts,tsx,js,jsx}` or `**/{test,tests,__tests__}/**/*`.

### TTHW Assessment

Current time to hello world: roughly 15 to 30 minutes for a new maintainer, and longer if they trust the README literally.

Main friction points:

- Requires global Wrangler install: `README.md:62-64`
- Requires manual D1 creation and manual `wrangler.toml` wiring: `README.md:72-79`, `wrangler.toml:5-9`
- Dev relies on hidden `.wrangler/state/...sqlite` files existing: `vite.config.ts:22-25`
- No first-class `test`, `lint`, or `typecheck` script: `package.json:5-16`
- The documented build/deploy path is broken right now

### DX Findings

- Project identity is muddy. The repo says `where-to-go`, the UI says `Togoo`, and links point to `github.com/anxkhn/togoo`.
- Route conventions are inconsistent. Participant tokens travel via header, body, query string, and path depending on the endpoint.
- Two response pages do nearly the same thing, which invites drift.

## Test Plan

### Highest-priority tests to add

1. Auth matrix tests

```text
- organizer token + same event -> allowed
- participant token + same event -> blocked from organizer endpoints
- active token + different event -> blocked
- expired token -> blocked
- inactive token -> blocked
```

2. Recommendation correctness tests

```text
- vip_priority changes ranking when priority tiers change
- prioritize_required changes ranking when required attendees are marked
- force_include and force_exclude behave as configured
- timezone and duration edge cases stay stable
```

3. Finalization state tests

```text
- finalize is idempotent
- finalize on already-finalized event stays consistent
- reopen clears exactly one logical final selection
```

4. Product behavior tests

```text
- response_deadline blocks submission after deadline
- preferences_required rejects empty preference payload when enabled
- show_results_to_participants actually gates participant visibility
```

5. Repo health checks

```text
- build passes
- typecheck passes
- a smoke test can create an event, invite a participant, submit a response, compute recommendations, and finalize
```

## Not In Scope

- I did not make code changes.
- I did not create a PR or commit.
- I did not verify live Cloudflare deployment behavior because there is no configured remote or deploy target in this review session.

## Recommended Fix Order

1. Fix the auth boundary first.
2. Enforce token expiry everywhere through one shared validator.
3. Fix `vip_priority` and the finalization idempotency bug.
4. Either remove dead settings or implement them fully.
5. Repair build and typecheck so the repo can be trusted operationally.
6. Collapse the duplicated participant routes into one canonical path.

## Bottom Line

The repo has real promise and a real product shape.

But right now it is a polished scheduling app with broken trust boundaries and a broken maintainer story. Fix auth, fix truth-in-settings, fix buildability. Then the rest is mostly product sharpening.
