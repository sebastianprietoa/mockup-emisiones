import { statusTone, trendTone } from "../../config/theme";

type StatusBadgeProps = {
  tone: keyof typeof statusTone | keyof typeof trendTone;
  variant?: "status" | "trend";
};

export function StatusBadge({ tone, variant = "status" }: StatusBadgeProps) {
  const currentTone = variant === "status" ? statusTone[tone as keyof typeof statusTone] : trendTone[tone as keyof typeof trendTone];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${currentTone.classes}`}
    >
      {currentTone.label}
    </span>
  );
}

