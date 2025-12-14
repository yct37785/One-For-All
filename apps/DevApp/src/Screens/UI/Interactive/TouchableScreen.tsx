import React, { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Nav, UI, Manager } from 'framework';
import { getDemoColors } from '../../demoColors';

/******************************************************************************************************************
 * Interactive demo
 *
 * This screen demonstrates:
 * - Touchable: generic pressable wrapper for custom interactive regions.
 ******************************************************************************************************************/
const TouchableScreen: Nav.ScreenType = ({}) => {
  const { isDarkMode } = Manager.useAppSettings();
  const colors = getDemoColors(isDarkMode);
  const [touchableClicks, setTouchableClicks] = useState(0);

  const onTouchableClick = () => setTouchableClicks(c => c + 1);

  return (
    <Nav.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll' padding={2}>
        {/* Header */}
        <UI.Text variant='bodyMedium'>
          Touchable provides the core interactive surfaces in the UI. Use
          Touchable when you need a flexible pressable wrapper around custom content.
        </UI.Text>

        {/* Touchable · basic opacity feedback */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Touchable · basic</UI.Text>

        <UI.Box mt={2}>
          <UI.Touchable
            onPress={onTouchableClick}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              backgroundColor: colors.cyanBg,
            }}
          >
            <UI.Text variant='bodyMedium'>Tap me (opacity + ripple)</UI.Text>
          </UI.Touchable>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Text variant='labelSmall' color='label'>
            Touchable taps: {touchableClicks}
          </UI.Text>
        </UI.Box>

        {/* Touchable · custom content */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Touchable · custom content</UI.Text>

        <UI.Box mt={2}>
          <UI.Touchable
            onPress={onTouchableClick}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 999,
              backgroundColor: colors.amber,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <UI.Icon source='heart-outline' variant='sm' />
            <UI.Box ml={1}>
              <UI.Text variant='bodyMedium'>Like</UI.Text>
            </UI.Box>
          </UI.Touchable>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Text variant='labelSmall' color='label'>
            Touchable taps: {touchableClicks}
          </UI.Text>
        </UI.Box>

        {/* Touchable · radius & shapes */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Touchable · radius & shapes</UI.Text>

        <UI.Box mt={1}>
          <UI.Text variant='labelSmall' color='label'>
            These examples demonstrate ripple clipping with rounded / custom shapes.
          </UI.Text>
        </UI.Box>

        {/* pill */}
        <UI.Box mt={2}>
          <UI.Touchable
            onPress={onTouchableClick}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 18,
              borderRadius: 999,
              backgroundColor: colors.greenStrong,
            }}
          >
            <UI.Text variant='bodyMedium'>Pill (borderRadius: 999)</UI.Text>
          </UI.Touchable>
        </UI.Box>

        {/* asymmetric radius */}
        <UI.Box mt={2}>
          <UI.Touchable
            onPress={onTouchableClick}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 18,
              backgroundColor: colors.purpleBg,
              borderTopLeftRadius: 18,
              borderTopRightRadius: 4,
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 18,
            }}
          >
            <UI.Text variant='bodyMedium'>Asymmetric corners</UI.Text>
          </UI.Touchable>
        </UI.Box>

        {/* card-like */}
        <UI.Box mt={2}>
          <UI.Touchable
            onPress={onTouchableClick}
            style={{
              paddingVertical: 14,
              paddingHorizontal: 16,
              backgroundColor: colors.neutralAlt,
              borderRadius: 14,
            }}
          >
            <UI.Text variant='bodyMedium'>Card radius (14)</UI.Text>
            <UI.Box mt={1}>
              <UI.Text variant='bodySmall' color='label'>
                Ripple should stay inside the rounded container.
              </UI.Text>
            </UI.Box>
          </UI.Touchable>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Text variant='labelSmall' color='label'>
            Touchable taps: {touchableClicks}
          </UI.Text>
        </UI.Box>

        {/* Touchable · no feedback */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Touchable · no feedback</UI.Text>

        <UI.Box mt={2}>
          <UI.Touchable
            onPress={onTouchableClick}
            feedback='none'
            style={{
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 8,
              backgroundColor: colors.greenStrong,
            }}
          >
            <UI.Text variant='bodyMedium'>No visual feedback</UI.Text>
          </UI.Touchable>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Text variant='labelSmall' color='label'>
            Touchable taps: {touchableClicks}
          </UI.Text>
        </UI.Box>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(TouchableScreen);

const styles = StyleSheet.create({});
