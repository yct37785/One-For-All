/******************************************************************************************************************
 * Demo color swatches
 *
 * Hardcoded, dark-mode-safe colors for demo / showcase screens.
 * These are NOT theme colors and intentionally live in the client app.
 ******************************************************************************************************************/
export type DemoColorSet = {
  neutral: string;
  neutralAlt: string;

  greenStrong: string;
  greenSoft: string;

  amber: string;
  red: string;

  orangeBg: string;
  skyBg: string;

  purpleBg: string;
  purpleA: string;
  purpleB: string;

  cyanBg: string;
  cyanA: string;
  cyanB: string;
  cyanC: string;

  listRowA: string;
  listRowB: string;
  listThumbBg: string;

  tier1: string;
  tier2: string;
  tier3: string;
};

/******************************************************************************************************************
 * getDemoColors
 *
 * @param isDarkMode - current app dark mode flag
 ******************************************************************************************************************/
export function getDemoColors(isDarkMode: boolean): DemoColorSet {
  return {
    // neutrals
    neutral: isDarkMode ? '#2b2f33' : '#eeeeee',
    neutralAlt: isDarkMode ? '#505757ff' : '#e0f2f1',

    // greens
    greenStrong: isDarkMode ? '#1f7a1f' : '#2eb82e',
    greenSoft: isDarkMode ? '#578d00ff' : '#9de923',

    // amber / yellow
    amber: isDarkMode ? '#836900ff' : '#ffdd55',

    // red
    red: isDarkMode ? '#9c0000ff' : '#ff9999',

    // backgrounds
    orangeBg: isDarkMode ? '#4a3320' : '#ffe0b2',
    skyBg: isDarkMode ? '#1b3442' : '#e1f5fe',

    // purple
    purpleBg: isDarkMode ? '#2f2435' : '#f3e5f5',
    purpleA: isDarkMode ? '#4a2e5a' : '#ce93d8',
    purpleB: isDarkMode ? '#5c3473' : '#ba68c8',

    // cyan / teal
    cyanBg: isDarkMode ? '#17363b' : '#e0f7fa',
    cyanA: isDarkMode ? '#1f6570' : '#4dd0e1',
    cyanB: isDarkMode ? '#1b7482' : '#26c6da',
    cyanC: isDarkMode ? '#198291' : '#00acc1',

    // list rows (subtle alternation)
    listRowA: isDarkMode ? '#101316' : '#ffffff',
    listRowB: isDarkMode ? '#151a1f' : '#fafafa',

    // optional: used behind thumbnails if image fails / loads slowly
    listThumbBg: isDarkMode ? '#232a31' : '#eeeeee',

    // tiers
    tier1: isDarkMode ? '#121417' : '#f0f1f5ff',
    tier2: isDarkMode ? '#1d2227ff' : '#e0e1e6ff',
    tier3: isDarkMode ? '#2d343bff' : '#bdc0c4ff',
  };
}
