/******************************************************************************************************************
 * Generic local kv store provider built on expo-sqlite/kv-store (SQLite-backed key/value storage).
 *
 * Features:
 * - Ensures reserved default keys (isDarkMode, language, etc.) always exist.
 * - Does NOT keep an in-memory snapshot; reads/writes storage per call.
 ******************************************************************************************************************/
import React, { createContext, useContext, useMemo, useCallback } from 'react';
import Storage from 'expo-sqlite/kv-store';
import { LOCAL_DATA_DEFAULTS } from '../../Defaults';
import { doErrLog } from '../../Util/General';

const storage = Storage;

// local data schema
type LocalData = Record<string, any>;

/******************************************************************************************************************
 * Type defining the APIs exposed by LocalKVStoreContext.Provider.
 *
 * @property setItemKV     - Persist a value to storage
 * @property getItemKV     - Retrieve a typed value or undefined
 * @property removeItemKV  - Remove a single key from storage
 * @property clearKVs      - Clear all stored values
 ******************************************************************************************************************/
type LocalKVStoreContextType = {
  setItemKV: (key: string, value: any) => void;
  getItemKV: <T = any>(key: string) => T | undefined;
  removeItemKV: (key: string) => void;
  clearKVs: () => void;
};

const LocalKVStoreContext = createContext<LocalKVStoreContextType>({
  setItemKV: () => {},
  getItemKV: () => undefined,
  removeItemKV: () => {},
  clearKVs: () => {},
});

// helper
function tryParse(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

/******************************************************************************************************************
 * Provide local key/value helpers backed by SQLite storage, enforce reserved defaults.
 ******************************************************************************************************************/
export const LocalKVStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  /****************************************************************************************************************
   * Sets a value in storage.
   *
   * @param key     - String key to set
   * @param value   - Value to store (will be stringified)
   ****************************************************************************************************************/
  const setItemKV = useCallback((key: string, value: any) => {
    try {
      storage.setItemSync(key, JSON.stringify(value));
    } catch (err) {
      doErrLog('LocalData', 'setItem', `Failed to save local data for key '${key}': ${err}`);
    }
  }, []);

  /****************************************************************************************************************
   * Retrieves a value from storage.
   *
   * @param key - Key to fetch
   *
   * @return - Stored value typed as T, or undefined if missing (and no default)
   ****************************************************************************************************************/
  const getItemKV = useCallback(
    <T,>(key: string): T | undefined => {
      try {
        const raw = storage.getItemSync(key);

        // stored value exists
        if (raw !== null && raw !== undefined) {
          return tryParse(raw) as T;
        }

        // fallback to default (lazy)
        if (Object.prototype.hasOwnProperty.call(LOCAL_DATA_DEFAULTS, key)) {
          const defValue = (LOCAL_DATA_DEFAULTS as LocalData)[key] as T;
          try {
            storage.setItemSync(key, JSON.stringify(defValue));
          } catch {
            // ignore persist failure, still return default for caller
          }
          return defValue;
        }

        return undefined;
      } catch (err) {
        doErrLog('LocalData', 'getItem', `Failed to read local data for key '${key}': ${err}`);
        return undefined;
      }
    }, []);

  /****************************************************************************************************************
   * Removes a specific key from storage.
   *
   * @param key - Key to remove
   ****************************************************************************************************************/
  const removeItemKV = useCallback((key: string) => {
    try {
      storage.removeItemSync(key);
    } catch (err) {
      doErrLog('LocalData', 'removeItem', `Failed to remove local data for key '${key}': ${err}`);
    }
  }, []);

  /****************************************************************************************************************
   * Clears all stored values.
   ****************************************************************************************************************/
  const clearKVs = useCallback(() => {
    try {
      storage.clearSync();
    } catch (err) {
      doErrLog('LocalData', 'clear', `Failed to clear local data: ${err}`);
    }
  }, []);

  /****************************************************************************************************************
   * LocalKVStoreContextType values.
   ****************************************************************************************************************/
  const value = useMemo<LocalKVStoreContextType>(
    () => ({
      setItemKV,
      getItemKV,
      removeItemKV,
      clearKVs,
    }),
    [setItemKV, getItemKV, removeItemKV, clearKVs]
  );

  return (
    <LocalKVStoreContext.Provider value={value}>
      {children}
    </LocalKVStoreContext.Provider>
  );
};

export const useLocalKVStore = () => useContext(LocalKVStoreContext);
