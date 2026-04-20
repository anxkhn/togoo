import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-5">
      <div className="text-center">
        <p className="font-display text-8xl font-bold text-border mb-4">404</p>
        <h1 className="font-display text-2xl font-semibold text-text mb-2">Page not found</h1>
        <p className="text-muted mb-6">That page does not exist or has moved.</p>
        <Link href="/" className="btn-primary">
          Back home
        </Link>
      </div>
    </div>
  );
}
