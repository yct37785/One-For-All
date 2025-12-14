import React, { memo, useState } from 'react';
import { Nav, UI } from 'framework';

/******************************************************************************************************************
 * Popups demo
 *
 * This screen demonstrates:
 * - UI.Popup: contextual floating menus triggered by a button or icon.
 ******************************************************************************************************************/
const PopupsScreen: Nav.ScreenType = ({}) => {
  const [lastPopupAction, setLastPopupAction] = useState<string | null>(null);

  return (
    <Nav.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll' padding={2}>
        {/* Header */}
        <UI.Text variant='bodyMedium'>
          Popup provides a contextual menu overlay for quick actions. This demo uses MenuList as popup content.
        </UI.Text>

        {/* Last action */}
        {lastPopupAction && (
          <UI.Box mt={1}>
            <UI.Text variant='labelSmall' color='label'>
              Last popup action: {lastPopupAction}
            </UI.Text>
          </UI.Box>
        )}

        {/* Popup · basic menu */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Popup · basic menu</UI.Text>

        <UI.Box mt={2}>
          <UI.Popup
            triggerComp={
              <UI.Button mode='outlined'>
                Open menu
              </UI.Button>
            }
          >
            <UI.MenuList
              options={[
                { value: 'New file', text: 'New file' },
                { value: 'Open…', text: 'Open…' },
                { value: 'Save', text: 'Save' },
                { value: 'Duplicate', text: 'Duplicate' },
              ]}
              onSelect={(value) => setLastPopupAction(value)}
              showDividers
              dense
            />
          </UI.Popup>
        </UI.Box>

        {/* Popup · icon trigger */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Popup · icon trigger</UI.Text>

        <UI.Box mt={2} mb={4}>
          <UI.Popup
            triggerComp={
              <UI.IconButton icon='dots-vertical' mode='contained-tonal' />
            }
          >
            <UI.MenuList
              options={[
                { value: 'Share', text: 'Share', icon: 'share-variant' },
                { value: 'Rename', text: 'Rename', icon: 'pencil' },
                { value: 'Move to trash', text: 'Move to trash', icon: 'trash-can-outline' },
              ]}
              onSelect={(value) => setLastPopupAction(value)}
              showDividers
              dense
            />
          </UI.Popup>
        </UI.Box>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(PopupsScreen);
