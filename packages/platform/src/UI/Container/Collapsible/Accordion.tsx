import React, { useState, memo, useEffect, useRef, useCallback, ReactNode } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { useAppTheme } from '../../../Manager/App/AppThemeManager';
import { Touchable } from '../../Interactive/Touchable';
import type { TextProps } from '../../Text/Text';
import type { IconProps } from '../../Text/Icon';
import { KeepMountedDuringClose, ToggleHeader } from './CollapsibleUtils';

/******************************************************************************************************************
 * Accordion section header config.
 *
 * @property text?     - Header label
 * @property textOpts? - Text styling options
 * @property icon?     - Optional leading icon
 * @property iconOpts? - Leading icon styling options
 ******************************************************************************************************************/
export type AccordionSectionHeader = {
  text?: string;
  textOpts?: TextProps;
  icon?: string;
  iconOpts?: IconProps;
};

/******************************************************************************************************************
 * Accordion section config.
 *
 * @property header?     - Dropdown header
 * @property content?    - Collapsible content
 ******************************************************************************************************************/
type Section = {
  header: AccordionSectionHeader;
  content: React.ReactNode;
};

const grpSize = 3;

/******************************************************************************************************************
 * AccordionOption:
 * - renders one Accordion component
 ******************************************************************************************************************/
const AccordionOption = React.memo(function AccordionOption({
  sections,
  idx,
  closeTrigger,
  onTrigger,
}: {
  sections: Section[];
  idx: number;
  closeTrigger: number;
  onTrigger: (idx: number, sameSection: boolean) => void;
}) {
  const { theme } = useAppTheme();
  const [activeSections, setActiveSections] = useState<number[]>([]);

  // close on receiving trigger
  useEffect(() => {
    setActiveSections([]);
  }, [closeTrigger]);

  const renderHeader = (section: Section, _i: number, isActive: boolean) => (
    <ToggleHeader
      text={section.header.text}
      textOpts={section.header.textOpts}
      icon={section.header.icon}
      iconOpts={section.header.iconOpts}
      isCollapsed={!isActive}
    />
  );

  const renderContent = (section: Section, _i: number, isActive: boolean) => (
    <KeepMountedDuringClose active={isActive} durationMs={theme.design.animDuration}>
      <View>{section.content}</View>
    </KeepMountedDuringClose>
  );

  const onChange = (newActiveSections: number[]) => {
    setActiveSections(prevActive => {
      let sameSection = false;
      if (prevActive.length > 0 && newActiveSections.length > 0) {
        sameSection = prevActive[0] === newActiveSections[0];
      }
      onTrigger(idx, sameSection);
      return newActiveSections;
    });
  };

  return (
    <Accordion
      touchableComponent={Touchable}
      touchableProps={{ pressOpacity: theme.design.pressOpacityHeavy }}
      sections={sections}
      activeSections={activeSections}
      renderHeader={renderHeader}
      renderContent={renderContent}
      onChange={onChange}
      expandMultiple={false}
      renderAsFlatList={false}
      duration={theme.design.animDuration}
    />
  );
});

export type AccordionContainerProps = {
  sections: AccordionSectionHeader[];
  style?: StyleProp<ViewStyle>;
  children: ReactNode[];
};

/******************************************************************************************************************
 * A vertically stacked set of collapsible panels where only one section can be expanded at a time.
 * 
 * @param sections  - Header config for each section in order
 * @param style?    - Optional container style
 * @param children  - Content nodes matched 1:1 with sections
 * 
 * @throws {Error} when the number of sections does not match the number of children
 *
 * @usage
 * ```tsx
 * <AccordionContainer
 *   sections={[
 *     { text: 'First' },
 *     { text: 'Second', icon: 'star' },
 *   ]}
 * >
 *   <View><Text>a content</Text></View>
 *   <View><Text>b content</Text></View>
 * </AccordionContainer>
 * ```
 ******************************************************************************************************************/
export const AccordionContainer: React.FC<AccordionContainerProps> = memo(
  ({ sections, style, children }) => {
    const childArray = React.Children.toArray(children);

    if (childArray.length !== sections.length) {
      throw new Error(
        `AccordionContainer: sections.length (${sections.length}) must match children.length (${childArray.length})`
      );
    }

    const mergedSections: Section[] = sections.map((header, i) => ({
      header,
      content: childArray[i],
    }));

    const groups: Section[][] = [];
    for (let i = 0; i < mergedSections.length; i += grpSize) {
      groups.push(mergedSections.slice(i, i + grpSize));
    }

    // Accordion triggers
    const [triggerCloseTrackers, setTriggerCloseTrackers] = useState<number[]>(
      () => groups.map(() => 0)
    );
    const openAccordionIdx = useRef(-1);

    const onTrigger = useCallback(
      (idx: number, sameSection: boolean) => {
        let prev = -1;

        // close current accordion (same group + same section)
        if (openAccordionIdx.current === idx && sameSection) {
          prev = openAccordionIdx.current;
          openAccordionIdx.current = -1;
        }
        // open a different accordion group
        else if (openAccordionIdx.current !== idx) {
          prev = openAccordionIdx.current; // -1 if no previous group
          openAccordionIdx.current = idx;
        }

        // close previously open accordion group
        if (prev !== -1) {
          setTriggerCloseTrackers(prevTrackers => {
            const updated = [...prevTrackers];
            updated[prev] = updated[prev] + 1;
            return updated;
          });
        }
      },
      []
    );

    return (
      <View style={style}>
        {groups.map((g, gi) => (
          <AccordionOption
            key={`acc-${gi}`}
            idx={gi}
            sections={g}
            closeTrigger={triggerCloseTrackers[gi]}
            onTrigger={onTrigger}
          />
        ))}
      </View>
    );
  }
);
