import React, { memo, useMemo } from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Touchable } from '../Interactive/Touchable';
import { Text, TextProps } from '../Text/Text';
import { useAppTheme } from '../../Manager/App/AppThemeManager';

export interface TextButtonProps {
  children?: React.ReactNode;
  textOpts?: TextProps;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onPress?: () => void;
}

/******************************************************************************************************************
 * A lightweight text-only button with:
 * - Your Touchable for proper press feedback (opacity/ripple)
 * - Rounded rectangle background
 * - Padding for tap target
 * - Uses base Text for variant, color, bold, etc.
 * 
 * @param children?       - Button label/content
 * @param textOpts?       - Additional props passed to the internal Text component
 * @param style?          - Style applied to the button container
 * @param disabled?       - Disable press handling
 * @param onPress?        - Press callback
 *
 * @usage
 * ```tsx
 * <TextButton onPress={onEdit}>Edit</TextButton>
 *
 * <TextButton onPress={save} textOpts={{ variant: 'titleSmall', bold: true }}>
 *   Save
 * </TextButton>
 * ```
 ******************************************************************************************************************/
export const TextButton: React.FC<TextButtonProps> = memo(
  ({
    children,
    onPress,
    disabled,
    style,
    textOpts,
  }) => {
    const { theme } = useAppTheme();

    /**
     * style
     */
    const styles = useMemo(
      () =>
        StyleSheet.create({
          button: {
            paddingVertical: theme.design.padSize,
            paddingHorizontal: theme.design.padSize * 2,
            borderRadius: theme.design.radiusMedium,
            alignSelf: 'flex-start',
            justifyContent: 'center',
          },
        }),
      [theme]
    );

    return (
      <Touchable
        onPress={onPress}
        disabled={disabled}
        style={[styles.button, style]}
      >
        <Text
          variant='labelLarge'
          color={disabled ? 'disabled' : 'primary'}
          {...textOpts}
        >
          {children}
        </Text>
      </Touchable>
    );
  }
);
