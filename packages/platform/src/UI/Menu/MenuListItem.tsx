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
 * @param option    - Defined MenuOption
 * @param onPress   - Triggerred when this list item is click
 * @param dense     - Dense mode
 * @param align     - Child alignment (start or centered)
 ******************************************************************************************************************/
export const MenuListItem: React.FC<MenuListItemProps> = memo(
  ({ option, onPress, dense = false, align = 'start' }) => {
    const { theme } = useAppTheme();
    const disabled = !!option.disabled;

    const paddingY = dense
      ? theme.design.padSize
      : theme.design.padSize * 2;

    const styles = useMemo(
      () =>
        StyleSheet.create({
          wrapper: {
            paddingHorizontal: theme.design.padSize,
            paddingVertical: paddingY,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: align === 'center' ? 'center' : 'flex-start',
          },
          iconMarginDense: {
            marginRight: theme.design.padSize,
          },
          iconMarginRegular: {
            marginRight: theme.design.padSize * 2,
          },
          iconCenteredMargin: {
            marginRight: theme.design.padSize,
          },
        }),
      [theme, paddingY, align]
    );

    const iconMargin =
      align === 'center'
        ? styles.iconCenteredMargin
        : dense
        ? styles.iconMarginDense
        : styles.iconMarginRegular;

    // Disabled color always wins
    const disabledColor = theme.colors.onSurfaceDisabled;

    const resolvedTextOpts: TextProps | undefined = option.text
      ? {
          ...option.textOpts,
          color: disabled ? disabledColor : option.textOpts?.color,
        }
      : undefined;

    const resolvedIconOpts: IconProps | undefined = option.icon
      ? {
          ...option.iconOpts,
          color: disabled ? disabledColor : option.iconOpts?.color,
        }
      : undefined;

    return (
      <Touchable
        disabled={disabled}
        onPress={() => !disabled && onPress(option.value)}
        style={styles.wrapper}
      >
        <>
          {option.icon ? (
            <Icon
              source={option.icon}
              variant={dense ? 'sm' : 'md'}
              style={iconMargin}
              {...resolvedIconOpts}
            />
          ) : null}

          {option.text ? (
            <Text
              variant={dense ? 'labelSmall' : 'labelMedium'}
              {...resolvedTextOpts}
            >
              {option.text}
            </Text>
          ) : null}
        </>
      </Touchable>
    );
  }
);
