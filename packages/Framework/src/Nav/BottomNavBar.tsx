import React, { memo } from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import * as Const from '../Const';
import { Touchable } from '../UI/Interactive/Touchable';
import { Text, TextProps } from '../UI/Text/Text';
import { Icon, IconProps } from '../UI/Text/Icon';

/******************************************************************************************************************
 * Bottom nav bar item.
 *
 * @property value        - Navigation key / route name
 * @property text?        - Optional label
 * @property textOpts?    - Optional text props overrides (variant, color, bold, underline, etc.)
 * @property icon?        - Optional icon source
 * @property iconOpts?    - Optional icon props overrides (variant, color/customColor, style wrapper, etc.)
 * @property disabled?    - When true, item is non-interactive
 ******************************************************************************************************************/
export type BottomNavBarItem = {
  value: string;
  text?: string;
  textOpts?: TextProps;
  icon?: string;
  iconOpts?: IconProps;
  disabled?: boolean;
};

/******************************************************************************************************************
 * BottomNavBar props.
 *
 * @property items                 - Navigation items (order preserved)
 * @property selectedValue?        - Currently selected route key
 * @property onSelect              - Called with selected item's value
 * @property dense?                - Compact layout
 * @property style?                - Optional container style override
 * @property itemStyle?            - Optional wrapper style for each tab item touch area
 * @property iconContainerStyle?   - Optional container style for icon wrapper area
 * @property labelContainerStyle?  - Optional container style for label wrapper area
 * @property gap?                  - Vertical gap between icon and label when both exist
 ******************************************************************************************************************/
export type BottomNavBarProps = {
  items: BottomNavBarItem[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  dense?: boolean;
  style?: ViewStyle;
  itemStyle?: ViewStyle;
  iconContainerStyle?: ViewStyle;
  labelContainerStyle?: ViewStyle;
  gap?: number;
};

/******************************************************************************************************************
 * BottomNavBar
 *
 * Navigation UI for bottom tab bars.
 *
 * Supports:
 * - icon-only tabs
 * - label-only tabs
 * - icon + label tabs (icon on top, label on bottom)
 ******************************************************************************************************************/
export const BottomNavBar: React.FC<BottomNavBarProps> = memo(
  ({
    items,
    selectedValue,
    onSelect,
    dense = false,
    style,
    itemStyle,
    iconContainerStyle,
    labelContainerStyle,
    gap,
  }) => {
    const paddingY = dense ? Const.padSize025 : Const.padSize05;
    const iconVariant: IconProps['variant'] = dense ? 'sm' : 'md';
    const labelVariant: TextProps['variant'] = dense ? 'labelSmall' : 'labelMedium';
    const resolvedGap = gap !== undefined ? gap : (dense ? Const.padSize025 : Const.padSize05);

    return (
      <View style={[styles.row, { paddingVertical: paddingY }, style]}>
        {items.map((item, idx) => {
          const disabled = !!item.disabled;
          const isSelected = selectedValue !== undefined && item.value === selectedValue;

          const hasIcon = !!item.icon;
          const hasText = !!item.text;

          // caller can override by supplying explicit color/customColor in textOpts/iconOpts
          const defaultColor: TextProps['color'] =
            disabled ? 'disabled' : isSelected ? 'primary' : 'default';

          // merge icon style safely (IconProps has style, TextProps does not)
          const iconStyle: StyleProp<ViewStyle> = [
            styles.iconContainer,
            iconContainerStyle,
            hasIcon && hasText ? { marginBottom: resolvedGap } : null,
            item.iconOpts?.style,
          ];

          // prevent passing style twice to Icon (we merged it above)
          const { style: _iconStyleRemove, ...iconOptsRest } = item.iconOpts ?? {};

          return (
            <Touchable
              key={`${item.value}-${idx}`}
              onPress={() => !disabled && onSelect(item.value)}
              disabled={disabled}
              pressOpacity={Const.pressOpacityHeavy}
              style={[styles.itemButton, itemStyle]}
            >
              <>
                {/* icon-only OR icon+label */}
                {hasIcon ? (
                  <View style={iconStyle}>
                    <Icon
                      source={item.icon as string}
                      variant={iconVariant}
                      color={defaultColor}
                      {...iconOptsRest}
                    />
                  </View>
                ) : null}

                {/* label-only OR icon+label */}
                {hasText ? (
                  <View style={[styles.labelContainer, labelContainerStyle]}>
                    <Text
                      variant={labelVariant}
                      color={defaultColor}
                      {...item.textOpts}
                    >
                      {item.text as string}
                    </Text>
                  </View>
                ) : null}
              </>
            </Touchable>
          );
        })}
      </View>
    );
  }
);

/******************************************************************************************************************
 * Styles
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Const.padSize,
  },

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  labelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
