import { MD3LightTheme, MD3DarkTheme, useTheme, type MD3Theme } from 'react-native-paper';
import type { MyTheme, ThemeColors, ThemeCustom, ThemeFonts } from './Theme.types';
import { deepMerge } from '../Util/General';

/******************************************************************************************************************
 * AppTheme
 *
 * Full theme object consumed by:
 * - PaperProvider (react-native-paper)
 * - AppThemeProvider
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
 * Defaults (move former Const.ts values here over time).
 ******************************************************************************************************************/
const defaultCustom: ThemeCustom = {
  customProp: 0,
};

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