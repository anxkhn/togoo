import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "accent";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-surface-alt text-muted border border-border",
    success: "bg-accent-subtle text-accent border border-accent-light",
    warning: "bg-warning-light text-warning border border-warning/20",
    danger: "bg-danger-light text-danger border border-danger/20",
    accent: "bg-accent text-white",
  };

  return <span className={cn("badge", variants[variant], className)}>{children}</span>;
}
