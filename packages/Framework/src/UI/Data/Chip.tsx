import React, { memo } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import * as Const from '../../Const';
import { Text } from '../Text/Text';
import { Touchable } from '../Interactive/Touchable';
import { Icon } from '../Text/Icon';

/******************************************************************************************************************
 * Chip props.
 *
 * @property label           - Text shown inside the chip
 * @property selected?       - Selected state; affects colors
 * @property disabled?       - Disabled state; prevents interaction and dims visuals
 * @property leadingIcon?    - Optional leading icon name (e.g. 'tag', 'filter')
 * @property isClose?        - If true, shows trailing "X" and treats onPress as a close/remove action
 * @property onPress?        - Called when the chip is pressed (for close chips, this is the close logic)
 * @property style?          - Extra style(s) for the chip container
 ******************************************************************************************************************/
export type ChipProps = {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  leadingIcon?: string;
  isClose?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

// pill radius used for both ripple clip (Touchable) and visible border (inner container)
const CHIP_RADIUS = 999;

/******************************************************************************************************************
 * A rounded rectangular chip for tags or filters, with optional leading icon and trailing close action.
 *
 * Visual states:
 * - Unselected: outlined chip on surface background
 * - Selected  : filled chip using primaryContainer
 * - Disabled  : dimmed colors and non-interactive
 *
 * Behaviour:
 * - If isClose is true, a trailing "X" is shown and pressing anywhere on the chip calls onPress.
 *
 * @usage
 * ```tsx
 * <Chip label="All items" selected onPress={...} />
 * <Chip label="Unread" leadingIcon="email" onPress={...} />
 * <Chip label="Filter" isClose onPress={() => removeFilter('filter')} />
 * ```
 ******************************************************************************************************************/
export const Chip: React.FC<ChipProps> = memo(
  ({
    label,
    selected = false,
    disabled = false,
    leadingIcon,
    isClose = false,
    onPress,
    style,
  }) => {
    const theme = useTheme();

    // base colors for different states
    const isInteractive = !!onPress;

    const bgColor = (() => {
      if (disabled) return theme.colors.surfaceVariant;
      if (selected) return theme.colors.primaryContainer;
      return theme.colors.surface;
    })();

    const borderColor = (() => {
      if (disabled) return theme.colors.outlineVariant ?? theme.colors.outline;
      if (selected) return theme.colors.primary;
      return theme.colors.outline;
    })();

    const textColor = (() => {
      if (disabled) return theme.colors.onSurfaceDisabled ?? theme.colors.onSurface;
      if (selected) return theme.colors.onPrimaryContainer;
      return theme.colors.onSurface;
    })();

    // visible container (inside Touchable) – responsible for border + background
    const innerContainerStyle: ViewStyle = {
      backgroundColor: bgColor,
      borderColor,
      borderRadius: CHIP_RADIUS,
    };

    const content = (
      <View style={[styles.innerContainer, innerContainerStyle, style]}>
        <View style={styles.innerRow}>
          {leadingIcon ? (
            <View style={styles.leadingIconWrapper}>
              <Icon source={leadingIcon} variant='sm' customColor={textColor} />
            </View>
          ) : null}

          <Text variant='labelMedium' customColor={textColor} numberOfLines={1}>
            {label}
          </Text>

          {isClose ? (
            <View style={styles.closeWrapper}>
              <Icon
                source='close'
                variant='xs'
                customColor={textColor}
              />
            </View>
          ) : null}
        </View>
      </View>
    );

    // Touchable only needs the radius for ripple clipping; border is handled by inner container
    const touchableStyle: ViewStyle = {
      borderRadius: CHIP_RADIUS,
    };

    if (isInteractive) {
      return (
        <Touchable
          onPress={onPress}
          disabled={disabled}
          style={touchableStyle}
        >
          {content}
        </Touchable>
      );
    }

    return <View style={touchableStyle}>{content}</View>;
  }
);

/******************************************************************************************************************
 * Styles.
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  innerContainer: {
    minHeight: 32,
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    paddingHorizontal: Const.padSize * 1.5,
    paddingVertical: Const.padSize * 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  leadingIconWrapper: {
    marginRight: Const.padSize,
  },
  closeWrapper: {
    marginLeft: Const.padSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
