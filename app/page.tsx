import Link from "next/link";
import { MyEvents } from "@/components/my-events";
import { LandingFlowPreview } from "@/components/landing-flow-preview";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <span className="font-display text-xl font-semibold text-text">Togoo</span>
          <nav className="flex items-center gap-4">
            <Link href="/faq" className="inline-flex min-h-10 items-center px-2 text-sm text-muted transition-[color] duration-150 hover:text-text">FAQ</Link>
            <a href="https://github.com/anxkhn/togoo" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center px-2 text-sm text-muted transition-[color] duration-150 hover:text-text">GitHub</a>
            <Link href="/events/new" className="btn-primary text-sm">Create a plan</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="max-w-5xl mx-auto px-5 pt-24 pb-20 text-center">
          <div className="mb-8 inline-flex min-h-10 items-center gap-2 rounded-full bg-accent-subtle px-4 py-2 shadow-[inset_0_0_0_1px_rgba(47,104,68,0.14)] animate-fade-in">
            <div className="w-1.5 h-1.5 bg-accent rounded-full" />
            <span className="text-xs font-medium text-accent">Stop planning in the group chat</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-text mb-6 leading-[1.05] animate-slide-up">
            Get your group to a plan<br />
            <span className="text-accent">without chasing replies</span>
          </h1>

          <p className="text-lg text-muted max-w-xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Send one link, collect when people are free and what they prefer, and let Togoo
            surface the best time to meet.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-slide-up" style={{ animationDelay: "0.15s" }}>
            <Link href="/events/new" className="btn-primary text-base px-8 py-3 w-full sm:w-auto">
              Create a plan
            </Link>
            <a href="#how-it-works" className="btn-secondary text-base px-8 py-3 w-full sm:w-auto">
              See how it works
            </a>
          </div>

          <LandingFlowPreview />
        </section>

        <MyEvents />

        <section id="how-it-works" className="max-w-5xl mx-auto px-5 py-20">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl font-semibold text-text mb-3">How Togoo gets you to yes</h2>
            <p className="text-muted">Set the plan once, collect replies fast, and pick the best option with confidence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Set the boundaries",
                desc: "Choose the date range, meeting length, and hours that make sense for this plan.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Share one link",
                desc: "Invite everyone once. They reply with broad availability and any extra context you want to collect.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Pick the best time",
                desc: "See ranked suggestions based on overlap, priorities, and preference fit, then lock in the winner.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ),
              },
            ].map((item) => (
                <div key={item.step} className="card card-interactive p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent-subtle text-accent shadow-[inset_0_0_0_1px_rgba(47,104,68,0.14)]">
                      {item.icon}
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-medium text-accent tabular-nums">{item.step}</p>
                      <h3 className="font-display text-lg font-semibold text-text mb-2">{item.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-5 py-20">
          <div className="card p-10 text-center shadow-card-elevated">
            <h2 className="font-display text-4xl font-semibold text-text mb-3">Plan it once. Share it once.</h2>
            <p className="text-muted mb-8 max-w-md mx-auto">
              Set up your plan in a couple of minutes. Guests can reply without creating an account.
            </p>
            <Link href="/events/new" className="btn-primary text-base px-8 py-3">
              Create a free plan
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted space-y-2">
        <p>Togoo | group plans without the chasing</p>
        <div className="flex items-center justify-center gap-4 text-xs">
          <Link href="/faq" className="inline-flex min-h-10 items-center px-2 hover:text-accent transition-[color] duration-150">FAQ</Link>
          <a href="https://github.com/anxkhn/togoo" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center px-2 hover:text-accent transition-[color] duration-150">GitHub</a>
        </div>
      </footer>
    </div>
  );
}
