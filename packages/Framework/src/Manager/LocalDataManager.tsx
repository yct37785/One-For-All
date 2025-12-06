/******************************************************************************************************************
 * Generic local data provider built on AsyncStorage.
 *
 * Revised behavior:
 * - Does NOT keep an in-memory snapshot of all key/value pairs.
 * - Reads from AsyncStorage on every `getItem` call.
 * - Writes to AsyncStorage on every `setItem` call.
 * - Optionally re-seeds reserved default keys (`localDataDefaults`) when missing.
 ******************************************************************************************************************/
import React, { createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { localDataDefaults } from '../Const';
import { doLog, doErrLog } from '../Util/General';

/******************************************************************************************************************
 * Local data schema and reserved defaults.
 ******************************************************************************************************************/
type LocalData = Record<string, any>;

/******************************************************************************************************************
 * Type defining the APIs exposed by LocalDataContext.Provider.
 * 
 * @property setItem  - Persist a value to AsyncStorage
 * @property getItem  - Retrieve a typed value (reads from AsyncStorage each time)
 * @property clear    - Clear all stored values and optionally re-seed defaults
 ******************************************************************************************************************/
type LocalDataContextType = {
  setItem: (key: string, value: any) => Promise<void>;
  getItem: <T = any>(key: string) => Promise<T | undefined>;
  clear: () => Promise<void>;
};

/******************************************************************************************************************
 * Default (no-op) context implementation to avoid undefined checks in consumers.
 ******************************************************************************************************************/
const LocalDataContext = createContext<LocalDataContextType>({
  setItem: async () => {},
  getItem: async () => undefined,
  clear: async () => {},
});

/******************************************************************************************************************
 * Helper: Safely parse JSON values from AsyncStorage.
 *
 * @param value - Raw string value from AsyncStorage
 * @returns     - Parsed JSON or original string if parsing fails
 ******************************************************************************************************************/
const safeParse = (value: string): any => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

/******************************************************************************************************************
 * Provide local key/value utilities backed directly by AsyncStorage.
 * No in-memory snapshot is maintained; every operation hits AsyncStorage.
 *
 * @param props - Provider props:
 *   - children: ReactNode - Subtree that consumes the context
 *
 * @usage
 * ```tsx
 * <LocalDataProvider>
 *   <App />
 * </LocalDataProvider>
 * ```
 ******************************************************************************************************************/
export const LocalDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  /****************************************************************************************************************
   * [ASYNC] Sets a value in AsyncStorage.
   *
   * @param key     - String key to set
   * @param value   - Value to store (will be JSON.stringified)
   * 
   * @usage
   * ```tsx
   * await setItem('isDarkMode', true);
   * ```
   ****************************************************************************************************************/
  const setItem = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      doLog('LocalData', 'setItem', `Saved key "${key}" to local storage.`);
    } catch (err) {
      doErrLog('LocalData', 'setItem', `Failed to save local data for key "${key}": ${err}`);
    }
  };

  /****************************************************************************************************************
   * [ASYNC] Retrieves a value from AsyncStorage.
   * 
   * Behavior:
   * - Reads the value from AsyncStorage each time it is called.
   * - If the key does not exist but is present in `localDataDefaults`, the default is written to AsyncStorage
   *   and returned.
   * - If the key does not exist and has no default, resolves to undefined.
   * 
   * @param key - Key to fetch
   * 
   * @return - Promise resolving to the stored value typed as T, or undefined if missing
   * 
   * @usage
   * ```tsx
   * const lang = await getItem<string>('language');
   * ```
   ****************************************************************************************************************/
  const getItem = async <T = any>(key: string): Promise<T | undefined> => {
    try {
      const stored = await AsyncStorage.getItem(key);

      if (stored !== null) {
        const parsed = safeParse(stored);
        return parsed as T;
      }

      // If no value is stored but a default exists, seed AsyncStorage with the default and return it
      if (Object.prototype.hasOwnProperty.call(localDataDefaults, key)) {
        const defaultValue = (localDataDefaults as LocalData)[key];
        try {
          await AsyncStorage.setItem(key, JSON.stringify(defaultValue));
          doLog('LocalData', 'getItem', `Key "${key}" missing; seeded with default value.`);
        } catch (err) {
          doErrLog(
            'LocalData',
            'getItem',
            `Failed to seed default value for key "${key}": ${err}`
          );
        }
        return defaultValue as T;
      }

      return undefined;
    } catch (err) {
      doErrLog('LocalData', 'getItem', `Failed to read local data for key "${key}": ${err}`);
      return undefined;
    }
  };

  /****************************************************************************************************************
   * [ASYNC] Clears all data from AsyncStorage.
   *
   * Behavior:
   * - Calls `AsyncStorage.clear()` to remove all keys.
   * - Re-seeds reserved defaults (`localDataDefaults`) to keep them available from a clean state.
   *
   * @usage
   * ```tsx
   * await clear();
   * ```
   ****************************************************************************************************************/
  const clear = async () => {
    try {
      await AsyncStorage.clear();
      doLog('LocalData', 'clear', 'Cleared all local data.');

      // re-seed reserved defaults so they exist after a reset
      const defaultEntries = Object.entries(localDataDefaults).map(([key, value]) => [
        key,
        JSON.stringify(value),
      ]) as [string, string][];

      if (defaultEntries.length > 0) {
        await AsyncStorage.multiSet(defaultEntries);
        doLog('LocalData', 'clear', 'Re-seeded localDataDefaults after clear().');
      }
    } catch (err) {
      doErrLog('LocalData', 'clear', `Failed to clear local data: ${err}`);
    }
  };

  return (
    <LocalDataContext.Provider value={{ setItem, getItem, clear }}>
      {children}
    </LocalDataContext.Provider>
  );
};

/******************************************************************************************************************
 * Hook to consume the LocalDataContext.
 *
 * @usage
 * ```tsx
 * const { getItem, setItem, clear } = useLocalData();
 * const lang = await getItem<string>('language');
 * ```
 ******************************************************************************************************************/
export const useLocalData = () => useContext(LocalDataContext);
