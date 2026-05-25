"use client";

import { badgeTokens } from "../tokens/badge";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error";
  size?: "sm" | "md";
}

export function Badge({
  children,
  variant = "default",
  size = "sm",
}: BadgeProps) {
  const styles = badgeTokens[variant];
  return (
    <span
      className="badge"
      style={{
        color: styles.text,
        backgroundColor: styles.bg,
        border: `1px solid ${styles.border}`,
        padding: size === "sm" ? "4px 10px" : "6px 14px",
        fontSize: size === "sm" ? "0.72rem" : "0.8rem",
      }}
    >
      {children}
    </span>
  );
}
