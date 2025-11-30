import React, { useRef, useEffect, memo } from 'react';
import { Pressable, PressableProps, ViewStyle, StyleProp, Platform, Animated, Easing } from 'react-native';
import * as Const from '../../Const';

// predefined Android ripple configuration (shared instance)
const ANDROID_RIPPLE = {
  borderless: false,
  foreground: true,
} as const;

/******************************************************************************************************************
 * TouchableProps
 *
 * @property feedback              - Press feedback style ('opacity' | 'none'). Default: 'opacity'
 *                                   • 'opacity': Smooth opacity animation + Android ripple
 *                                   • 'none'   : No visual feedback
 * @property pressOpacity          - Press opacity, defaults to pressOpacityLight
 * @property disabled              - Disables press handling & visual feedback
 * @property onPress               - Called when the press gesture ends successfully
 * @property onPressIn             - Called when the press gesture starts
 * @property onPressOut            - Called when the press gesture ends (canceled or completed)
 * @property onLongPress           - Called when the user presses and holds for longer than the delay
 * @property delayLongPress        - Time (ms) before onLongPress fires
 * @property android_disableSound  - Disables Android's click sound
 * @property hitSlop               - Extra touch area around the element
 * @property pressRetentionOffset  - Defines how far the touch can move before deactivating press
 * @property style                 - Style(s) applied to the root container
 * @property children              - React children rendered inside the touchable
 ******************************************************************************************************************/
export interface TouchableProps {
  feedback?: 'opacity' | 'none';
  pressOpacity?: number;
  disabled?: boolean;
  onPress?: PressableProps['onPress'];
  onPressIn?: PressableProps['onPressIn'];
  onPressOut?: PressableProps['onPressOut'];
  onLongPress?: PressableProps['onLongPress'];
  delayLongPress?: number;
  android_disableSound?: boolean;
  hitSlop?: PressableProps['hitSlop'];
  pressRetentionOffset?: PressableProps['pressRetentionOffset'];
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/******************************************************************************************************************
 * A generic interactive wrapper providing consistent feedback (ripple or opacity) for pressable elements.
 *
 * Notes:
 * - Uses Animated.Value for opacity feedback (native driver).
 * - Avoids heavy hooks (no useMemo/useCallback) since work is cheap.
 * - Uses a shared ripple config instead of recreating it per render.
 * 
 * @usage
 * ```tsx
 * <Touchable onPress={handlePress} style={{ padding: 12, borderRadius: 8 }}>
 *   <Text>Tap me</Text>
 * </Touchable>
 * ```
 ******************************************************************************************************************/
export const Touchable: React.FC<TouchableProps> = memo(
  ({
    feedback = 'opacity',
    pressOpacity = Const.pressOpacityLight,
    disabled,
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
    delayLongPress,
    android_disableSound,
    hitSlop,
    pressRetentionOffset,
    style,
    children,
  }) => {
    const opacity = useRef(new Animated.Value(1)).current;
    const isOpacity = feedback === 'opacity';

    const run = (to: number, dur: number) => {
      opacity.stopAnimation();
      Animated.timing(opacity, {
        toValue: to,
        duration: dur,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    };

    const handleIn = (e: any) => {
      if (!disabled && isOpacity) {
        run(pressOpacity, Const.pressInDurationMS);
      }
      onPressIn?.(e);
    };

    const handleOut = (e: any) => {
      if (isOpacity) {
        run(1, Const.pressOutDurationMS);
      }
      onPressOut?.(e);
    };

    /**
     * Reset opacity immediately when disabled or feedback mode changes.
     */
    useEffect(() => {
      if (!isOpacity || disabled) {
        opacity.stopAnimation();
        opacity.setValue(1);
      }
    }, [isOpacity, disabled, opacity]);

    const ripple =
      Platform.OS === 'android' && isOpacity ? ANDROID_RIPPLE : undefined;

    return (
      <Pressable
        disabled={disabled}
        android_ripple={ripple}
        onPress={onPress}
        onPressIn={handleIn}
        onPressOut={handleOut}
        onLongPress={onLongPress}
        delayLongPress={delayLongPress}
        android_disableSound={android_disableSound}
        hitSlop={hitSlop}
        pressRetentionOffset={pressRetentionOffset}
      >
        <Animated.View style={[style as ViewStyle, { opacity }]}>
          {children}
        </Animated.View>
      </Pressable>
    );
  }
);
