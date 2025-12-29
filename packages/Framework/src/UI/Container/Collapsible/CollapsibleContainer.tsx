import React, { useState, memo, useEffect, useRef, useCallback, ReactNode } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Touchable } from '../../Interactive/Touchable';
import type { TextProps } from '../../Text/Text';
import type { IconProps } from '../../Text/Icon';
import { ToggleHeader } from './CollapsibleUtils';

export type CollapsibleContainerProps = {
  text?: string;
  textOpts?: TextProps;
  icon?: string;
  iconOpts?: IconProps;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

/******************************************************************************************************************
 * A container that can expand or collapse its content vertically, typically used for toggling visibility of sections.
 * 
 * @property text?             - Main header label (preferred)
 * @property textOpts?         - Text styling options for the header label
 * @property icon?             - Optional leading icon in the header
 * @property iconOpts?         - Styling options for the leading icon
 * @property toggleHeaderText? - Deprecated: legacy header label (used if `text` is not provided)
 * @property style?            - Optional container style
 * @property children          - Content rendered inside the collapsible body
 * 
 * @usage
 * ```tsx
 * <CollapsibleContainer text='details'>
 *   <Text>hidden content</Text>
 * </CollapsibleContainer>
 * ```
 ******************************************************************************************************************/
export const CollapsibleContainer: React.FC<CollapsibleContainerProps> = memo(
  ({ text, textOpts, icon, iconOpts, style, children }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
      setIsCollapsed(prev => !prev);
    };

    return (
      <View style={style}>
        <Touchable onPress={toggleCollapse}>
          <ToggleHeader
            text={text}
            textOpts={textOpts}
            icon={icon}
            iconOpts={iconOpts}
            isCollapsed={isCollapsed}
          />
        </Touchable>
        <Collapsible collapsed={isCollapsed}>{children}</Collapsible>
      </View>
    );
  }
);