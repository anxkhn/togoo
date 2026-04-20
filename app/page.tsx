import Link from "next/link";
import { MyEvents } from "@/components/my-events";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <span className="font-display text-xl font-semibold text-text">Togoo</span>
          <nav className="flex items-center gap-4">
            <Link href="/faq" className="text-sm text-muted hover:text-text transition-colors">FAQ</Link>
            <a href="https://github.com/anxkhn/togoo" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-text transition-colors">GitHub</a>
            <Link href="/events/new" className="btn-primary text-sm">Plan a meetup</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="max-w-5xl mx-auto px-5 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-accent-subtle border border-accent-light rounded-full px-3.5 py-1.5 mb-8 animate-fade-in">
            <div className="w-1.5 h-1.5 bg-accent rounded-full" />
            <span className="text-xs font-medium text-accent">Simple group scheduling</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-text mb-6 leading-[1.05] animate-slide-up">
            Find the perfect time<br />
            <span className="text-accent">for everyone</span>
          </h1>

          <p className="text-lg text-muted max-w-xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Collect availability, gather preferences — food, location, budget — and get smart recommendations
            for when and where your group should meet.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-slide-up" style={{ animationDelay: "0.15s" }}>
            <Link href="/events/new" className="btn-primary text-base px-8 py-3 w-full sm:w-auto">
              Start planning
            </Link>
            <a href="#how-it-works" className="btn-secondary text-base px-8 py-3 w-full sm:w-auto">
              See how it works
            </a>
          </div>
        </section>

        <MyEvents />

        <section id="how-it-works" className="max-w-5xl mx-auto px-5 py-20">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl font-semibold text-text mb-3">How it works</h2>
            <p className="text-muted">Three steps, no accounts needed for participants.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Create your event",
                desc: "Set a date range, duration, and allowed hours. Add participants manually or share an invite link.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Collect responses",
                desc: "Each participant gets a unique link. They submit broad availability windows plus preferences for food, location, and budget.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Get smart picks",
                desc: "See ranked recommendations based on attendance, preferences, and your priorities. Finalize and share the result.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="card card-interactive p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent-subtle border border-accent-light rounded-lg flex items-center justify-center flex-shrink-0 text-accent">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-accent mb-1">{item.step}</p>
                    <h3 className="font-display text-lg font-semibold text-text mb-2">{item.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-5 py-20">
          <div className="bg-surface border border-border rounded-card p-10 text-center shadow-card">
            <h2 className="font-display text-4xl font-semibold text-text mb-3">Ready to plan?</h2>
            <p className="text-muted mb-8 max-w-md mx-auto">
              It takes under 2 minutes to set up. Participants don&apos;t need an account.
            </p>
            <Link href="/events/new" className="btn-primary text-base px-8 py-3">
              Create a free event
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted space-y-2">
        <p>Togoo — group scheduling made simple</p>
        <div className="flex items-center justify-center gap-4 text-xs">
          <Link href="/faq" className="hover:text-accent transition-colors">FAQ</Link>
          <a href="https://github.com/anxkhn/togoo" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">GitHub</a>
        </div>
      </footer>
    </div>
  );
}
