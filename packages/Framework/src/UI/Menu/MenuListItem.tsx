import React, { memo } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import * as Const from '../../Const';
import { Text, TextProps } from '../Text/Text';
import { Icon, IconProps } from '../Text/Icon';
import { Touchable } from '../Interactive/Touchable';

/******************************************************************************************************************
 * Declarative description of a single menu action row.
 *
 * @property value       - Opaque value emitted on selection (e.g. route name, action key)
 * @property text        - Preferred text label
 * @property textOpts    - Optional text props (variant, color, bold, style, …)
 * @property icon        - Optional leading icon
 * @property iconOpts    - Optional icon props (variant, color/customColor, size, style, …)
 * @property disabled    - When true, the row is non-interactive and dimmed
 ******************************************************************************************************************/
export type MenuOption = {
  value: string;
  text?: string;
  textOpts?: TextProps;
  icon?: string;
  iconOpts?: IconProps;
  disabled?: boolean;
};

/******************************************************************************************************************
 * MenuListItem props.
 *
 * @property option      - The option to render
 * @property onPress     - Invoked with the option's value when pressed (no-op if disabled)
 * @property dense?      - Compact row density
 * @property align?      - Alignment of content
 ******************************************************************************************************************/
export type MenuListItemProps = {
  option: MenuOption;
  onPress: (value: string) => void;
  dense?: boolean;
  align?: 'start' | 'center';
};

/******************************************************************************************************************
 * A single interactive row within a menu list.
 *
 * @usage
 * ```tsx
 * <MenuListItem
 *   option={{ text: 'Settings', value: 'settings', icon: 'cog' }}
 *   onPress={(v) => console.log('pressed', v)}
 * />
 * ```
 ******************************************************************************************************************/
export const MenuListItem: React.FC<MenuListItemProps> = memo(
  ({ option, onPress, dense = false, align = 'start' }) => {
    const paddingX = dense ? Const.padSize025 : Const.padSize;
    const paddingY = dense ? Const.padSize : Const.padSize * 2;
    const disabled = !!option.disabled;

    const wrapperStyle: ViewStyle = {
      paddingHorizontal: paddingX,
      paddingVertical: paddingY,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: align === 'center' ? 'center' : 'flex-start',
    };

    const iconMargin = dense
      ? styles.iconMarginDense
      : styles.iconMarginRegular;

    const iconOverride = option.iconOpts?.style;
    const { style: _remove, ...restIconOpts } = option.iconOpts ?? {};

    const text = option.text ?? '';

    return (
      <Touchable
        pressOpacity={Const.pressOpacityHeavy}
        onPress={() => !disabled && onPress(option.value)}
        disabled={disabled}
        style={wrapperStyle}
      >
        <>
          {option.icon ? (
            <Icon
              source={option.icon}
              variant={dense ? 'sm' : 'md'}
              color={disabled ? 'disabled' : 'default'}
              style={[
                align === 'center' ? styles.iconCenteredMargin : iconMargin,
                iconOverride,
              ]}
              {...restIconOpts}
            />
          ) : null}

          {text ? (
            <Text
              variant={dense ? 'labelSmall' : 'labelMedium'}
              color={disabled ? 'disabled' : 'default'}
              {...option.textOpts}
            >
              {text}
            </Text>
          ) : null}
        </>
      </Touchable>
    );
  }
);

/******************************************************************************************************************
 * Styles.
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  iconMarginDense: {
    marginRight: Const.padSize,
  },
  iconMarginRegular: {
    marginRight: Const.padSize * 2,
  },
  // smaller, balanced spacing for centered layout
  iconCenteredMargin: {
    marginRight: Const.padSize,
  },
});
