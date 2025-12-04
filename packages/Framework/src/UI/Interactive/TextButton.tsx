import React, { memo } from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Touchable } from '../Interactive/Touchable';
import { Text, TextProps } from '../Text/Text';
import * as Const from '../../Const';

/******************************************************************************************************************
 * TextButton props.
 *
 * @property label?          - The button label (alternative to children)
 * @property children?       - Optional custom text nodes
 * @property textProps?      - Additional props passed to the internal Text component
 * @property style?          - Style applied to the button container
 * @property disabled?       - Disable press handling
 * @property onPress?        - Press callback
 ******************************************************************************************************************/
export interface TextButtonProps {
  label?: string;
  children?: React.ReactNode;
  textProps?: TextProps;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onPress?: () => void;
}

/******************************************************************************************************************
 * TextButton
 *
 * A lightweight text-only button with:
 * - Your Touchable for proper press feedback (opacity/ripple)
 * - Rounded rectangle background
 * - Padding for tap target
 * - Uses base Text for variant, color, bold, etc.
 *
 * @usage
 * ```tsx
 * <TextButton label='Edit' onPress={onEdit} />
 *
 * <TextButton onPress={save} textProps={{ variant: 'titleSmall', bold: true }}>
 *   Save
 * </TextButton>
 * ```
 ******************************************************************************************************************/
export const TextButton: React.FC<TextButtonProps> = memo(
  ({
    label,
    children,
    onPress,
    disabled,
    style,
    textProps,
  }) => {
    return (
      <Touchable
        onPress={onPress}
        disabled={disabled}
        style={[styles.button, style]}
      >
        <Text
          variant='labelLarge'
          color={disabled ? 'disabled' : 'primary'}
          {...textProps}
        >
          {children || label}
        </Text>
      </Touchable>
    );
  }
);

/******************************************************************************************************************
 * Styles.
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  button: {
    paddingVertical: Const.padSize,
    paddingHorizontal: Const.padSize * 2,
    borderRadius: Const.radiusMedium,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
});
