/**
 * Demo color palette
 *
 * Each color family has 3 tiers:
 *  _1 → light / background
 *  _2 → medium / container
 *  _3 → strong / emphasis
 *
 * Dark mode colors are adjusted to maintain contrast on dark surfaces.
 */

type DemoColors = Record<string, string>;

export const getDemoColors = (isDarkMode: boolean): DemoColors => {
  if (isDarkMode) {
    return {
      /* Neutral */
      neutral_1: '#1E1E1E',
      neutral_2: '#2A2A2A',
      neutral_3: '#3A3A3A',

      /* Green */
      green_1: '#2E4A3A',
      green_2: '#3E6B4F',
      green_3: '#5FAF7A',

      /* Amber */
      amber_1: '#4A3A1E',
      amber_2: '#6B5428',
      amber_3: '#E0A84F',

      /* Purple */
      purple_1: '#352A42',
      purple_2: '#4B3A63',
      purple_3: '#8B6BC1',

      /* Cyan */
      cyan_1: '#243C3F',
      cyan_2: '#2F5A5F',
      cyan_3: '#4FC3C7',

      /* Red */
      red_1: '#4A2323',
      red_2: '#6B2F2F',
      red_3: '#E57373',
    };
  }

  return {
    /* Neutral */
    neutral_1: '#F2F2F2',
    neutral_2: '#E0E0E0',
    neutral_3: '#CFCFCF',

    /* Green */
    green_1: '#E3F3EA',
    green_2: '#BFE3CF',
    green_3: '#4CAF7A',

    /* Amber */
    amber_1: '#FFF3E0',
    amber_2: '#FFD8A8',
    amber_3: '#FF9800',

    /* Purple */
    purple_1: '#F1EAFE',
    purple_2: '#D4C2F2',
    purple_3: '#7E57C2',

    /* Cyan */
    cyan_1: '#E0F4F7',
    cyan_2: '#B2E3EA',
    cyan_3: '#26C6DA',

    /* Red */
    red_1: '#FDECEA',
    red_2: '#F5B7B1',
    red_3: '#E53935',
  };
};
