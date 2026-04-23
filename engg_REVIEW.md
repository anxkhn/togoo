# Engineering Review

## Scope

- Skill intent: `/plan-eng-review`
- Date: 2026-04-24
- Branch: `master`
- Commit reviewed: `c2cebed`
- Plan sources: `AUTOPLAN_REVIEW.md`, `DEVEX_REVIEW.md`, current repository source
- Output file: `engg_REVIEW.md`

This review covers the shipped Togoo scheduling fixes and the remaining implementation plan from the review artifacts. The code changes are already committed and deployed. The main question now is whether the current plan is safe to continue from and what engineering gaps should be closed before the next ship.

Status: DONE_WITH_CONCERNS

## Step 0: Scope Challenge

### What already solves the sub-problems

- Recommendation computation exists in `lib/scheduling.ts` and is used by the API routes.
- Batched normalized-slot writes now exist in `lib/normalized-slots.ts`.
- Organizer, attendee, summary, and final routes already exist.
- D1 migration commands already exist in `package.json`.
- CSV export already exists at `app/api/events/[eventId]/participants/export/route.ts` and `app/api/p/[eventId]/participants/export/route.ts`.
- Timezone helpers already exist in `lib/utils.ts`.
- Product, technical, deploy, design, and DX docs already exist.

No parallel scheduling system should be built. The right move is to add tests and smoke checks around the existing codepath.

### Minimum changes that achieve the goal

The minimum complete plan is:

1. Add a test harness.
2. Add regression tests for scheduling, timezone conversion, batched normalized-slot inserts, and finalization validation.
3. Add `npm run check`.
4. Add `npm run smoke:local` for the create/respond/recommend/finalize loop.
5. Fix the remaining response-language UI copy and final confirmation copy.

Everything else is deferrable.

### Complexity check

The remaining plan can be done without a broad rewrite.

Expected file touch count for a complete next pass:

- `package.json`
- test config file
- `tests/**` or `test/**`
- `scripts/smoke-local.*`
- `app/e/[eventId]/summary/[token]/page.tsx`
- `app/e/[eventId]/organizer/[token]/page.tsx`
- `components/landing-flow-preview.tsx`
- `app/e/[eventId]/final/page.tsx`
- README or DX docs

That is near the 8-file smell threshold, but it is not overbuilt because the work splits cleanly into test infrastructure, smoke workflow, small UI copy fixes, and docs.

Recommendation: keep the scope, but do not add new services beyond the smoke script. This is engineered enough: explicit, testable, boring.

### Search check

Search was not needed for the current code review because the plan does not introduce a new architectural pattern or infrastructure component. If adding a test runner, use a boring Node/TypeScript test tool already common in the ecosystem. Recommendation: Vitest for TypeScript ergonomics, or Node's built-in test runner if dependency count matters more.

Layer call: [Layer 1] use a standard test runner and npm scripts, not a custom framework.

### TODOS cross-reference

No `TODOS.md` exists. The review artifacts already identify TODO-worthy items. If a `TODOS.md` is created, it should capture the smoke test, regression suite, rollback docs, and product-level deploy smoke checks.

### Completeness check

The current plan is not complete yet because it has review artifacts but no automated tests. With AI-assisted coding, the complete version is cheap enough to do now. Typecheck is not a substitute for behavior tests when the bugs are date math, D1 limits, and recommendation ranking.

Recommendation: boil this lake. Add real tests and a local smoke test before another meaningful scheduling change.

### Distribution check

No new artifact type is introduced. Distribution remains Cloudflare Workers via `vinext deploy`.

## Architecture Review

### Findings

1. `[P1] (confidence: 9/10) package.json:5 — no automated test surface exists for the scheduling core.`

   The architecture is now depending on manual production debugging for the hardest part of the product. The recent D1 insert-size failure and timezone snap bug are exactly the kind of bugs a regression suite should catch.

   Recommendation: add tests before adding more scheduling features.

2. `[P1] (confidence: 8/10) DEVEX_REVIEW.md:49 — the planned smoke command is correct but not implemented.`

   The product's critical path crosses app routes, D1 writes, recommendation computation, and finalization. Without a smoke command, deploy verification proves pages load, not that group scheduling works.

   Recommendation: implement `npm run smoke:local` as the next engineering unit.

3. `[P2] (confidence: 8/10) app/e/[eventId]/organizer/[token]/page.tsx:1043 — event type remains editable in the organizer dashboard, but public headers should not expose raw event types.`

   Keeping `event_type` as internal metadata is fine. Exposing it as ceremony copy is not. The final page still does that.

   Recommendation: leave the internal field alone, but clean public-facing display copy.

