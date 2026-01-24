import React, { memo, ReactNode, useMemo } from 'react';
import { View, ScrollView, ViewStyle, FlexStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useAppTheme } from '../../Manager/App/AppThemeManager';
import { PadSpacingValue } from '../../Types';

type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse';

// lock flexgrow/shrink when flex = 0
const lockWhenZeroFlex = (flex?: number) =>
  flex === 0 ? { flexGrow: 0, flexShrink: 0 } : {};

// locks flexgrow/shrink when height is set
const lockWhenFixedHeight = (height?: number) =>
  height != null ? { height, flexGrow: 0, flexShrink: 0 } : {};

export type LayoutProps = {
  dir?: 'row' | 'column';
  reverse?: boolean;
  constraint?: 'wrap' | 'scroll' | 'none';
  keyboardAwareScroll?: boolean;
  flex?: number;
  pad?: PadSpacingValue;
  gap?: PadSpacingValue;
  height?: number;
  bgColor?: string;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  children: ReactNode;
};

/******************************************************************************************************************
 * A flexible element grouping container that defines structure and spacing for contained elements:
 *  - Does not support custom styling as that is out of scope for layout.
 *  - Use to wrap multiple child UI components.
 *
 * Notes:
 *  - If flex is not provided, the layout sizes to its content by default.
 *  - If a fixed height is provided, the layout will no longer flex unless flex={...} is explicitly specified.
 *
 * @param dir?                - Flex direction
 * @param reverse?            - Whether to render children in reverse order
 * @param constraint?         - Layout constraint mode
 * @param keyboardAwareScroll - If constraint is 'scroll' and you want the scroll to react to the keyboard
 * @param flex?               - Flex grow/shrink value for container
 * @param pad?                - Spacing around children
 * @param gap?                - Spacing between children
 * @param height?             - Fixed height for the container
 * @param bgColor?            - Background color
 * @param align?              - Cross-axis alignment
 * @param justify?            - Main-axis alignment
 * @param children            - Elements rendered inside
 ******************************************************************************************************************/
const Layout: React.FC<LayoutProps> = ({
  dir = 'column',
  reverse = false,
  constraint = 'none',
  keyboardAwareScroll = false,
  flex,
  pad,
  gap,
  height,
  bgColor = 'transparent',
  align,
  justify,
  children,
}) => {
  const { theme } = useAppTheme();

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

  const justifyContentValue: FlexStyle['justifyContent'] = (() => {
    if (justify === 'start') return 'flex-start';
    if (justify === 'center') return 'center';
    if (justify === 'end') return 'flex-end';
    if (justify === 'space-between') return 'space-between';
    if (justify === 'space-around') return 'space-around';
    if (justify === 'space-evenly') return 'space-evenly';
    return 'flex-start';
  })();

  /**
   * style
   */
  const contentStyle = useMemo<ViewStyle>(
    () => ({
      flexWrap,
      flexDirection: dir,
      justifyContent: justifyContentValue,
      alignItems: alignItemsValue,
      alignContent: alignContentValue,
      padding: pad ? pad * theme.design.padSize : 0,
      gap: gap ? gap * theme.design.padSize : 0,
      backgroundColor: bgColor,
    }),
    [
      flexWrap,
      dir,
      justifyContentValue,
      alignItemsValue,
      alignContentValue,
      pad,
      gap,
      bgColor,
      theme.design.padSize,
    ]
  );

  if (isScroll) {
    const commonProps = {
      horizontal: isRow,
      showsVerticalScrollIndicator: !isRow,
      showsHorizontalScrollIndicator: isRow,
      style: containerDims,
      contentContainerStyle: contentStyle,
      children: content,
    };

    if (keyboardAwareScroll) {
      return (
        <KeyboardAwareScrollView
          ScrollViewComponent={ScrollView}
          {...commonProps}
        />
      );
    }

    return <ScrollView {...commonProps} />;
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
export const VerticalLayout: React.FC<Omit<LayoutProps, 'dir'>> = memo((props) => (
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
export const HorizontalLayout: React.FC<Omit<LayoutProps, 'dir'>> = memo((props) => (
  <Layout {...props} dir='row' />
));
