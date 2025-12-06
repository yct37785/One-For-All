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
