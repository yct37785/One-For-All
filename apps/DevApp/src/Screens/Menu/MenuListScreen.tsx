import React, { memo, useState } from 'react';
import { Screen, UI } from 'framework';

/******************************************************************************************************************
 * MenuList demo
 *
 * This screen demonstrates:
 * - UI.MenuList: a structured list of selectable menu options.
 * - UI.MenuListItem: support for text/icon options and dense/centered rows.
 ******************************************************************************************************************/
const MenuListScreen: Screen.ScreenType = () => {
  const [lastSelected, setLastSelected] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setLastSelected(value);
  };

  return (
    <Screen.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll' padding={2}>

        {/* Header */}
        <UI.Text variant='bodyMedium'>
          MenuList renders a vertical list of touchable rows, often used for overflow menus, context menus, or
          action sheets.
        </UI.Text>

        {lastSelected ? (
          <UI.Box mt={1}>
            <UI.Text variant='labelMedium' color='label'>
              Last selected: {lastSelected}
            </UI.Text>
          </UI.Box>
        ) : null}

        {/* MenuList · basic */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>MenuList · basic</UI.Text>

        <UI.Box mt={2}>
          <UI.MenuList
            options={[
              { value: 'new', text: 'New' },
              { value: 'open', text: 'Open' },
              { value: 'save', text: 'Save' },
              { value: 'delete', text: 'Delete', disabled: true },
            ]}
            onSelect={handleSelect}
          />
        </UI.Box>

        {/* MenuList · with icons */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>MenuList · with icons</UI.Text>

        <UI.Box mt={2}>
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

        <UI.Box mt={2}>
          <UI.MenuList
            options={[
              {
                value: 'info',
                text: 'Info',
                icon: 'information-outline',
                textOpts: { variant: 'labelMedium', color: 'primary' },
                iconOpts: { color: 'primary' },
              },
              {
                value: 'warning',
                text: 'Warning',
                icon: 'alert-outline',
                textOpts: {
                  variant: 'labelMedium',
                  customColor: '#fb8c00',
                  bold: true,
                },
                iconOpts: { customColor: '#fb8c00' },
              },
              {
                value: 'success',
                text: 'Success',
                icon: 'check-circle-outline',
                textOpts: { variant: 'labelMedium', customColor: '#2e7d32' },
                iconOpts: { customColor: '#2e7d32' },
              },
              {
                value: 'danger',
                text: 'Danger',
                icon: 'alert-circle-outline',
                textOpts: { variant: 'labelMedium', color: 'error' },
                iconOpts: { color: 'error' },
              },
            ]}
            onSelect={handleSelect}
            showDividers
          />
        </UI.Box>

        {/* MenuList · dense */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>MenuList · dense</UI.Text>

        <UI.Box mt={2}>
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

        {/* MenuList · centered items */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>MenuList · centered items</UI.Text>

        <UI.Box mt={2} mb={4}>
          <UI.MenuList
            options={[
              {
                value: 'share',
                text: 'Share',
                icon: 'share-variant',
                textOpts: { variant: 'labelMedium' },
                iconOpts: { variant: 'md' },
              },
              {
                value: 'favorite',
                text: 'Favorite',
                icon: 'heart-outline',
                textOpts: { variant: 'labelMedium' },
                iconOpts: { variant: 'md' },
              },
              {
                value: 'download',
                text: 'Download',
                icon: 'download',
                textOpts: { variant: 'labelMedium' },
                iconOpts: { variant: 'md' },
              },
            ]}
            onSelect={handleSelect}
            align='center'
          />
        </UI.Box>

      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(MenuListScreen);
