import React, { memo, useState } from 'react';
import { Screen, UI } from 'framework';

/******************************************************************************************************************
 * Chip demo
 *
 * This screen demonstrates:
 * - UI.Chip: basic tags and filters
 * - Selected / disabled states
 * - Leading icons
 * - Closable chips (isClose)
 ******************************************************************************************************************/
const ChipScreen: Screen.ScreenType = ({}) => {
  // simple toggle state for “filter-like” chips
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(
    () => new Set(['All'])
  );

  // closable chips demo
  const initialTags = ['React', 'TypeScript', 'UI Kit'];
  const [activeTags, setActiveTags] = useState<string[]>(initialTags);

  const toggleFilter = (label: string) => {
    setSelectedFilters(prev => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      // always keep at least one selected in this demo
      if (next.size === 0) {
        next.add(label);
      }
      return next;
    });
  };

  const handleRemoveTag = (label: string) => {
    setActiveTags(prev => prev.filter(t => t !== label));
  };

  const handleResetTags = () => {
    setActiveTags(initialTags);
  };

  return (
    <Screen.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll' padding={2}>
        {/* Header */}
        <UI.Text variant='bodyMedium'>
          Chip provides a compact rounded label for tags and filters. It supports selected and disabled states,
          optional leading icons, and an optional close state.
        </UI.Text>

        {/* Basic chips */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Basic chips</UI.Text>

        <UI.Box mt={1}>
          <UI.HorizontalLayout gap={1}>
            <UI.Chip label='Default' />
            <UI.Chip label='Selected' selected />
            <UI.Chip label='Disabled' disabled />
          </UI.HorizontalLayout>
        </UI.Box>

        {/* States */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>States</UI.Text>
        <UI.Box>
          <UI.Text variant='labelMedium' color='label'>
            Selected chips appear filled; disabled chips are dimmed and non-interactive.
          </UI.Text>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.HorizontalLayout gap={1}>
            <UI.Chip label='Unread' selected />
            <UI.Chip label='Read' />
            <UI.Chip label='Archived' disabled />
          </UI.HorizontalLayout>
        </UI.Box>

        {/* Leading icons */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Leading icons</UI.Text>

        <UI.Box mt={1}>
          <UI.HorizontalLayout gap={1}>
            <UI.Chip label='Email' leadingIcon='email' />
            <UI.Chip label='Starred' leadingIcon='star' selected />
            <UI.Chip label='Download' leadingIcon='download' />
          </UI.HorizontalLayout>
        </UI.Box>

        {/* Closable chips */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Closable chips</UI.Text>
        <UI.Box>
          <UI.Text variant='labelMedium' color='label'>
            Set isClose to true to show a trailing "X". Pressing the chip calls onPress, allowing the parent to
            remove or update the chip.
          </UI.Text>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.HorizontalLayout gap={1} constraint='wrap'>
            {activeTags.map(tag => (
              <UI.Chip
                key={tag}
                label={tag}
                selected
                isClose
                onPress={() => handleRemoveTag(tag)}
              />
            ))}
            {activeTags.length === 0 && (
              <UI.Text variant='labelSmall' color='label'>
                No tags left. Use the reset button below to add them back.
              </UI.Text>
            )}
          </UI.HorizontalLayout>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Button mode='outlined' onPress={handleResetTags}>
            Reset tags
          </UI.Button>
        </UI.Box>

        {/* Filter-like usage */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Filter chips</UI.Text>
        <UI.Box>
          <UI.Text variant='labelMedium' color='label'>
            Tap chips to toggle filters. Parent state manages which filters are active.
          </UI.Text>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.HorizontalLayout gap={1} constraint='wrap'>
            {['All', 'Work', 'Personal', 'Pinned'].map(label => {
              const isSelected = selectedFilters.has(label);
              return (
                <UI.Chip
                  key={label}
                  label={label}
                  selected={isSelected}
                  onPress={() => toggleFilter(label)}
                />
              );
            })}
          </UI.HorizontalLayout>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Text variant='labelSmall' color='label'>
            Active filters:{' '}
            {selectedFilters.size > 0
              ? Array.from(selectedFilters).join(', ')
              : 'None'}
          </UI.Text>
        </UI.Box>
      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(ChipScreen);
