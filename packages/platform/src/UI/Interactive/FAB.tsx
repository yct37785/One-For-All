import React, { memo } from 'react';
import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { FAB as PaperFAB } from 'react-native-paper';
import { useAppTheme } from '../../Manager/App/AppThemeManager';
import { PadSpacingValue } from '../../Types';

export type FABPlacement =
  | 'bottom-right'
  | 'bottom-left'
  | 'top-right'
  | 'top-left';

export type FABProps = {
  icon: string;
  label?: string;
  placement?: FABPlacement;
  offset?: PadSpacingValue;
  disabled?: boolean;
  loading?: boolean;
  color?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: (e: GestureResponderEvent) => void;
};

/******************************************************************************************************************
 * Floating Action Button (FAB):
 * - Layout is caller-controlled by default.
 * - If placement is provided, FAB becomes absolutely positioned in that corner.
 * - If loading is true, press is blocked (without changing disabled visuals).
 *
 * @param icon       - Icon name (required)
 * @param label      - Optional label for an "extended" FAB
 * @param placement  - Optional corner placement that enables absolute positioning, if not inline
 * @param offset     - Spacing from the selected corner
 * @param disabled   - Disables interaction and applies disabled visuals
 * @param loading    - Blocks presses while busy (does not force disabled visuals)
 * @param color      - Optional background color override (escape hatch)
 * @param style      - Additional styles (merged after placement styles)
 * @param onPress    - Press handler
 *
 * @usage
 * ```tsx
 * // absolute FAB in bottom-right corner
 * <UI.FAB icon="plus" placement="bottom-right" onPress={createItem} />
 *
 * // inline/normal layout FAB (parent controls layout)
 * <UI.FAB icon="pencil" label="Edit" onPress={onEdit} />
 * ```
 ******************************************************************************************************************/
export const FAB: React.FC<FABProps> = memo(
  ({ placement, offset = 2, loading, onPress, style, ...rest }) => {
    const { theme } = useAppTheme();

    const resolvedOnPress = loading ? undefined : onPress;
    const resolvedOffset = offset * theme.design.padSize;

    const placementStyle: ViewStyle | null = placement
      ? {
          position: 'absolute',
          ...(placement.startsWith('bottom') ? { bottom: resolvedOffset } : { top: resolvedOffset }),
          ...(placement.endsWith('right') ? { right: resolvedOffset } : { left: resolvedOffset }),
        }
      : null;

    const resolvedStyle: StyleProp<ViewStyle> = [placementStyle, style];

    return (
      <PaperFAB
        theme={theme}
        onPress={resolvedOnPress}
        style={resolvedStyle}
        {...rest}
      />
    );
  }
);
