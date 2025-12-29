import React, { memo } from 'react';
import { View } from 'react-native';
import { MenuOption, MenuListItem } from './MenuListItem';
import { Divider } from '../Decorators/Divider';

export type MenuListProps = {
  options: MenuOption[];
  onSelect: (value: string) => void;
  showDividers?: boolean;
  dense?: boolean;
  align?: 'start' | 'center';
};

/******************************************************************************************************************
 * A structured list of selectable menu items, often used within dropdowns or popups.
 *
 * @param options          - Array of MenuOption rows to display (order preserved)
 * @param onSelect         - Callback invoked with the clicked option's `value`
 * @param showDividers?    - When true, draws a Divider between items
 * @param dense?           - When true, renders compact rows
 * @param align?           - Alignment of menu list item content
 * 
 * @usage
 * ```tsx
 * <MenuList
 *   options={[
 *     { label: 'Redo', value: 'redo', leadingIcon: 'redo' },
 *     { label: 'Undo', value: 'undo', leadingIcon: 'undo' },
 *     { label: 'Cut',  value: 'cut',  leadingIcon: 'content-cut', disabled: true },
 *   ]}
 *   onSelect={(v) => console.log('selected', v)}
 *   showDividers
 *   dense
 * />
 * ```
 ******************************************************************************************************************/
export const MenuList: React.FC<MenuListProps> = memo(
  ({
    options,
    onSelect,
    showDividers = false,
    dense = false,
    align = 'start',
  }) => {
    return (
      <View>
        {options.map((option, idx) => (
          <React.Fragment key={`${option.value}-${idx}`}>
            <MenuListItem
              option={option}
              onPress={onSelect}
              dense={dense}
              align={align}
            />

            {showDividers && idx < options.length - 1 ? (
              <Divider spacing={0} />
            ) : null}
          </React.Fragment>
        ))}
      </View>
    );
  }
);
