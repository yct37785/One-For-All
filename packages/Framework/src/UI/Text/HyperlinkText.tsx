import React, { memo, ReactNode } from 'react';
import { Text, TextProps } from './Text';

// always force hyperlink styling
const hyperlinkProps: Partial<TextProps> = {
  color: 'primary',
  underline: true,
};

/******************************************************************************************************************
 * HyperlinkText props.
 * 
 * @property onPress        - Callback fired when text is pressed
 * @property children?      - Text content
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
 * - Uses the Text UI component internally for variants/colors
 * - Relies on Text's onPress so it can be safely nested inside Text blocks
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
    children,
    ...rest
  }) => {
    return (
      <Text
        {...rest}
        {...hyperlinkProps}
        onPress={onPress}
      >
        {children}
      </Text>
    );
  }
);
