import React, { memo, ReactNode } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Icon as PaperIcon, useTheme } from 'react-native-paper';

/******************************************************************************************************************
 * IconVariant
 *
 * Prefixed size variants for icons. These map to pixel sizes.
 ******************************************************************************************************************/
export type IconVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
// variant > size map
export const iconVariantSizeMap: Record<IconVariant, number> = {
  xs: 14,
  sm: 18,
  md: 24,
  lg: 32,
  xl: 40,
};

/******************************************************************************************************************
 * Icon props.
 *
 * @property variant?        - Prefixed size variant ('xs'|'sm'|'md'|'lg'|'xl'), defaults to 'md'
 * @property color?          - Icon color
 * @property style?          - Container style for outer wrapper
 ******************************************************************************************************************/
export type IconProps = {
  variant?: IconVariant;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * A theme-aware icon that uses TextColor tokens for color and supports prefixed size variants.
 * - The `variant` maps to pixel sizes; if `size` is provided, it takes precedence.
 * 
 * Icon names here: https://pictogrammers.com/library/mdi/
 * 
 * @property source - Icon source (dependent on icon source under the hood)
 * 
 * @usage
 * ```tsx
 * <Icon source="home" />
 * <Icon source="star" variant="lg" color="primary" />
 * <Icon source="bell" size={28} color="label" />
 * ```
 ******************************************************************************************************************/
export const Icon: React.FC<IconProps & { source?: string }> = memo(
  ({ source, variant = 'md', color, style }) => {
    const theme = useTheme();
    const resolvedColor = color ?? theme.colors.onSurface;

    // resolve numeric size
    const pixel = iconVariantSizeMap[variant];

    const wrapperStyle: StyleProp<ViewStyle> = [styles.wrapper, style];

    return (
      <View style={wrapperStyle}>
        <PaperIcon source={source} size={pixel} color={resolvedColor} />
      </View>
    );
  }
);

/******************************************************************************************************************
 * Styles
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});