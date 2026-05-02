import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
  maxWidth?: "xl" | "2xl" | "3xl" | "5xl";
  children?: ReactNode;
  logoAsLink?: boolean;
}

const maxWidthClass = {
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "5xl": "max-w-5xl",
};

export function AppHeader({ maxWidth = "5xl", children, logoAsLink = true }: AppHeaderProps) {
  const logoClass = "font-display text-xl font-semibold text-text flex-shrink-0";
  const logo = logoAsLink ? (
    <Link href="/" className={logoClass}>
      Togoo
    </Link>
  ) : (
    <span className={logoClass}>Togoo</span>
  );

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-surface/80 backdrop-blur-sm">
      <div className={cn("mx-auto flex h-14 items-center justify-between gap-4 px-5", maxWidthClass[maxWidth])}>
        {logo}
        {children ? <div className="flex min-w-0 items-center justify-end gap-3 overflow-x-auto whitespace-nowrap">{children}</div> : null}
      </div>
    </header>
  );
}
