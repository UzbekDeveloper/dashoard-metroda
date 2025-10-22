/**
 * METRODA Brand Colors
 * Primary Brand Color: #f65200 (Orange)
 */

export const brandColors = {
  // Primary brand color - METRODA Orange
  primary: {
    50: '#fff5f0',
    100: '#ffe8db',
    200: '#ffd0b7',
    300: '#ffb088',
    400: '#ff8557',
    500: '#f65200', // Main brand color
    600: '#dd4900',
    700: '#b83d00',
    800: '#943100',
    900: '#7a2900',
    950: '#421600',
  },

  // Secondary - Deep Blue (complements orange)
  secondary: {
    50: '#f0f5ff',
    100: '#e0ebff',
    200: '#c7d9fe',
    300: '#a4bdfc',
    400: '#8099f8',
    500: '#5f75f0',
    600: '#4a56d9',
    700: '#3d44b8',
    800: '#353a94',
    900: '#2f3476',
    950: '#1f2047',
  },

  // Neutral grays
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },

  // Semantic colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
} as const;

// HSL values for CSS variables
export const hslColors = {
  light: {
    background: '0 0% 100%',
    foreground: '240 10% 3.9%',
    card: '0 0% 100%',
    'card-foreground': '240 10% 3.9%',
    popover: '0 0% 100%',
    'popover-foreground': '240 10% 3.9%',

    // METRODA Orange as primary
    primary: '20 100% 48%', // #f65200
    'primary-foreground': '0 0% 100%',

    // Deep blue as secondary
    secondary: '227 71% 64%',
    'secondary-foreground': '0 0% 100%',

    // Accent - lighter orange
    accent: '20 100% 60%',
    'accent-foreground': '0 0% 100%',

    // Muted grays
    muted: '240 4.8% 95.9%',
    'muted-foreground': '240 3.8% 46.1%',

    // Borders and inputs
    border: '240 5.9% 90%',
    input: '240 5.9% 90%',
    ring: '20 100% 48%', // Same as primary

    // Semantic
    destructive: '0 84.2% 60.2%',
    'destructive-foreground': '0 0% 98%',
    success: '142 76% 36%',
    'success-foreground': '0 0% 100%',
    warning: '38 92% 50%',
    'warning-foreground': '0 0% 100%',
  },

  dark: {
    background: '240 10% 3.9%',
    foreground: '0 0% 98%',
    card: '240 10% 8%',
    'card-foreground': '0 0% 98%',
    popover: '240 10% 8%',
    'popover-foreground': '0 0% 98%',

    // METRODA Orange (slightly adjusted for dark mode)
    primary: '20 100% 55%', // Lighter for dark bg
    'primary-foreground': '240 10% 3.9%',

    secondary: '227 71% 50%',
    'secondary-foreground': '0 0% 98%',

    accent: '20 90% 50%',
    'accent-foreground': '0 0% 98%',

    muted: '240 3.7% 15.9%',
    'muted-foreground': '240 5% 64.9%',

    border: '240 3.7% 15.9%',
    input: '240 3.7% 15.9%',
    ring: '20 100% 55%',

    destructive: '0 62.8% 50%',
    'destructive-foreground': '0 0% 98%',
    success: '142 76% 45%',
    'success-foreground': '0 0% 98%',
    warning: '38 92% 60%',
    'warning-foreground': '240 10% 3.9%',
  },
} as const;
