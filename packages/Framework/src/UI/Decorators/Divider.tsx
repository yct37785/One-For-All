import React, { memo } from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Divider as PaperDivider } from 'react-native-paper';
import * as Const from '../../Const';
import { PadSpacingValue } from '../../Types';

/******************************************************************************************************************
 * Divider props.
 *
 * @property orientation  - Line orientation ('horizontal' | 'vertical'), default: 'horizontal'
 * @property spacing?     - Margin applied before/after the line (dp). Vertical margin for horizontal dividers,
 *                          horizontal margin for vertical dividers.
 * @property margin?      - Margin applied along the axis (defaults 0)
 * @property style?       - Additional style for the divider
 ******************************************************************************************************************/
export type DividerProps = {
  orientation?: 'horizontal' | 'vertical';
  spacing?: PadSpacingValue;
  margin?: PadSpacingValue;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * A thin visual separator used to group or divide related UI content.
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

    // vertical divider
    if (orientation === 'vertical') {
      const vStyle: ViewStyle = {
        width: StyleSheet.hairlineWidth,
        height: '100%',
        marginHorizontal: spacing * Const.padSize,
        marginVertical: margin * Const.padSize
      };

      return <PaperDivider style={[styles.base, vStyle, style]} />;
    }

    // horizontal divider
    const hStyle: ViewStyle = {
      height: StyleSheet.hairlineWidth,
      marginVertical: spacing * Const.padSize,
      marginHorizontal: margin * Const.padSize,
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
