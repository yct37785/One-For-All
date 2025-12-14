import React, { useRef, useEffect, memo } from 'react';
import {
  Pressable,
  PressableProps,
  ViewStyle,
  StyleProp,
  StyleSheet,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import * as Const from '../../Const';

/******************************************************************************************************************
 * TouchableProps
 *
 * @property feedback              - Press feedback style ('opacity' | 'none'). Default: 'opacity'
 *                                   • 'opacity': Smooth opacity animation + Android ripple
 *                                   • 'none'   : No visual feedback
 * @property disabled              - Disables press handling & visual feedback
 * @property onPress               - Called when the press gesture ends successfully
 * @property onPressIn             - Called when the press gesture starts
 * @property onPressOut            - Called when the press gesture ends (canceled or completed)
 * @property onLongPress           - Called when the user presses and holds for longer than the delay
 * @property delayLongPress        - Time (ms) before onLongPress fires
 * @property style                 - Style(s) applied to the root container
 * @property children              - React children rendered inside the touchable
 ******************************************************************************************************************/
export interface TouchableProps {
  feedback?: 'opacity' | 'none';
  disabled?: boolean;
  onPress?: PressableProps['onPress'];
  onPressIn?: PressableProps['onPressIn'];
  onPressOut?: PressableProps['onPressOut'];
  onLongPress?: PressableProps['onLongPress'];
  delayLongPress?: number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/******************************************************************************************************************
 * A generic interactive wrapper providing consistent feedback (ripple or opacity) for pressable elements.
 *
 * Notes:
 * - Uses Animated.Value for opacity feedback (native driver).
 * - Avoids heavy hooks (no useMemo/useCallback) since work is cheap.
 * - For Android ripple clipping, border radius is applied to the Pressable and overflow is set to 'hidden'.
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
    const theme = useTheme();
    const opacity = useRef(new Animated.Value(1)).current;
    const isOpacity = feedback === 'opacity';

    /**************************************************************************************************************
     * Theme-aware defaults.
     *
     * In dark mode, a slightly higher opacity (less dim) tends to look better; in light mode we can dim more.
     **************************************************************************************************************/
    const resolvedPressOpacity = theme.dark
      ? Const.pressOpacityLight // less aggressive dimming in dark mode
      : Const.pressOpacityMedium;

    /**************************************************************************************************************
     * Android ripple config (theme-aware).
     *
     * Provide an explicit ripple color to keep it visible and pleasant in dark mode.
     **************************************************************************************************************/
    const ripple =
      Platform.OS === 'android' && isOpacity
        ? {
            borderless: false,
            foreground: true,
            // use primary with low alpha for consistent ripple on both themes
            color: theme.dark ? Const.rippleColorForDark : Const.rippleColorForLight,
          }
        : undefined;

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
        run(resolvedPressOpacity, Const.pressInDurationMS);
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

    /**
     * Split style:
     * - pressableStyle    → border radius + overflow for ripple clipping
     * - contentStyle      → remaining style applied to Animated.View
     */
    const flattened = StyleSheet.flatten(style) || {};
    const {
      borderRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      overflow: _overflowIgnored,
      ...restStyle
    } = flattened;

    const hasAnyRadius =
      borderRadius != null ||
      borderTopLeftRadius != null ||
      borderTopRightRadius != null ||
      borderBottomLeftRadius != null ||
      borderBottomRightRadius != null;

    const pressableStyle: ViewStyle = {
      borderRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      ...(hasAnyRadius ? { overflow: 'hidden' as const } : null),
    };

    const contentStyle: ViewStyle = {
      ...restStyle,
    };

    return (
      <Pressable
        disabled={disabled}
        android_ripple={ripple}
        onPress={onPress}
        onPressIn={handleIn}
        onPressOut={handleOut}
        onLongPress={onLongPress}
        delayLongPress={delayLongPress}
        style={pressableStyle}
      >
        <Animated.View style={[contentStyle, { opacity }]}>
          {children}
        </Animated.View>
      </Pressable>
    );
  }
);
