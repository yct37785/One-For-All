import React, { memo, ReactNode } from 'react';
import { useAppTheme } from '../../Manager/App/AppThemeManager';
import { Text, TextProps } from './Text';

export interface LabelTextProps extends Omit<TextProps, 'color'> {
  children?: string | ReactNode;
}

/******************************************************************************************************************
 * Helper component for label type text:
 * - Color fixed to onSurfaceVariant
 * - Size default to labelMedium
 * 
 * @param TextProps     - Extended from TextProps
 * @param children?     - Text content
 *
 * @usage
 * ```tsx
 * <LabelText>This is a label.</LabelText>
 * ```
 ******************************************************************************************************************/
export const LabelText: React.FC<LabelTextProps> = memo(
  ({
    variant = 'labelMedium',
    children,
    ...rest
  }) => {
    const { theme } = useAppTheme();
    return (
      <Text
        variant={variant}
        {...rest}
        color={theme.colors.onSurfaceVariant}
      >
        {children}
      </Text>
    );
  }
);