### Architecture diagram

```text
Organizer create/edit
        |
        v
events + availability_windows + participant_preferences
        |
        v
respond route -----> normalized_slots (batched)
        |                    |
        v                    v
raw availability ----> recommendations route
        |                    |
        v                    v
candidate slots ----> finalization validation
        |
        v
final plan page + live summary
```

The architecture should keep this single path. Do not create a second recommendation or smoke-only logic path.

## Code Quality Review

### Findings

1. `[P2] (confidence: 9/10) app/e/[eventId]/summary/[token]/page.tsx:197 — remaining user-facing copy says people start "replying".`

   This violates the product wording decision to use response/responded language. Small bug. Easy fix.

2. `[P2] (confidence: 9/10) app/e/[eventId]/organizer/[token]/page.tsx:1139 and app/e/[eventId]/organizer/[token]/page.tsx:1410 — remaining organizer copy says "replying".`

   Same wording drift. This matters because the app has already standardized around response language.

3. `[P2] (confidence: 9/10) components/landing-flow-preview.tsx:55 — landing preview still says "Alex is replying".`

   This is not a correctness bug, but it keeps the old vocabulary alive in a prominent product preview.

4. `[P2] (confidence: 9/10) app/e/[eventId]/final/page.tsx:95 — final page renders raw `{event.event_type} | confirmed`.`

   The design review already called this out. Public confirmation should say `Plan confirmed`. Raw category labels are internal machinery leaking into the user moment.

5. `[P2] (confidence: 8/10) app/e/[eventId]/organizer/[token]/page.tsx — organizer dashboard is absorbing too many jobs in one component.`

   The file owns editing, recommendations, people, export, activity, sharing, overrides, and finalization. It is still workable, but it is becoming the project's gravity well.

   Recommendation: do not rewrite it now. Add tests first. Extract only when adding the next major dashboard behavior.

## Test Review

### Test framework detection

- Runtime: Node, from `package.json`.
- Existing test files: none found.
- Existing `test` script: none.
- Existing E2E config: none found.

Recommendation: add Vitest for unit/regression tests and keep E2E/smoke separate through a script. This keeps pure scheduling tests fast and local, while the smoke script verifies the real app path.

### Coverage diagram

```text
CODE PATHS                                                   USER FLOWS
[+] lib/utils.ts timezone helpers                            [+] Create plan in non-local timezone
  ├── [GAP] zoned datetime -> unix conversion                   ├── [GAP] [->UNIT] IST 2:00 PM stays 2:00 PM
  ├── [GAP] end-of-day deadline conversion                      └── [GAP] [->UNIT] deadline before event start allowed
  └── [GAP] timezone snap preserves submitted starts

[+] lib/scheduling.ts recommendations                         [+] Invitee responds
  ├── [GAP] happy path ranks overlap                            ├── [GAP] [->SMOKE] response saved
  ├── [GAP] one-person candidate still appears                  ├── [GAP] [->SMOKE] recommendations returned
  ├── [GAP] unavailable/empty windows handled                   └── [GAP] [->SMOKE] final slot accepted
  └── [GAP] legacy :30 starts remain rankable

[+] lib/normalized-slots.ts batched insert                    [+] Production-sized response
  ├── [GAP] batches under D1 parameter/query limits              ├── [GAP] [->UNIT] many slots split into chunks
  └── [GAP] empty input is safe no-op                            └── [GAP] [->SMOKE] no 500 on recommendations

[+] app/api/events/[eventId]/finalize/route.ts                [+] Organizer finalizes
  ├── [GAP] valid candidate accepted                             ├── [GAP] [->SMOKE] valid final plan succeeds
  ├── [GAP] impossible client slot rejected                      └── [GAP] [->UNIT] out-of-range slot rejected
  └── [GAP] token/auth failure rejected

[+] UI copy cleanup                                            [+] Public confirmation
  ├── [GAP] response wording remains consistent                  ├── [GAP] final page says Plan confirmed
  └── [GAP] no raw event_type in public final header             └── [GAP] no reply/replying copy in user-facing surfaces

COVERAGE: 0/22 paths tested (0%) | Code paths: 0/16 (0%) | User flows: 0/6 (0%)
QUALITY: none | GAPS: 22 (4 smoke/E2E-worthy, 18 unit/regression)
```

Legend: `[->UNIT]` means pure regression test. `[->SMOKE]` means real local app/database path.

### Required tests to add to the plan

