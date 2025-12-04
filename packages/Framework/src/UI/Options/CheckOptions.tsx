import React, { memo, ReactNode } from 'react';
import { View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Text, Checkbox } from 'react-native-paper';
import * as Const from '../../Const';
import {
  BaseOptions,
  OptionState,
  OptionProps,
  OptionSchema,
  OptionValue,
} from './BaseOptions';

/******************************************************************************************************************
 * CheckOptions props.
 * 
 * @property schema     - Immutable options tree (labels + hierarchy)
 * @property value      - Mutable option state tree (mirrors schema structure)
 * @property onChange   - State setter
 * @property style?     - Optional wrapper style
 ******************************************************************************************************************/
export type CheckOptionCompProps = {
  schema: OptionSchema;
  value: OptionValue;
  onChange: (updatedValue: OptionValue) => void;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * Simple container that just renders its children.
 * BaseOptions uses this as <OptionsContainer>{children}</OptionsContainer>.
 ******************************************************************************************************************/
const OptionsContainer: React.FC<{ children: ReactNode }> = ({ children }) => (
  <>{children}</>
);

/******************************************************************************************************************
 * CheckOptions
 *
 * Renders a nested tree of checkbox options backed by BaseOptions.
 ******************************************************************************************************************/
export const CheckOptions: React.FC<CheckOptionCompProps> = memo(
  ({ schema, value, onChange, style }) => {
    /**************************************************************************************************************
     * Renders a single checkbox option row.
     **************************************************************************************************************/
    const renderCheckbox = ({
      option,
      onPress,
    }: {
      option: OptionProps;
      onPress: () => void;
    }) => {
      const status: 'checked' | 'unchecked' | 'indeterminate' =
        option.state === OptionState.Selected
          ? 'checked'
          : option.state === OptionState.Indeterminate
          ? 'indeterminate'
          : 'unchecked';

      return (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.row}>
            <Checkbox status={status} />
            <Text>{option.label}</Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <BaseOptions
        schema={schema}
        value={value}
        onChange={onChange}
        optionsContainer={OptionsContainer}
        renderOption={renderCheckbox}
        depthPadding={Const.padSize * 2}
        style={style}
      />
    );
  }
);

/******************************************************************************************************************
 * Styles.
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
