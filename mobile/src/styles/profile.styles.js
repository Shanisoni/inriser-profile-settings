// =============================================
// Profile Screen — Styles
// All visual styles for the Profile Settings screen.
// Values reference centralized design tokens
// for consistency and easy theming.
// =============================================

import { StyleSheet } from "react-native";
import { Colors, Typography, Spacing, Radius, Shadows } from "../theme/tokens";

const styles = StyleSheet.create({
  // -- Loading & Error screens --
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundPrimary,
    padding: Spacing.xl,
  },
  loadingText: {
    marginTop: Spacing.md,
    fontSize: Typography.fontSize.lg,
    color: Colors.textTertiary,
  },
  errorText: {
    fontSize: Typography.fontSize.lg,
    color: Colors.error,
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  retryBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    ...Shadows.sm,
  },
  retryBtnText: {
    color: Colors.backgroundSurface,
    fontWeight: Typography.fontWeight.semiBold,
  },

  // -- Main form --
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  content: {
    padding: Spacing.xl,
    paddingTop: Spacing.xxxl,
  },
  brandContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end", // aligns the dot properly with text base
    marginTop: Spacing.xl, // push the logo a bit lower
    marginBottom: Spacing.xxxl, // pushed content further down by using maximum spacing
  },
  brandText: {
    fontSize: Typography.fontSize.xxl + 4, // 32px for a nice logo size
    color: "#000000", // solid black
    fontWeight: "900", // very bold
    textTransform: "lowercase",
    letterSpacing: -1,
    lineHeight: 34, // tighter line height
  },
  brandDot: {
    width: 12,
    height: 12,
    backgroundColor: "#FF8C00", // bright orange square
    marginLeft: 3,
    marginBottom: 4, // align with baseline of the word
    borderRadius: 2,
  },
  heading: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xxl,
  },

  // -- Form fields --
  field: {
    marginBottom: Spacing.xl,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semiBold,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  counter: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
  },
  counterLimit: {
    color: Colors.error,
  },
  input: {
    backgroundColor: Colors.backgroundSurface,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: Typography.fontSize.lg,
    color: Colors.textPrimary,
  },
  inputError: {
    borderColor: Colors.error,
  },
  bioInput: {
    height: 100,
    paddingTop: Spacing.md,
  },
  validationError: {
    color: Colors.error,
    fontSize: Typography.fontSize.sm,
    marginTop: Spacing.xs,
  },

  // -- Notifications toggle --
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.backgroundSurface,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg - 2,
    marginBottom: Spacing.lg,
  },
  toggleLabel: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semiBold,
    color: Colors.textSecondary,
  },

  // -- Last updated timestamp --
  timestamp: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textMuted,
    textAlign: "center",
    marginBottom: Spacing.xl,
  },

  // -- Action buttons --
  actions: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  btn: {
    flex: 1,
    paddingVertical: Spacing.lg - 2,
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  saveBtn: {
    backgroundColor: Colors.primary,
    ...Shadows.sm,
  },
  saveBtnDisabled: {
    backgroundColor: Colors.primaryLight,
    ...Shadows.none,
  },
  saveBtnText: {
    color: Colors.backgroundSurface,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },
  resetBtn: {
    backgroundColor: Colors.backgroundSurface,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
  },
  resetBtnText: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semiBold,
  },
});

export default styles;
