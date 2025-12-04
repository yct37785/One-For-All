import React, { memo, useState } from 'react';
import { Screen, UI } from 'framework';

/******************************************************************************************************************
 * Avatar demo
 *
 * This screen demonstrates:
 * - UI.Avatar: label and image avatars with size, shape, badge, color, and press handling.
 ******************************************************************************************************************/
const AvatarScreen: Screen.ScreenType = () => {
  const [pressCount, setPressCount] = useState(0);

  return (
    <Screen.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll' padding={2}>
        {/* Header */}
        <UI.Text variant='bodyMedium'>
          Avatar represents a user or entity using either an image URI or fallback label, with optional size, shape,
          badge, and custom colors.
        </UI.Text>

        {/* Avatar · basic label */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Avatar · basic</UI.Text>

        <UI.Box mt={1}>
          <UI.HorizontalLayout gap={2}>
            <UI.Avatar label='AB' />
            <UI.Avatar label='CD' />
            <UI.Avatar label='EF' />
          </UI.HorizontalLayout>
        </UI.Box>

        {/* Avatar · sizes */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Avatar · sizes</UI.Text>

        <UI.Box mt={1}>
          <UI.HorizontalLayout gap={2}>
            <UI.Avatar label='SM' size='sm' />
            <UI.Avatar label='MD' size='md' />
            <UI.Avatar label='LG' size='lg' />
            <UI.Avatar label='40' size={40} />
          </UI.HorizontalLayout>
        </UI.Box>

        {/* Avatar · shapes */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Avatar · shapes</UI.Text>

        <UI.Box mt={1}>
          <UI.HorizontalLayout gap={2}>
            <UI.Avatar label='C' size='lg' shape='circle' />
            <UI.Avatar label='R' size='lg' shape='rounded' />
          </UI.HorizontalLayout>
        </UI.Box>

        {/* Avatar · with image */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Avatar · with image</UI.Text>

        <UI.Box mt={1}>
          <UI.HorizontalLayout gap={2}>
            <UI.Avatar uri='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' size='lg' />
            <UI.Avatar uri='https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' size='lg' />
            <UI.Avatar uri='https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg' size='lg' />
          </UI.HorizontalLayout>
        </UI.Box>

        {/* Avatar · badges */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Avatar · badges</UI.Text>

        <UI.Box mt={1}>
          <UI.HorizontalLayout gap={2}>
            <UI.Avatar label='ON' size='lg' badgeColor='#2e7d32' />
            <UI.Avatar label='ID' size='lg' badgeColor='#fb8c00' />
            <UI.Avatar label='OFF' size='lg' badgeColor='#b0bec5' />
          </UI.HorizontalLayout>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.HorizontalLayout gap={2}>
            <UI.Avatar
              label='TR'
              size='lg'
              badgeColor='#1e88e5'
              badgePosition='top-right'
            />
            <UI.Avatar
              label='BS'
              size='lg'
              badgeColor='#e53935'
              badgeSize={14}
            />
          </UI.HorizontalLayout>
        </UI.Box>

        {/* Avatar · custom colors */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Avatar · custom colors</UI.Text>

        <UI.Box mt={1}>
          <UI.HorizontalLayout gap={2}>
            <UI.Avatar
              label='A'
              size='lg'
              bgColor='#1e88e5'
              textColor='#ffffff'
            />
            <UI.Avatar
              label='B'
              size='lg'
              bgColor='#f4511e'
              textColor='#ffffff'
            />
            <UI.Avatar
              label='C'
              size='lg'
              bgColor='#ffeb3b'
              textColor='#000000'
            />
          </UI.HorizontalLayout>
        </UI.Box>

        {/* Avatar · interactive */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Avatar · interactive</UI.Text>

        <UI.Box mt={1}>
          <UI.HorizontalLayout gap={2} align='center'>
            <UI.Avatar
              label='ME'
              size='lg'
              bgColor='#6200ee'
              textColor='#ffffff'
              badgeColor='#2e7d32'
              onPress={() => setPressCount(c => c + 1)}
            />
            <UI.Box>
              <UI.Text variant='bodySmall'>
                Tap the avatar to increment a counter.
              </UI.Text>
              <UI.Text variant='labelSmall' color='label'>
                Press count: {pressCount}
              </UI.Text>
            </UI.Box>
          </UI.HorizontalLayout>
        </UI.Box>

        <UI.Box mb={4} />
      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(AvatarScreen);
