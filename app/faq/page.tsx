import Link from "next/link";

interface FaqItem {
  q: string;
  a: string;
}

const FAQS = [
  {
    q: "Do participants need to create an account?",
    a: "No. Each participant gets a unique invite link. They click it, submit their availability and preferences, and they're done.",
  },
  {
    q: "How do invite links work?",
    a: "When you add a participant, a unique 32-character token link is generated for them at /r/<token>. Only someone with that link can submit a response.",
  },
  {
    q: "Can participants update their response after submitting?",
    a: "Yes, if the organizer enables it when creating the event. They can reopen their link at any time and resubmit.",
  },
  {
    q: "What is the organizer dashboard?",
    a: "After creating an event, you get a private dashboard link. It shows who has responded, recommended time slots, and an availability heatmap. Bookmark it — it's the only way to manage your event.",
  },
  {
    q: "How are time slot recommendations calculated?",
    a: "The app finds overlapping availability windows and scores each candidate slot based on attendance count, required attendees, and participant preferences. The scoring strategy is configurable per event.",
  },
  {
    q: "What does slot granularity mean?",
    a: "It controls how frequently candidate slots are generated. 30-minute granularity means slots are considered at 9:00, 9:30, 10:00, etc. 15 minutes gives finer resolution.",
  },
  {
    q: "What preference data is collected from participants?",
    a: "The organizer chooses which fields to show. Options include food preference, budget, preferred area, time of day, and indoor/outdoor. All fields are optional.",
  },
  {
    q: "Is my data private?",
    a: "Events are not publicly listed. Only people with the organizer link or a participant invite link can access an event. Tokens are cryptographically secure (32 random bytes).",
  },
  {
    q: "What happens when an event is finalized?",
    a: "The organizer selects a recommended slot and confirms it. The event status changes to finalized. You can reopen it if you need to reconsider.",
  },
  {
    q: "Is Togoo open source?",
    a: "Yes. The source code is available at github.com/anxkhn/togoo.",
  },
] satisfies FaqItem[];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-semibold text-text">Togoo</Link>
          <Link href="/events/new" className="btn-primary text-sm">Plan a meetup</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 py-16">
        <h1 className="font-display text-4xl font-bold text-text mb-2 animate-slide-up">FAQ</h1>
        <p className="text-muted mb-12 animate-slide-up" style={{ animationDelay: "0.05s" }}>
          Answers to common questions about Togoo.
        </p>

        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          {FAQS.map((item) => (
            <div key={item.q} className="card p-6">
              <h2 className="font-display text-base font-semibold text-text mb-2">{item.q}</h2>
              <p className="text-sm text-muted leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-xs text-muted space-y-2">
        <p>Togoo — group scheduling made simple</p>
        <a
          href="https://github.com/anxkhn/togoo"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-[color] duration-150 ease inline-block"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}
