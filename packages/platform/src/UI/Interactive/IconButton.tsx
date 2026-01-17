import React, { memo } from 'react';
import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { IconButton as PaperIconButton } from 'react-native-paper';
import { IconVariant, iconVariantSizeMap } from '../Text/Icon';
import { useAppTheme } from '../../Manager/App/AppThemeManager';

export type IconButtonMode = 'outlined' | 'contained' | 'contained-tonal';

export type IconButtonProps = {
  icon: string;
  mode?: IconButtonMode;
  size?: IconVariant;
  disabled?: boolean;
  loading?: boolean;
  selected?: boolean;
  buttonColor?: string;
  iconColor?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: (e: GestureResponderEvent) => void;
  onPressIn?: (e: GestureResponderEvent) => void;
  onPressOut?: (e: GestureResponderEvent) => void;
  onLongPress?: (e: GestureResponderEvent) => void;
  delayLongPress?: number;
};

/******************************************************************************************************************
 * A compact icon-only button, commonly used for secondary actions like favorite, settings, or close.
 *
 * @param icon                 - Icon name (Material Community Icons), e.g. 'heart', 'cog'
 * @param mode?                - Visual style variant (MD3)
 * @param size?                - Icon preset size
 * @param disabled?            - Disable interactions and apply disabled styles
 * @param selected?            - Selected state for toggle-style icon buttons
 * @param buttonColor?         - Background color override (containerColor under the hood)
 * @param iconColor?           - Icon color override
 * @param style?               - Style for the outer button container (background/border)
 * @param onPress?             - Press handler
 * @param onPressIn?           - Called on pointer/touch in
 * @param onPressOut?          - Called on pointer/touch out
 * @param onLongPress?         - Long-press handler
 * @param delayLongPress?      - Milliseconds before long-press fires
 * 
 * @usage
 * ```tsx
 * <IconButton icon="heart-outline" onPress={toggleLike} />
 * <IconButton icon="cog" mode="outlined" onPress={openSettings} />
 * <IconButton icon="delete" mode="contained" buttonColor="#e53935" iconColor="#fff" />
 * ```
 ******************************************************************************************************************/
export const IconButton: React.FC<IconButtonProps> = memo(
  ({
    icon,
    mode = 'contained',
    size = 'md',
    disabled,
    loading,
    selected,
    buttonColor,
    iconColor,
    style,
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
    delayLongPress,
  }) => {
    const { theme } = useAppTheme();

    const resolvedSize =
      typeof size === 'number' ? size : iconVariantSizeMap[size];

    const spinnerColor = iconColor ?? theme.colors.primary;
    
    const resolvedIconColor = loading
      ? spinnerColor
      : (iconColor ?? undefined);

    const resolvedOnPress = loading ? undefined : onPress;
    const resolvedOnPressIn = loading ? undefined : onPressIn;
    const resolvedOnPressOut = loading ? undefined : onPressOut;
    const resolvedOnLongPress = loading ? undefined : onLongPress;

    return (
      <PaperIconButton
        icon={
          loading
            ? () => (
              <ActivityIndicator
                size={Math.max(14, Math.round(resolvedSize * 0.6))}
                color={spinnerColor}
              />
            )
            : icon
        }
        mode={mode}
        size={resolvedSize}
        disabled={disabled}
        selected={selected}
        containerColor={buttonColor}
        iconColor={resolvedIconColor}
        style={style}
        onPress={resolvedOnPress}
        onPressIn={resolvedOnPressIn}
        onPressOut={resolvedOnPressOut}
        onLongPress={resolvedOnLongPress}
        delayLongPress={delayLongPress}
      />
    );
  }
);
