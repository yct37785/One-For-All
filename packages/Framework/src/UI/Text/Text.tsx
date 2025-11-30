import React, { memo, ReactNode } from 'react';
import { TextStyle } from 'react-native';
import { Text as PaperText, useTheme } from 'react-native-paper';
import { resolveFontColor } from './Utils';

/******************************************************************************************************************
 * declared locally for VSC intelliSense
 ******************************************************************************************************************/
type FontColor =
  | 'default'
  | 'label'
  | 'disabled'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'surface'
  | 'background'
  | 'outline';

/******************************************************************************************************************
 * MD3 typography variants.
 ******************************************************************************************************************/
export type TextVariant =
  | 'displayLarge'
  | 'displayMedium'
  | 'displaySmall'
  | 'headlineLarge'
  | 'headlineMedium'
  | 'headlineSmall'
  | 'titleLarge'
  | 'titleMedium'
  | 'titleSmall'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall'
  | 'labelLarge'
  | 'labelMedium'
  | 'labelSmall';

/******************************************************************************************************************
 * Text props.
 * 
 * @property variant          - MD3 text role; defaults to 'bodyMedium'
 * @property color?           - Font color
 * @property customColor?     - Raw color string (overrides color prop)
 * @property bold?            - Bolded text
 * @property numberOfLines?   - Fixed num of lines if provided
 * @property margin?          - Margin
 ******************************************************************************************************************/
export interface TextProps {
  variant?: TextVariant;
  color?: FontColor;
  customColor?: string;
  bold?: boolean;
  numberOfLines?: number;
}

/******************************************************************************************************************
 * A theme-aware text component supporting typography variants defined by the Material Design 3 spec.
 * 
 * @property children? - Text content
 * 
 * @usage
 * ```tsx
 * <Text variant='h1'>Page Title</Text>
 * <Text variant='subtitle'>Section</Text>
 * <Text variant='body'>Body copy…</Text>
 * <Text variant='label2' color={t.colors.muted}>Secondary label</Text>
 * ```
 ******************************************************************************************************************/
export const Text: React.FC<TextProps & { children?: string | ReactNode }> = memo(
  ({ variant = 'bodyMedium', color = 'default', customColor, bold, numberOfLines, children }) => {
    const theme = useTheme();
    const resolvedColor = resolveFontColor(color, customColor, theme);

    const colorStyle = { color: resolvedColor };
    const boldStyle: TextStyle = { fontWeight: bold ? 'bold' : 'normal' };

    return (
      <PaperText
        variant={variant}
        {...(numberOfLines !== undefined ? { numberOfLines } : {})}
        style={[colorStyle, boldStyle]}
      >
        {children}
      </PaperText>
    );
  }
);