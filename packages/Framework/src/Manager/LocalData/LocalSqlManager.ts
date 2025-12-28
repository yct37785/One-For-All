import * as SQLite from 'expo-sqlite';
import { LOCAL_DATA_DEFAULTS } from '../../Defaults';
import { doErrLog } from '../../Util/General';

// DB singleton
let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

/******************************************************************************************************************
 * [ASYNC] Get or open the SQLite DB instance.
 ******************************************************************************************************************/
async function getDb(dbName: string = LOCAL_DATA_DEFAULTS.defaultDB): Promise<SQLite.SQLiteDatabase> {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync(dbName);
  }
  return dbPromise;
}

/******************************************************************************************************************
 * [ASYNC] Run a write query (INSERT / UPDATE / DELETE).
 ******************************************************************************************************************/
export async function runAsync(
  sql: string,
  params?: any[] | Record<string, any>,
  dbName?: string
): Promise<SQLite.SQLiteRunResult> {
  try {
    const db = await getDb(dbName);

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
 * [ASYNC] Read a single row (or null).
 ******************************************************************************************************************/
export async function readSingleRow<T = any>(
  sql: string,
  params?: any[] | Record<string, any>,
  dbName?: string
): Promise<T | null> {
  try {
    const db = await getDb(dbName);

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
 * [ASYNC] Read all rows into an array.
 ******************************************************************************************************************/
export async function readAllRows<T = any>(
  sql: string,
  params?: any[] | Record<string, any>,
  dbName?: string
): Promise<T[]> {
  try {
    const db = await getDb(dbName);

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
 * [ASYNC] Cursor iterator over rows (streaming).
 ******************************************************************************************************************/
export async function* cursor<T = any>(
  sql: string,
  params?: any[] | Record<string, any>,
  dbName?: string
): AsyncGenerator<T, void, void> {
  try {
    const db = await getDb(dbName);

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
export async function resetDb(dbName: string = LOCAL_DATA_DEFAULTS.defaultDB): Promise<void> {
  try {
    const db = await getDb(dbName);
    await db.closeAsync();
    dbPromise = null;
  } catch (e) {
    doErrLog('sql', 'resetDb', `${e}`);
  }
}
