import React, { memo, useCallback, useState } from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Switch as PaperSwitch } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

export type SwitchProps = {
  value: boolean;
  onValueChange: (val: boolean) => void;
  disabled?: boolean;
  color?: string;
};

/******************************************************************************************************************
 * Switch
 *
 * A thin wrapper around React Native Paper's Switch with navigation-focus remount.
 * This helps avoid cases where the Switch "snaps" instead of animating after leaving and re-entering a screen.
 *
 * Note:
 * - remountOnFocus assumes this component is rendered inside a React Navigation screen.
 * - https://github.com/react-navigation/react-navigation/issues/8658
 * 
 * @param value             - Current on/off value
 * @param onValueChange     - Callback fired when the value changes
 * @param disabled?         - Disable interaction
 * @param color?            - Active color (Paper Switch color)
 ******************************************************************************************************************/
export const Switch: React.FC<SwitchProps> = memo(
  ({
    value,
    onValueChange,
    disabled = false,
    color
  }) => {
    const [switchKey, setSwitchKey] = useState(0);

    /**************************************************************************************************************
     * Screen focus handler.
     *
     * Remount the underlying Paper Switch to restore smooth animation after navigating away and back.
     **************************************************************************************************************/
    useFocusEffect(
      useCallback(() => {
        const t = setTimeout(() => {
          setSwitchKey(k => k + 1);
        }, 10);
        return () => clearTimeout(t);
      }, [])
    );

    return (
      <PaperSwitch
        key={`ui-switch-${switchKey}`}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        {...(color !== undefined ? { color } : {})}
        style={styles.base}
      />
    );
  }
);

/******************************************************************************************************************
 * Styles
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  base: {},
});
