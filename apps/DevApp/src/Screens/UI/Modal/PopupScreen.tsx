import React, { memo, useState } from 'react';
import { Nav, UI, Manager } from 'framework';
import { getDemoColors } from '../../demoColors';

/******************************************************************************************************************
 * Popup demo
 *
 * Popup shows a contextual floating menu anchored to a trigger component.
 * Most commonly: overflow menus, quick actions, small settings menus.
 ******************************************************************************************************************/
const PopupScreen: Nav.ScreenType = () => {
  const { theme } = Manager.useAppTheme();
  const { isDarkMode } = Manager.useAppSettings();
  const colors = getDemoColors(isDarkMode);

  const [lastAction, setLastAction] = useState<string | null>(null);

  const onSelect = (value: string) => {
    setLastAction(value);
  };

  return (
    <Nav.ScreenLayout showTitle title='Popup'>
      <UI.VerticalLayout constraint='scroll' padding={2}>

        {/* Intro */}
        <UI.Text variant='bodyMedium'>
          Popup is a small anchored overlay for quick actions.
        </UI.Text>

        <UI.Box mt={1}>
          <UI.Text variant='labelSmall' color={theme.colors.onSurfaceVariant}>
            Last action: {lastAction}
          </UI.Text>
        </UI.Box>

        {/* Basic */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Basic</UI.Text>

        <UI.Box mt={1}>
          <UI.Popup
            triggerComp={<UI.Button mode='outlined' icon='menu'>Open menu</UI.Button>}
          >
            <UI.MenuList
              options={[
                { value: 'New file', text: 'New file', icon: 'file-plus-outline' },
                { value: 'Open…', text: 'Open…', icon: 'folder-open-outline' },
                { value: 'Save', text: 'Save', icon: 'content-save-outline' },
                { value: 'Duplicate', text: 'Duplicate', icon: 'content-duplicate' },
              ]}
              onSelect={onSelect}
              showDividers
              dense
            />
          </UI.Popup>
        </UI.Box>

        {/* Icon trigger */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Icon trigger</UI.Text>

        <UI.Box mt={1}>
          <UI.Popup
            triggerComp={
              <UI.IconButton
                icon='dots-vertical'
                mode='contained-tonal'
                buttonColor={colors.cyan_1}
                iconColor={colors.cyan_3}
              />
            }
          >
            <UI.MenuList
              options={[
                { value: 'Share', text: 'Share', icon: 'share-variant' },
                { value: 'Rename', text: 'Rename', icon: 'pencil' },
                {
                  value: 'Move to trash',
                  text: 'Move to trash',
                  icon: 'trash-can-outline',
                  textOpts: { color: colors.red_3, bold: true },
                  iconOpts: { color: colors.red_3 },
                },
              ]}
              onSelect={onSelect}
              showDividers
              dense
            />
          </UI.Popup>
        </UI.Box>

        {/* Disabled */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Disabled</UI.Text>

        <UI.Box mt={1}>
          <UI.Popup
            disabled
            triggerComp={
              <UI.Button mode='contained' disabled>
                Disabled trigger
              </UI.Button>
            }
          >
            {/* Popup content won't open when disabled; keep it simple anyway */}
            <UI.MenuList
              options={[
                { value: 'Hidden', text: 'Hidden' },
              ]}
              onSelect={onSelect}
            />
          </UI.Popup>
        </UI.Box>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(PopupScreen);
