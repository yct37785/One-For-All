import React, { memo, useEffect, useState, useMemo } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Chip } from '../Data/Chip';
import { useAppTheme } from '../../Manager/App/AppThemeManager';

/******************************************************************************************************************
 * ChipOptions props.
 * 
 * @property schema       - Available chip labels
 * @property onSelected   - Callback receiving updated selection
 * @property resetSignal? - Monotonically changing value that triggers a reset when it changes
 * @property style?       - Optional wrapper style
 ******************************************************************************************************************/
export type ChipOptionsProps = {
  schema: Set<string>;
  onSelected: (selectedValues: Set<string>) => void;
  resetSignal?: number;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * A collection of selectable chips representing tags or quick filters:
 * - Maintains local selection state and notifies parent of updates.
 * - Exposes a reset hook via `resetSignal` so the parent can clear selection.
 *
 * @usage
 * ```tsx
 * const [resetSignal, setResetSignal] = useState(0);
 *
 * <ChipOptions
 *   schema={new Set(['Apples', 'Bananas', 'Cherries'])}
 *   onSelected={setSelected}
 *   resetSignal={resetSignal}
 * />
 *
 * // somewhere in parent to reset:
 * setResetSignal(prev => prev + 1);
 * ```
 ******************************************************************************************************************/
export const ChipOptions: React.FC<ChipOptionsProps> = memo(
  ({ schema, onSelected, resetSignal, style }) => {
    const { theme } = useAppTheme();

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

    /**
     * React to external reset requests:
     * - Whenever resetSignal changes (and is defined), clear selection.
     */
    useEffect(() => {
      if (resetSignal === undefined) return;

      const empty = new Set<string>();
      setSelectedSet(empty);
      onSelected(empty);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetSignal]);

    /**
     * style
     */
    const styles = useMemo(
      () =>
        StyleSheet.create({
          container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
          },
          chipWrapper: {
            margin: theme.design.padSize05,
          },
        }),
      [theme]
    );

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
