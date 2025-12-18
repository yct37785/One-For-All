import { MD3LightTheme, Text as PaperText } from 'react-native-paper';
import { KeysOfType } from '../Util/Template';

/******************************************************************************************************************
 * Theme workflow:
 * - Client app supply the following partially/fully defined theme tokens (grouped under MyTheme) to Root.
 * - Values merged with AppTheme context object that is passed to PaperProvider and used by Framework.
 ******************************************************************************************************************/
// MD3 theme tokens
export type ThemeColors = typeof MD3LightTheme.colors;
export type ThemeFonts = typeof MD3LightTheme.fonts;

// test custom token
export type ThemeCustom = {
  customProp: number;
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
  custom: Partial<ThemeCustom>;
}>;

/******************************************************************************************************************
 * Color props.
 *
 * @property color?          - Theme color token (defaults to 'onSurface')
 * @property colorCustom?    - Raw color string (overrides `color`)
 * @property highlightColor? - Background highlight color
 ******************************************************************************************************************/
export type ColorProps = Partial<{
  color: KeysOfType<ThemeColors, string>;
  colorCustom: string;
  highlightColor: string;
}>;

export type TextVariant = React.ComponentProps<typeof PaperText>['variant'];