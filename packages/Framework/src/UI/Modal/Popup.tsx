import React, { useRef, memo, ReactNode } from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
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
 *
 * @usage
 * ```tsx
 * <Popup triggerComp={<IconButton icon="dots-vertical" />}>
 *   <MenuOption onSelect={doSomething} text="Option A" />
 *   <MenuOption onSelect={doOther} text="Option B" />
 * </Popup>
 * ```
 ******************************************************************************************************************/
export const Popup: React.FC<PopupProps> = memo(
  ({ triggerComp, disabled = false, triggerContainerStyle, style, children }) => {
    const menuRef = useRef<Menu | null>(null);

    const triggerStyles = {
      TriggerTouchableComponent: Touchable,
      triggerOuterWrapper: triggerContainerStyle,
    };

    return (
      <Menu ref={menuRef} style={[styles.menu, style]}>
        <MenuTrigger disabled={disabled} customStyles={triggerStyles}>
          {triggerComp}
        </MenuTrigger>
        <MenuOptions>{children}</MenuOptions>
      </Menu>
    );
  }
);

/******************************************************************************************************************
 * Styles.
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  menu: {
    justifyContent: 'center',
  },
});
