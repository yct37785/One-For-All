import React, { memo, useState } from 'react';
import { Nav, UI, Manager } from 'framework';
import { getDemoColors } from '../../demoColors';

/******************************************************************************************************************
 * Flat options demo
 *
 * Flat options are non-hierarchical option sets (no nesting).
 * This screen demos flat option components such as ChipOptions,
 * and can be extended with future flat selectors.
 ******************************************************************************************************************/
const FlatOptionsScreen: Nav.ScreenType = () => {
  const { theme } = Manager.useAppTheme();
  const { isDarkMode } = Manager.useAppSettings();
  const colors = getDemoColors(isDarkMode);

  /* ChipOptions demo state */
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [resetTagsSignal, setResetTagsSignal] = useState(0);

  const tagSchema = new Set([
    'Design',
    'Frontend',
    'Backend',
    'Testing',
    'DevOps',
    'Docs',
    'Refactor',
    'Bugfix',
  ]);

  return (
    <Nav.ScreenLayout showTitle title='Flat options'>
      <UI.VerticalLayout constraint='scroll' flex={1} pad={2} gap={1}>

        {/* Intro */}
        <UI.Text variant='bodyMedium'>
          Flat options represent simple, non-nested choices.
        </UI.Text>

        {/* ChipOptions */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>ChipOptions</UI.Text>

        <UI.LabelText>
          Commonly used for filtering above a list or a grid.
        </UI.LabelText>

        <UI.Box bgColor={colors.neutral_1} p={1} br={12} mt={1}>
          <UI.ChipOptions
            schema={tagSchema}
            onSelected={setSelectedTags}
            resetSignal={resetTagsSignal}
          />
        </UI.Box>

        <UI.Box mt={1}>
          <UI.LabelText variant='labelSmall'>
            Selected tags:{' '}
            {selectedTags.size > 0
              ? Array.from(selectedTags).join(', ')
              : 'None'}
          </UI.LabelText>
        </UI.Box>

        <UI.Box mt={1} self='flex-start'>
          <UI.TextButton
            onPress={() => setResetTagsSignal(v => v + 1)}
            disabled={selectedTags.size === 0}
            textOpts={{ variant: 'labelSmall', color: theme.colors.onSurfaceVariant }}
          >
            Reset tags
          </UI.TextButton>
        </UI.Box>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(FlatOptionsScreen);
