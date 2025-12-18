import { ThemeColors } from '../Theme/Theme.types';
import { KeysOfType } from '../Util/Template';

// only allow keys that resolve to string (excludes elevation)
export type ThemeColorToken = KeysOfType<ThemeColors, string>;

/******************************************************************************************************************
 * Single color prop:
 * - accepts theme color tokens (for IntelliSense + safety)
 * - also accepts raw strings (hex / rgba / named colors)
 *
 * Examples:
 * - 'primary'
 * - 'onSurface'
 * - '#ff00aa'
 * - 'rgba(255,0,0,0.5)'
 ******************************************************************************************************************/
export type AppColor = ThemeColorToken | (string & {});

/******************************************************************************************************************
 * Resolves an AppColor into a raw color string:
 * - Theme color tokens are resolved via theme colors
 * - Raw color strings are returned as-is
 * - Undefined input returns undefined
 *
 * @param colors    - Theme colors object (MD3 colors)
 * @param value     - AppColor (theme token or raw color)
 *
 * @returns - Raw color string or undefined
 ******************************************************************************************************************/
export function resolveAppColor(
  colors: ThemeColors,
  value?: AppColor
): string | undefined {
  if (!value) return undefined;

  // theme color token
  if (value in colors) {
    return colors[value as ThemeColorToken];
  }

  // raw color string
  return value;
}