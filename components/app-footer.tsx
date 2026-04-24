import Link from "next/link";
import { cn } from "@/lib/utils";

interface AppFooterProps {
  maxWidth?: "xl" | "2xl" | "3xl" | "5xl";
}

const maxWidthClass = {
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "5xl": "max-w-5xl",
};

export function AppFooter({ maxWidth = "5xl" }: AppFooterProps) {
  return (
    <footer className="border-t border-border py-6 text-[11px] text-muted">
      <div className={cn("mx-auto flex items-center justify-center gap-3 overflow-x-auto whitespace-nowrap px-5 text-center", maxWidthClass[maxWidth])}>
        <span>&copy; 2026</span>
        <span>v0.5.1</span>
        <Link href="/faq" className="link-accent px-1">
          FAQ
        </Link>
        <a href="https://github.com/anxkhn/togoo" target="_blank" rel="noopener noreferrer" className="link-accent px-1">
          GitHub
        </a>
      </div>
    </footer>
  );
}
