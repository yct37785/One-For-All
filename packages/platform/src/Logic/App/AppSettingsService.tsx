import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { doLog, doErrLog } from '../Util/General';
import { getItemKV, setItemKV } from '../LocalData/LocalKVStoreService';

/******************************************************************************************************************
 * Settings API.
 *
 * @property isDarkMode     - Is theme mode dark
 * @property setIsDarkMode  - Updates dark mode flag and persists it
 ******************************************************************************************************************/
export type AppSettingsContextType = {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => Promise<void>;
};

const AppSettingsContext = createContext<AppSettingsContextType>({
  isDarkMode: false,
  setIsDarkMode: async () => {},
});

/******************************************************************************************************************
 * AppSettingsProvider
 *
 * Central app settings service:
 * - Loads persisted values on mount
 * - Exposes setters that update state + persist to local store
 ******************************************************************************************************************/
export const AppSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkModeState] = useState<boolean>(false);

  /****************************************************************************************************************
   * Load settings on mount.
   ****************************************************************************************************************/
  useEffect(() => {
    (async () => {
      try {
        const stored = getItemKV<boolean>('isDarkMode');
        setIsDarkModeState(!!stored);
      } catch (err) {
        doErrLog('AppSettingsService', 'load', `Failed to load settings: ${err}`);
      } finally {
        doLog('AppSettingsService', 'load', 'App settings loaded');
      }
    })();
  }, [getItemKV]);

  /****************************************************************************************************************
   * Persisted setter: dark mode.
   *
   * @param val - New dark mode flag
   ****************************************************************************************************************/
  const setIsDarkMode = async (val: boolean) => {
    setIsDarkModeState(prev => (prev === val ? prev : val));

    try {
      setItemKV('isDarkMode', val);
    } catch (err) {
      doErrLog('AppSettingsService', 'setIsDarkMode', `Failed to persist isDarkMode: ${err}`);
    }
  };

  const value = useMemo(
    () => ({ isDarkMode, setIsDarkMode }),
    [isDarkMode]
  );

  return (
    <AppSettingsContext.Provider value={value}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = () => useContext(AppSettingsContext);
