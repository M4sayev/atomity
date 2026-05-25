import { tokens } from "./index";

export const barTokens = {
  level: {
    high: "high",
    mid: "mid",
    low: "low",
    lower: "lower",
  },

  color: {
    high: tokens.colors.accentSuccess,
    mid: tokens.colors.accentPrimary,
    low: tokens.colors.accentWarning,
    lower: tokens.colors.accentError,
  },
} as const;
