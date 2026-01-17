import React, { memo, useMemo, useState } from 'react';
import { Nav, UI, Manager } from 'framework';

/******************************************************************************************************************
 * Demo schema (static / immutable).
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
  animals: {
    label: 'Animals',
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
 * Helper: collect labels of selected leaf nodes (nodes with no children).
 ******************************************************************************************************************/
const collectSelectedLeafLabels = (
  schema: UI.OptionSchema,
  value: UI.OptionValue
): string[] => {
  const out: string[] = [];

  const walk = (schemaNodeMap: UI.OptionSchema, valueNodeMap: UI.OptionValue) => {
    Object.entries(schemaNodeMap).forEach(([key, schemaNode]) => {
      const valueNode = valueNodeMap[key];
      const state = valueNode ? valueNode.state : UI.OptionState.Unselected;

      const hasChildren =
        !!schemaNode.children &&
        !!valueNode?.children &&
        Object.keys(schemaNode.children).length > 0;

      if (schemaNode.children && valueNode?.children) {
        walk(schemaNode.children, valueNode.children);
      }

      if (!hasChildren && state === UI.OptionState.Selected) {
        out.push(schemaNode.label);
      }
    });
  };

  walk(schema, value);
  return out;
};

/******************************************************************************************************************
 * Nested options demo
 *
 * - UI.CheckOptions: checkbox tree built on BaseOptions
 * - Shows propagation + indeterminate aggregation
 ******************************************************************************************************************/
const NestedOptionsScreen: Nav.ScreenType = () => {
  const { theme } = Manager.useAppTheme();

  const [value, setValue] = useState<UI.OptionValue>(() =>
    UI.buildOptionsValueFromSchema(INITIAL_SCHEMA)
  );

  const selectedLeafLabels = useMemo(
    () => collectSelectedLeafLabels(INITIAL_SCHEMA, value),
    [value]
  );

  const selectAll = () => {
    setValue(UI.buildOptionsValueFromSchema(INITIAL_SCHEMA, UI.OptionState.Selected));
  };

  const clearAll = () => {
    setValue(UI.buildOptionsValueFromSchema(INITIAL_SCHEMA, UI.OptionState.Unselected));
  };

  return (
    <Nav.ScreenLayout showTitle title='Nested options'>
      <UI.VerticalLayout constraint='scroll' padding={2}>

        {/* Intro */}
        <UI.Text variant='bodyMedium'>
          A nested option tree with parent-child propagation and indeterminate state.
        </UI.Text>

        {/* Quick actions */}
        <UI.Divider spacing={1} />
        <UI.HorizontalLayout gap={1} constraint='wrap'>
          <UI.Button mode='outlined' icon='check-all' onPress={selectAll}>
            Select all
          </UI.Button>
          <UI.Button mode='outlined' icon='close' onPress={clearAll}>
            Clear all
          </UI.Button>
        </UI.HorizontalLayout>

        {/* CheckOptions */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>CheckOptions</UI.Text>
        <UI.LabelText>
          Tap a parent to toggle all children. Mixed children become indeterminate.
        </UI.LabelText>

        <UI.Box mt={2}>
          <UI.CheckOptions
            schema={INITIAL_SCHEMA}
            value={value}
            onChange={setValue}
          />
        </UI.Box>

        {/* Summary */}
        <UI.Box mt={2} mb={4}>
          <UI.LabelText variant='labelSmall'>
            Selected leaf options:{' '}
            {selectedLeafLabels.length > 0
              ? selectedLeafLabels.join(', ')
              : 'None'}
          </UI.LabelText>
        </UI.Box>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(NestedOptionsScreen);
