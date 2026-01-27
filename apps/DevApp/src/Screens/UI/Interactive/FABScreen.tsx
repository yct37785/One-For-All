import React, { memo, useState } from 'react';
import { Nav, UI, App } from 'framework';
import { getDemoColors } from '../../demoColors';

/******************************************************************************************************************
 * FAB demo
 *
 * Floating Action Button:
 * - Inline (normal layout)
 * - Extended (label)
 * - Absolute placement helpers
 ******************************************************************************************************************/
const FABScreen: Nav.ScreenType = () => {
  const [loading, setLoading] = useState(false);
  const { isDarkMode } = App.useAppSettings();
  const colors = getDemoColors(isDarkMode);

  const triggerLoading = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  };

  return (
    <Nav.ScreenLayout showTitle title='FAB'>
      <UI.VerticalLayout constraint='scroll' flex={1} pad={2} gap={1}>

        {/* Intro */}
        <UI.Text variant='bodyMedium'>
          FAB is used for the primary action on a screen.
        </UI.Text>

        {/* Placement */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Placement</UI.Text>

        <UI.LabelText>
          placement + offset lets you anchor a FAB to a corner.
        </UI.LabelText>

        <UI.Box
          mt={1}
          h={220}
          br={12}
          bgColor={colors.green_1}
          style={{ overflow: 'hidden' }}
        >
          {/* This container is the positioning context */}
          <UI.Box p={1}>
            <UI.Text variant='bodySmall'>This box is the anchor area.</UI.Text>
          </UI.Box>

          <UI.FAB
            icon='plus'
            placement='bottom-right'
            offset={2}
            onPress={() => { }}
          />
        </UI.Box>

        {/* Inline */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Inline</UI.Text>

        <UI.LabelText>
          Without placement, FAB is laid out normally.
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.HorizontalLayout gap={2} align='center'>
            <UI.FAB icon='plus' onPress={() => { }} />
            <UI.FAB icon='pencil' onPress={() => { }} />
          </UI.HorizontalLayout>
        </UI.Box>

        {/* Extended */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Extended</UI.Text>

        <UI.LabelText>
          Add a label for an extended FAB.
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.FAB icon='plus' label='New note' onPress={() => { }} />
        </UI.Box>

        {/* States */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>States</UI.Text>

        <UI.LabelText>
          Loading blocks presses. Disabled shows disabled visuals.
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.HorizontalLayout gap={2} align='center' constraint='wrap'>
            <UI.FAB
              icon='cloud-upload'
              label={loading ? 'Loading' : 'Press to load'}
              loading={loading}
              onPress={triggerLoading}
            />

            <UI.FAB icon='cancel' label='Disabled' disabled onPress={() => { }} />
          </UI.HorizontalLayout>
        </UI.Box>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(FABScreen);
