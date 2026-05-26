"use client";

import { motion } from "framer-motion";
import type { MetricItem } from "../hooks/useMetrics";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { barTokens } from "../tokens/barTokens";

interface Props {
  item: MetricItem;
  index: number;
}

function getLevel(pct: number) {
  if (pct >= 75) return "high";
  if (pct >= 55) return "mid";
  if (pct >= 30) return "low";
  return "critical";
}

export function VerticalBar({ item, index }: Props) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const level = getLevel(item.percentage);

  return (
    <motion.div
      className="vertical-bar"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
      }}
    >
      <div className="vertical-bar__top">
        <span className="vertical-bar__percentage">{item.percentage}%</span>
      </div>

      <div className="vertical-bar__wrapper">
        <motion.div
          className={`vertical-bar__fill`}
          style={{ backgroundColor: barTokens.color[level] }}
          initial={isMobile ? { width: 0 } : { height: 0 }}
          whileInView={
            isMobile
              ? { width: `${item.percentage}%` }
              : { height: `${item.percentage}%` }
          }
          transition={{
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
            delay: index * 0.08,
          }}
        />
      </div>

      <div className="vertical-bar__label">{item.label}</div>
    </motion.div>
  );
}
