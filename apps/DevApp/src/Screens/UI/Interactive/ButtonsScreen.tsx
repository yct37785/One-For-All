import React, { memo, useState } from 'react';
import { Nav, UI, Manager } from 'framework';

/******************************************************************************************************************
 * Button demo
 *
 * This screen demonstrates:
 * - UI.Button: MD3-styled buttons for primary actions.
 * - UI.IconButton: compact icon-only buttons for secondary actions and toggles.
 ******************************************************************************************************************/
const ButtonScreen: Nav.ScreenType = ({}) => {
  const { theme } = Manager.useAppTheme();
  const [btnClicks, setBtnClicks] = useState(0);
  const [iconClicks, setIconClicks] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [starred, setStarred] = useState(false);

  const onBtnClick = () => setBtnClicks(c => c + 1);
  const onIconClick = () => setIconClicks(c => c + 1);

  return (
    <Nav.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll' padding={2}>
        {/* Header */}
        <UI.Text variant='bodyMedium'>
          Buttons represent the primary actions in the UI. Use Button for standard actions
          with predefined layouts and typography. IconButton provides compact icon-only
          actions. TextButton is a lightweight alternative that behaves like a button but
          inherits full Text props.
        </UI.Text>

        {/* Button · basic modes */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Button · basic modes</UI.Text>

        <UI.Box mt={2}>
          <UI.Button mode='text' onPress={onBtnClick}>
            Text button
          </UI.Button>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Button mode='outlined' onPress={onBtnClick}>
            Outlined button
          </UI.Button>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Button mode='contained' onPress={onBtnClick}>
            Contained button
          </UI.Button>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Button mode='contained-tonal' onPress={onBtnClick}>
            Contained tonal button
          </UI.Button>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Button mode='elevated' onPress={onBtnClick}>
            Elevated button
          </UI.Button>
        </UI.Box>

        <UI.Box mt={2}>
          <UI.Text variant='labelSmall' color={theme.colors.onSurfaceVariant}>
            Button clicks: {btnClicks}
          </UI.Text>
        </UI.Box>

        {/* Button · compact & custom colors */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Button · compact & custom colors</UI.Text>

        <UI.Box mt={2}>
          <UI.Button
            mode='contained'
            compact
            onPress={onBtnClick}
            contentStyle={{ minHeight: 36 }}
          >
            Compact contained
          </UI.Button>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Button
            mode='contained'
            onPress={onBtnClick}
            buttonColor='#3949ab'
            textColor='#ffffff'
          >
            Custom primary
          </UI.Button>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Button
            mode='outlined'
            onPress={onBtnClick}
            textColor='#f4511e'
          >
            Custom label color
          </UI.Button>
        </UI.Box>

        {/* Button · loading & disabled */}
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

        {/* Button · custom content */}
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

        {/* IconButton · basic */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>IconButton · basic</UI.Text>

        <UI.Box mt={1}>
          <UI.HorizontalLayout gap={2}>
            <UI.IconButton icon='dots-vertical' onPress={onIconClick} />
            <UI.IconButton icon='cog' onPress={onIconClick} />
            <UI.IconButton icon='magnify' onPress={onIconClick} />
          </UI.HorizontalLayout>
        </UI.Box>

        <UI.Box mt={2}>
          <UI.Text variant='labelSmall' color={theme.colors.onSurfaceVariant}>
            Button clicks: {btnClicks}
          </UI.Text>
        </UI.Box>

        {/* IconButton · modes & colors */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>IconButton · modes & colors</UI.Text>

        <UI.Box mt={1}>
          <UI.HorizontalLayout gap={2}>
            <UI.IconButton icon='heart-outline' mode='outlined' onPress={onIconClick} />
            <UI.IconButton
              icon='delete'
              mode='contained'
              buttonColor='#e53935'
              iconColor='#ffffff'
              onPress={onIconClick}
            />
            <UI.IconButton
              icon='download'
              mode='contained-tonal'
              buttonColor='#bbdefb'
              iconColor='#1e88e5'
              onPress={onIconClick}
            />
          </UI.HorizontalLayout>
        </UI.Box>

        {/* IconButton · disabled */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>IconButton · disabled</UI.Text>

        <UI.Box mt={1}>
          <UI.HorizontalLayout gap={2}>
            <UI.IconButton icon='share-variant' disabled />
            <UI.IconButton icon='content-copy' disabled />
          </UI.HorizontalLayout>
        </UI.Box>

        {/* IconButton · toggle / selected */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>IconButton · toggle</UI.Text>

        <UI.Box mt={1}>
          <UI.HorizontalLayout gap={2} align='center'>
            <UI.IconButton
              icon={favorite ? 'heart' : 'heart-outline'}
              mode='contained'
              buttonColor={favorite ? '#e53935' : undefined}
              iconColor={favorite ? '#ffffff' : undefined}
              selected={favorite}
              onPress={() => {
                setFavorite(v => !v);
                onIconClick();
              }}
            />
            <UI.IconButton
              icon={starred ? 'star' : 'star-outline'}
              mode='outlined'
              selected={starred}
              onPress={() => {
                setStarred(v => !v);
                onIconClick();
              }}
            />
            <UI.Box>
              <UI.Text variant='bodySmall'>
                Tap icons to toggle state.
              </UI.Text>
            </UI.Box>
          </UI.HorizontalLayout>
        </UI.Box>

        {/* IconButton · sizes */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>IconButton · sizes</UI.Text>

        <UI.Box mt={1}>
          <UI.HorizontalLayout gap={2} constraint='wrap'>
            <UI.IconButton icon='plus' size='xs' onPress={onIconClick} />
            <UI.IconButton icon='plus' size='sm' onPress={onIconClick} />
            <UI.IconButton icon='plus' size='md' onPress={onIconClick} />
            <UI.IconButton icon='plus' size='lg' onPress={onIconClick} />
            <UI.IconButton icon='plus' size='xl' onPress={onIconClick} />
          </UI.HorizontalLayout>
        </UI.Box>

        {/* TextButton · lightweight text-only button */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>TextButton</UI.Text>
        <UI.LabelText>
          A text-forward button alternative. Unlike Button mode="text", which has a fixed
          visual style, TextButton fully inherits Text props.
        </UI.LabelText>

        <UI.Box mt={2}>
          <UI.TextButton onPress={onBtnClick}>
            Text button
          </UI.TextButton>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.TextButton
            onPress={onBtnClick}
            textOpts={{ variant: 'labelLarge', bold: true }}
          >
            Bold large text
          </UI.TextButton>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.TextButton disabled>
            Disabled text button
          </UI.TextButton>
        </UI.Box>

        <UI.Box mt={2}>
          <UI.Text variant='labelSmall' color={theme.colors.onSurfaceVariant}>
            Button clicks: {btnClicks}
          </UI.Text>
        </UI.Box>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(ButtonScreen);
