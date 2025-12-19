/******************************************************************************************************************
 * AppThemeManager
 *
 * Theme workflow:
 * - Client app supplies initial MyTheme tokens to Root.
 * - AppThemeManager merges client tokens with runtime overrides (e.g. settings changes).
 * - Resulting theme is provided to the framework via a single hook: useAppTheme().
 *
 * Notes:
 * - This manager exists so we can expose theme update APIs in the same hook.
 * - All token merging is delegated to Theme.ts (deepMerge) so we avoid duplicated merge logic here.
 * - PaperProvider should still be used in Root; this manager only owns the resolved theme + update logic.
 ******************************************************************************************************************/
import React, { createContext, memo, useCallback, useContext, useMemo, useState, useEffect } from 'react';
import type { MyTheme } from '../Theme/Theme.types';
import type { AppTheme } from '../Theme/Theme';
import { buildTheme } from '../Theme/Theme';
import { deepMerge } from '../Util/General';

/******************************************************************************************************************
 * AppThemeContextType shape.
 * 
 * @property theme        - Resolved AppTheme for the current mode
 * @property updateTheme  - Merge partial theme tokens into runtime overrides
 * @property isLoaded     - True once initial theme is resolved
 ******************************************************************************************************************/
type AppThemeContextType = {
  theme: AppTheme;
  updateTheme: (tokens: MyTheme) => void;
  isLoaded: boolean;
};

/******************************************************************************************************************
 * Default (safe) context value.
 ******************************************************************************************************************/
const AppThemeContext = createContext<AppThemeContextType>({
  theme: undefined as unknown as AppTheme,
  updateTheme: () => { },
  isLoaded: false,
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
    const [isLoaded, setIsLoaded] = useState(false);

    /**************************************************************************************************************
     * Mark theme as loaded once the initial theme has been resolved.
     **************************************************************************************************************/
    useEffect(() => {
      setIsLoaded(true);
    }, []);

    /**************************************************************************************************************
     * 1) Merge client tokens + runtime tokens (runtime wins).
     * 2) Build light and dark theme with mergedTokens.
     **************************************************************************************************************/
    const mergedTokens = useMemo<MyTheme>(() => {
      return deepMerge(myTheme ?? {}, runtimeTokens ?? {}) as MyTheme;
    }, [myTheme, runtimeTokens]);

    const { appLightTheme, appDarkTheme } = useMemo(
      () => buildTheme(mergedTokens),
      [mergedTokens]
    );

    const theme = isDarkMode ? appDarkTheme : appLightTheme;

    /**************************************************************************************************************
     * Merges a partial `MyTheme` object into the current runtime theme tokens.
     * 
     * @usage
     * ```tsx
     * updateTheme({
     *   colorsLight: { primary: '#00ff00' },
     * });
     * ```
     *
     * @param tokens - Partial theme tokens to merge into the runtime theme
     **************************************************************************************************************/
    const updateTheme = useCallback((tokens: MyTheme) => {
      setRuntimeTokens(prev => deepMerge(prev ?? {}, tokens ?? {}) as MyTheme);
    }, []);

    /**************************************************************************************************************
     * AppThemeContext value
     **************************************************************************************************************/
    const value = useMemo<AppThemeContextType>(
      () => ({ theme, updateTheme, isLoaded }),
      [theme, updateTheme, isLoaded]
    );

    return (
      <AppThemeContext.Provider value={value}>
        {children}
      </AppThemeContext.Provider>
    );
  }
);

/******************************************************************************************************************
 * Primary theme hook for framework + client apps.
 *
 * @usage
 * ```tsx
 * const { theme, updateTheme } = useAppTheme();
 * ```
 ******************************************************************************************************************/
export function useAppTheme() {
  return useContext(AppThemeContext);
}
