import type { ReactNode } from "react";

export function PlaceholderBox({
  icon,
  label,
  className = "",
}: {
  icon: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div className={`ph ${className}`}>
      {icon}
      {label}
    </div>
  );
}
