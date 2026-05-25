import { tokens } from "./index";

export const badgeTokens = {
  success: {
    text: tokens.colors.accentSuccess,
    bg: "rgba(34, 217, 122, 0.12)",
    border: "rgba(34, 217, 122, 0.25)",
  },

  warning: {
    text: tokens.colors.accentWarning,
    bg: "rgba(245, 158, 11, 0.12)",
    border: "rgba(245, 158, 11, 0.25)",
  },

  error: {
    text: tokens.colors.accentError,
    bg: "rgba(239, 68, 68, 0.12)",
    border: "rgba(239, 68, 68, 0.25)",
  },

  default: {
    text: tokens.colors.accentPrimary,
    bg: "rgba(59, 111, 255, 0.12)",
    border: "rgba(59, 111, 255, 0.25)",
  },
} as const;
