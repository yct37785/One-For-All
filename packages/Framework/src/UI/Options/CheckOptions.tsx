import React, { memo } from 'react';
import { View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Text, Checkbox } from 'react-native-paper';
import * as Const from '../../Const';
import { BaseOptions, OptionState, OptionProps, OptionSchema } from './BaseOptions';

/******************************************************************************************************************
 * CheckOptions props.
 * 
 * @property schema     - Current options tree
 * @property setSchema  - State setter
 * @property style?     - Optional wrapper style
 ******************************************************************************************************************/
export type CheckOptionCompProps = {
  schema: OptionSchema;
  setSchema: (updatedSchema: OptionSchema) => void;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * Render a checkbox-based UI for the options tree powered by BaseOptions.
 * Shows checked, unchecked, and indeterminate states with recursive nesting.
 *
 * @usage
 * ```tsx
 * <CheckOptions schema={schema} setSchema={setSchema} />
 * ```
 ******************************************************************************************************************/
export const CheckOptions: React.FC<CheckOptionCompProps> = memo(
  ({ schema, setSchema, style }) => {
    /**
     * Renders a single checkbox option.
     */
    const renderCheckbox = ({
      option,
      onPress,
    }: {
      option: OptionProps;
      onPress: () => void;
    }) => {
      const status =
        option.state === OptionState.Selected
          ? 'checked'
          : option.state === OptionState.Unselected
          ? 'unchecked'
          : 'indeterminate';

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
        setSchema={setSchema}
        optionsContainer={(children) => children}
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
