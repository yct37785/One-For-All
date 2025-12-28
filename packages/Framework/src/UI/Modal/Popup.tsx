import React, { useRef, memo, ReactNode } from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { useAppTheme } from '../../Manager/App/AppThemeManager';
import { Touchable } from '../Interactive/Touchable';

/******************************************************************************************************************
 * Popup props.
 *
 * @property triggerComp    - Element that triggers the popup (do not attach onPress here).
 * @property disabled?      - Whether the trigger is disabled.
 * @property triggerContainerStyle? - Optional style for the trigger element used by the trigger.
 * @property style?         - Optional container style passed to <Menu>.
 * @property children       - Content of the popup menu (e.g., <MenuOption/> items).
 ******************************************************************************************************************/
export type PopupProps = {
  triggerComp: ReactNode;
  disabled?: boolean;
  triggerContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

/******************************************************************************************************************
 * A contextual floating menu or overlay triggered by a user action such as a button press.
 ******************************************************************************************************************/
export const Popup: React.FC<PopupProps> = memo(
  ({ triggerComp, disabled = false, triggerContainerStyle, style, children }) => {
    const menuRef = useRef<Menu | null>(null);
    const { theme } = useAppTheme();

    const triggerStyles = {
      TriggerTouchableComponent: Touchable,
      triggerOuterWrapper: triggerContainerStyle,
    };

    // key forces Menu to remount when theme mode changes (helps if library caches internal styles)
    const themeKey = theme.dark ? 'dark' : 'light';

    return (
      <Menu key={themeKey} ref={menuRef} style={[styles.menu, style]}>
        <MenuTrigger disabled={disabled} customStyles={triggerStyles}>
          {triggerComp}
        </MenuTrigger>

        <MenuOptions
          customStyles={{
            optionsContainer: {
              backgroundColor: theme.colors.elevation.level2,
              borderRadius: 12,
              paddingVertical: 6,
            },
            optionsWrapper: {
              backgroundColor: 'transparent',
            },
          }}
        >
          {children}
        </MenuOptions>
      </Menu>
    );
  }
);

/******************************************************************************************************************
 * Styles
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  menu: {
    justifyContent: 'center',
  },
});
