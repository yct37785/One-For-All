import React, { memo } from 'react';
import {
  Pressable,
  View,
  ViewStyle,
  StyleProp,
  Platform,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps
} from 'react-native';
import { useAppTheme } from '../../Manager/App/AppThemeManager';

export interface TouchableProps {
  feedback?: 'opacity' | 'none';
  disabled?: boolean;
  onPress?: TouchableNativeFeedbackProps['onPress'];
  onPressIn?: TouchableNativeFeedbackProps['onPressIn'];
  onPressOut?: TouchableNativeFeedbackProps['onPressOut'];
  onLongPress?: TouchableNativeFeedbackProps['onLongPress'];
  delayLongPress?: TouchableNativeFeedbackProps['delayLongPress'];
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/******************************************************************************************************************
 * Touchable: unstyled box component with ripple feedback.
 * 
 * @param feedback              - Press feedback style ('opacity' | 'none'). Default: 'opacity'
 *                                   • 'opacity': Android ripple (native) + iOS opacity (pressed)
 *                                   • 'none'   : No visual feedback
 * @param disabled              - Disables press handling & visual feedback
 * @param onPress               - Called when the press gesture ends successfully
 * @param onPressIn             - Called when the press gesture starts
 * @param onPressOut            - Called when the press gesture ends (canceled or completed)
 * @param onLongPress           - Called when the user presses and holds for longer than the delay
 * @param delayLongPress        - Time (ms) before onLongPress fires
 * @param style                 - Style(s) applied to the root container
 * @param children              - React children rendered inside the touchable
 ******************************************************************************************************************/
export const Touchable: React.FC<TouchableProps> = memo(
  ({
    feedback = 'opacity',
    disabled,
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
    delayLongPress,
    style,
    children,
  }) => {
    const { theme } = useAppTheme();
    const isOpacity = feedback === 'opacity';

    /**************************************************************************************************************
     * Theme-aware defaults.
     **************************************************************************************************************/
    const resolvedPressOpacity = theme.dark
      ? theme.design.pressOpacityLight
      : theme.design.pressOpacityMedium;

    /**************************************************************************************************************
     * Android ripple config.
     *
     * Notes:
     * - TouchableNativeFeedback provides a native ripple.
     * - Ripple is clipped ONLY if the child view has borderRadius + overflow: 'hidden'.
     * - We do NOT flatten styles; we simply apply `style` to the child container view.
     **************************************************************************************************************/
    const ripple =
      Platform.OS === 'android' && isOpacity
        ? TouchableNativeFeedback.Ripple(
            theme.dark ? theme.design.rippleColorForDark : theme.design.rippleColorForLight,
            false
          )
        : undefined;

    // Android: use native ripple (no animated opacity)
    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback
          disabled={disabled}
          onPress={onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onLongPress={onLongPress}
          delayLongPress={delayLongPress}
          background={ripple}
          useForeground={true}
        >
          <View
            style={[
              style,
              // ensure ripple can be clipped if caller provided borderRadius in style
              isOpacity ? styles.androidClip : null,
            ]}
          >
            {children}
          </View>
        </TouchableNativeFeedback>
      );
    }

    // iOS: Pressable opacity feedback (no ripple)
    return (
      <Pressable
        disabled={disabled}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onLongPress={onLongPress}
        delayLongPress={delayLongPress}
        style={({ pressed }) => [
          style,
          isOpacity && pressed && !disabled ? { opacity: resolvedPressOpacity } : null,
        ]}
      >
        {children}
      </Pressable>
    );
  }
);

/******************************************************************************************************************
 * Styles
 ******************************************************************************************************************/
const styles = {
  androidClip: {
    overflow: 'hidden',
  } as ViewStyle,
};
