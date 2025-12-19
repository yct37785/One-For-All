import React, { memo } from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Box } from '../UI/Container/Box';
import { Touchable } from '../UI/Interactive/Touchable';
import { Text, TextProps } from '../UI/Text/Text';
import { Icon, IconProps } from '../UI/Text/Icon';
import { useAppTheme } from '../Manager/AppThemeManager';
import * as Const from '../Const';

// defaults (can be overridden per item via iconOpts/textOpts)
const defaultIconVariant: IconProps['variant'] = 'sm';
const defaultLabelVariant: TextProps['variant'] = 'labelSmall';

/******************************************************************************************************************
 * Bottom nav bar item.
 *
 * @property value        - Navigation key / route name
 * @property text?        - Optional label
 * @property textOpts?    - Optional text props overrides
 * @property icon?        - Optional icon source
 * @property iconOpts?    - Optional icon props overrides
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
 * @property style?                - Optional container style override
 * @property itemStyle?            - Optional wrapper style for each tab item touch area
 ******************************************************************************************************************/
export type BottomNavBarProps = {
  items: BottomNavBarItem[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  style?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
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
    style,
    itemStyle,
  }) => {
    const { theme } = useAppTheme();

    return (
      <Box dir='row' align='center' bgColor={theme.colors.elevation.level2} flex={0}
        style={[
          styles.root,
          { borderTopColor: theme.colors.outlineVariant },
          style,
        ]}
      >
        {items.map((item, idx) => {
          const disabled = !!item.disabled;
          const isSelected = selectedValue !== undefined && item.value === selectedValue;

          // default color
          const color: TextProps['color'] =
            disabled ? theme.colors.onSurfaceDisabled : 
            isSelected ? theme.colors.primary : theme.colors.onSurface;

          return (
            // slot wrapper enforces equal-width distribution
            <Box key={`${item.value}-${idx}`} flex={1}>
              <Touchable
                onPress={() => !disabled && onSelect(item.value)}
                disabled={disabled}
                style={[styles.itemButton, itemStyle]}
              >
                <Box align='center' justify='center' flex={0}>
                  {item.icon ? (
                    <Box align='center' justify='center' flex={0}>
                      <Icon
                        source={item.icon}
                        variant={item.iconOpts?.variant ?? defaultIconVariant}
                        color={item.iconOpts?.color ?? color}
                        {...item.iconOpts}
                      />
                    </Box>
                  ) : null}

                  {item.text ? (
                    <Box align='center' justify='center' flex={0} mt={1}>
                      <Text
                        variant={item.textOpts?.variant ?? defaultLabelVariant}
                        color={item.textOpts?.color ?? color}
                        {...item.textOpts}
                      >
                        {item.text}
                      </Text>
                    </Box>
                  ) : null}
                </Box>
              </Touchable>
            </Box>
          );
        })}
      </Box>
    );
  }
);

/******************************************************************************************************************
 * Styles
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  root: {
    width: '100%',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  itemButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Const.padSize,
  },
});
