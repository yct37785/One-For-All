import React, { memo, useState } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Chip } from '../Data/Chip';
import { TextButton } from '../Interactive/TextButton';
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
 * - Provides a bottom-left "Reset" action to clear all selections.
 ******************************************************************************************************************/
export const ChipOptions: React.FC<ChipOptionsProps> = memo(
  ({ schema, onSelected, style }) => {
    const [selectedSet, setSelectedSet] = useState<Set<string>>(
      () => new Set()
    );

    /**
     * Handles chip toggle selection.
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

    /**
     * Resets all selections back to empty state.
     */
    function onReset() {
      const empty = new Set<string>();
      setSelectedSet(empty);
      onSelected(empty);
    }

    const hasSelection = selectedSet.size > 0;

    return (
      <View style={[styles.container, style]}>
        {/* chips */}
        <View style={styles.chipRow}>
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

        {/* reset action */}
        <View style={styles.resetWrapper}>
          <TextButton
            onPress={onReset}
            disabled={!hasSelection}
            textOpts={{ variant: 'labelSmall', color: 'label' }}
          >
            Reset
          </TextButton>
        </View>
      </View>
    );
  }
);

/******************************************************************************************************************
 * Styles.
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chipWrapper: {
    margin: Const.padSize05,
  },
  resetWrapper: {
    alignSelf: 'flex-start'
  },
});
