import React, { memo } from 'react';
import { View, StyleProp, ViewStyle, FlexStyle } from 'react-native';
import { PadSpacingValue } from '../../Types';
import { useAppTheme } from '../../State/AppThemeManager';

export type BoxProps = {
  bgColor?: string;

  flex?: number;
  dir?: FlexStyle['flexDirection'];
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
  self?: ViewStyle['alignSelf'];

  w?: ViewStyle['width'];
  h?: ViewStyle['height'];

  br?: number;
  brtl?: number;
  brtr?: number;
  brbl?: number;
  brbr?: number;

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

/******************************************************************************************************************
 * A drawable container, it holds content and applies styling, but does not decide spatial arrangement of siblings.
 *  - Think of it as an element in a layout.
 *  - Use to wrap singular child UI components.
 * 
 * @param bgColor?  - Background color of the container
 * 
 * @param flex?     - Flex value to control layout behavior
 * @param dir?      - Flex direction
 * @param align?    - Item alignment cross axis
 * @param justify?  - Item alignment along axis
 * @param self?     - Align self (cross-axis alignment)
 * 
 * @param w?   - Width
 * @param h?   - Height
 * 
 * @param br?  - Uniform border radius
 * @param brtl?  - Border radius top left
 * @param brtr?  - Border radius top right
 * @param brbl?  - Border radius bottom left
 * @param brbr?  - Border radius bottom left
 * 
 * @param p?   - Uniform padding
 * @param m?   - Uniform margin
 * 
 * @param ph?  - Horizontal padding (left + right)
 * @param pv?  - Vertical padding (top + bottom)
 * @param mh?  - Horizontal margin  (left + right)
 * @param mv?  - Vertical margin    (top + bottom)
 * 
 * @param pt?  - Padding top
 * @param pr?  - Padding right
 * @param pb?  - Padding bottom
 * @param pl?  - Padding left
 * 
 * @param mt?  - Margin top
 * @param mr?  - Margin right
 * @param mb?  - Margin bottom
 * @param ml?  - Margin left
 * 
 * @param style?         - Optional container style
 * @param children       - Content
 * 
 * @usage
 * ```tsx
 * <Box p={2} ph={3} bgColor="#eee">
 *   <Text>Content with padding</Text>
 * </Box>
 * ```
 ******************************************************************************************************************/
export const Box: React.FC<BoxProps> = memo(
  ({
    bgColor = 'transparent',
    flex,
    dir,
    align,
    justify,
    self,
    w, h,
    br,
    brtl, brtr,
    brbl, brbr,
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

        // dimens
        width: w,
        height: h,

        // border radius
        borderRadius: br,
        borderTopLeftRadius: brtl,
        borderTopRightRadius: brtr,
        borderBottomLeftRadius: brbl,
        borderBottomRightRadius: brbr,

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
