import React, { memo } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

/******************************************************************************************************************
 * Define the set of selectable radio options for a group.
 * each key is the internal value and each value is the display label.
 *
 * @usage
 * ```ts
 * const options: RadioGroupOptions = { red: 'red', blue: 'blue', green: 'green' }
 * ```
 ******************************************************************************************************************/
export type RadioGroupOptions = {
  [key: string]: string;
};

/******************************************************************************************************************
 * RadioGroup props.
 * 
 * @property options        - Key/label pairs for the group
 * @property value          - Currently selected key
 * @property onValueChange  - Callback when a new option is selected
 * @property style?         - Optional container style
 ******************************************************************************************************************/
export type RadioGroupProps = {
  options: RadioGroupOptions;
  value: string;
  onValueChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * A set of mutually exclusive radio options allowing only one selection.
 *
 * @usage
 * ```tsx
 * <RadioGroup
 *   options={{ red: 'red', blue: 'blue', green: 'green' }}
 *   value={selected}
 *   onValueChange={setSelected}
 * />
 * ```
 ******************************************************************************************************************/
export const RadioGroup: React.FC<RadioGroupProps> = memo(
  ({ options, value, onValueChange, style }) => {
    return (
      <RadioButton.Group onValueChange={onValueChange} value={value}>
        <View style={[styles.row, style]}>
          {Object.entries(options).map(([key, label]) => (
            <View key={key} style={styles.item}>
              <Text>{label}</Text>
              <RadioButton value={key} />
            </View>
          ))}
        </View>
      </RadioButton.Group>
    );
  }
);

/******************************************************************************************************************
 * Styles.
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
});
