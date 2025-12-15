import { MD3Theme, MD3LightTheme, MD3DarkTheme, MD3Colors } from 'react-native-paper';

/******************************************************************************************************************
 * Theme tokens:
 * - Extended from MD3 tokens if available.
 * - Add more framework specific properties as needed.
 ******************************************************************************************************************/
export type ThemeColors = typeof MD3Colors & {
  rippleColorForLight: string;
  rippleColorForDark: string;
};

export type ThemePress = {
  pressOpacityLight: number;
  pressOpacityMedium: number;

  pressInDurationMS: number;
  pressOutDurationMS: number;
};

export type ThemeTimed = {
  collapsibleAnimDuration: number;
  snackbarDuration: number;
};

export type ThemeStyling = {
  padSize025: number;
  padSize05: number;
  padSize: number;

  radiusSmall: number;
  radiusMedium: number;
  radiusLarge: number;
};

export type ThemeIcon =  {
  iconSizeSmall: number;
  iconSizeMedium: number;
};

/******************************************************************************************************************
 * MyTheme:
 * - Values defined by client and passed into Root to be merged with AppTheme.
 * - Add on more tokens (eg. anim) as needed.
 ******************************************************************************************************************/
export type MyTheme = {
  colorsLight: ThemeColors;
  colorsDark: ThemeColors;
  timed: ThemeTimed;
  style: ThemeStyling;
  icon: ThemeIcon;
};