1. `tests/utils-timezone.test.ts`
   - Assert selected timezone conversion does not shift IST slots by 30 minutes.
   - Assert response deadlines before event start are valid when before the response deadline.

2. `tests/scheduling.test.ts`
   - Assert overlapping availability ranks the shared slot first.
   - Assert single-person candidates still appear.
   - Assert legacy `:30` starts remain rankable.
   - Assert empty availability returns safe empty recommendations.

3. `tests/normalized-slots.test.ts`
   - Assert large slot arrays are split into multiple insert batches.
   - Assert empty slot arrays do nothing.

4. `tests/finalize.test.ts`
   - Assert a valid recommendation candidate can be finalized.
   - Assert an out-of-range or impossible client slot is rejected.
   - Assert missing or bad organizer token fails.

5. `scripts/smoke-local.ts` or `scripts/smoke-local.mjs`
   - Create plan.
   - Add participant or use invite path.
   - Submit response.
   - Compute recommendations.
   - Finalize one valid slot.
   - Print organizer, response, summary, and final URLs.

### Regression rule

The following are mandatory regression tests because the project already hit these failures:

- D1 normalized-slot insert limit failure.
- IST 2:00 PM becoming 2:30 PM.
- Recommendation 500 after submitted availability.
- Finalization accepting client-supplied impossible slots.

No ask needed. These are not taste calls. They are real bugs that should never come back.

## Performance Review

### Findings

1. `[P2] (confidence: 8/10) npm run build output — client chunk size exceeds 500 kB after minification.`

   This is not blocking today. It is a warning that the organizer dashboard is growing into a large client surface.

   Recommendation: watch it, but do not split code until a real route or interaction slows down. Premature splitting here would add complexity before data.

2. `[P2] (confidence: 8/10) lib/normalized-slots.ts — batched writes fixed one D1 limit, but there is no regression guard.`

   The performance fix is structurally right. Without a test, someone can accidentally return to one giant insert later.

   Recommendation: test batch sizing directly.

3. `[P3] (confidence: 6/10) recommendations recompute from raw availability may grow expensive with large events.`

   Medium confidence, verify this is actually an issue. For small social plans this is fine. If Togoo starts handling large groups, recommendation recompute needs size limits or caching.

   Recommendation: defer until real usage shows large events.

## Failure Modes

| Codepath | Realistic production failure | Test exists | Error handling exists | User impact | Critical gap |
| --- | --- | --- | --- | --- | --- |
| Timezone conversion | Slot shifts by 30-60 minutes | No | Partial validation only | Users show up at wrong time | Yes |
| Normalized-slot insert | D1 rejects oversized insert | No | Generic 500 | Organizer sees no recommendations | Yes |
| Recommendations | Raw availability edge case returns no candidates | No | Error state exists in UI | Organizer cannot decide | No |
| Finalization | Client posts impossible slot | No | Now validation exists, needs tests | Group gets impossible final plan | Yes |
| Smoke path | Deploy loads pages but scheduling is broken | No | Manual only | Broken product ships | Yes |
| Public final copy | Raw `event_type` appears | No | Not applicable | Confirmation feels unfinished | No |

Critical gaps flagged: 4.

## NOT In Scope

- Full organizer dashboard rewrite: not needed before tests exist.
- New public API or SDK: Togoo is not a developer platform right now.
- New deployment system: Cloudflare Workers via `vinext deploy` works.
- Heavy E2E browser suite: useful later, but local smoke plus unit tests gives the best immediate confidence.
- Caching recommendation results: defer until real large-event performance data exists.

## What Already Exists

- `README.md` and `DEPLOY.md` cover basic local and deployment flow.
- `TRD.md` documents routes, schema, access model, and recommendation logic.
- `DEVEX_REVIEW.md` identifies the missing `test`, `check`, and `smoke:local` scripts.
- `AUTOPLAN_REVIEW.md` captures CEO, design, engineering, and DX review history.
- `package.json` already has `typecheck`, `build`, `deploy`, migration, and seed scripts.
- `lib/normalized-slots.ts` already provides the batch helper needed by the bug fix.

The plan should reuse all of this. Rebuild nothing.

## TODO Candidates

These are the TODOs worth adding if a `TODOS.md` file is introduced.

### TODO 1: Add automated scheduling regression tests

- What: Add unit tests for timezone conversion, recommendation ranking, normalized-slot batching, and finalization validation.
- Why: These are the bugs that already hit production or almost shipped.
- Pros: Prevents the exact failures that break trust in scheduling.
- Cons: Adds test runner dependency and fixtures.
- Context: `package.json` has no `test` script and no test files exist.
- Depends on: choosing test runner.

