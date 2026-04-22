# Autoplan Review

## Scope

- Reviewed against `PRD.md`, `TRD.md`, `DESIGN.md`, `README.md`, `DEPLOY.md`
- Used the current repository source code as source of truth where docs and code disagree
- Verified build and typecheck

## Verification

- `npm run typecheck` passed
- `npm run build` passed
- Build warning: client chunk size exceeds 500 kB after minification

## Consensus Table

| Phase | Verdict | Summary |
| --- | --- | --- |
| CEO / Product | DONE_WITH_CONCERNS | The shipped product is coherent and valuable, but core scheduling data can be wrong because timezone handling and deadline rules are inconsistent. |
| Design | DONE_WITH_CONCERNS | The visual system largely matches `DESIGN.md`, but some advanced controls now sit in the main organizer workflow in a way that adds cognitive weight. |
| Engineering | DONE_WITH_CONCERNS | Architecture is understandable and buildable, but there are correctness holes around time conversion and finalization validation. |
| DX | DONE_WITH_CONCERNS | Local setup is straightforward, but docs drift and the repo lacks a real automated test harness. |

## CEO Review

### What is working

- The core organizer and invitee flows are real, shipped, and coherent.
- Token-gated access keeps invitee friction low.
- The recommendation engine, overlap heatmap, live summary, finalization flow, and reopening flow all exist in code.
- The product mostly does what the PRD says it does now.

### Hard issues

1. Event timezone handling is incorrect in the create and edit flows.
   - `app/events/new/page.tsx:337-338` stores the event range with `new Date(localDate)` semantics, not the selected event timezone.
   - `app/e/[eventId]/organizer/[token]/page.tsx:821-833` repeats the same bug while editing, and also converts suggested times differently from create.
   - `components/ui/date-time-picker.tsx:211-262` returns naive local datetime strings, so the page code has to apply timezone conversion explicitly and currently does not.

2. Response deadline validation blocks the most common organizer workflow.
   - `lib/validation.ts:72-78` and `lib/validation.ts:143-149` reject deadlines before the event starts.
   - For scheduling, the useful deadline is usually before the event window, not after it begins.

3. Finalization trusts arbitrary client-supplied slots.
   - `app/api/events/[eventId]/finalize/route.ts:23-71` validates shape only.
   - It does not verify that the chosen slot is inside the event range, matches duration, or appears in computed recommendations.

4. A non-scored preference field had drifted between docs and implementation.
   - That mismatch has since been resolved by removing the unused preference from the product contract and UI path.

### Doc mismatches

- `PRD.md:224` says organizer overrides are backend-only, but the dashboard exposes full override controls in `app/e/[eventId]/organizer/[token]/page.tsx:1388-1444` and the API is live at `app/api/events/[eventId]/overrides/route.ts:11-121`.

## Design Review

### What is working

- The warm paper-like palette, serif/sans split, soft card system, and restrained elevation all match `DESIGN.md` well.
- Reduced-motion handling exists in `app/globals.css:222-271`.
- Invitee flow stays narrow and mobile-friendly.

### Concerns

- The organizer dashboard now carries recommendations, finalization, overrides, participant management, activity, sharing, and editing in one surface. It still works, but it is drifting toward a heavier operator dashboard than the design doc wants.
- Scheduling overrides are useful, but they feel like an advanced mode feature. Keeping them in the main recommendation column is a taste call, not a correctness bug.

## Engineering Review

### What is working

- The route structure is clean and mostly lines up with the TRD.
- Auth is simple and readable.
- Recommendation computation is explicit and not over-abstracted.
- Typecheck and production build both pass.

### Hard issues

1. Time conversion logic is duplicated and inconsistent across create and edit.
   - Create uses zoned conversion for suggested times but not for the main event range: `app/events/new/page.tsx:337-349`.
   - Edit uses plain local conversion for both range and suggested times: `app/e/[eventId]/organizer/[token]/page.tsx:821-833`.

2. Finalization is not tied to recommendation correctness.
   - `app/api/events/[eventId]/finalize/route.ts:31-71` allows impossible or out-of-range selections to become the official final plan.

3. There is no automated regression suite for the recommendation and scheduling logic.
   - `package.json:5-18` includes no `test` script.
   - This is risky because the hardest bugs here are date math and scoring edge cases.

### Non-blocking concerns

- `npm run build` reports a client chunk larger than 500 kB. Not a ship blocker, but worth watching as the organizer dashboard grows.

## DX Review

### What is working

- Setup is short.
- The app builds locally without special patching.
- The route aliases under `/api/p` are documented in TRD and present in code.

### Hard issues

1. Migration docs reference files that do not exist.
   - `README.md:92-95` and `README.md:123-126` mention `drizzle/migrations/0003_remove_rate_limits.sql`.
   - The repo only contains `drizzle/migrations/0001_init.sql`.

2. Deploy verification docs point readers at a non-browsable API route.
   - `DEPLOY.md:100-105` says to verify `/api/events` in production.
   - The implemented route is `POST`-only in `app/api/events/route.ts:9-98`, so a browser check is misleading.

## Final Approval Gate

### Hard issues to fix

1. Unify all event-time conversions around the selected event timezone.
2. Allow response deadlines before the event window and validate them against the actual scheduling model.
3. Reject finalization requests that do not map to a valid in-range candidate slot.
4. Either ship the travel-distance preference input or remove it from product and technical docs.
5. Repair README and deploy docs so setup and verification steps match the repo.

### Taste decisions

1. Keep scheduling overrides visible in the main organizer dashboard, or move them behind an advanced section.
   - Recommendation: move them behind an advanced section.
   - Reason: the feature is real and useful, but it adds operator weight to the main decision flow.

2. Keep the current single-page organizer dashboard, or split edit/admin controls from recommendation review.
   - Recommendation: keep the current layout for now, but tighten hierarchy before adding more controls.
   - Reason: the current product is still usable, but it is near the edge of feeling heavier than the planning problem itself.
