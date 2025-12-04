import React, { memo, useState } from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import * as Const from '../../Const';

/******************************************************************************************************************
 * ChipOptions props.
 * 
 * @property schema       - Available chip labels
 * @property onSelected   - Callback receiving updated selection
 * @property style?       - Optional wrapper style
 ******************************************************************************************************************/
export type ChipOptionsProps = {
  schema: Set<string>;
  onSelected: (selectedValues: Set<string>) => void;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * A collection of selectable chips representing tags or quick filters.
 * 
 * @usage
 * ```tsx
 * <ChipOptions
 *   schema={new Set(['Apples', 'Bananas', 'Cherries'])}
 *   onSelected={(values) => console.log('Selected chips:', values)}
 * />
 * ```
 ******************************************************************************************************************/
export const ChipOptions: React.FC<ChipOptionsProps> = memo(
  ({ schema, onSelected, style }) => {
    const theme = useTheme();
    const [selectedSet, setSelectedSet] = useState<Set<string>>(
      () => new Set()
    );

    /**
     * Handles chip toggle selection:
     * - If value already selected > remove it
     * - If not selected > add it
     * - Updates local state and triggers onSelected callback
     */
    function onChipSelected(value: string) {
      const updatedSet = new Set(selectedSet);
      if (updatedSet.has(value)) {
        updatedSet.delete(value);
      } else {
        updatedSet.add(value);
      }
      setSelectedSet(updatedSet);
      onSelected(updatedSet);
    }

    return (
      <View style={[styles.container, style]}>
        {Array.from(schema).map((value) => {
          const isSelected = selectedSet.has(value);

          const chipBackground = isSelected
            ? theme.colors.primaryContainer
            : theme.colors.surfaceVariant;

          const chipBorderColor = isSelected
            ? theme.colors.primary
            : theme.colors.outlineVariant ?? theme.colors.outline;

          const chipTextColor = isSelected
            ? theme.colors.onPrimaryContainer
            : theme.colors.onSurface;

          return (
            <TouchableOpacity
              key={value}
              onPress={() => onChipSelected(value)}
              style={[
                styles.chip,
                {
                  backgroundColor: chipBackground,
                  borderColor: chipBorderColor,
                },
              ]}
              activeOpacity={0.7}
            >
              <Text
                variant="labelMedium"
                style={{ color: chipTextColor }}
              >
                {value}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
);

/******************************************************************************************************************
 * Styles.
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    margin: Const.padSize05,
    paddingHorizontal: Const.padSize * 1.5,
    paddingVertical: Const.padSize * 0.5,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
