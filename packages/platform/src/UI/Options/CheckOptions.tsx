import React, { memo, ReactNode } from 'react';
import { View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Text, Checkbox } from 'react-native-paper';
import { useAppTheme } from '../../Manager/App/AppThemeManager';
import {
  BaseOptions,
  OptionState,
  OptionProps,
  OptionSchema,
  OptionValue,
} from './BaseOptions';

/******************************************************************************************************************
 * Simple container that just renders its children.
 * BaseOptions uses this as <OptionsContainer>{children}</OptionsContainer>.
 ******************************************************************************************************************/
const OptionsContainer: React.FC<{ children: ReactNode }> = ({ children }) => (
  <>{children}</>
);

export type CheckOptionCompProps = {
  schema: OptionSchema;
  value: OptionValue;
  onChange: (updatedValue: OptionValue) => void;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * Renders a nested tree of checkbox options backed by BaseOptions.
 * 
 * @param schema     - Immutable options tree (labels + hierarchy)
 * @param value      - Mutable option state tree (mirrors schema structure)
 * @param onChange   - State setter
 * @param style?     - Optional wrapper style
 ******************************************************************************************************************/
export const CheckOptions: React.FC<CheckOptionCompProps> = memo(
  ({ schema, value, onChange, style }) => {
    const { theme } = useAppTheme();

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
        depthPadding={theme.design.padSize * 2}
        style={style}
      />
    );
  }
);

/******************************************************************************************************************
 * Styles
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
