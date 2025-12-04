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
 * CheckOptions
 *
 * Renders a nested tree of checkbox options backed by BaseOptions.
 ******************************************************************************************************************/
export const CheckOptions: React.FC<CheckOptionCompProps> = memo(
  ({ schema, setSchema, style }) => {
    /**
     * Renders a single checkbox option row.
     */
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

    /**
     * Simple container that just renders its children.
     * BaseOptions uses this as <OptionsContainer>{children}</OptionsContainer>.
     */
    const OptionsContainer: React.FC<{ children: React.ReactNode }> = ({
      children,
    }) => <>{children}</>;

    return (
      <BaseOptions
        schema={schema}
        setSchema={setSchema}
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
