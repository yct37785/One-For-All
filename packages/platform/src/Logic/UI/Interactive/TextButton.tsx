import React, { memo, useMemo } from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Touchable } from '../Interactive/Touchable';
import { Text, TextProps } from '../Text/Text';
import { useAppTheme } from '../../State/AppThemeManager';

export interface TextButtonProps {
  textOpts?: TextProps;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
}

/******************************************************************************************************************
 * A lightweight text-only button with:
 * - Your Touchable for proper press feedback (opacity/ripple)
 * - Rounded rectangle background
 * - Padding for tap target
 * - Uses base Text for variant, color, bold, etc.
 * 
 * @param textOpts?       - Additional props passed to the internal Text component
 * @param style?          - Style applied to the button container
 * @param disabled?       - Disable press handling
 * @param onPress?        - Press callback
 * @param children?       - Button label/content
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

    const styles = useMemo(
      () =>
        StyleSheet.create({
          button: {
            paddingVertical: theme.design.padSize,
            paddingHorizontal: theme.design.padSize * 2,
            borderRadius: theme.design.radiusMedium,
            alignSelf: 'flex-start',
            justifyContent: 'center',
            opacity: disabled ? 0.6 : 1,
          },
        }),
      [theme, disabled]
    );

    // ensure disabled styling always wins (don’t let textOpts override it)
    const resolvedTextOpts: TextProps = {
      ...textOpts,
      variant: textOpts?.variant ?? 'labelLarge',
      color: disabled ? 'disabled' : (textOpts?.color ?? 'primary'),
    };

    return (
      <Touchable
        onPress={onPress}
        disabled={disabled}
        style={[styles.button, style]}
      >
        <Text {...resolvedTextOpts}>
          {children}
        </Text>
      </Touchable>
    );
  }
);
