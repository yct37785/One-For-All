import React, { memo, useState } from 'react';
import { Nav, UI, Manager } from 'framework';

/******************************************************************************************************************
 * MenuList demo
 *
 * This screen demonstrates:
 * - UI.MenuList: a structured list of selectable menu options.
 * - UI.MenuListItem: support for text/icon options and dense/centered rows.
 ******************************************************************************************************************/
const MenuListScreen: Nav.ScreenType = ({}) => {
  const { theme } = Manager.useAppTheme();
  const [lastSelected, setLastSelected] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setLastSelected(value);
  };

  return (
    <Nav.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll' padding={2}>

        {/* Header */}
        <UI.Text variant='bodyMedium'>
          MenuList renders a vertical list of touchable rows, often used for overflow menus, context menus, or
          action sheets.
        </UI.Text>

        <UI.Box mt={1}>
          <UI.Text variant='labelMedium' color={theme.colors.onSurfaceVariant}>
            Last selected: {lastSelected}
          </UI.Text>
        </UI.Box>

        {/* MenuList · basic */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>MenuList · basic</UI.Text>

        <UI.Box mt={1}>
          <UI.MenuList
            options={[
              { value: 'new', text: 'New' },
              { value: 'open', text: 'Open' },
              { value: 'save', text: 'Save' },
              { value: 'delete', text: 'Delete', disabled: true },
            ]}
            onSelect={handleSelect}
            showDividers
          />
        </UI.Box>

        {/* MenuList · with icons */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>MenuList · with icons</UI.Text>

        <UI.Box mt={1}>
          <UI.MenuList
            options={[
              {
                value: 'profile',
                text: 'Profile',
                icon: 'account-circle',
              },
              {
                value: 'settings',
                text: 'Settings',
                icon: 'cog',
              },
              {
                value: 'logout',
                text: 'Log out',
                icon: 'logout',
              },
            ]}
            onSelect={handleSelect}
            showDividers
          />
        </UI.Box>

        {/* MenuList · styled text & icons */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>MenuList · styled text & icons</UI.Text>

        <UI.Box mt={1}>
          <UI.MenuList
            options={[
              {
                value: 'info',
                text: 'Info',
                icon: 'information-outline',
                textOpts: { variant: 'labelMedium', color: theme.colors.primary },
                iconOpts: { color: theme.colors.primary },
              },
              {
                value: 'warning',
                text: 'Warning',
                icon: 'alert-outline',
                textOpts: {
                  variant: 'labelMedium',
                  color: '#fb8c00',
                  bold: true,
                },
                iconOpts: { color: '#fb8c00' },
              },
              {
                value: 'success',
                text: 'Success',
                icon: 'check-circle-outline',
                textOpts: { variant: 'labelMedium', color: '#2e7d32' },
                iconOpts: { color: '#2e7d32' },
              },
              {
                value: 'danger',
                text: 'Danger',
                icon: 'alert-circle-outline',
                textOpts: { variant: 'labelMedium', color: theme.colors.error },
                iconOpts: { color: theme.colors.error },
              },
            ]}
            onSelect={handleSelect}
            showDividers
          />
        </UI.Box>

        {/* MenuList · dense */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>MenuList · dense</UI.Text>

        <UI.Box mt={1}>
          <UI.MenuList
            options={[
              { value: 'redo', text: 'Redo', icon: 'redo' },
              { value: 'undo', text: 'Undo', icon: 'undo' },
              { value: 'cut', text: 'Cut', icon: 'content-cut', disabled: true },
              { value: 'copy', text: 'Copy', icon: 'content-copy' },
              { value: 'paste', text: 'Paste', icon: 'content-paste' },
            ]}
            onSelect={handleSelect}
            dense
            showDividers
          />
        </UI.Box>

        {/* MenuList · custom alignment */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>MenuList · custom alignment</UI.Text>
        <UI.Box mt={1}>
          <UI.Text variant='bodySmall'>
            Centered align and no dividers.
          </UI.Text>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.MenuList
            options={[
              {
                value: 'share',
                text: 'Share'
              },
              {
                value: 'favorite',
                text: 'Favorite'
              },
              {
                value: 'download',
                text: 'Download'
              },
            ]}
            onSelect={handleSelect}
            align='center'
          />
        </UI.Box>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(MenuListScreen);
