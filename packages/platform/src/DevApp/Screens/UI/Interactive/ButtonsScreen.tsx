import React, { memo, useState } from 'react';
import { Nav, UI, App } from 'framework';
import { getDemoColors } from '../../demoColors';

/******************************************************************************************************************
 * Buttons demo
 *
 * - Button: primary and secondary actions (MD3)
 * - IconButton: compact icon-only actions
 * - TextButton: lightweight text action
 ******************************************************************************************************************/
const ButtonsScreen: Nav.ScreenType = () => {
  const { isDarkMode } = App.useAppSettings();
  const colors = getDemoColors(isDarkMode);

  const [btnClicks, setBtnClicks] = useState(0);
  const [iconClicks, setIconClicks] = useState(0);
  const [favorite, setFavorite] = useState(false);

  // demo-only loading state (user-triggered)
  const [btnLoading, setBtnLoading] = useState(false);
  const [iconLoading, setIconLoading] = useState(false);

  const bumpBtn = () => setBtnClicks(c => c + 1);
  const bumpIcon = () => setIconClicks(c => c + 1);

  const triggerBtnLoading = () => {
    if (btnLoading) return;
    bumpBtn();
    setBtnLoading(true);
    setTimeout(() => setBtnLoading(false), 1200);
  };

  const triggerIconLoading = () => {
    if (iconLoading) return;
    bumpIcon();
    setIconLoading(true);
    setTimeout(() => setIconLoading(false), 1200);
  };

  return (
    <Nav.ScreenLayout showTitle title='Buttons'>
      <UI.VerticalLayout constraint='scroll' flex={1} pad={2} gap={1}>

        {/* Intro */}
        <UI.Text variant='bodyMedium'>
          Buttons trigger actions. Pick a mode based on emphasis.
        </UI.Text>

        {/* Button */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Button</UI.Text>
        
        <UI.LabelText>
          Use Button for primary actions.
        </UI.LabelText>

        <UI.Box>
          <UI.VerticalLayout flex={1} pad={1} gap={1}>
            <UI.Button mode='text' onPress={bumpBtn}>Text</UI.Button>
            <UI.Button mode='outlined' onPress={bumpBtn}>Outlined</UI.Button>
            <UI.Button mode='contained' onPress={bumpBtn}>Contained</UI.Button>
            <UI.Button mode='contained-tonal' onPress={bumpBtn}>Tonal</UI.Button>
            <UI.Button mode='elevated' onPress={bumpBtn}>Elevated</UI.Button>
          </UI.VerticalLayout>
        </UI.Box>

        <UI.Text variant='labelSmall'>Button clicks: {btnClicks}</UI.Text>

        {/* Button · states */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Button · states</UI.Text>

        <UI.LabelText>
          Add leading icons to emphasize desired state. Loading action supported.
        </UI.LabelText>

        <UI.Box>
          <UI.VerticalLayout flex={1} pad={1} gap={1}>
            <UI.Button
              mode='contained'
              icon='cloud-upload'
              loading={btnLoading}
              onPress={triggerBtnLoading}
            >
              {btnLoading ? 'Loading' : 'Press to load'}
            </UI.Button>

            <UI.Button mode='contained' icon='cancel' disabled>
              Disabled
            </UI.Button>
          </UI.VerticalLayout>
        </UI.Box>

        {/* Button · custom colors */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Button · custom colors</UI.Text>

        <UI.LabelText>
          Override button and text color.
        </UI.LabelText>

        <UI.Box>
          <UI.VerticalLayout flex={1} pad={1} gap={1}>
            <UI.Button
              mode='contained'
              icon='star'
              buttonColor={colors.purple_3}
              textColor='#fff'
              onPress={bumpBtn}
            >
              Custom primary
            </UI.Button>

            <UI.Button
              mode='contained-tonal'
              icon='tune'
              buttonColor={colors.cyan_1}
              textColor={colors.cyan_3}
              onPress={bumpBtn}
            >
              Custom tonal
            </UI.Button>

            <UI.Button
              mode='outlined'
              icon='alert'
              textColor={colors.red_3}
              onPress={bumpBtn}
            >
              Destructive label
            </UI.Button>
          </UI.VerticalLayout>
        </UI.Box>

        {/* IconButton */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>IconButton</UI.Text>

        <UI.LabelText>
          Use IconButton for compact icon actions.
        </UI.LabelText>

        <UI.Box>
          <UI.HorizontalLayout flex={1} pad={1} gap={2}>
            <UI.IconButton icon='dots-vertical' onPress={bumpIcon} />
            <UI.IconButton icon='cog' onPress={bumpIcon} />
            <UI.IconButton icon='magnify' onPress={bumpIcon} />
          </UI.HorizontalLayout>
        </UI.Box>

        <UI.Text variant='labelSmall'>Icon clicks: {iconClicks}</UI.Text>

        {/* IconButton · modes */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>IconButton · modes</UI.Text>

        <UI.LabelText>
          Disabled and loading action supported.
        </UI.LabelText>

        <UI.Box>
          <UI.HorizontalLayout flex={1} pad={1} gap={2} constraint='wrap'>
            <UI.IconButton icon='heart-outline' mode='outlined' onPress={bumpIcon} />

            <UI.IconButton
              icon='delete'
              mode='contained'
              buttonColor={colors.red_3}
              iconColor='#fff'
              onPress={bumpIcon}
            />

            <UI.IconButton
              icon='download'
              mode='contained-tonal'
              buttonColor={colors.cyan_1}
              iconColor={colors.cyan_3}
              onPress={bumpIcon}
            />

            <UI.IconButton icon='share-variant' disabled />

            <UI.IconButton
              icon='download'
              loading={iconLoading}
              onPress={triggerIconLoading}
            />

          </UI.HorizontalLayout>
        </UI.Box>

        {/* IconButton · toggle */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>IconButton · toggle</UI.Text>

        <UI.LabelText>
          Toggle state.
        </UI.LabelText>

        <UI.Box>
          <UI.HorizontalLayout flex={1} pad={1} gap={2} align='center'>
            <UI.IconButton
              icon={favorite ? 'heart' : 'heart-outline'}
              mode='contained'
              selected={favorite}
              buttonColor={favorite ? colors.red_3 : undefined}
              iconColor={favorite ? '#fff' : undefined}
              onPress={() => {
                setFavorite(v => !v);
                bumpIcon();
              }}
            />
          </UI.HorizontalLayout>
        </UI.Box>

        {/* IconButton · sizes */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>IconButton · sizes</UI.Text>

        <UI.Box>
          <UI.HorizontalLayout flex={1} pad={1} gap={2} constraint='wrap'>
            <UI.IconButton icon='plus' size='xs' onPress={bumpIcon} />
            <UI.IconButton icon='plus' size='sm' onPress={bumpIcon} />
            <UI.IconButton icon='plus' size='md' onPress={bumpIcon} />
            <UI.IconButton icon='plus' size='lg' onPress={bumpIcon} />
            <UI.IconButton icon='plus' size='xl' onPress={bumpIcon} />
          </UI.HorizontalLayout>
        </UI.Box>

        {/* TextButton */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>TextButton</UI.Text>

        <UI.LabelText>
          Use TextButton when you want "tap-able text" with full text styling control.
        </UI.LabelText>

        <UI.Box>
          <UI.VerticalLayout flex={1} pad={1} gap={1}>
            <UI.TextButton onPress={bumpBtn}>Text action</UI.TextButton>

            <UI.TextButton onPress={bumpBtn} textOpts={{ bold: true }}>
              Emphasized text
            </UI.TextButton>

            <UI.TextButton disabled>
              Disabled text
            </UI.TextButton>
          </UI.VerticalLayout>
        </UI.Box>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(ButtonsScreen);
