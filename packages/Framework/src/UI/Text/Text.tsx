import React, { memo, ReactNode } from 'react';
import { TextStyle, StyleSheet } from 'react-native';
import { Text as PaperText, useTheme } from 'react-native-paper';
import { AppColor, resolveAppColor } from '../CommonProps';

/******************************************************************************************************************
 * MD3 typography variant prop.
 ******************************************************************************************************************/
export type TextVariant = React.ComponentProps<typeof PaperText>['variant'];

/******************************************************************************************************************
 * Text props.
 * 
 * @property variant          - MD3 text role; defaults to 'bodyMedium'
 * @property color?           - Font color
 * @property highlightColor?  - Highlight color
 * @property bold?            - Bolded text
 * @property numberOfLines?   - Fixed num of lines if provided
 * @property underline?       - Underline the text
 * @property onPress?         - Press handler for clickable text
 ******************************************************************************************************************/
export interface TextProps {
  variant?: TextVariant;
  color?: AppColor;
  highlightColor?: AppColor;
  bold?: boolean;
  numberOfLines?: number;
  underline?: boolean;
  onPress?: () => void;
}

/******************************************************************************************************************
 * A theme-aware text component supporting typography variants defined by the Material Design 3 spec.
 * 
 * @property children? - Text content
 * 
 * @usage
 * ```tsx
 * <Text variant='titleMedium'>Page Title</Text>
 * <Text variant='bodyMedium'>Body copy...</Text>
 * <Text variant='labelSmall' color='error'>Secondary label</Text>
 * ```
 ******************************************************************************************************************/
export const Text: React.FC<TextProps & { children?: string | ReactNode }> = memo(
  ({
    variant = 'bodyMedium',
    color = 'onSurface',
    highlightColor,
    bold,
    numberOfLines,
    underline = false,
    onPress,
    children,
  }) => {
    const theme = useTheme();

    const resolvedColor = resolveAppColor(theme.colors, color) ?? theme.colors.onSurface;
    const resolvedHighlightColor = resolveAppColor(theme.colors, highlightColor);

    const colorStyle: TextStyle = {
      color: resolvedColor,
      ...(resolvedHighlightColor && { backgroundColor: resolvedHighlightColor }),
    };

    const boldStyle: TextStyle = { fontWeight: bold ? 'bold' : 'normal' };

    return (
      <PaperText
        variant={variant}
        {...(numberOfLines !== undefined ? { numberOfLines } : {})}
        onPress={onPress}
        style={[colorStyle, boldStyle, underline && styles.underline]}
      >
        {children}
      </PaperText>
    );
  }
);

/******************************************************************************************************************
 * Styles
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  underline: {
    textDecorationLine: 'underline',
  },
});
