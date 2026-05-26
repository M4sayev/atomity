import { tokens } from "./index";

export const barTokens = {
  level: {
    high: "high",
    mid: "mid",
    low: "low",
    critical: "critical",
  },

  color: {
    high: tokens.colors.accentSuccess,
    mid: tokens.colors.accentPrimary,
    low: tokens.colors.accentWarning,
    critical: tokens.colors.accentError,
  },
} as const;
