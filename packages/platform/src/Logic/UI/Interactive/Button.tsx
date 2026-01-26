import React, { memo } from 'react';
import type { GestureResponderEvent, StyleProp, ViewStyle, TextStyle, ColorValue } from 'react-native';
import { useAppTheme } from '../../App/AppThemeManager';
import { Button as PaperButton } from 'react-native-paper';

export type ButtonMode = 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';

export type ButtonProps = {
  mode?: ButtonMode;
  compact?: boolean;
  icon?: string;
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
 * @param icon?             - Leading icon
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
 * ```
 ******************************************************************************************************************/
export const Button: React.FC<ButtonProps> = memo(
  ({ mode = 'contained', children, labelStyle, loading, onPress, disabled, ...rest }) => {
    const { theme } = useAppTheme();

    /**
     * Centralized visual rule:
     * - If loading, keep the label color but make it more subdued.
     * - We apply this after user labelStyle so it always takes effect.
     */
    const resolvedLabelStyle: StyleProp<TextStyle> = [
      labelStyle,
      loading ? { opacity: theme.design.loadingOpacity } : null,
    ];

    const resolvedOnPress = loading ? undefined : onPress;
    const resolvedOnPressIn = loading ? undefined : rest.onPressIn;
    const resolvedOnPressOut = loading ? undefined : rest.onPressOut;
    const resolvedOnLongPress = loading ? undefined : rest.onLongPress;

    return (
      <PaperButton
        mode={mode}
        labelStyle={resolvedLabelStyle}
        loading={loading}
        disabled={disabled}
        onPress={resolvedOnPress}
        onPressIn={resolvedOnPressIn}
        onPressOut={resolvedOnPressOut}
        onLongPress={resolvedOnLongPress}
        {...rest}
      >
        {children}
      </PaperButton>
    );
  }
);
