import React, { memo, useState } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Chip } from '../Data/Chip';
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
 * A collection of selectable chips representing tags or quick filters:
 * - Maintains local selection state and notifies parent of updates.
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

          return (
            <View key={value} style={styles.chipWrapper}>
              <Chip
                label={value}
                selected={isSelected}
                onPress={() => onChipSelected(value)}
              />
            </View>
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
  chipWrapper: {
    margin: Const.padSize05,
  },
});
