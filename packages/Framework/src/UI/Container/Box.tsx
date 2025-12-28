import React, { memo } from 'react';
import { View, StyleProp, ViewStyle, FlexStyle } from 'react-native';
import { PadSpacingValue } from '../../Types';
import { useAppTheme } from '../../Manager/App/AppThemeManager';

/******************************************************************************************************************
 * A drawable container, it holds content and applies styling, but does not decide spatial arrangement of siblings.
 *  - Think of it as an element in a layout.
 *  - Use to wrap singular child UI components.
 * 
 * @property bgColor?  - Background color of the container
 * @property flex?     - Flex value to control layout behavior
 * @property dir?      - Flex direction
 * @property align?    - Align items
 * @property justify?  - Justify content
 * @property self?     - Align self (cross-axis alignment)
 * 
 * @property p?   - Uniform padding
 * @property m?   - Uniform margin
 * 
 * @property ph?  - Horizontal padding (left + right)
 * @property pv?  - Vertical padding (top + bottom)
 * @property mh?  - Horizontal margin  (left + right)
 * @property mv?  - Vertical margin    (top + bottom)
 * 
 * @property pt?  - Padding top
 * @property pr?  - Padding right
 * @property pb?  - Padding bottom
 * @property pl?  - Padding left
 * 
 * @property mt?  - Margin top
 * @property mr?  - Margin right
 * @property mb?  - Margin bottom
 * @property ml?  - Margin left
 * 
 * @property style?         - Optional container style
 * @property children       - Content
 * 
 * @usage
 * ```tsx
 * <Box p={2} ph={3} bgColor="#eee">
 *   <Text>Content with padding</Text>
 * </Box>
 * ```
 ******************************************************************************************************************/
export type BoxProps = {
  bgColor?: string;
  flex?: number;
  dir?: FlexStyle['flexDirection'];
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
  self?: ViewStyle['alignSelf'];

  p?: PadSpacingValue;
  m?: PadSpacingValue;

  ph?: PadSpacingValue;
  pv?: PadSpacingValue;
  mh?: PadSpacingValue;
  mv?: PadSpacingValue;

  pt?: PadSpacingValue;
  pr?: PadSpacingValue;
  pb?: PadSpacingValue;
  pl?: PadSpacingValue;

  mt?: PadSpacingValue;
  mr?: PadSpacingValue;
  mb?: PadSpacingValue;
  ml?: PadSpacingValue;

  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

export const Box: React.FC<BoxProps> = memo(
  ({
    bgColor = 'transparent',
    flex,
    dir,
    align,
    justify,
    self,
    p, m,
    pv, ph, mv, mh,
    pt, pr, pb, pl,
    mt, mr, mb, ml,
    style,
    children,
  }) => {
    const { theme } = useAppTheme();
    const padSize = theme.design.padSize;

    const spacing = (units?: number) =>
      units === undefined ? undefined : units * padSize;

    /**
     * style
     */
    const resolvedStyle = [
      {
        backgroundColor: bgColor,
        flex,
        flexDirection: dir,
        alignItems: align,
        justifyContent: justify,
        alignSelf: self,

        // padding
        padding: spacing(p),
        paddingVertical: spacing(pv),
        paddingHorizontal: spacing(ph),
        paddingTop: spacing(pt),
        paddingRight: spacing(pr),
        paddingBottom: spacing(pb),
        paddingLeft: spacing(pl),

        // margin
        margin: spacing(m),
        marginVertical: spacing(mv),
        marginHorizontal: spacing(mh),
        marginTop: spacing(mt),
        marginRight: spacing(mr),
        marginBottom: spacing(mb),
        marginLeft: spacing(ml),
      },
      style,
    ];

    return <View style={resolvedStyle}>{children}</View>;
  }
);
