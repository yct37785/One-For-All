import React, { memo, useState } from 'react';
import { Nav, UI, Manager } from 'framework';

/******************************************************************************************************************
 * Chip demo
 *
 * Chip is a compact, rounded label used for:
 * - quick filters (toggle selected state)
 * - tags (static) and removable tags (isClose)
 * - optional leading icons
 *
 * Note: Chip is controlled by the parent — you decide selected/disabled and what onPress does.
 ******************************************************************************************************************/
const ChipScreen: Nav.ScreenType = () => {
  const { theme } = Manager.useAppTheme();

  /**
   * Filter chips demo (controlled selected set)
   */
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(
    () => new Set(['All'])
  );

  const toggleFilter = (label: string) => {
    setSelectedFilters(prev => {
      const next = new Set(prev);

      if (next.has(label)) next.delete(label);
      else next.add(label);

      // demo rule: keep at least one selected
      if (next.size === 0) next.add(label);

      return next;
    });
  };

  /**
   * Closable chips demo (controlled list)
   */
  const initialTags = ['React', 'TypeScript', 'UI Kit'];
  const [activeTags, setActiveTags] = useState<string[]>(initialTags);

  const removeTag = (label: string) => {
    setActiveTags(prev => prev.filter(t => t !== label));
  };

  const resetTags = () => {
    setActiveTags(initialTags);
  };

  return (
    <Nav.ScreenLayout showTitle title='Chips'>
      <UI.VerticalLayout constraint='scroll' padding={2}>

        {/* Intro */}
        <UI.Text variant='bodyMedium'>
          Chip is a compact control for tags and filters.
        </UI.Text>

        {/* States */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>States</UI.Text>

        <UI.LabelText>
          Chips support selected/disabled states with leading icons.
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.HorizontalLayout gap={1} constraint='wrap'>
            <UI.Chip label='Default' />
            <UI.Chip label='Selected' selected />
            <UI.Chip label='Disabled' disabled />
            <UI.Chip label='With icon' leadingIcon='tag' />
            <UI.Chip label='Icon + selected' leadingIcon='star' selected />
          </UI.HorizontalLayout>
        </UI.Box>

        {/* Filter chips */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Filter chips</UI.Text>

        <UI.LabelText>
          Tap to toggle filters. The parent owns selected state.
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.HorizontalLayout gap={1} constraint='wrap'>
            {['All', 'Work', 'Personal', 'Pinned'].map(label => (
              <UI.Chip
                key={label}
                label={label}
                selected={selectedFilters.has(label)}
                onPress={() => toggleFilter(label)}
              />
            ))}
          </UI.HorizontalLayout>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.LabelText variant='labelSmall'>
            Active filters: {Array.from(selectedFilters).join(', ')}
          </UI.LabelText>
        </UI.Box>

        {/* Closable chips */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Closable tags</UI.Text>

        <UI.LabelText>
          Use isClose to show a trailing "X" for chips meant to be closed.
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.HorizontalLayout gap={1} constraint='wrap'>
            {activeTags.map(tag => (
              <UI.Chip
                key={tag}
                label={tag}
                selected
                isClose
                onPress={() => removeTag(tag)}
              />
            ))}

            {activeTags.length === 0 ? (
              <UI.LabelText variant='labelSmall'>
                No tags left. Reset to restore.
              </UI.LabelText>
            ) : null}
          </UI.HorizontalLayout>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Button mode='outlined' onPress={resetTags}>
            Reset tags
          </UI.Button>
        </UI.Box>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(ChipScreen);
