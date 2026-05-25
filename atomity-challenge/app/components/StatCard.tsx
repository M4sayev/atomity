"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CountUp } from "./CountUp";
import { tokens } from "../tokens";

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  description: string;
  index: number;
  variant?: "default" | "highlight";
}

export function StatCard({
  label,
  value,
  suffix = "",
  description,
  index,
  variant = "default",
}: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={`stat-card stat-card--${variant}`}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ borderRadius: tokens.radius.md }}
      whileHover={{
        y: -4,
        boxShadow: `0 12px 24px ${tokens.colors.accentGlow}`,
        borderColor: tokens.colors.borderActive,
      }}
    >
      <div className="stat-card__label">{label}</div>
      <div className="stat-card__value">
        <CountUp target={value} suffix={suffix} duration={1400} />
      </div>
      <div className="stat-card__description">{description}</div>
    </motion.div>
  );
}
