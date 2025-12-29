import React, { memo } from 'react';
import { Image, View, StyleSheet, ViewStyle, ImageStyle, StyleProp } from 'react-native';
import { useAppTheme } from '../../Manager/App/AppThemeManager';
import { TextVariant } from '../Text/Text';
import { Text } from '../Text/Text';
import { Touchable } from '../Interactive/Touchable';

export type AvatarProps = {
  uri?: string;
  label?: string;
  size?: number | 'sm' | 'md' | 'lg';
  shape?: 'circle' | 'rounded';
  bgColor?: string;
  textColor?: string;
  badgeColor?: string;
  badgeSize?: number;
  badgePosition?: 'top-right' | 'bottom-right';
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  onPress?: () => void;
};

/******************************************************************************************************************
 * A circular image or label representing a user or entity, typically used in lists or headers.
 *
 * @property uri?           - Remote/local image URI
 * @property label?         - Fallback text (e.g., initials) when no image is available
 * @property size?          - Pixel size OR preset token ('sm' | 'md' | 'lg'), default: 'md'
 * @property shape?         - 'circle' | 'rounded', default: 'circle'
 * @property bgColor?       - Custom background color for label avatars (overrides theme surface)
 * @property textColor?     - Custom text color for label avatars
 * @property badgeColor?    - Optional small status dot color
 * @property badgeSize?     - Radius of the status badge (defaults to size-based)
 * @property badgePosition? - Badge anchor position: 'top-right' | 'bottom-right' (default: 'bottom-right')
 * @property style?         - Extra style(s) for the outer container
 * @property imageStyle?    - Extra style(s) for the Image element
 * @property onPress?       - Optional press handler to make the avatar interactive
 * 
 * @usage
 * ```tsx
 * <Avatar uri={user.photoURL} />
 * <Avatar label="JS" size="lg" />
 * <Avatar label="A" badgeColor="#2E7D32" />
 * <Avatar label="AB" bgColor="#1e88e5" textColor="#fff" onPress={...} />
 * ```
 ******************************************************************************************************************/
export const Avatar: React.FC<AvatarProps> = memo(
  ({
    uri,
    label,
    size = 'md',
    shape = 'circle',
    bgColor,
    textColor,
    badgeColor,
    badgeSize,
    badgePosition = 'bottom-right',
    style,
    imageStyle,
    onPress,
  }) => {
    const { theme } = useAppTheme();

    // px: avatar size in pixels
    const px =
      typeof size === 'number'
        ? size
        : size === 'sm'
        ? 28
        : size === 'lg'
        ? 48
        : 36; // md default

    const radius =
      shape === 'circle' ? px / 2 : Math.max(6, Math.round(px * 0.22));

    const containerStyle: ViewStyle = {
      width: px,
      height: px,
      borderRadius: radius,
      backgroundColor: bgColor ?? theme.colors.surface,
      borderColor: theme.colors.outline,
    };

    const textVariant: TextVariant =
      px >= 44 ? 'bodySmall' : px >= 36 ? 'labelMedium' : 'labelSmall';

    const computedBadgeSize = badgeSize ?? Math.max(8, Math.round(px * 0.25));

    const badgePositionStyle =
      badgePosition === 'top-right'
        ? { top: 0, right: 0 }
        : { bottom: 0, right: 0 };

    const content = (
      <>
        {uri ? (
          <Image
            source={{ uri }}
            style={[
              StyleSheet.absoluteFillObject,
              { borderRadius: radius },
              imageStyle,
            ]}
          />
        ) : (
          !!label && (
            <Text
              variant={textVariant}
              {...(textColor ? { color: textColor } : {})}
            >
              {label}
            </Text>
          )
        )}

        {badgeColor ? (
          <View
            style={[
              styles.badgeBase,
              badgePositionStyle,
              {
                width: computedBadgeSize,
                height: computedBadgeSize,
                backgroundColor: badgeColor,
                borderColor: theme.colors.surface,
              },
            ]}
          />
        ) : null}
      </>
    );

    const outerStyle = [styles.containerBase, containerStyle, style];

    if (onPress) {
      return (
        <Touchable onPress={onPress} style={outerStyle}>
          {content}
        </Touchable>
      );
    }

    return <View style={outerStyle}>{content}</View>;
  }
);

/******************************************************************************************************************
 * Styles
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  containerBase: {
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  badgeBase: {
    position: 'absolute',
    borderRadius: 99,
    borderWidth: 2,
  },
});
