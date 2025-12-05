import React, { memo, ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Text, TextProps } from './Text';
import { Touchable } from '../Interactive/Touchable';

// always force hyperlink styling
const hyperlinkProps: Partial<TextProps> = {
  color: 'primary',
  underline: true,
};

/******************************************************************************************************************
 * HyperlinkText props.
 * 
 * @property onPress        - Callback fired when text is pressed
 * @property children       - Text or nodes
 ******************************************************************************************************************/
export interface HyperlinkTextProps extends TextProps {
  onPress?: () => void;
  children?: string | ReactNode;
}

/******************************************************************************************************************
 * HyperlinkText
 * 
 * A dedicated hyperlink component:
 * - Always appears as a hyperlink (primary color + underline)
 * - Wrapped in Touchable for press feedback (opacity / ripple)
 * - Uses the Text UI component internally for variants/colors
 *
 * @usage
 * ```tsx
 * <HyperlinkText onPress={openTerms}>Terms of Service</HyperlinkText>
 * <HyperlinkText onPress={openPrivacy}>Privacy Policy</HyperlinkText>
 * ```
 ******************************************************************************************************************/
export const HyperlinkText: React.FC<HyperlinkTextProps> = memo(
  ({
    onPress,
    color = 'primary',
    underline = true,
    children,
    ...rest
  }) => {
    const content = (
      <Text
        color={color}
        underline={underline}
        {...rest}
        {...hyperlinkProps}
      >
        {children}
      </Text>
    );

    // no onPress = behave like a normal styled hyperlink
    if (!onPress) return content;

    return (
      <Touchable onPress={onPress} style={styles.touchContainer}>
        {content}
      </Touchable>
    );
  }
);

/******************************************************************************************************************
 * Styles
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  touchContainer: {
    alignSelf: 'flex-start', // keeps it inline-friendly
  },
});
