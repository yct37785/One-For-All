import React, { memo, JSX } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

/******************************************************************************************************************
 * Helper: cascade a state to all children recursively.
 ******************************************************************************************************************/
const setAllToState = (currValue: OptionValue, newState: OptionState) => {
  for (const child of Object.values(currValue)) {
    child.state = newState;
    if (child.children) {
      setAllToState(child.children, newState);
    }
  }
};

/******************************************************************************************************************
 * Enum representing the three possible states of an option:
 * - Selected: option is checked/active
 * - Unselected: option is not checked/inactive
 * - Indeterminate: option has mixed child states (some selected, some unselected)
 ******************************************************************************************************************/
export enum OptionState {
  Selected = 1,
  Unselected = 2,
  Indeterminate = 3,
}

/******************************************************************************************************************
 * Describe a single option node within the schema (immutable structure).
 *
 * @property label    - Human-readable label for the option
 * @property children - Optional nested child options
 ******************************************************************************************************************/
export type OptionSchemaNode = {
  label: string;
  children?: OptionSchema;
};

/******************************************************************************************************************
 * Describe the recursive tree schema for selectable options.
 * Each key corresponds to an option, which may itself contain nested children.
 *
 * This is immutable and should not store any state.
 ******************************************************************************************************************/
export type OptionSchema = Record<string, OptionSchemaNode>;

/******************************************************************************************************************
 * Describe a single option node within the value tree (mutable state).
 *
 * @property state    - Current selection state
 * @property children - Optional nested child option values
 ******************************************************************************************************************/
export type OptionValueNode = {
  state: OptionState;
  children?: OptionValue;
};

/******************************************************************************************************************
 * Describe the recursive tree of option values.
 * This mirrors the structure of OptionSchema, but holds state instead of labels.
 ******************************************************************************************************************/
export type OptionValue = Record<string, OptionValueNode>;

/******************************************************************************************************************
 * Render-time option props passed to the option renderer.
 *
 * @property label - Human-readable label from the schema
 * @property state - Current selection state from the value tree
 ******************************************************************************************************************/
export type OptionProps = {
  label: string;
  state: OptionState;
};

/******************************************************************************************************************
 * BaseOptions props.
 * 
 * @property schema           - Immutable options tree describing labels and nesting
 * @property value            - Mutable state tree mirroring the schema structure
 * @property setValue         - State setter invoked after mutations
 * @property optionsContainer - Wrapper component for child groups
 * @property renderOption     - Renderer for a single option row
 * @property depthPadding?    - Additional padding applied per hierarchy depth
 * @property style?           - Optional style for the root container
 ******************************************************************************************************************/
export type BaseOptionsProps = {
  schema: OptionSchema;
  value: OptionValue;
  setValue: (updatedValue: OptionValue) => void;
  optionsContainer: React.ComponentType<{ children: React.ReactNode }>;
  renderOption: (props: { option: OptionProps; onPress: () => void }) => JSX.Element;
  depthPadding?: number;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * Render a recursive options tree with selection propagation and indeterminate aggregation.
 * Uses the immutable schema for structure and the value tree for state.
 *
 * Toggles a node, cascades to children, and recomputes ancestor states.
 *
 * @usage
 * ```tsx
 * <BaseOptions
 *   schema={schema}
 *   value={value}
 *   setValue={setValue}
 *   optionsContainer={({ children }) => <View>{children}</View>}
 *   renderOption={({ option, onPress }) => <MyOptionRow option={option} onPress={onPress} />}
 *   depthPadding={8}
 * />
 * ```
 ******************************************************************************************************************/
export const BaseOptions: React.FC<BaseOptionsProps> = memo(
  ({
    schema,
    value,
    setValue,
    optionsContainer: OptionsContainer,
    renderOption,
    depthPadding = 0,
    style,
  }) => {
    /**************************************************************************************************************
     * Handles selecting/deselecting an option:
     * - Flips the state of the target node in the value tree.
     * - Cascades the new state to all child nodes.
     * - Recomputes all parent states to handle indeterminate logic.
     **************************************************************************************************************/
    const handleSelect = (path: string[]) => {
      if (path.length === 0) return;

      // locate root nodes in both schema and value
      const rootSchema = schema[path[0]];
      const rootValue = value[path[0]];
      if (!rootSchema || !rootValue) return;

      // track all value nodes from root to the selected node
      const valuePathNodes: OptionValueNode[] = [rootValue];
      let currentValue = rootValue;

      for (let i = 1; i < path.length; i++) {
        if (!currentValue.children) return;
        const nextValue = currentValue.children[path[i]];
        if (!nextValue) return;
        currentValue = nextValue;
        valuePathNodes.push(currentValue);
      }

      // selected node is the last entry
      const selectedValueNode = valuePathNodes[valuePathNodes.length - 1];
      // parentsRef: all ancestors EXCEPT the selected node, from closest parent upwards
      const parentsRef = valuePathNodes.slice(0, -1).reverse();

      // flip state of the selected option
      selectedValueNode.state =
        selectedValueNode.state === OptionState.Selected
          ? OptionState.Unselected
          : OptionState.Selected;

      // update all parent nodes based on child states
      parentsRef.forEach((parent) => {
        const childrenState = Object.values(parent.children || {}).map(
          (child) => child.state
        );
        if (childrenState.length === 0) return;

        const firstState = childrenState[0];
        parent.state = childrenState.every((s) => s === firstState)
          ? firstState
          : OptionState.Indeterminate;
      });

      /************************************************************************************************************
       * Cascade state down to all children of the selected node.
       ************************************************************************************************************/
      if (selectedValueNode.children) {
        setAllToState(selectedValueNode.children, selectedValueNode.state);
      }

      // trigger re-render with updated value (shallow clone is sufficient at the root)
      setValue({ ...value });
    };

    /**************************************************************************************************************
     * Recursively renders options and their children.
     **************************************************************************************************************/
    const renderChildrenOptions = (
      schemaNodeMap: OptionSchema,
      valueNodeMap: OptionValue,
      depthPaddingVal: number = 0,
      path: string[] = []
    ) => {
      return Object.entries(schemaNodeMap).map(([key, schemaNode]) => {
        const optionPath = [...path, key];
        const keyStr = optionPath.join('/');

        const valueNode = valueNodeMap[key];
        const state = valueNode ? valueNode.state : OptionState.Unselected;

        const nextDepth = depthPaddingVal + depthPadding;

        const hasChildren =
          !!schemaNode.children && !!valueNode && !!valueNode.children;

        const option: OptionProps = {
          label: schemaNode.label,
          state,
        };

        if (hasChildren && schemaNode.children && valueNode && valueNode.children) {
          return (
            <View key={keyStr}>
              {renderOption({
                option,
                onPress: () => handleSelect(optionPath),
              })}
              <View style={{ paddingLeft: nextDepth }}>
                <OptionsContainer>
                  {renderChildrenOptions(
                    schemaNode.children,
                    valueNode.children,
                    nextDepth,
                    optionPath
                  )}
                </OptionsContainer>
              </View>
            </View>
          );
        }

        return (
          <View key={keyStr}>
            {renderOption({
              option,
              onPress: () => handleSelect(optionPath),
            })}
          </View>
        );
      });
    };

    return <View style={style}>{renderChildrenOptions(schema, value)}</View>;
  }
);
