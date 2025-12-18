/******************************************************************************************************************
 * Utility type that extracts keys from an object type whose values match a given type.
 *
 * Useful for:
 * - Deriving token keys from theme objects (eg. color tokens from ThemeColors)
 * - Constraining string unions to only valid keys with a specific value shape
 *
 * @template T - Source object type
 * @template V - Value type to filter by
 *
 * @example
 * ```ts
 * type ColorToken = KeysOfType<ThemeColors, string>;
 * // 'primary' | 'onPrimary' | 'background' | ...
 * ```
 ******************************************************************************************************************/
export type KeysOfType<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never
}[keyof T];
