const PANELS = [
  {
    step: "01",
    label: "Organizer setup",
    title: "Set the plan once",
    copy: "Set the date window, choose the questions that matter, and send one invite link.",
    glow: "bg-[#DDEDE4]",
    content: (
      <div className="space-y-3">
        <div className="rounded-card bg-surface p-4 shadow-[inset_0_0_0_1px_rgba(26,23,20,0.08)]">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted">Plan title</p>
              <p className="font-medium text-text">Friday dinner</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted tabular-nums">
            <div className="rounded-xl bg-surface-alt px-3 py-2 shadow-[inset_0_0_0_1px_rgba(26,23,20,0.06)]">May 18 to May 24</div>
            <div className="rounded-xl bg-surface-alt px-3 py-2 shadow-[inset_0_0_0_1px_rgba(26,23,20,0.06)]">6 PM to 10 PM</div>
          </div>
        </div>

        <div className="rounded-card bg-surface p-4 shadow-[inset_0_0_0_1px_rgba(26,23,20,0.08)]">
          <p className="mb-2 text-xs font-medium text-muted">Collect these preferences</p>
          <div className="flex flex-wrap gap-2 text-[11px] font-medium">
            {[
              "Food",
              "Budget",
              "Area",
              "Day",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full bg-accent-subtle px-3 py-1.5 text-accent shadow-[inset_0_0_0_1px_rgba(47,104,68,0.14)]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    step: "02",
    label: "Guest response",
    title: "Respond in a minute",
    copy: "Invitees open the link, tap the times that work, and add only the context you asked for.",
    glow: "bg-[#F1E8DA]",
    content: (
      <div className="space-y-3">
        <div className="rounded-card bg-surface p-4 shadow-[inset_0_0_0_1px_rgba(26,23,20,0.08)]">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted">Alex is responding</p>
              <p className="font-medium text-text">Friday dinner</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { day: "Tue", times: ["6:00 PM - 7:00 PM"] },
              { day: "Wed", times: ["5:00 PM - 6:00 PM", "7:00 PM - 8:00 PM"] },
              { day: "Thu", times: ["8:00 PM - 9:00 PM"] },
            ].map((row) => (
              <div key={row.day} className="flex items-center gap-2">
                <div className="w-10 text-muted tabular-nums">{row.day}</div>
                <div className="flex flex-wrap gap-2">
                  {row.times.map((slot) => (
                    <span
                      key={slot}
                      className="rounded-full bg-accent-subtle px-3 py-1.5 font-medium text-accent shadow-[inset_0_0_0_1px_rgba(47,104,68,0.14)]"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-card bg-surface p-4 shadow-[inset_0_0_0_1px_rgba(26,23,20,0.08)]">
          <p className="mb-2 text-xs font-medium text-muted">Extra context</p>
          <div className="space-y-2 text-xs text-text">
            <div className="rounded-xl bg-surface-alt px-3 py-2 shadow-[inset_0_0_0_1px_rgba(26,23,20,0.06)]">Prefers somewhere near downtown</div>
            <div className="rounded-xl bg-surface-alt px-3 py-2 shadow-[inset_0_0_0_1px_rgba(26,23,20,0.06)]">Vegetarian friendly helps</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    step: "03",
    label: "Decision view",
    title: "See the best option fast",
    copy: "The organizer sees overlap, ranked options, and a confirmed invite that is ready to send back to the group.",
    glow: "bg-[#E6EFE8]",
    content: (
      <div className="space-y-3">
        <div className="rounded-card bg-surface p-4 shadow-[inset_0_0_0_1px_rgba(26,23,20,0.08)]">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted">Top options</p>
              <p className="font-medium text-text">Ranked by overlap and fit</p>
            </div>
            <span className="text-xs text-muted tabular-nums">5 responses</span>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { time: "Wed 7:00 PM", meta: "5 of 5 can make it", top: true },
              { time: "Thu 6:30 PM", meta: "4 of 5 can make it", top: false },
              { time: "Tue 7:30 PM", meta: "4 of 5 can make it", top: false },
            ].map((item) => (
              <div
                key={item.time}
                className={`flex items-center justify-between rounded-xl px-3 py-2 shadow-[inset_0_0_0_1px_rgba(26,23,20,0.06)] ${
                  item.top ? "bg-accent-subtle" : "bg-surface-alt"
                }`}
              >
                <div>
                  <p className="font-medium text-text tabular-nums">{item.time}</p>
                  <p className="text-muted">{item.meta}</p>
                </div>
                {item.top && (
                  <span className="rounded-full bg-surface px-2.5 py-1 font-medium text-accent shadow-[inset_0_0_0_1px_rgba(47,104,68,0.14)]">
                    best
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-card bg-surface p-4 shadow-[inset_0_0_0_1px_rgba(26,23,20,0.08)]">
          <p className="mb-2 text-xs font-medium text-muted">Confirmed invite</p>
          <div className="rounded-card bg-accent-subtle px-4 py-4 text-center shadow-[inset_0_0_0_1px_rgba(47,104,68,0.14)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">confirmed</p>
            <p className="mt-1 font-display text-xl font-semibold text-text tabular-nums">Wednesday 7:00 PM</p>
            <p className="mt-1 text-xs text-muted">Ready to send back to everyone</p>
          </div>
        </div>
      </div>
    ),
  },
] as const;

export function LandingFlowPreview() {
  return (
    <div className="mx-auto mt-16 w-full max-w-6xl animate-slide-up text-left" style={{ animationDelay: "0.2s" }}>
      <div className="card overflow-hidden p-5 sm:p-6">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">Product Preview</p>
            <h2 className="font-display text-3xl font-semibold text-text sm:text-4xl">
              The full flow, from idea to confirmed plan.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              A quick look at what the organizer sets up, what invitees actually see, and how the decision comes together.
            </p>
          </div>

        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {PANELS.map((panel) => (
            <section key={panel.step} className="card relative overflow-hidden p-5">
              <div className={`absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-70 blur-2xl ${panel.glow}`} />
              <div className="relative">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted tabular-nums">
                      {panel.step} {panel.label}
                    </p>
                    <h3 className="font-display text-2xl font-semibold text-text">{panel.title}</h3>
                  </div>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-muted">{panel.copy}</p>
                {panel.content}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
