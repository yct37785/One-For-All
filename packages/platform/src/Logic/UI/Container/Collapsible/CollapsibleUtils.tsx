import React, { useState, memo, useEffect, useRef, useMemo } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useAppTheme } from '../../../App/AppThemeManager';
import { Text, TextProps } from '../../Text/Text';
import { Icon, IconProps, iconVariantSizeMap } from '../../Text/Icon';

/******************************************************************************************************************
 * Utility component that keeps its children mounted until a specified timeout elapses after becoming inactive.
 ******************************************************************************************************************/
export const KeepMountedDuringClose: React.FC<{
  active: boolean;
  durationMs: number;
  children: React.ReactNode;
}> = ({ active, durationMs, children }) => {
  const [render, setRender] = useState(active);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // if becoming active: show immediately and cancel any pending unmount
    if (active) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setRender(true);
      return;
    }
    // if becoming inactive: wait for the close animation to finish, then unmount
    timerRef.current = setTimeout(() => setRender(false), durationMs);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [active, durationMs]);

  return render ? <>{children}</> : null;
};

export type ToggleHeaderProps = {
  text?: string;
  textOpts?: TextProps;
  icon?: string;
  iconOpts?: IconProps;
  isCollapsed: boolean;
};

/******************************************************************************************************************
 * Render a compact header with optional icon + title and a chevron that reflects collapse state.
 *
 * @param text        - Text label displayed in the header
 * @param textOpts    - Text styling options
 * @param icon        - Optional leading icon
 * @param iconOpts    - Leading icon styling options
 * @param isCollapsed - Whether the section is currently collapsed
 ******************************************************************************************************************/
export const ToggleHeader: React.FC<ToggleHeaderProps> = memo(
  ({ text, textOpts, icon, iconOpts, isCollapsed }) => {
    const { theme } = useAppTheme();

    // determine icon size (default to 'md' if none provided)
    const variant = iconOpts?.variant ?? 'md';
    const pixel = iconVariantSizeMap[variant];

    /**
     * style
     */
    const styles = useMemo(
      () =>
        StyleSheet.create({
          toggleHeaderRow: {
            padding: theme.design.padSize,
            flexDirection: 'row',
            alignItems: 'center',
          },
          flexSpacer: {
            flex: 1,
          },
        }),
      [theme]
    );

    return (
      <View style={styles.toggleHeaderRow}>

        {/* Fixed-width icon container */}
        {icon ? (
          <View
            style={{
              width: pixel,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: theme.design.padSize * 2,
            }}
          >
            <Icon
              source={icon}
              variant={variant}
              color={theme.colors.onSurface}
              {...iconOpts}
            />
          </View>
        ) : (
          // if no icon provided, alignment not preserved
          null
        )}

        {/* Label */}
        {text ? (
          <Text variant='titleSmall' {...textOpts}>
            {text}
          </Text>
        ) : null}

        <View style={styles.flexSpacer} />

        {/* Chevron - unchanged */}
        <Icon
          source={isCollapsed ? 'chevron-down' : 'chevron-up'}
          variant='md'
          color={theme.colors.onSurface}
        />
      </View>
    );
  }
);
