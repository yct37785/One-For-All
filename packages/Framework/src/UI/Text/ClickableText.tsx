import React, { memo, ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Text, TextProps } from './Text';
import { Touchable } from '../Interactive/Touchable';

/******************************************************************************************************************
 * ClickableText props.
 * 
 * @property onPress        - Callback fired when text is pressed
 * @property hyperlink?     - Whether to show hyperlink styling (primary color + underline)
 * @property children       - Text or nodes
 ******************************************************************************************************************/
export interface ClickableTextProps extends TextProps {
  onPress?: () => void;
  hyperlink?: boolean;
  children?: string | ReactNode;
}

/******************************************************************************************************************
 * ClickableText
 * 
 * A clickable text element:
 * - Wrapped in Touchable for proper press feedback (opacity/ripple)
 * - Uses the Text UI component internally for variants/colors
 * - If hyperlink is true, applies hyperlink styling:
 *     - color: primary
 *     - underline: true
 *
 * @usage
 * ```tsx
 * <ClickableText onPress={openTerms}>Terms of Service</ClickableText>
 * <ClickableText hyperlink={false} onPress={onTap}>Tap here</ClickableText>
 * ```
 ******************************************************************************************************************/
export const ClickableText: React.FC<ClickableTextProps> = memo(
  ({
    onPress,
    hyperlink = true,
    children,
    color,
    ...rest
  }) => {
    // hyperlink mode: force primary text + underline
    const hyperlinkProps: Partial<TextProps> = hyperlink
      ? {
        color: 'primary',
        underline: true,
      }
      : {};

    const content = (
      <Text
        {...rest}
        {...hyperlinkProps}
      >
        {children}
      </Text>
    );

    // no onPress → behave like normal text
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
    alignSelf: 'flex-start',
  },
});
