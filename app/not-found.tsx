import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-5">
      <div className="card max-w-md p-8 text-center shadow-card-elevated">
        <p className="font-display text-8xl font-bold text-border mb-4 tabular-nums">404</p>
        <h1 className="font-display text-2xl font-semibold text-text mb-2">Page not found</h1>
        <p className="text-muted mb-6">That page does not exist, or the link is no longer valid.</p>
        <Link href="/" className="btn-primary">
          Go home
        </Link>
      </div>
    </div>
  );
}
