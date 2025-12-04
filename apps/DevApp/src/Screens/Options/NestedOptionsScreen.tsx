import React, { memo, useState } from 'react';
import { Screen, UI } from 'framework';

/******************************************************************************************************************
 * Initial nested options schema.
 ******************************************************************************************************************/
const INITIAL_OPTIONS = {
  colors: {
    label: 'Colors',
    state: UI.OptionState.Unselected,
    children: {
      red: { label: 'Red', state: UI.OptionState.Unselected },
      blue: { label: 'Blue', state: UI.OptionState.Unselected },
      green: { label: 'Green', state: UI.OptionState.Unselected },
    },
  },
  class: {
    label: 'Class',
    state: UI.OptionState.Unselected,
    children: {
      mammals: {
        label: 'Mammals',
        state: UI.OptionState.Unselected,
        children: {
          cat: { label: 'Cat', state: UI.OptionState.Unselected },
          dog: { label: 'Dog', state: UI.OptionState.Unselected },
        },
      },
      reptiles: {
        label: 'Reptiles',
        state: UI.OptionState.Unselected,
        children: {
          turtle: { label: 'Turtle', state: UI.OptionState.Unselected },
          frog: { label: 'Frog', state: UI.OptionState.Unselected },
          lizard: { label: 'Lizard', state: UI.OptionState.Unselected },
        },
      },
    },
  },
} as UI.OptionSchema;

/******************************************************************************************************************
 * Helper: collect labels of selected leaf options (no children).
 ******************************************************************************************************************/
const collectSelectedLeafLabels = (schema: UI.OptionSchema): string[] => {
  const acc: string[] = [];

  const walk = (node: UI.OptionSchema) => {
    Object.values(node).forEach(option => {
      const hasChildren =
        !!option.children && Object.keys(option.children).length > 0;

      if (option.children) {
        walk(option.children);
      }

      if (!hasChildren && option.state === UI.OptionState.Selected) {
        acc.push(option.label);
      }
    });
  };

  walk(schema);
  return acc;
};

/******************************************************************************************************************
 * Nested options demo
 *
 * This screen demonstrates:
 * - UI.CheckOptions: checkbox-based nested options built on BaseOptions.
 ******************************************************************************************************************/
const NestedOptionsScreen: Screen.ScreenType = () => {
  const [schema, setSchema] = useState<UI.OptionSchema>(INITIAL_OPTIONS);
  const selectedLeafLabels = collectSelectedLeafLabels(schema);

  return (
    <Screen.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll' padding={2}>
        {/* Header */}
        <UI.Text variant='bodyMedium'>
          CheckOptions renders nested checkbox trees with parent/child propagation and indeterminate states.
        </UI.Text>

        {/* CheckOptions */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>CheckOptions</UI.Text>

        <UI.Box mt={2}>
          <UI.CheckOptions schema={schema} setSchema={setSchema} />
        </UI.Box>

        {/* Selection summary */}
        <UI.Box mt={2}>
          <UI.Text variant='labelSmall' color='label'>
            Selected leaf options:{' '}
            {selectedLeafLabels.length > 0
              ? selectedLeafLabels.join(', ')
              : 'None'}
          </UI.Text>
        </UI.Box>
      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(NestedOptionsScreen);
