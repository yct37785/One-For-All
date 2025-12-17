/******************************************************************************************************************
 * AppThemeManager
 *
 * Theme workflow:
 * - Client app supplies initial MyTheme tokens to Root.
 * - AppThemeManager merges client tokens with runtime overrides (e.g. settings changes).
 * - Resulting theme is provided to the framework via a single hook: useAppTheme().
 *
 * Notes:
 * - This manager exists so we can expose update APIs (setPrimary, setThemeTokens) in the same hook.
 * - PaperProvider should still be used in Root; this manager only owns the resolved theme + update logic.
 ******************************************************************************************************************/
import React, { createContext, memo, useCallback, useContext, useMemo, useState } from 'react';
import type { MyTheme, ThemeColors, ThemeCustom } from '../Theme/Theme.types';
import type { AppTheme } from '../Theme/Theme';
import { mergeMyTheme } from '../Theme/Theme';

/******************************************************************************************************************
 * AppThemeContextType shape.
 ******************************************************************************************************************/
type AppThemeContextType = {
  theme: AppTheme;    // Resolved AppTheme for the current mode
  setPrimary: (color: string) => void;
  setThemeTokens: (tokens: MyTheme) => void;
};

/******************************************************************************************************************
 * Default (safe) context value.
 ******************************************************************************************************************/
const AppThemeContext = createContext<AppThemeContextType>({
  theme: undefined as unknown as AppTheme,
  setPrimary: () => { },
  setThemeTokens: () => { },
});

/******************************************************************************************************************
 * Provider props.
 *
 * @property isDarkMode - Current mode from AppSettingsManager
 * @property myTheme?   - Client-supplied initial tokens
 * @property children   - Provider subtree
 ******************************************************************************************************************/
export type AppThemeProviderProps = {
  isDarkMode: boolean;
  myTheme?: MyTheme;
  children: React.ReactNode;
};

/******************************************************************************************************************
 * AppThemeProvider
 *
 * Owns runtime theme overrides so screens (e.g. Settings) can update theme tokens on the fly.
 * 
 * @usage
 * ```tsx
 * <AppThemeProvider>
 *   <App />
 * </AppThemeProvider>
 * ```
 ******************************************************************************************************************/
export const AppThemeProvider: React.FC<AppThemeProviderProps> = memo(
  ({ isDarkMode, myTheme, children }) => {
    const [runtimeTokens, setRuntimeTokens] = useState<MyTheme>({});

    /**
     * Merge client tokens + runtime tokens (runtime wins).
     */
    const mergedTokens = useMemo<MyTheme>(() => {
      return {
        ...(myTheme ?? {}),
        ...(runtimeTokens ?? {}),
        colorsLight: { ...(myTheme?.colorsLight ?? {}), ...(runtimeTokens?.colorsLight ?? {}) },
        colorsDark: { ...(myTheme?.colorsDark ?? {}), ...(runtimeTokens?.colorsDark ?? {}) },
        fonts: { ...(myTheme?.fonts ?? {}), ...(runtimeTokens?.fonts ?? {}) },
        custom: { ...(myTheme?.custom ?? {}), ...(runtimeTokens?.custom ?? {}) },
      };
    }, [myTheme, runtimeTokens]);

    /**
     * Build both themes once per token change, then select current based on mode.
     */
    const { appLightTheme, appDarkTheme } = useMemo(
      () => mergeMyTheme(mergedTokens),
      [mergedTokens]
    );

    const theme = isDarkMode ? appDarkTheme : appLightTheme;

    /**************************************************************************************************************
     * Updates the primary color for the **current theme mode only**:
     * - Light mode → updates `colorsLight.primary`
     * - Dark mode  → updates `colorsDark.primary`
     *
     * @param color - New primary color value (hex / rgba / named color)
     **************************************************************************************************************/
    const setPrimary = useCallback(
      (color: string) => {
        setRuntimeTokens(prev => {
          const next: MyTheme = { ...(prev ?? {}) };

          if (isDarkMode) {
            next.colorsDark = { ...(next.colorsDark ?? {}), primary: color } as Partial<ThemeColors>;
          } else {
            next.colorsLight = { ...(next.colorsLight ?? {}), primary: color } as Partial<ThemeColors>;
          }

          return next;
        });
      },
      [isDarkMode]
    );

    /**************************************************************************************************************
     * Merges a partial `MyTheme` object into the current runtime theme tokens.
     *
     * Behavior:
     * - Performs a shallow merge at the top level
     * - Performs nested merges for:
     *   - colorsLight
     *   - colorsDark
     *   - fonts
     *   - custom
     *
     * This is the most flexible update API and should be used when
     * applying multiple theme changes at once.
     *
     * @param tokens - Partial theme tokens to merge into the runtime theme
     **************************************************************************************************************/
    const setThemeTokens = useCallback((tokens: MyTheme) => {
      setRuntimeTokens(prev => ({
        ...(prev ?? {}),
        ...(tokens ?? {}),
        colorsLight: { ...(prev?.colorsLight ?? {}), ...(tokens?.colorsLight ?? {}) },
        colorsDark: { ...(prev?.colorsDark ?? {}), ...(tokens?.colorsDark ?? {}) },
        fonts: { ...(prev?.fonts ?? {}), ...(tokens?.fonts ?? {}) },
        custom: { ...(prev?.custom ?? {}), ...(tokens?.custom ?? {}) as Partial<ThemeCustom> },
      }));
    }, []);

    /**
     * AppThemeContext value.
     */
    const value = useMemo<AppThemeContextType>(
      () => ({ theme, setPrimary, setThemeTokens }),
      [theme, setPrimary, setThemeTokens]
    );

    return (
      <AppThemeContext.Provider value={value}>
        {children}
      </AppThemeContext.Provider>
    );
  }
);

/******************************************************************************************************************
 * AppTheme hook.
 * 
 * @usage
 * ```tsx
 * const { theme, setPrimary } = useAppTheme();
 * ```
 ******************************************************************************************************************/
export function useAppTheme() {
  return useContext(AppThemeContext);
}
