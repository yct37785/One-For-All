import React, { memo, useState } from 'react';
import { Nav, UI, App } from '../../../../Logic';
import { getDemoColors } from '../../demoColors';

/******************************************************************************************************************
 * MenuList demo
 *
 * MenuList renders a vertical list of actions (often used in popovers, context menus, and overflow menus).
 * - options: rows (text/icon/disabled)
 * - showDividers: separators between rows
 * - dense: compact row height
 * - align: start | center
 ******************************************************************************************************************/
const MenuListScreen: Nav.ScreenType = () => {
  const { isDarkMode } = App.useAppSettings();
  const colors = getDemoColors(isDarkMode);

  const [lastSelected, setLastSelected] = useState<string>('—');

  const onSelect = (value: string) => {
    setLastSelected(value);
  };

  return (
    <Nav.ScreenLayout showTitle title='MenuList'>
      <UI.VerticalLayout constraint='scroll' flex={1} pad={2} gap={1}>

        {/* Intro */}
        <UI.Text variant='bodyMedium'>
          MenuList is a simple list of tappable actions.
        </UI.Text>

        <UI.Box mt={1}>
          <UI.LabelText>Last selected: {lastSelected}</UI.LabelText>
        </UI.Box>

        {/* Basic */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Basic</UI.Text>

        <UI.Box mt={1}>
          <UI.MenuList
            options={[
              { value: 'new', text: 'New' },
              { value: 'open', text: 'Open' },
              { value: 'save', text: 'Save' },
              { value: 'delete', text: 'Delete', disabled: true },
            ]}
            onSelect={onSelect}
            showDividers
          />
        </UI.Box>

        {/* With icons */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>With icons</UI.Text>

        <UI.Box mt={1}>
          <UI.MenuList
            options={[
              { value: 'profile', text: 'Profile', icon: 'account-circle' },
              { value: 'settings', text: 'Settings', icon: 'cog' },
              { value: 'logout', text: 'Log out', icon: 'logout' },
            ]}
            onSelect={onSelect}
            showDividers
          />
        </UI.Box>

        {/* Styled rows (demo-only) */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Styled rows</UI.Text>

        <UI.Box mt={1}>
          <UI.MenuList
            options={[
              {
                value: 'info',
                text: 'Info',
                icon: 'information-outline',
                textOpts: { variant: 'labelMedium', color: colors.cyan_3 },
                iconOpts: { color: colors.cyan_3 },
              },
              {
                value: 'warning',
                text: 'Warning',
                icon: 'alert-outline',
                textOpts: { variant: 'labelMedium', color: colors.amber_3, bold: true },
                iconOpts: { color: colors.amber_3 },
              },
              {
                value: 'success',
                text: 'Success',
                icon: 'check-circle-outline',
                textOpts: { variant: 'labelMedium', color: colors.green_3 },
                iconOpts: { color: colors.green_3 },
              },
              {
                value: 'danger',
                text: 'Danger',
                icon: 'alert-circle-outline',
                textOpts: { variant: 'labelMedium', color: colors.red_3 },
                iconOpts: { color: colors.red_3 },
              },
            ]}
            onSelect={onSelect}
            showDividers
          />
        </UI.Box>

        {/* Dense */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Dense</UI.Text>

        <UI.Box mt={1}>
          <UI.MenuList
            options={[
              { value: 'redo', text: 'Redo', icon: 'redo' },
              { value: 'undo', text: 'Undo', icon: 'undo' },
              { value: 'cut', text: 'Cut', icon: 'content-cut', disabled: true },
              { value: 'copy', text: 'Copy', icon: 'content-copy' },
              { value: 'paste', text: 'Paste', icon: 'content-paste' },
            ]}
            onSelect={onSelect}
            dense
            showDividers
          />
        </UI.Box>

        {/* Center align */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Center align</UI.Text>

        <UI.Box mt={1}>
          <UI.MenuList
            options={[
              { value: 'share', text: 'Share' },
              { value: 'favorite', text: 'Favorite' },
              { value: 'download', text: 'Download' },
            ]}
            onSelect={onSelect}
            align='center'
          />
        </UI.Box>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(MenuListScreen);
