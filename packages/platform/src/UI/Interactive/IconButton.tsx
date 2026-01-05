import React, { memo } from 'react';
import type {
  GestureResponderEvent,
  StyleProp,
  ViewStyle
} from 'react-native';
import { IconButton as PaperIconButton } from 'react-native-paper';
import { IconVariant, iconVariantSizeMap } from '../Text/Icon';

export type IconButtonMode = 'outlined' | 'contained' | 'contained-tonal';

export type IconButtonProps = {
  icon: string;
  mode?: IconButtonMode;
  size?: IconVariant;
  disabled?: boolean;
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
 * <IconButton icon="star" selected onPress={toggleStarred} />
 * <IconButton icon="plus" size="lg" />
 * ```
 ******************************************************************************************************************/
export const IconButton: React.FC<IconButtonProps> = memo(
  ({
    icon,
    mode = 'contained',
    size = 'md',
    disabled,
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
    const resolvedSize =
      typeof size === 'number' ? size : iconVariantSizeMap[size];

    return (
      <PaperIconButton
        icon={icon}
        mode={mode}
        size={resolvedSize}
        disabled={disabled}
        selected={selected}
        containerColor={buttonColor}
        iconColor={iconColor}
        style={style}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onLongPress={onLongPress}
        delayLongPress={delayLongPress}
      />
    );
  }
);
