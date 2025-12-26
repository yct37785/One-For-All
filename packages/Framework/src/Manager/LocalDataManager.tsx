/******************************************************************************************************************
 * Generic local data provider built on MMKV.
 *
 * Features:
 * - Ensures reserved default keys (isDarkMode, language, etc.) always exist.
 * - Does NOT keep an in-memory snapshot; reads/writes storage per call.
 * - Provides setItem, getItem, removeItem and clear utilities.
 ******************************************************************************************************************/
import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { createMMKV } from 'react-native-mmkv';
import { localDataDefaults } from '../Defaults';
import { doLog, doErrLog } from '../Util/General';

/******************************************************************************************************************
 * MMKV storage instance.
 * - Single instance for the app.
 ******************************************************************************************************************/
export const storage = createMMKV();

/******************************************************************************************************************
 * Local data schema and reserved defaults.
 ******************************************************************************************************************/
type LocalData = Record<string, any>;

/******************************************************************************************************************
 * Type defining the APIs exposed by LocalDataContext.Provider.
 *
 * @property setItem     - Persist a value to MMKV
 * @property getItem     - Retrieve a typed value or undefined
 * @property removeItem  - Remove a single key from MMKV
 * @property clear       - Clear all stored values
 ******************************************************************************************************************/
type LocalDataContextType = {
  setItem: (key: string, value: any) => Promise<void>;
  getItem: <T = any>(key: string) => Promise<T | undefined>;
  removeItem: (key: string) => Promise<void>;
  clear: () => Promise<void>;
};

const LocalDataContext = createContext<LocalDataContextType>({
  setItem: async () => {},
  getItem: async () => undefined,
  removeItem: async () => {},
  clear: async () => {},
});

/******************************************************************************************************************
 * Safely parse a stored string:
 * - If it looks like JSON, parse it
 * - Otherwise return the raw string
 ******************************************************************************************************************/
function parseStoredValue(raw: string): any {
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

/******************************************************************************************************************
 * Convert any JS value to a storage string:
 * - Always JSON.stringify for consistency
 ******************************************************************************************************************/
function toStoredValue(value: any): string {
  return JSON.stringify(value);
}

/******************************************************************************************************************
 * Provide local key/value helpers backed by MMKV, enforce reserved defaults.
 *
 * @param props - Provider props:
 *   - children: ReactNode - Subtree that consumes the context
 ******************************************************************************************************************/
export const LocalDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  /****************************************************************************************************************
   * Ensure reserved defaults exist on mount:
   * - If a default key is missing, write it into MMKV.
   ****************************************************************************************************************/
  useEffect(() => {
    try {
      for (const [key, defValue] of Object.entries(localDataDefaults)) {
        const existing = storage.getString(key);
        if (existing === undefined) {
          storage.set(key, toStoredValue(defValue));
        }
      }
      doLog('LocalData', 'init', 'Local data defaults ensured');
    } catch (err) {
      doErrLog('LocalData', 'init', `Failed to init local data defaults: ${err}`);
    }
  }, []);

  /****************************************************************************************************************
   * Sets a value in local data and persists it to MMKV.
   *
   * @param key     - String key to set
   * @param value   - Value to store (will be JSON.stringified)
   ****************************************************************************************************************/
  const setItem = async (key: string, value: any) => {
    try {
      storage.set(key, toStoredValue(value));
    } catch (err) {
      doErrLog('LocalData', 'setItem', `Failed to save local data for key "${key}": ${err}`);
    }
  };

  /****************************************************************************************************************
   * Retrieves a value from local data (MMKV).
   *
   * Behavior:
   * - If key exists -> parse + return
   * - If key missing but exists in localDataDefaults -> write default and return default
   * - Otherwise -> undefined
   *
   * @param key - Key to fetch
   *
   * @return - Stored value typed as T, or undefined if missing
   ****************************************************************************************************************/
  const getItem = async <T = any,>(key: string): Promise<T | undefined> => {
    try {
      const raw = storage.getString(key);

      if (raw !== undefined) {
        return parseStoredValue(raw) as T;
      }

      // if missing, but reserved default exists, persist it and return it
      if (Object.prototype.hasOwnProperty.call(localDataDefaults, key)) {
        const defValue = (localDataDefaults as LocalData)[key];
        storage.set(key, toStoredValue(defValue));
        return defValue as T;
      }

      return undefined;
    } catch (err) {
      doErrLog('LocalData', 'getItem', `Failed to read local data for key "${key}": ${err}`);
      return undefined;
    }
  };

  /****************************************************************************************************************
   * Removes a specific key from MMKV.
   *
   * @param key - Key to remove
   ****************************************************************************************************************/
  const removeItem = async (key: string) => {
    try {
      storage.remove(key);
    } catch (err) {
      doErrLog('LocalData', 'removeItem', `Failed to remove local data for key "${key}": ${err}`);
    }
  };

  /****************************************************************************************************************
   * Clears all local data:
   * - Deletes everything from MMKV
   * - Next getItem will re-seed defaults when accessed (and init seeds on next mount)
   ****************************************************************************************************************/
  const clear = async () => {
    try {
      storage.clearAll();
    } catch (err) {
      doErrLog('LocalData', 'clear', `Failed to clear local data: ${err}`);
    }
  };

  const value = useMemo<LocalDataContextType>(
    () => ({ setItem, getItem, removeItem, clear }),
    []
  );

  return <LocalDataContext.Provider value={value}>{children}</LocalDataContext.Provider>;
};

export const useLocalData = () => useContext(LocalDataContext);
