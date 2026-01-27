import * as SQLite from 'expo-sqlite';
import { LOCAL_DATA_DEFAULTS } from '../Defaults';
import { doErrLog } from '../Util/General';

// DB singleton
let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

/******************************************************************************************************************
 * [ASYNC] Get or open the SQLite DB instance.
 * 
 * Notes:
 * - A single shared DB instance is used for the app (defaultDB).
 * - The DB is opened lazily on first access and cached for reuse.
 * - Subsequent calls return the same DB instance.
 ******************************************************************************************************************/
async function getDbSQL(): Promise<SQLite.SQLiteDatabase> {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync(LOCAL_DATA_DEFAULTS.defaultDB);
  }
  return dbPromise;
}

/******************************************************************************************************************
 * [ASYNC] Run a write query (INSERT / UPDATE / DELETE).
 *
 * @param sql    - SQL statement with placeholders (e.g. ?, $id)
 * @param params - Values bound to the SQL placeholders (array or object)
 *
 * @return - Result containing affected row count and last insert ID (if applicable)
 ******************************************************************************************************************/
export async function runQuerySQL(
  sql: string,
  params?: any[] | Record<string, any>
): Promise<SQLite.SQLiteRunResult> {
  try {
    const db = await getDbSQL();

    // arr params -> positional bindings (?, ?)
    if (Array.isArray(params)) return await db.runAsync(sql, params);

    // obj params -> named bindings ($id, $value)
    if (params && typeof params === 'object') return await db.runAsync(sql, params);

    // No params
    return await db.runAsync(sql);
  } catch (e) {
    doErrLog('sql', 'runAsync', `${e}`);
    throw e;
  }
}

/******************************************************************************************************************
 * [ASYNC] Run a read query and return the first matching row.
 *
 * @param sql    - SQL SELECT statement with placeholders
 * @param params - Values bound to the SQL placeholders
 *
 * @return - First row object or undefined if no results
 ******************************************************************************************************************/
export async function readSingleRowSQL<T = any>(
  sql: string,
  params?: any[] | Record<string, any>
): Promise<T | null> {
  try {
    const db = await getDbSQL();

    // arr params -> positional bindings
    if (Array.isArray(params)) return (await db.getFirstAsync<T>(sql, params)) ?? null;

    // obj params -> named bindings
    if (params && typeof params === 'object') return (await db.getFirstAsync<T>(sql, params)) ?? null;

    return (await db.getFirstAsync<T>(sql)) ?? null;
  } catch (e) {
    doErrLog('sql', 'readSingleRow', `${e}`);
    throw e;
  }
}

/******************************************************************************************************************
 * [ASYNC] Run a read query and return all matching rows.
 *
 * @param sql    - SQL SELECT statement with placeholders
 * @param params - Values bound to the SQL placeholders
 *
 * @return - Array of row objects (empty if no results)
 ******************************************************************************************************************/
export async function readAllRowsSQL<T = any>(
  sql: string,
  params?: any[] | Record<string, any>
): Promise<T[]> {
  try {
    const db = await getDbSQL();

    // arr params -> positional bindings
    if (Array.isArray(params)) return (await db.getAllAsync<T>(sql, params)) ?? [];

    // obj params -> named bindings
    if (params && typeof params === 'object') return (await db.getAllAsync<T>(sql, params)) ?? [];

    return (await db.getAllAsync<T>(sql)) ?? [];
  } catch (e) {
    doErrLog('sql', 'readAllRows', `${e}`);
    throw e;
  }
}

/******************************************************************************************************************
 * [ASYNC] Run a read query and return an async cursor over matching rows.
 *
 * @param sql    - SQL SELECT statement with placeholders
 * @param params - Values bound to the SQL placeholders
 *
 * @return - Async iterable yielding rows one by one
 ******************************************************************************************************************/
export async function* cursorSQL<T = any>(
  sql: string,
  params?: any[] | Record<string, any>
): AsyncGenerator<T, void, void> {
  try {
    const db = await getDbSQL();

    // arr params -> positional bindings
    if (Array.isArray(params)) {
      for await (const row of db.getEachAsync<T>(sql, params)) yield row;
      return;
    }

    // obj params -> named bindings
    if (params && typeof params === 'object') {
      for await (const row of db.getEachAsync<T>(sql, params)) yield row;
      return;
    }

    for await (const row of db.getEachAsync<T>(sql)) yield row;
  } catch (e) {
    doErrLog('sql', 'cursor', `${e}`);
    throw e;
  }
}

/******************************************************************************************************************
 * [ASYNC] Reset DB connection (dev / test utility).
 *
 * NOTE:
 * - SQLite DB files persist automatically on disk
 * - You almost never need create/delete DB in production
 ******************************************************************************************************************/
export async function resetDbSQL(): Promise<void> {
  try {
    const db = await getDbSQL();
    await db.closeAsync();
    dbPromise = null;
  } catch (e) {
    doErrLog('sql', 'resetDb', `${e}`);
  }
}
