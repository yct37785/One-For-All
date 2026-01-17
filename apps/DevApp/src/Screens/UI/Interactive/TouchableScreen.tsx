import React, { memo, useState } from 'react';
import { Nav, UI, Manager } from 'framework';
import { getDemoColors } from '../../demoColors';

/******************************************************************************************************************
 * Touchable demo
 *
 * Touchable is an unstyled pressable wrapper for custom interactive regions.
 * - Android: native ripple (TouchableNativeFeedback)
 * - iOS: opacity feedback (Pressable)
 ******************************************************************************************************************/
const TouchableScreen: Nav.ScreenType = () => {
  const { isDarkMode } = Manager.useAppSettings();
  const { theme } = Manager.useAppTheme();
  const colors = getDemoColors(isDarkMode);

  const [taps, setTaps] = useState(0);
  const onTap = () => setTaps(c => c + 1);

  return (
    <Nav.ScreenLayout showTitle title='Touchable'>
      <UI.VerticalLayout constraint='scroll' padding={2}>

        {/* Intro */}
        <UI.Text variant='bodyMedium'>
          Touchable is the base building block for custom pressable UI.
        </UI.Text>

        <UI.LabelText variant='bodySmall'>
          * Android uses a native ripple. iOS uses pressed opacity.
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.LabelText variant='labelSmall'>
            Taps: {taps}
          </UI.LabelText>
        </UI.Box>

        {/* Basic */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Basic</UI.Text>

        <UI.Box mt={1}>
          <UI.Touchable
            onPress={onTap}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 10,
              backgroundColor: colors.neutral_2,
            }}
          >
            <UI.Text variant='bodyMedium'>Tap me</UI.Text>
          </UI.Touchable>
        </UI.Box>

        {/* Custom content */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Custom content</UI.Text>

        <UI.Box mt={1}>
          <UI.Touchable
            onPress={onTap}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 999,
              backgroundColor: colors.amber_2,
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

        {/* Custom content · row item */}
        <UI.Box mt={1}>
          <UI.Touchable
            onPress={onTap}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 12,
              backgroundColor: colors.neutral_1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <UI.Box dir='row' align='center'>
              <UI.Icon source='account' variant='sm' />
              <UI.Box ml={1}>
                <UI.Text variant='bodyMedium'>Profile</UI.Text>
                <UI.LabelText variant='labelSmall'>
                  View and edit your profile
                </UI.LabelText>
              </UI.Box>
            </UI.Box>

            <UI.Icon source='chevron-right' variant='sm' />
          </UI.Touchable>
        </UI.Box>

        {/* Custom content · card */}
        <UI.Box mt={1}>
          <UI.Touchable
            onPress={onTap}
            style={{
              padding: 16,
              borderRadius: 16,
              backgroundColor: colors.cyan_1,
            }}
          >
            <UI.Text variant='titleSmall'>Card title</UI.Text>

            <UI.Text
              variant='bodySmall'
              color={theme.colors.onSurfaceVariant}
              top={2}
            >
              Touchable can wrap complex layouts like cards, tiles, and list rows.
            </UI.Text>

            <UI.Box mt={1} dir='row' align='center'>
              <UI.Icon source='information-outline' variant='xs' />
              <UI.Box ml={1}>
                <UI.Text variant='labelSmall'>Tap to learn more</UI.Text>
              </UI.Box>
            </UI.Box>
          </UI.Touchable>
        </UI.Box>

        {/* Ripple clipping */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Ripple clipping</UI.Text>

        <UI.LabelText>
          Rounded shapes clip ripples when overflow is hidden (handled in Touchable).
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.Touchable
            onPress={onTap}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 18,
              borderRadius: 999,
              backgroundColor: colors.green_3,
            }}
          >
            <UI.Text variant='bodyMedium'>Pill</UI.Text>
          </UI.Touchable>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Touchable
            onPress={onTap}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 18,
              backgroundColor: colors.purple_2,
              borderTopLeftRadius: 18,
              borderTopRightRadius: 4,
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 18,
            }}
          >
            <UI.Text variant='bodyMedium'>Asymmetric corners</UI.Text>
          </UI.Touchable>
        </UI.Box>

        {/* No feedback */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>No feedback</UI.Text>

        <UI.Box mt={1}>
          <UI.Touchable
            onPress={onTap}
            feedback='none'
            style={{
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 10,
              backgroundColor: colors.cyan_2,
            }}
          >
            <UI.Text variant='bodyMedium'>No visual feedback</UI.Text>
          </UI.Touchable>
        </UI.Box>

        {/* Disabled */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Disabled</UI.Text>

        <UI.Box mt={1}>
          <UI.Touchable
            onPress={onTap}
            disabled
            style={{
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 10,
              backgroundColor: colors.neutral_2,
              opacity: 0.6,
            }}
          >
            <UI.Text variant='bodyMedium'>Disabled</UI.Text>
          </UI.Touchable>
        </UI.Box>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(TouchableScreen);
