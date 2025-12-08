import React, { memo, useState } from 'react';
import { Screen, UI } from 'framework';

/******************************************************************************************************************
 * Initial nested options schema.
 ******************************************************************************************************************/
const INITIAL_SCHEMA: UI.OptionSchema = {
  colors: {
    label: 'Colors',
    children: {
      red: { label: 'Red' },
      blue: { label: 'Blue' },
      green: { label: 'Green' },
    },
  },
  class: {
    label: 'Class',
    children: {
      mammals: {
        label: 'Mammals',
        children: {
          cat: { label: 'Cat' },
          dog: { label: 'Dog' },
        },
      },
      reptiles: {
        label: 'Reptiles',
        children: {
          turtle: { label: 'Turtle' },
          frog: { label: 'Frog' },
          lizard: { label: 'Lizard' },
        },
      },
    },
  },
};

/******************************************************************************************************************
 * Helper: collect labels of selected leaf options (no children).
 ******************************************************************************************************************/
const collectSelectedLeafLabels = (
  schema: UI.OptionSchema,
  value: UI.OptionValue
): string[] => {
  const acc: string[] = [];

  const walk = (schemaNodeMap: UI.OptionSchema, valueNodeMap: UI.OptionValue) => {
    Object.entries(schemaNodeMap).forEach(([key, schemaNode]) => {
      const valueNode = valueNodeMap[key];
      const state = valueNode ? valueNode.state : UI.OptionState.Unselected;

      const hasChildren =
        !!schemaNode.children && !!valueNode && !!valueNode.children &&
        Object.keys(schemaNode.children).length > 0;

      if (schemaNode.children && valueNode && valueNode.children) {
        walk(schemaNode.children, valueNode.children);
      }

      if (!hasChildren && state === UI.OptionState.Selected) {
        acc.push(schemaNode.label);
      }
    });
  };

  walk(schema, value);
  return acc;
};

/******************************************************************************************************************
 * Nested options demo
 *
 * This screen demonstrates:
 * - UI.CheckOptions: checkbox-based nested options built on BaseOptions.
 ******************************************************************************************************************/
const NestedOptionsScreen: Screen.ScreenType = () => {
  const [value, setValue] = useState<UI.OptionValue>(() =>
    UI.buildOptionsValueFromSchema(INITIAL_SCHEMA)
  );

  const selectedLeafLabels = collectSelectedLeafLabels(INITIAL_SCHEMA, value);

  return (
    <Screen.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll' padding={2}>
        {/* Header */}
        <UI.Text variant='bodyMedium'>
          A generic nested option tree with parent-child propagation and
          indeterminate states with a given static tree structure schema.
        </UI.Text>

        {/* CheckOptions */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>CheckOptions</UI.Text>
        <UI.Text variant='labelMedium' color='label'>
          Checkbox-based UI built on the generic nested option tree.
        </UI.Text>

        <UI.Box mt={2}>
          <UI.CheckOptions
            schema={INITIAL_SCHEMA}
            value={value}
            onChange={setValue}
          />
        </UI.Box>

        {/* Selection summary */}
        <UI.Box mt={2} mb={4}>
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
