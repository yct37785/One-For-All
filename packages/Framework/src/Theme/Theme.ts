import { MD3LightTheme, MD3DarkTheme, type MD3Theme } from 'react-native-paper';
import type { MyTheme, ThemeColors, ThemeDesign, ThemeFonts } from './Theme.types';
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
  design: ThemeDesign;
};

/******************************************************************************************************************
 * Default design tokens.
 ******************************************************************************************************************/
const defaultDesign: ThemeDesign = {
  padSize025: 3,
  padSize05: 4,
  padSize: 8,

  radiusSmall: 4,
  radiusMedium: 8,
  radiusLarge: 12,

  rippleColorForLight: 'rgba(0,0,0,0.12)',
  rippleColorForDark: 'rgba(255,255,255,0.12)',

  snackbarDuration: 2000,

  textOpacityHEmphasis: 0.87,
  textOpacityMEmphasis: 0.6,

  iconSizeSmall: 20,
  iconSizeMedium: 30,

  pressOpacityLight: 0.8,
  pressOpacityMedium: 0.5,
  pressOpacityHeavy: 0.2,
  pressInDurationMS: 110,
  pressOutDurationMS: 160,

  animDuration: 300,
};

/******************************************************************************************************************
 * Build theme by merging myTheme into Paper's MD3LightTheme / MD3DarkTheme.
 *
 * - MD3LightTheme and MD3DarkTheme are the source of truth.
 * - Light/dark themes share fonts + custom, but have independent color overrides.
 *
 * @param myTheme - Theme tokens supplied by client app
 *
 * @return - appLightTheme and appDarkTheme
 ******************************************************************************************************************/
export function buildTheme(myTheme?: MyTheme): {
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

  // merge design (shared)
  const design = deepMerge(defaultDesign, myTheme?.design) as ThemeDesign;

  const appLightTheme: AppTheme = {
    ...baseLight,
    colors: colorsLight,
    fonts,
    design,
  };

  const appDarkTheme: AppTheme = {
    ...baseDark,
    colors: colorsDark,
    fonts,
    design,
  };

  return { appLightTheme, appDarkTheme };
}