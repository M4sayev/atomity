"use client";

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
  return (
    <span className={`badge badge--${variant} badge--${size}`}>{children}</span>
  );
}
