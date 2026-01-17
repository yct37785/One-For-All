import { MD3LightTheme } from 'react-native-paper';

/******************************************************************************************************************
 * Theme workflow:
 * - Client app supply the following partially/fully defined theme tokens (grouped under MyTheme) to Root.
 * - Values merged with AppTheme context object that is passed to PaperProvider and used by Framework.
 ******************************************************************************************************************/
// MD3 theme tokens
export type ThemeColors = typeof MD3LightTheme.colors;
export type ThemeFonts = typeof MD3LightTheme.fonts;

// design tokens
export type ThemeDesign = {
  padSize025: number;
  padSize05: number;
  padSize: number;

  radiusSmall: number;
  radiusMedium: number;
  radiusLarge: number;

  rippleColorForLight: string;
  rippleColorForDark: string;

  snackbarDuration: number;

  textOpacityHEmphasis: number;
  textOpacityMEmphasis: number;
  loadingOpacity: number;

  iconSizeSmall: number;
  iconSizeMedium: number;

  pressOpacityLight: number;
  pressOpacityMedium: number;
  pressOpacityHeavy: number;
  pressInDurationMS: number;
  pressOutDurationMS: number;

  animDuration: number;

  input: {
    height: number;
    paddingX: number;
    paddingY: number;
    radius: number;
    outlineBorderWidth: number;
    labelFontSize: number;
    fontSize: number;
    helperFontSize: number;
    labelSpacing: number;
    helperSpacing: number;
    iconMarginX: number;
  }
};

/******************************************************************************************************************
 * MyTheme:
 * - Values defined by client and passed into Root to be merged with AppTheme.
 * - Add on more tokens (eg. anim) as needed.
 * 
 * @property colorsLight  - Theme colors light mode
 * @property colorsLight  - Theme colors dark mode
 * @property fonts        - Fonts token
 * @property custom       - Test custom token
 ******************************************************************************************************************/
export type MyTheme = Partial<{
  colorsLight: Partial<ThemeColors>;
  colorsDark: Partial<ThemeColors>;
  fonts: Partial<ThemeFonts>;
  design: Partial<ThemeDesign>;
}>;
