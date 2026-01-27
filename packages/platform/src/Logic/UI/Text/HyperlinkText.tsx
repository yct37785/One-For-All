import React, { memo, ReactNode } from 'react';
import { useAppTheme } from '../../App/AppThemeService';
import { Text, TextProps } from './Text';

export interface HyperlinkTextProps extends TextProps {
  onPress?: () => void;
  children?: string | ReactNode;
}

/******************************************************************************************************************
 * A dedicated hyperlink component:
 * - Always appears as a hyperlink (primary color + underline)
 * - Uses the Text UI component internally for variants/colors
 * - Relies on Text's onPress so it can be safely nested inside Text blocks
 * 
 * @param TextProps     - Extended from TextProps
 * @param onPress       - Callback fired when text is pressed
 * @param children?     - Text content
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
    const { theme } = useAppTheme();
    return (
      <Text
        {...rest}
        color={theme.colors.primary}
        underline={true}
        onPress={onPress}
      >
        {children}
      </Text>
    );
  }
);
