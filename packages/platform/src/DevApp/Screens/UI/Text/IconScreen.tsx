import React, { memo } from 'react';
import { Nav, UI, App } from '../../../../Logic';
import { getDemoColors } from '../../demoColors';

/******************************************************************************************************************
 * Icon demo
 *
 * Icon renders theme-aware vector icons with prefixed size variants.
 ******************************************************************************************************************/
const IconScreen: Nav.ScreenType = () => {
  const { theme } = App.useAppTheme();
  const { isDarkMode } = App.useAppSettings();
  const colors = getDemoColors(isDarkMode);

  return (
    <Nav.ScreenLayout showTitle title='Icon'>
      <UI.VerticalLayout constraint='scroll' flex={1} pad={2} gap={1}>

        {/* Intro */}
        <UI.Text variant='bodyMedium'>
          Icons support size variants and custom colors.
        </UI.Text>

        {/* Size variants */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Size variants</UI.Text>

        <UI.Box mt={1}>
          <UI.HorizontalLayout flex={1} pad={1} gap={2} align='center'>
            <UI.Icon source='star' variant='xs' />
            <UI.Icon source='star' variant='sm' />
            <UI.Icon source='star' variant='md' />
            <UI.Icon source='star' variant='lg' />
            <UI.Icon source='star' variant='xl' />
          </UI.HorizontalLayout>
        </UI.Box>

        {/* Colors */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Colors</UI.Text>

        <UI.LabelText>
          Pass a theme color (string) or a custom color value.
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.HorizontalLayout flex={1} pad={1} gap={2} align='center'>
            <UI.Icon source='heart' color={theme.colors.onSurface} />
            <UI.Icon source='heart' color={theme.colors.onSurfaceVariant} />
            <UI.Icon source='heart' color={theme.colors.primary} />
            <UI.Icon source='heart' color={theme.colors.secondary} />
            <UI.Icon source='heart' color={theme.colors.error} />
          </UI.HorizontalLayout>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.HorizontalLayout flex={1} pad={1} gap={1} align='center'>
            <UI.Icon source='palette' color={colors.purple_3} />
            <UI.LabelText variant='labelSmall'>
              Custom color (demoColors)
            </UI.LabelText>
          </UI.HorizontalLayout>
        </UI.Box>

        {/* Composition */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Composition</UI.Text>

        <UI.LabelText>
          Combine Icon with Box to create simple visual blocks.
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.HorizontalLayout flex={1} pad={1} gap={2} align='center'>
            <UI.Box bgColor={colors.cyan_1} p={2} br={12}>
              <UI.Icon source='information' variant='lg' color={colors.cyan_3} />
            </UI.Box>

            <UI.Box bgColor={colors.purple_1} p={2} br={12}>
              <UI.Icon source='flower' variant='lg' color={colors.purple_3} />
            </UI.Box>

            <UI.Box bgColor={colors.amber_1} p={2} br={12}>
              <UI.Icon source='alert' variant='lg' color={colors.amber_3} />
            </UI.Box>
          </UI.HorizontalLayout>
        </UI.Box>

        {/* Practical examples */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Practical</UI.Text>

        <UI.Box mt={1}>
          <UI.HorizontalLayout flex={1} pad={1} gap={1} align='center'>
            <UI.Icon source='map-marker' variant='md' color={theme.colors.primary} />
            <UI.Text variant='bodyMedium'>Location label</UI.Text>
          </UI.HorizontalLayout>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.HorizontalLayout flex={1} pad={1} gap={1} align='center'>
            <UI.Icon source='check-circle' variant='sm' color={colors.green_3} />
            <UI.Text variant='labelSmall'>Active status</UI.Text>
          </UI.HorizontalLayout>
        </UI.Box>

        <UI.Box mt={2}>
          <UI.HorizontalLayout flex={1} pad={1} gap={2} align='center'>
            <UI.Box bgColor={colors.neutral_1} p={2} br={999}>
              <UI.Icon source='thumb-up' color={theme.colors.onSurfaceVariant} />
            </UI.Box>
            <UI.Box bgColor={colors.neutral_1} p={2} br={999}>
              <UI.Icon source='thumb-down' color={theme.colors.onSurfaceVariant} />
            </UI.Box>
          </UI.HorizontalLayout>
        </UI.Box>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(IconScreen);