Recommendation: build now rather than defer.

### TODO 2: Add `npm run smoke:local`

- What: Add a local smoke command that exercises create, respond, recommend, and finalize.
- Why: Page-load deploy checks do not prove Togoo works.
- Pros: One command gives confidence before deploy.
- Cons: Needs local D1/server assumptions documented.
- Context: `DEVEX_REVIEW.md` defines the exact magical moment.
- Depends on: stable local setup and seed/test data strategy.

Recommendation: build now after unit tests.

### TODO 3: Add rollback and product-level deploy checks

- What: Extend `DEPLOY.md` with rollback guidance and scheduling-path verification.
- Why: Current deploy checks prove shell routes load, not that scheduling works.
- Pros: Safer releases.
- Cons: Needs maintenance as routes change.
- Context: DX review found deploy docs are useful but thin.
- Depends on: smoke command design.

Recommendation: add after smoke command.

## Diagrams To Add In Code

- `lib/scheduling.ts`: add a short ASCII pipeline for raw availability -> candidate slots -> ranked recommendations.
- `lib/normalized-slots.ts`: add a short batching diagram if the helper becomes less obvious.
- `tests/scheduling.test.ts`: include a fixture diagram for overlapping participant windows.

Do not add diagrams to simple UI copy files. That is noise.

## Worktree Parallelization Strategy

The remaining work can be split, but only after test-runner choice is made.

| Step | Modules touched | Depends on |
| --- | --- | --- |
| Test harness + unit regressions | `package.json`, `tests/`, `lib/` | none |
| Local smoke command | `scripts/`, `package.json`, `README.md` | test harness decision |
| UI copy cleanup | `app/`, `components/` | none |
| Deploy docs update | `DEPLOY.md`, `README.md` | smoke command |

Parallel lanes:

- Lane A: test harness + unit regressions -> local smoke command -> deploy docs update.
- Lane B: UI copy cleanup.

Execution order:

- Launch Lane A and Lane B in parallel if using separate worktrees.
- Merge UI copy cleanup first because it is small.
- Merge test harness second.
- Add smoke/deploy docs last.

Conflict flags:

- Lane A and Lane B both may touch `package.json` only if UI cleanup adds no scripts, so avoid package changes in Lane B.
- Smoke command and deploy docs should stay in the same lane because the docs should match the command exactly.

## Opinionated Recommendations

1. Build the test harness next.
   - This is the highest-leverage engineering fix.
   - It matches the user's preference for well-tested code and more edge cases.

2. Use Vitest unless dependency minimalism is more important than TypeScript ergonomics.
   - Vitest is boring enough and fast.
   - Node test runner is leaner but usually rougher for TypeScript projects.

3. Fix the remaining copy drift in the same PR as tests only if it stays tiny.
   - Four string changes are fine.
   - Do not let UI polish delay regression tests.

4. Do not split the organizer dashboard yet.
   - The file is large, but not broken enough to justify structural churn before tests.
   - Make the change easy first. Tests are that change.

5. Keep deploy path boring.
   - `npm run deploy` works.
   - Add `npm run check` before deploy, not a new deploy system.

## Completion Summary

- Step 0: Scope Challenge — scope accepted as-is with strict focus on tests/smoke/copy cleanup.
- Architecture Review: 3 issues found.
- Code Quality Review: 5 issues found.
- Test Review: diagram produced, 22 gaps identified.
- Performance Review: 3 issues found.
- NOT in scope: written.
- What already exists: written.
- TODOS.md updates: 3 items proposed.
- Failure modes: 4 critical gaps flagged.
- Outside voice: skipped.
- Parallelization: 2 lanes, 2 parallel starts / 1 sequential dependency chain.
- Lake Score: 5/5 recommendations choose the complete option.

## Review Log Summary

Recommended log payload:

```json
{
  "skill": "plan-eng-review",
  "status": "issues_open",
  "unresolved": 1,
  "critical_gaps": 4,
  "issues_found": 33,
  "mode": "FULL_REVIEW",
  "commit": "c2cebed"
}
```

## Unresolved Decisions That May Bite Later

1. Test runner choice: Vitest vs Node built-in test runner.
2. Production smoke strategy: manual checklist first vs automated production-safe smoke data.

## Final Verdict

DONE_WITH_CONCERNS

The app fix was real and the deployment succeeded. The engineering system around it is still underbuilt. The next serious move is not another UI tweak or dashboard refactor. It is tests.

Build the regression suite, then build `npm run smoke:local`.
