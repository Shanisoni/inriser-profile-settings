// =============================================
// Inriser Design Tokens
// Centralized design system for consistent UI
// across the entire application
// =============================================

// ---- Color Tokens ----
// Semantic naming: describes PURPOSE, not the color itself
export const Colors = {
  // Brand
  primary: "#6C63FF",            // Inriser brand purple - buttons, accents, active states
  primaryLight: "#B8B5E0",       // Muted variant - disabled buttons, subtle highlights
  primaryDark: "#4A42D4",        // Darker variant - pressed states, emphasis

  // Backgrounds
  backgroundPrimary: "#F5F5F5",  // Main screen background
  backgroundSurface: "#FFFFFF",  // Cards, inputs, elevated surfaces
  backgroundOverlay: "#00000066", // Overlay / scrim (40% opacity black)

  // Text
  textPrimary: "#1A1A2E",        // Headings, primary content
  textSecondary: "#333333",      // Labels, body text
  textTertiary: "#666666",       // Helper text, descriptions
  textMuted: "#999999",          // Placeholders, timestamps, counters

  // Borders
  borderDefault: "#E0E0E0",     // Default input/card borders
  borderFocus: "#6C63FF",       // Focused input border (matches primary)

  // Feedback / Semantic
  error: "#E74C3C",             // Validation errors, destructive actions
  success: "#27AE60",           // Success messages, confirmations
  warning: "#F39C12",           // Warnings, caution states

  // Switch / Toggle
  switchTrackOff: "#CCCCCC",    // Toggle track when OFF
  switchTrackOn: "#6C63FF",     // Toggle track when ON (matches primary)
  switchThumbOff: "#F4F4F4",    // Toggle thumb when OFF
  switchThumbOn: "#FFFFFF",     // Toggle thumb when ON
};


// ---- Typography Tokens ----
// Consistent font sizes and weights across the app
export const Typography = {
  // Font Sizes (scaled for mobile readability)
  fontSize: {
    xs: 11,       // Fine print, badges
    sm: 13,       // Counters, helper text, timestamps
    md: 15,       // Labels, body text
    lg: 16,       // Inputs, button text
    xl: 20,       // Section headings
    xxl: 28,      // Screen titles / hero text
  },

  // Font Weights
  fontWeight: {
    regular: "400",    // Body text, descriptions
    medium: "500",     // Slightly emphasised text
    semiBold: "600",   // Labels, buttons, sub-headings
    bold: "700",       // Headings, primary actions
  },

  // Line Heights (optional - for tighter control)
  lineHeight: {
    tight: 18,
    normal: 22,
    relaxed: 28,
    loose: 36,
  },
};


// ---- Spacing Tokens ----
// 4px base grid - ensures consistent rhythm
export const Spacing = {
  xxs: 4,     // Tight internal padding
  xs: 6,      // Minimal gap (e.g., error text margin)
  sm: 8,      // Small gap (label bottom margin)
  md: 12,     // Medium gap (button gap, padding)
  lg: 16,     // Standard padding (inputs, cards, sections)
  xl: 24,     // Large spacing (content padding, field gaps)
  xxl: 32,    // Extra-large (heading bottom margin)
  xxxl: 60,   // Top padding for safe-area offset
};


// ---- Border Radius Tokens ----
// Consistent rounding across components
export const Radius = {
  sm: 6,      // Small elements (tags, chips)
  md: 8,      // Buttons (secondary)
  lg: 10,     // Inputs, cards, primary buttons
  xl: 16,     // Modals, bottom sheets
  full: 9999, // Fully rounded (avatars, pills)
};


// ---- Shadow / Elevation Tokens ----
// React Native shadow values for depth
export const Shadows = {
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
};
