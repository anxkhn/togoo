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

### Design plan decisions

1. Organizer dashboard default section should be stage-aware.
   - If no non-organizer responses exist, default to `People` so the organizer can add and share invite links.
   - Once at least one response exists, default to `Best times` so the organizer lands on the decision view.
   - Once finalized, default to the confirmation/final-plan view instead of invite management.
   - Reason: the dashboard should follow the organizer's job at that moment: invite first, decide later, confirm last.
2. Recommendation failure states should preserve the last useful answer.
   - If a refresh fails after recommendations have loaded, keep the existing best-time cards visible.
   - Show a quiet retry notice above the cards instead of replacing the whole answer with a red error state.
   - If no recommendations have ever loaded, show a clear error card with a retry action.
   - Reason: organizers should not feel like their group schedule disappeared because one refresh failed.
3. Copy follow-up: replace the remaining `replying` empty-state copy in `app/e/[eventId]/organizer/[token]/page.tsx` with response-language wording.
4. Recent activity should communicate planning impact, not only audit history.
   - Keep the actor-specific labels such as `Ana updated their response`.
   - When a response update changes recommendation readiness or the top-ranked slot, show light impact copy near the activity item.
   - Examples: `Best time changed after this response` or `No change to the current top time`.
   - Reason: the organizer's emotional job is deciding with confidence, not reading a raw event log.
5. Scheduling overrides should move behind an advanced disclosure.
   - Keep overrides inside the `Best times` section because they modify the recommendation set.
   - Hide the controls by default behind copy like `Advanced scheduling controls`.
   - Show current active overrides as quiet status rows, but do not let the three override buttons compete with confirmation.
   - Reason: overrides are rare power-user machinery; the main surface should stay focused on choosing a time.
6. Final confirmation page status copy should be state-only.
   - Replace raw event-type labels such as `meetup | confirmed` with `Plan confirmed` or `Confirmed plan`.
   - Do not show raw `event_type` in public-facing confirmation headers.
   - Reason: the confirmation page should feel ceremonial and clear; internal categorization is visual noise.
7. Add-invitee form controls should use persistent visible labels.
   - Add visible labels for name, email, phone, priority, and must-attend controls.
   - Keep placeholders only as examples, not as the sole label.
   - Reason: labels should stay visible after typing so the form remains understandable on mobile and for assistive technology.
8. Organizer header actions should collapse on mobile.
   - On desktop, keep key actions visible when space allows.
   - On mobile, show one stage-relevant primary action and move secondary actions such as edit, live summary, and reopen into a compact menu or details panel.
   - Keep the plan status visible, but do not let status plus actions crowd the brand row.
   - Reason: the sticky header should orient the organizer, not become a control strip.

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

## Plan Design Review

### System audit

- `DESIGN.md` exists and is the source of truth for this review.
- No active plan file was provided, so this review uses the latest shipped diff (`c2cebed`) and this autoplan document as the plan record.
- UI scope exists: organizer dashboard, attendee response page, live summary, final confirmation, share copy, activity feed, and recommendation states.
- The gstack visual designer was not available in this environment, so no mockups were generated.

### What already exists

- Warm paper canvas, green action color, Fraunces headings, Plus Jakarta Sans body copy.
- Narrow invitee flows and wider organizer dashboard layout.
- Existing card, badge, pill, button, input, and heatmap patterns.
- Reduced-motion handling in `app/globals.css`.

### NOT in scope

- New brand direction: current `DESIGN.md` remains valid.
- Full dashboard split into separate routes: useful later, but current scope can stay single-page.
- New visual mockups: skipped because the gstack designer binary was unavailable.
- Travel-distance preferences: already removed from product scope.

### Interaction state table

| Feature | Loading | Empty | Error | Success | Partial |
| --- | --- | --- | --- | --- | --- |
| Best times | `Ranking the best times...` with subdued motion | `No responses yet` using response-language copy | Keep last loaded results when present, plus retry notice | Ranked cards with selected-time affordance | Show response-rate context and pending-response warning |
| People | Pending invite row while saving | Warm add-people prompt | Inline field errors and save failures | Invite rows with share/export controls | Mix saved invitees and pending invite rows |
| Recent activity | No separate loading state needed after page load | `New responses and changes will show up here` | Non-blocking, activity should not block planning | Actor-specific actions with timestamps | Add impact copy when activity changes best-time confidence |
| Final confirmation | Confirm button loading state | No selected time means no confirmation card | Inline finalization error | Confirmed plan card with final page share tools | Show confirmed state while still allowing reopen from organizer header |

### User journey storyboard

| Step | User does | User feels | Plan specifies |
| --- | --- | --- | --- |
| 1 | Creates plan and lands on organizer dashboard | Wants to invite people quickly | Stage-aware default starts on `People` before responses exist |
| 2 | Responses arrive | Wants to know the answer, not manage rows | Stage-aware default moves to `Best times` after at least one response |
| 3 | Refresh or recommendation compute fails | Worries data disappeared | Preserve last useful results and show retry notice |
| 4 | Someone updates availability | Wonders whether it changed the decision | Activity includes light impact language |
| 5 | Organizer chooses a time | Wants confidence before confirming | Overrides are advanced, confirmation remains the main action |
| 6 | Plan is finalized | Wants the group to see a clear answer | Final page uses state-only confirmation copy |

### Completion summary

| Review pass | Initial | Final | Notes |
| --- | ---: | ---: | --- |
| Information Architecture | 7/10 | 9/10 | Added stage-aware dashboard default. |
| Interaction States | 7/10 | 9/10 | Added cached recommendation failure behavior and state table. |
| User Journey | 7/10 | 9/10 | Added activity impact language. |
| AI Slop Risk | 7/10 | 9/10 | Moved overrides behind advanced disclosure in plan. |
| Design System Alignment | 8/10 | 9/10 | Removed raw event type from final confirmation plan. |
| Responsive & Accessibility | 6/10 | 9/10 | Added persistent invitee-form labels and mobile header collapse behavior. |
| Unresolved Decisions | 6/10 | 9/10 | Resolved mobile header action behavior. |

Overall design score: 7/10 -> 9/10.

TODOs.md updates: 0 proposed. The review found implementation requirements for the current plan, not deferred design debt.

Approved mockups: none generated because the design binary was unavailable.

### Unresolved decisions

- None. All surfaced decisions were answered and added to this plan.

## GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
| --- | --- | --- | ---: | --- | --- |
| CEO Review | `/plan-ceo-review` | Scope & strategy | 1 | concerns | Product coherent, prior timezone/deadline/finalization risks were identified. |
| Codex Review | `/codex review` | Independent 2nd opinion | 0 | not run | No codex review in this session. |
| Eng Review | `/plan-eng-review` | Architecture & tests (required) | 1 | concerns | Scheduling correctness risks were identified and later fixed in code. |
| Design Review | `/plan-design-review` | UI/UX gaps | 1 | clear | score: 7/10 -> 9/10, 8 decisions added. |
| DX Review | `/plan-devex-review` | Developer experience gaps | 1 | concerns | Docs drift and missing automated test harness were identified. |

- **UNRESOLVED:** 0 design decisions.
- **VERDICT:** Design review clear. Eng review should be considered stale after the latest fixes unless rerun.
