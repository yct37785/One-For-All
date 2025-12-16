import { MD3LightTheme, MD3DarkTheme, useTheme, type MD3Theme } from 'react-native-paper';
import type { MyTheme, ThemeColors, ThemeCustom, ThemeFonts } from './Theme.types';

/******************************************************************************************************************
 * AppTheme
 *
 * Full theme object consumed by:
 * - PaperProvider (react-native-paper)
 * - Framework UI (via useAppTheme)
 *
 * Notes:
 * - We intentionally use Omit<MD3Theme, 'colors' | 'fonts'> to replace with our token types.
 ******************************************************************************************************************/
export type AppTheme = Omit<MD3Theme, 'colors' | 'fonts'> & {
  colors: ThemeColors;
  fonts: ThemeFonts;
  custom: ThemeCustom;
};

/******************************************************************************************************************
 * AppTheme hook, use in-place of Paper's useTheme.
 *
 * @usage
 * ```tsx
 * const theme = useAppTheme();
 * ```
 ******************************************************************************************************************/
export const useAppTheme = () => useTheme<AppTheme>();

/******************************************************************************************************************
 * Defaults (move former Const.ts values here over time).
 ******************************************************************************************************************/
const defaultCustom: ThemeCustom = {
  customProp: 0,
};

/******************************************************************************************************************
 * Deep merge helper:
 * - Only applies keys that exist in `toMergeIn` AND are not undefined.
 * - Recursively merges plain objects (future-proof for nested tokens like elevation).
 * - Arrays are replaced.
 *
 * @param base      - Source-of-truth object
 * @param toMergeIn - Partial override object
 *
 * @return - New merged object (base is not mutated)
 ******************************************************************************************************************/
function deepMerge(base: any, toMergeIn: any) {
  if (toMergeIn === null || toMergeIn === undefined) return base;

  // primitives / functions: replace
  const baseIsObj = typeof base === 'object' && base !== null;
  const mergeIsObj = typeof toMergeIn === 'object' && toMergeIn !== null;
  if (!baseIsObj || !mergeIsObj) return toMergeIn;

  // arrays: replace (no deep merging for arrays)
  if (Array.isArray(base) || Array.isArray(toMergeIn)) {
    return Array.isArray(toMergeIn) ? toMergeIn : base;
  }

  const out: any = { ...base };

  for (const key of Object.keys(toMergeIn)) {
    const nextVal = toMergeIn[key];

    // only apply explicitly defined keys
    if (nextVal === undefined) continue;

    out[key] = deepMerge(base[key], nextVal);
  }

  return out;
}

/******************************************************************************************************************
 * Merge myTheme into Paper's MD3LightTheme / MD3DarkTheme.
 *
 * - MD3LightTheme and MD3DarkTheme are the source of truth.
 * - Light/dark themes share fonts + custom, but have independent color overrides.
 *
 * @param myTheme - Theme tokens supplied by client app
 *
 * @return - appLightTheme and appDarkTheme
 ******************************************************************************************************************/
export function mergeMyTheme(myTheme?: MyTheme): {
  appLightTheme: AppTheme;
  appDarkTheme: AppTheme;
} {
  const baseLight = MD3LightTheme as MD3Theme;
  const baseDark = MD3DarkTheme as MD3Theme;

  // merge colors (mode-specific)
  const colorsLight = deepMerge(baseLight.colors, myTheme?.colorsLight) as ThemeColors;
  const colorsDark = deepMerge(baseDark.colors, myTheme?.colorsDark) as ThemeColors;

  // merge fonts (shared)
  const fonts = deepMerge(baseLight.fonts, myTheme?.fonts) as ThemeFonts;

  // merge custom (shared)
  const custom = deepMerge(defaultCustom, myTheme?.custom) as ThemeCustom;

  const appLightTheme: AppTheme = {
    ...baseLight,
    colors: colorsLight,
    fonts: fonts,
    custom,
  };

  const appDarkTheme: AppTheme = {
    ...baseDark,
    colors: colorsDark,
    fonts: fonts,
    custom,
  };

  return { appLightTheme, appDarkTheme };
}