import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "accent";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-surface-alt text-muted",
    success: "bg-accent-subtle text-accent shadow-[inset_0_0_0_1px_rgba(47,104,68,0.14)]",
    warning: "bg-warning-light text-warning shadow-[inset_0_0_0_1px_rgba(180,83,9,0.12)]",
    danger: "bg-danger-light text-danger shadow-[inset_0_0_0_1px_rgba(185,28,28,0.12)]",
    accent: "bg-accent text-white",
  };

  return <span className={cn("badge", variants[variant], className)}>{children}</span>;
}
