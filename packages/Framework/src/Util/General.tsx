import * as Const from '../Const';

/******************************************************************************************************************
 * [ASYNC] Wrap a promise with a timeout that rejects if it does not settle within the given duration.
 *
 * @template T - Type of the wrapped promise result
 *
 * @param p     - Promise to wrap
 * @param ms    - Timeout duration in milliseconds
 * @param timeoutMsg - Timeout msg
 *
 * @return - A promise that resolves with the same value as p or rejects with timeout error
 *
 * @throws {Error} if the timeout is reached before p settles
 *
 * @usage
 * ```ts
 * const result = await withTimeout(fetchData(), 5000, "op timeout")
 * ```
 ******************************************************************************************************************/
export const withTimeout = <T,>(p: Promise<T>, ms: number, timeoutMsg: string) =>
  new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(timeoutMsg)), ms);
    p.then(
      v => { clearTimeout(t); resolve(v); },
      e => { clearTimeout(t); reject(e); }
    );
  });

/******************************************************************************************************************
 * Log a formatted message to the console with cyan module label and yellow function label.
 *
 * @param module  - Module name string
 * @param func    - Function name string
 * @param message - Message text to output
 *
 * @usage
 * ```ts
 * doLog('auth', 'login', 'user logged in successfully')
 * ```
 ******************************************************************************************************************/
export function doLog(module: string, func: string, message: string) {
  let str = '';
  if (module) str += `${Const.logColors.cyan}[${module.charAt(0).toUpperCase() + module.slice(1)}]${Const.logColors.reset} `;
  if (func) str += `${Const.logColors.yellow}${func}:${Const.logColors.reset} `;
  str += message;
  console.log(str);
};

/******************************************************************************************************************
 * Log an error message to the console with red module label and yellow function label.
 *
 * @param module  - Class/Module name string
 * @param func    - Function name string
 * @param message - Error text to output
 *
 * @usage
 * ```ts
 * doErrLog('auth', 'login', 'failed to log in')
 * ```
 ******************************************************************************************************************/
export function doErrLog(module: string, func: string, message: string) {
  let str = '';
  if (module) str += `${Const.logColors.red}[${module.charAt(0).toUpperCase() + module.slice(1)}]${Const.logColors.reset} `;
  if (func) str += `${Const.logColors.yellow}${func}:${Const.logColors.reset} `;
  str += message;
  console.log(str);
};

/******************************************************************************************************************
 * Deep merge helper:
 * - Only applies keys that exist in `toMergeIn` AND are not undefined.
 * - Recursively merges **plain objects** (future-proof for nested tokens).
 * - Arrays are replaced.
 * - Non-plain objects (Date, RegExp, class instances, etc.) are replaced.
 *
 * @param base      - Source-of-truth object
 * @param toMergeIn - Partial override object
 *
 * @return - New merged object (base is not mutated)
 ******************************************************************************************************************/
export function deepMerge(base: any, toMergeIn: any) {
  if (toMergeIn === null || toMergeIn === undefined) return base;

  // helpers
  const isPlainObject = (v: any) =>
    Object.prototype.toString.call(v) === '[object Object]';

  // primitives / functions: replace
  const baseIsObj = typeof base === 'object' && base !== null;
  const mergeIsObj = typeof toMergeIn === 'object' && toMergeIn !== null;
  if (!baseIsObj || !mergeIsObj) return toMergeIn;

  // arrays: replace (no deep merging for arrays)
  if (Array.isArray(base) || Array.isArray(toMergeIn)) {
    return Array.isArray(toMergeIn) ? toMergeIn : base;
  }

  // non-plain objects: replace
  if (!isPlainObject(base) || !isPlainObject(toMergeIn)) {
    return toMergeIn;
  }

  const out: any = { ...base };

  for (const key of Object.keys(toMergeIn)) {
    const nextVal = toMergeIn[key];

    // only apply explicitly defined keys
    if (nextVal === undefined) continue;

    out[key] = deepMerge(base[key], nextVal);
  }

  return out;
}
