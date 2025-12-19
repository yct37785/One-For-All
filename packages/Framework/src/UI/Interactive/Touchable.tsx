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
import { useAppTheme } from '../../Manager/AppThemeManager';

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
 * Touchable
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
    const opacity = useRef(new Animated.Value(1)).current;
    const isOpacity = feedback === 'opacity';

    // track last animated target to avoid redundant animations
    const lastTarget = useRef<number>(1);

    /**************************************************************************************************************
     * Theme-aware defaults.
     **************************************************************************************************************/
    const resolvedPressOpacity = theme.dark
      ? theme.design.pressOpacityLight
      : theme.design.pressOpacityMedium;

    const run = (to: number, dur: number) => {
      if (lastTarget.current === to) return;
      lastTarget.current = to;

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
        run(resolvedPressOpacity, theme.design.pressInDurationMS);
      }
      onPressIn?.(e);
    };

    const handleOut = (e: any) => {
      if (isOpacity) {
        run(1, theme.design.pressOutDurationMS);
      }
      onPressOut?.(e);
    };

    /**
     * Reset opacity immediately when disabled or feedback mode changes.
     */
    useEffect(() => {
      if (!isOpacity || disabled) {
        lastTarget.current = 1;
        opacity.stopAnimation();
        opacity.setValue(1);
      }
    }, [isOpacity, disabled, opacity]);

    /**************************************************************************************************************
     * Split style (fast paths):
     * - If no style, skip flattening.
     **************************************************************************************************************/
    const flattened = style ? (StyleSheet.flatten(style) as ViewStyle) : undefined;

    const borderRadius = flattened?.borderRadius;
    const borderTopLeftRadius = flattened?.borderTopLeftRadius;
    const borderTopRightRadius = flattened?.borderTopRightRadius;
    const borderBottomLeftRadius = flattened?.borderBottomLeftRadius;
    const borderBottomRightRadius = flattened?.borderBottomRightRadius;

    const hasAnyRadius =
      borderRadius != null ||
      borderTopLeftRadius != null ||
      borderTopRightRadius != null ||
      borderBottomLeftRadius != null ||
      borderBottomRightRadius != null;

    const pressableStyle: ViewStyle = {
      ...(hasAnyRadius
        ? {
          borderRadius,
          borderTopLeftRadius,
          borderTopRightRadius,
          borderBottomLeftRadius,
          borderBottomRightRadius,
          overflow: 'hidden',
        }
        : null),
    };

    const contentStyle: ViewStyle | undefined = flattened
      ? (() => {
        // remove radius / overflow props from the inner content
        const {
          borderRadius: _br,
          borderTopLeftRadius: _btlr,
          borderTopRightRadius: _btrr,
          borderBottomLeftRadius: _bblr,
          borderBottomRightRadius: _bbrr,
          overflow: _ov,
          ...rest
        } = flattened;

        return rest as ViewStyle;
      })()
      : undefined;

    /**************************************************************************************************************
     * Android ripple config.
     *
     * Static/banding in dark mode is often caused by foreground ripple + clipping.
     * If the touchable is rounded (overflow hidden), prefer background ripple.
     **************************************************************************************************************/
    const rippleBase = {
      borderless: false,
      foreground: true,
      color: theme.dark ? theme.design.rippleColorForDark : theme.design.rippleColorForLight,
    }

    const ripple =
      Platform.OS === 'android' && isOpacity
        // ? { ...rippleBase, foreground: !hasAnyRadius } removed foreground
        ? { ...rippleBase }
        : undefined;

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
