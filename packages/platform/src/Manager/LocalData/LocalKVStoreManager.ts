import Storage from 'expo-sqlite/kv-store';
import { LOCAL_DATA_DEFAULTS } from '../../Defaults';
import { doErrLog } from '../../Util/General';

// local data schema
type LocalData = Record<string, any>;

const storage = Storage;

// helper
function tryParse(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

/******************************************************************************************************************
 * Sets a value in storage.
 *
 * @param key     - String key to set
 * @param value   - Value to store (will be stringified)
 ******************************************************************************************************************/
export function setItemKV(key: string, value: any): void {
  try {
    storage.setItemSync(key, JSON.stringify(value));
  } catch (err) {
    doErrLog('LocalData', 'setItem', `Failed to save local data for key '${key}': ${err}`);
  }
}

/******************************************************************************************************************
 * Retrieves a value from storage.
 *
 * @param key - Key to fetch
 *
 * @return - Stored value typed as T, or undefined if missing (and no default)
 ******************************************************************************************************************/
export function getItemKV<T = any>(key: string): T | undefined {
  try {
    const raw = storage.getItemSync(key);

    // stored value exists
    if (raw !== null && raw !== undefined) {
      return tryParse(raw) as T;
    }

    // fallback to default (lazy)
    if (Object.prototype.hasOwnProperty.call(LOCAL_DATA_DEFAULTS, key)) {
      const defValue = (LOCAL_DATA_DEFAULTS as LocalData)[key] as T;
      storage.setItemSync(key, JSON.stringify(defValue));
      return defValue;
    }

    return undefined;
  } catch (err) {
    doErrLog('LocalData', 'getItem', `Failed to read local data for key '${key}': ${err}`);
    return undefined;
  }
}

/******************************************************************************************************************
 * Removes a specific key from storage.
 *
 * @param key - Key to remove
 ******************************************************************************************************************/
export function removeItemKV(key: string): void {
  try {
    storage.removeItemSync(key);
  } catch (err) {
    doErrLog('LocalData', 'removeItem', `Failed to remove local data for key '${key}': ${err}`);
  }
}

/******************************************************************************************************************
 * Clears all stored values.
 ******************************************************************************************************************/
export function clearKVs(): void {
  try {
    storage.clearSync();
  } catch (err) {
    doErrLog('LocalData', 'clear', `Failed to clear local data: ${err}`);
  }
}
