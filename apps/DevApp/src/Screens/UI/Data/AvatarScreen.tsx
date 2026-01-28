import React, { memo, useState } from 'react';
import { Nav, UI, App } from 'framework';

/******************************************************************************************************************
 * Avatar demo
 *
 * Avatar represents a user/entity with either:
 * - an image (uri), or
 * - a fallback label (initials)
 *
 * Common options:
 * - size: 'sm' | 'md' | 'lg' | number
 * - shape: 'circle' | 'rounded'
 * - badgeColor / badgeSize / badgePosition
 * - bgColor / textColor (for label avatars)
 * - onPress (makes it interactive)
 ******************************************************************************************************************/
const AvatarScreen: Nav.ScreenType = () => {
  const { theme } = App.useAppTheme();
  const [pressCount, setPressCount] = useState(0);

  return (
    <Nav.ScreenLayout showTitle title='Avatar' hideBottomNavBar={true}>
      <UI.VerticalLayout constraint='scroll' flex={1} pad={2} gap={1}>

        {/* Intro */}
        <UI.Text variant='bodyMedium'>
          Avatar displays an image or fallback initials, with optional sizing, shape, and status badge.
        </UI.Text>

        {/* Label avatars + sizes */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Label avatars</UI.Text>

        <UI.LabelText>
          If no uri is provided, Avatar renders a label (commonly initials).
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.HorizontalLayout flex={1} pad={1} gap={2} align='center'>
            <UI.Avatar label='AB' />
            <UI.Avatar label='SM' size='sm' />
            <UI.Avatar label='MD' size='md' />
            <UI.Avatar label='LG' size='lg' />
            <UI.Avatar label='40' size={40} />
          </UI.HorizontalLayout>
        </UI.Box>

        {/* Shapes */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Shape</UI.Text>

        <UI.LabelText>
          Rounded is useful for "brand titles" and non-human entities.
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.HorizontalLayout flex={1} pad={1} gap={2} align='center'>
            <UI.Avatar label='C' size='lg' shape='circle' />
            <UI.Avatar label='R' size='lg' shape='rounded' />
          </UI.HorizontalLayout>
        </UI.Box>

        {/* Images + fallback */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Image and fallback</UI.Text>

        <UI.LabelText>
          If uri is provided, Avatar shows the image. Otherwise it falls back to the label.
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.HorizontalLayout flex={1} pad={1} gap={2} align='center'>
            <UI.Avatar uri='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' size='lg' />
            <UI.Avatar uri='https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' size='lg' />
            <UI.Avatar label='??' size='lg' />
          </UI.HorizontalLayout>
        </UI.Box>

        {/* Badges */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Status badges</UI.Text>

        <UI.LabelText>
          badgeColor shows a small dot. You can also control its size and position.
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.HorizontalLayout flex={1} pad={1} gap={2} align='center'>
            <UI.Avatar label='ON' size='lg' badgeColor={theme.colors.secondary} />
            <UI.Avatar label='AFK' size='lg' badgeColor={theme.colors.tertiary} />
            <UI.Avatar label='OFF' size='lg' badgeColor={theme.colors.outlineVariant} />
          </UI.HorizontalLayout>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.HorizontalLayout flex={1} pad={1} gap={2} align='center'>
            <UI.Avatar
              label='TR'
              size='lg'
              badgeColor={theme.colors.primary}
              badgePosition='top-right'
            />
            <UI.Avatar
              label='BS'
              size='lg'
              badgeColor={theme.colors.error}
              badgeSize={14}
            />
          </UI.HorizontalLayout>
        </UI.Box>

        {/* Custom colors */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Custom label colors</UI.Text>

        <UI.LabelText>
          bgColor and textColor are useful when you want deterministic colors (e.g., team labels).
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.HorizontalLayout flex={1} pad={1} gap={2} align='center'>
            <UI.Avatar label='A' size='lg' bgColor={theme.colors.primary} textColor={theme.colors.onPrimary} />
            <UI.Avatar label='B' size='lg' bgColor={theme.colors.secondary} textColor={theme.colors.onSecondary} />
            <UI.Avatar label='C' size='lg' bgColor={theme.colors.tertiary} textColor={theme.colors.onTertiary} />
          </UI.HorizontalLayout>
        </UI.Box>

        {/* Interactive */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Interactive</UI.Text>

        <UI.LabelText>
          Passing onPress makes the avatar tappable.
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.HorizontalLayout flex={1} pad={1} gap={2} align='center'>
            <UI.Avatar
              label='ME'
              size='lg'
              bgColor={theme.colors.primary}
              textColor={theme.colors.onPrimary}
              badgeColor={theme.colors.secondary}
              onPress={() => setPressCount(c => c + 1)}
            />
            <UI.Box>
              <UI.Text variant='bodySmall'>Tap the avatar to increment a counter.</UI.Text>
              <UI.LabelText variant='labelSmall'>
                Press count: {pressCount}
              </UI.LabelText>
            </UI.Box>
          </UI.HorizontalLayout>
        </UI.Box>

        <UI.Box mb={4} />
      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(AvatarScreen);
