import React, { memo, useState } from 'react';
import { Screen, UI } from 'framework';

/******************************************************************************************************************
 * Interactive demo
 *
 * This screen demonstrates:
 * - UI.Button: MD3-styled buttons for primary actions.
 * - UI.Touchable: generic pressable wrapper for custom interactive regions.
 ******************************************************************************************************************/
const InteractiveScreen: Screen.ScreenType = () => {
  const [btnClicks, setBtnClicks] = useState(0);
  const [touchableClicks, setTouchableClicks] = useState(0);

  const onBtnClick = () => setBtnClicks(c => c + 1);
  const onTouchableClick = () => setTouchableClicks(c => c + 1);

  return (
    <Screen.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll' padding={2}>
        {/* Header */}
        <UI.Text variant='bodyMedium'>
          Button and Touchable provide the core interactive surfaces in the UI. Use Button for primary actions and
          Touchable when you need a flexible pressable wrapper around custom content.
        </UI.Text>

        {/* Buttons · basic modes */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Button · basic modes</UI.Text>

        <UI.Box mt={2}>
          <UI.Button mode='text' onPress={onBtnClick}>
            Text button
          </UI.Button>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Button mode='outlined' onPress={onBtnClick}>Outlined button</UI.Button>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Button mode='contained' onPress={onBtnClick}>Contained button</UI.Button>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Button mode='contained-tonal' onPress={onBtnClick}>Contained tonal button</UI.Button>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Button mode='elevated' onPress={onBtnClick}>Elevated button</UI.Button>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Text variant='labelSmall' color='label'>
            Button clicks: {btnClicks}
          </UI.Text>
        </UI.Box>

        {/* Buttons · compact & custom colors */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Button · compact & custom colors</UI.Text>

        <UI.Box mt={2}>
          <UI.Button mode='contained' onPress={onBtnClick} compact contentStyle={{ minHeight: 36 }}>
            Compact contained
          </UI.Button>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Button mode='contained' onPress={onBtnClick} buttonColor='#3949ab' textColor='#ffffff'>
            Custom primary
          </UI.Button>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Button mode='outlined' onPress={onBtnClick} textColor='#f4511e'>
            Custom label color
          </UI.Button>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Text variant='labelSmall' color='label'>
            Button clicks: {btnClicks}
          </UI.Text>
        </UI.Box>

        {/* Buttons · loading & disabled */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Button · loading & disabled</UI.Text>

        <UI.Box mt={2}>
          <UI.Button mode='contained' loading>
            Loading…
          </UI.Button>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Button mode='contained' disabled>
            Disabled
          </UI.Button>
        </UI.Box>

        {/* Buttons · custom content */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Button · custom content</UI.Text>

        <UI.Box mt={2}>
          <UI.Button
            mode='contained'
            onPress={onBtnClick}
            contentStyle={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <UI.Icon source='star' variant='sm' />
            <UI.Box ml={1}>
              <UI.Text variant='labelLarge'>Starred</UI.Text>
            </UI.Box>
          </UI.Button>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Text variant='labelSmall' color='label'>
            Button clicks: {btnClicks}
          </UI.Text>
        </UI.Box>

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
              backgroundColor: '#e3f2fd',
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
              backgroundColor: '#fff3e0',
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
              backgroundColor: '#fce4ec',
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
    </Screen.ScreenLayout>
  );
};

export default memo(InteractiveScreen);
