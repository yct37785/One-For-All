import { MD3Theme } from 'react-native-paper';

// mapping of general font colors to RN Paper theme keys
export const tokenToRNPaperThemeKey: Record<string, string> = {
  default: 'onSurface',
  label: 'onSurfaceVariant',
  disabled: 'onSurfaceDisabled',
  primary: 'primary',
  secondary: 'secondary',
  error: 'error',
  surface: 'surface',
  background: 'background',
  outline: 'outline',
} as const;

export function resolveFontColor(
  color: string | undefined,
  customColor: string | undefined,
  theme: MD3Theme
): string {
  // highest priority: custom literal color override
  if (customColor) return customColor;
  // normal token: theme lookup
  const themeKey = color ? tokenToRNPaperThemeKey[color] : undefined;
  // fallback: to theme default
  return (theme.colors as any)[themeKey ?? 'onSurface'] ?? theme.colors.onSurface;
}