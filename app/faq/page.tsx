import Link from "next/link";

interface FaqItem {
  q: string;
  a: string;
}

const FAQS = [
  {
    q: "Do people need an account to reply?",
    a: "No. Everyone gets a private link and can respond right away without signing up.",
  },
  {
    q: "What do invitees actually fill out?",
    a: "They share when they could make it and, if you want, details like food, budget, area, and indoor or outdoor preferences.",
  },
  {
    q: "Can someone change their response later?",
    a: "Yes, as long as you allow edits when you create the event. They can reopen their link and update their availability.",
  },
  {
    q: "What does the organizer see?",
    a: "You get a private dashboard with reply status, ranked time suggestions, participant details, and an availability heatmap so you can make a decision quickly.",
  },
  {
    q: "How does Togoo decide which times to recommend?",
    a: "It compares overlap across everyone's availability, then ranks options based on attendance, must-have attendees, and the preferences you choose to collect.",
  },
  {
    q: "Can I choose which preferences to ask about?",
    a: "Yes. Turn on only the fields that matter for that plan, like food, budget, location, weekday versus weekend, time of day, or indoor versus outdoor.",
  },
  {
    q: "Is this private?",
    a: "Yes. Events are not publicly listed. Only people with the organizer link or an invite link can open the event. Invite links can also expire if you set a deadline.",
  },
  {
    q: "Can invitees see the live summary?",
    a: "Only if you turn that on. When enabled, invitees can open a token-gated live summary from their own invite link.",
  },
  {
    q: "What happens after I confirm a time?",
    a: "Togoo locks in the selected slot and creates a shareable final page you can send back to the group.",
  },
  {
    q: "Can I send invites over WhatsApp or email?",
    a: "Yes. Each participant row includes quick share actions for copy, WhatsApp, email, and QR.",
  },
  {
    q: "Is Togoo open source?",
    a: "Yes. You can browse the code on GitHub.",
  },
] satisfies FaqItem[];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-semibold text-text">Togoo</Link>
          <Link href="/events/new" className="btn-primary text-sm">Plan my meetup</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 py-16">
        <h1 className="font-display text-4xl font-bold text-text mb-2 animate-slide-up">FAQ</h1>
        <p className="text-muted mb-12 animate-slide-up" style={{ animationDelay: "0.05s" }}>
          Everything people usually ask before they trust a group planning tool.
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
        <p>Togoo | group plans without the back-and-forth</p>
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
