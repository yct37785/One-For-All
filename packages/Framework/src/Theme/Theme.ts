import { MD3DarkTheme, MD3LightTheme, useTheme } from 'react-native-paper';

/******************************************************************************************************************
 * Theme objects:
 * - Extend Paper’s MD3 themes.
 * - Supports overrides (colors, fonts, etc.) and extensions (custom/framework tokens).
 * - Shape is inferred from AppLightTheme, ensure AppDarkTheme follows the same shape (missing properties will be undefined).
 * 
 * @property custom - testing
 * @property colors - theme colors
 *  - testColor: str  - testing color
 *  - primary: str    - primary color
 ******************************************************************************************************************/
export const AppLightTheme = {
  ...MD3LightTheme,

  // TEMP extension (example)
  custom: 'light',

  // colors
  colors: {
    ...MD3LightTheme.colors,

    // TEMP extension (example)
    testColor: '#d7294cff',

    // TEMP override (example)
    primary: '#50a465ff',
  },
} as const;

export const AppDarkTheme = {
  ...MD3DarkTheme,

  // TEMP extension (example)
  custom: 'dark',

  // colors
  colors: {
    ...MD3DarkTheme.colors,

    // TEMP extension (example)
    testColor: '#cbd729ff',

    // TEMP override (example)
    primary: '#ffcebcff',
  },
} as const;

export type AppTheme = typeof AppLightTheme;

/******************************************************************************************************************
 * AppTheme hook, use in-place of Paper's useTheme.
 * 
 * @usage
 * ```tsx
 * const theme = useAppTheme();
 * ```
 ******************************************************************************************************************/
export const useAppTheme = () => useTheme<AppTheme>();
