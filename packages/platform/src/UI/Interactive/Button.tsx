import React, { memo } from 'react';
import type { GestureResponderEvent, StyleProp, ViewStyle, TextStyle, ColorValue } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

export type ButtonMode = 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';

export type ButtonProps = {
  mode?: ButtonMode;
  compact?: boolean;
  disabled?: boolean;
  loading?: boolean;
  buttonColor?: string;
  textColor?: string;
  contentStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  onPress?: (e: GestureResponderEvent) => void;
  onPressIn?: (e: GestureResponderEvent) => void;
  onPressOut?: (e: GestureResponderEvent) => void;
  onLongPress?: (e: GestureResponderEvent) => void;
  delayLongPress?: number;
  children?: React.ReactNode;
};

/******************************************************************************************************************
 * A pressable control that triggers an action or event, supporting multiple visual modes.
 * 
 * @param mode?             - Visual style variant (MD3)
 * @param compact?          - Slightly reduce paddings/min-height for dense layouts
 * @param disabled?         - Disable interactions and apply disabled styles
 * @param loading?          - Show a small busy indicator and reduce label opacity
 * @param buttonColor?      - Background color override (enabled state)
 * @param textColor?        - Label color override (enabled state)
 * @param contentStyle?     - Style for inner content container (e.g., height, padding, direction)
 * @param labelStyle?       - Style for the button text
 * @param style?            - Style for the outer button container (background/border)
 * @param onPress?          - Press handler
 * @param onPressIn?        - Called on pointer/touch in
 * @param onPressOut?       - Called on pointer/touch out
 * @param onLongPress?      - Long-press handler
 * @param delayLongPress?   - Milliseconds before long-press fires
 * @param children          - Button label (text) or a custom node
 * 
 * @usage
 * ```tsx
 * <Button mode="text" onPress={handlePress}>Text</Button>
 * <Button mode="outlined" icon="cog" onPress={openSettings}>Settings</Button>
 * <Button mode="contained" loading>Saving…</Button>
 * <Button mode="contained-tonal" buttonColor="#6750A4">Tonal</Button>
 * <Button mode="elevated" disabled>Disabled</Button>
 * <Button mode="contained" compact contentStyle={{ minHeight: 36 }}>Compact</Button>
 * <Button mode="text" labelStyle={{ textTransform: 'none' }}>No Caps</Button>
 * ```
 ******************************************************************************************************************/
export const Button: React.FC<ButtonProps> = memo(({ mode = 'contained', children, ...rest }) => {
  return (
    <PaperButton mode={mode} {...rest}>
      {children}
    </PaperButton>
  );
});
