import React, { memo, ReactNode } from 'react';
import { View, ScrollView, ViewStyle, FlexStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import * as Const from '../../Const';
import { PadSpacingValue } from '../../Types';

/******************************************************************************************************************
 * Utils and types.
 ******************************************************************************************************************/
type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse';

// lock flexgrow/shrink when flex = 0
const lockWhenZeroFlex = (flex?: number) =>
  flex === 0 ? { flexGrow: 0, flexShrink: 0 } : {};

// locks flexgrow/shrink when height is set
const lockWhenFixedHeight = (height?: number) =>
  height != null ? { height, flexGrow: 0, flexShrink: 0 } : {};

/******************************************************************************************************************
 * Base layout props.
 * 
 * @property dir?             - Flex direction
 * @property reverse?         - Whether to render children in reverse order
 * @property constraint?      - Layout constraint mode
 * @property flex?            - Flex grow/shrink value for container
 * @property padding?         - Spacing around children
 * @property gap?             - Spacing between children
 * @property height?          - Fixed height for the container
 * @property bgColor?         - Background color
 * @property align?           - Cross-axis alignment
 * @property children         - Elements rendered inside
 ******************************************************************************************************************/
export type LayoutProps = {
  dir?: 'row' | 'column';
  reverse?: boolean;
  constraint?: 'wrap' | 'scroll' | 'none';
  flex?: number;
  padding?: PadSpacingValue;
  gap?: PadSpacingValue;
  height?: number;
  bgColor?: string;
  align?: 'start' | 'center' | 'end' | 'stretch';
  children: ReactNode;
};

/******************************************************************************************************************
 * A flexible element grouping container that defines structure and spacing for contained elements.
 *  - Does not support custom styling as that is out of scope for layout.
 *  - Use to wrap multiple child UI components.
 * 
 * Notes:
 *  - If neither height nor flex is provided, the layout defaults to flex: 1 and fills available space.
 *  - If a fixed height is provided, the layout will no longer flex unless flex={...} is explicitly specified.
 ******************************************************************************************************************/
const Layout: React.FC<LayoutProps> = ({
  dir = 'column',
  reverse = false,
  constraint = 'none',
  flex = 1,
  padding = 1,
  gap = 1,
  height,
  bgColor = 'transparent',
  align,
  children,
}) => {
  // reverse children if requested
  const content = reverse
    ? React.Children.toArray(children).reverse()
    : children;

  // derived flags
  const isRow = dir === 'row';
  const isWrap = constraint === 'wrap';
  const isScroll = constraint === 'scroll';
  const flexWrap: FlexWrap = isWrap ? 'wrap' : 'nowrap';

  // outer wrapper (flex/height)
  const containerDims: ViewStyle = {
    ...(typeof flex === 'number' ? { flex } : {}),
    ...lockWhenZeroFlex(flex),       // stop filling when flex=0
    ...lockWhenFixedHeight(height),  // stop filling when height is set
  };

  // content style
  const alignContentValue: FlexStyle['alignContent'] = isWrap
    ? 'flex-start'
    : undefined;

  const alignItemsValue: FlexStyle['alignItems'] = (() => {
    if (align === 'start') return 'flex-start';
    if (align === 'center') return 'center';
    if (align === 'end') return 'flex-end';
    if (align === 'stretch') return 'stretch';
    return isWrap ? 'flex-start' : 'stretch';
  })();

  const contentStyle: ViewStyle = {
    flexWrap,
    flexDirection: dir,
    justifyContent: 'flex-start',
    alignItems: alignItemsValue,      // cross-axis alignment
    alignContent: alignContentValue,  // how rows stack (wrap)
    padding: padding * Const.padSize,
    gap: gap * Const.padSize,
    backgroundColor: bgColor,
  };

  if (isScroll) {
    return (
      <KeyboardAwareScrollView
        ScrollViewComponent={ScrollView}
        horizontal={isRow}
        showsVerticalScrollIndicator={!isRow}
        showsHorizontalScrollIndicator={isRow}
        style={containerDims}                 // dimensions on ScrollView
        contentContainerStyle={contentStyle}  // layout rules on inner content
      >
        {content}
      </KeyboardAwareScrollView>
    );
  }

  return <View style={[containerDims, contentStyle]}>{content}</View>;
};

/******************************************************************************************************************
 * Convenience wrapper for vertical stacking.
 *
 * @usage
 * ```tsx
 * <VerticalLayout gap={12}>
 *   <BlockA />
 *   <BlockB />
 * </VerticalLayout>
 * ```
 ******************************************************************************************************************/
export const VerticalLayout: React.FC<Omit<LayoutProps, 'direction'>> = memo((props) => (
  <Layout {...props} dir='column' />
));

/******************************************************************************************************************
 * Convenience wrapper for horizontal stacking.
 *
 * @usage
 * ```tsx
 * <HorizontalLayout gap={6}>
 *   <ButtonA />
 *   <ButtonB />
 * </HorizontalLayout>
 * ```
 ******************************************************************************************************************/
export const HorizontalLayout: React.FC<Omit<LayoutProps, 'direction'>> = memo((props) => (
  <Layout {...props} dir='row' />
));
