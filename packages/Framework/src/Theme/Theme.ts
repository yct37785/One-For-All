import { MD3DarkTheme, MD3LightTheme, useTheme } from 'react-native-paper';

/******************************************************************************************************************
 * Theme objects
 *
 * - AppLightTheme / AppDarkTheme extend Paper’s MD3 themes.
 * - Add both overrides (colors, fonts, etc.) and extensions (custom/framework tokens).
 * - Keep the shape identical across light/dark so AppTheme can be inferred cleanly.
 ******************************************************************************************************************/
export const AppLightTheme = {
  ...MD3LightTheme,

  // TEMP extension (example)
  custom: 'light',

  // Paper overrides
  colors: {
    ...MD3LightTheme.colors,

    // TEMP override (example)
    primary: '#50a465ff',
    onSurface: '#d7294cff',
  },
} as const;

export const AppDarkTheme = {
  ...MD3DarkTheme,

  // TEMP extension (example)
  custom: 'dark',

  // Paper overrides
  colors: {
    ...MD3DarkTheme.colors,

    // TEMP override (example)
    primary: '#ffcebcff',
    onSurface: '#cbd729ff',
  },
} as const;

/******************************************************************************************************************
 * AppTheme type + hook
 *
 * Pattern follows Paper docs:
 * - AppTheme = typeof theme
 * - useAppTheme = () => useTheme<AppTheme>()
 ******************************************************************************************************************/
export type AppTheme = typeof AppLightTheme;

export const useAppTheme = () => useTheme<AppTheme>();
