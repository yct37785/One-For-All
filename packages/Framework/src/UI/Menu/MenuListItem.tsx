import React, { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useAppTheme } from '../../Manager/App/AppThemeManager';
import { Text, TextProps } from '../Text/Text';
import { Icon, IconProps } from '../Text/Icon';
import { Touchable } from '../Interactive/Touchable';

/******************************************************************************************************************
 * Declarative description of a single menu action row.
 *
 * @param value       - Opaque value emitted on selection (e.g. route name, action key)
 * @param text        - Preferred text label
 * @param textOpts    - Optional text props (variant, color, bold, style, …)
 * @param icon        - Optional leading icon
 * @param iconOpts    - Optional icon props (variant, color, size, style, …)
 * @param disabled    - When true, the row is non-interactive and dimmed
 ******************************************************************************************************************/
export type MenuOption = {
  value: string;
  text?: string;
  textOpts?: TextProps;
  icon?: string;
  iconOpts?: IconProps;
  disabled?: boolean;
};

export type MenuListItemProps = {
  option: MenuOption;
  onPress: (value: string) => void;
  dense?: boolean;
  align?: 'start' | 'center';
};

/******************************************************************************************************************
 * A single interactive row within a menu list.
 * 
 * @param option      - The option to render
 * @param onPress     - Invoked with the option's value when pressed (no-op if disabled)
 * @param dense?      - Compact row density
 * @param align?      - Alignment of content
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
    const { theme } = useAppTheme();
    const paddingY = dense ? theme.design.padSize : theme.design.padSize * 2;
    const disabled = !!option.disabled;

    /**
     * style
     */
    const styles = useMemo(
      () =>
        StyleSheet.create({
          iconMarginDense: {
            marginRight: theme.design.padSize,
          },
          iconMarginRegular: {
            marginRight: theme.design.padSize * 2,
          },
          // smaller, balanced spacing for centered layout
          iconCenteredMargin: {
            marginRight: theme.design.padSize,
          },
          wrapper: {
            paddingHorizontal: theme.design.padSize,
            paddingVertical: paddingY,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: align === 'center' ? 'center' : 'flex-start',
          },
        }),
      [theme]
    );

    const iconMargin = dense
      ? styles.iconMarginDense
      : styles.iconMarginRegular;

    const iconOverride = option.iconOpts?.style;
    const { style: _remove, ...restIconOpts } = option.iconOpts ?? {};

    const text = option.text ?? '';

    return (
      <Touchable
        onPress={() => !disabled && onPress(option.value)}
        disabled={disabled}
        style={styles.wrapper}
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
