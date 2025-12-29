import React, { memo } from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Divider as PaperDivider } from 'react-native-paper';
import { useAppTheme } from '../../Manager/App/AppThemeManager';
import { PadSpacingValue } from '../../Types';

export type DividerProps = {
  orientation?: 'horizontal' | 'vertical';
  spacing?: PadSpacingValue;
  margin?: PadSpacingValue;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * A thin visual separator used to group or divide related UI content.
 * 
 * @param orientation  - Line orientation ('horizontal' | 'vertical'), default: 'horizontal'
 * @param spacing?     - Margin applied before/after the line (dp). Vertical margin for horizontal dividers,
 *                          horizontal margin for vertical dividers.
 * @param margin?      - Margin applied along the axis (defaults 0)
 * @param style?       - Additional style for the divider
 * 
 * @usage
 * ```tsx
 * <Divider spacing={1} />
 * <Divider orientation="vertical" style={{ height: 24 }} />
 * ```
 ******************************************************************************************************************/
export type DividerType = React.FC<DividerProps>;
export const Divider: DividerType = memo(
  ({ orientation = 'horizontal', spacing = 1, margin = 0, style }) => {
    const { theme } = useAppTheme();

    // vertical divider
    if (orientation === 'vertical') {
      const vStyle: ViewStyle = {
        width: StyleSheet.hairlineWidth,
        height: '100%',
        marginHorizontal: spacing * theme.design.padSize,
        marginVertical: margin * theme.design.padSize
      };

      return <PaperDivider style={[styles.base, vStyle, style]} />;
    }

    // horizontal divider
    const hStyle: ViewStyle = {
      height: StyleSheet.hairlineWidth,
      marginVertical: spacing * theme.design.padSize,
      marginHorizontal: margin * theme.design.padSize,
    };

    return <PaperDivider style={[styles.base, hStyle, style]} />;
  }
);

/******************************************************************************************************************
 * Styles
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  base: {
    alignSelf: 'stretch',
  },
});
