import React, { memo } from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Picker as RNPicker } from '@react-native-picker/picker';
import { useAppTheme } from '../../App/AppThemeManager';

/******************************************************************************************************************
 * Define a selectable option for the picker.
 *
 * @property label - Human-readable text shown in the dropdown
 * @property value - Internal value associated with the option
 *
 * @usage
 * ```ts
 * const opts: PickerOption[] = [
 *   { label: 'option a', value: 'a' },
 *   { label: 'option b', value: 'b' },
 * ]
 * ```
 ******************************************************************************************************************/
export type PickerOption = {
  label: string;
  value: string;
};

export type PickerProps = {
  value: string;
  options: PickerOption[];
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * A dropdown selector allowing the user to choose one value from a list.
 * 
 * @param value      - Current selected value
 * @param options    - Array of options to display
 * @param onChange   - Callback fired when selection changes
 * @param style?     - Optional style override for the picker
 * 
 * @usage
 * ```tsx
 * <Picker
 *   value={selected}
 *   options={[{ label: 'option a', value: 'a' }, { label: 'option b', value: 'b' }]}
 *   onChange={setSelected}
 * />
 * ```
 ******************************************************************************************************************/
export const Picker: React.FC<PickerProps> = memo(
  ({ value, options, onChange, style }) => {
    const { theme } = useAppTheme();

    const pickerStyle = [
      styles.pickerBase,
      {
        color: theme.colors.onSurface,
        backgroundColor: theme.colors.surface,
      },
      style,
    ];

    return (
      <RNPicker
        mode='dropdown'
        style={pickerStyle}
        dropdownIconColor={theme.colors.onSurface}
        selectedValue={value}
        onValueChange={onChange}
      >
        {options.map((item) => (
          <RNPicker.Item
            key={String(item.value ?? item.label)}
            label={item.label}
            value={item.value}
            color={theme.colors.onSurface}
            style={{ backgroundColor: theme.colors.background }}
          />
        ))}
      </RNPicker>
    );
  }
);

/******************************************************************************************************************
 * Styles
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  pickerBase: {
    width: '100%',
  },
});
