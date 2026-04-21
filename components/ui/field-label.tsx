import { cn } from "@/lib/utils";

function InfoTooltip({ text }: { text: string }) {
  return (
    <span className="group/tooltip relative inline-flex items-center">
      <button
        type="button"
        className="inline-flex h-5 w-5 items-center justify-center rounded-full text-muted transition-[color,background-color] duration-150 ease hover:bg-surface-alt hover:text-text focus-visible:bg-surface-alt focus-visible:text-text"
        aria-label={text}
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8h.01M11 12h1v4h1m-1 6a9 9 0 110-18 9 9 0 010 18z" />
        </svg>
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute left-0 top-full z-30 mt-2 w-64 rounded-xl bg-text px-3 py-2 text-xs leading-relaxed text-white opacity-0 shadow-[0_14px_34px_rgba(26,23,20,0.18)] transition-[opacity,transform] duration-160 [transition-timing-function:cubic-bezier(0.165,0.84,0.44,1)] group-hover/tooltip:translate-y-0 group-hover/tooltip:opacity-100 group-focus-within/tooltip:translate-y-0 group-focus-within/tooltip:opacity-100 translate-y-1"
      >
        {text}
      </span>
    </span>
  );
}

export function FieldLabel({
  htmlFor,
  label,
  tooltip,
  className,
}: {
  htmlFor?: string;
  label: string;
  tooltip?: string;
  className?: string;
}) {
  return (
    <div className={cn("label flex items-center gap-1.5", className)}>
      <label htmlFor={htmlFor}>{label}</label>
      {tooltip ? <InfoTooltip text={tooltip} /> : null}
    </div>
  );
}

export { InfoTooltip };
