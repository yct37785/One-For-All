import React, { memo, useState } from 'react';
import { Nav, UI } from 'framework';

/******************************************************************************************************************
 * Modals demo
 *
 * This screen demonstrates:
 * - UI.Dialog: focused modal surfaces for confirmation and decisions.
 * - UI.Popup: contextual floating menus triggered by a button or icon.
 ******************************************************************************************************************/
const ModalsScreen: Nav.ScreenType = ({}) => {
  const [basicDialogVisible, setBasicDialogVisible] = useState(false);
  const [customDialogVisible, setCustomDialogVisible] = useState(false);
  const [dismissDialogVisible, setDismissDialogVisible] = useState(false);
  const [lastDialogAction, setLastDialogAction] = useState<string | null>(null);
  const [lastPopupAction, setLastPopupAction] = useState<string | null>(null);

  return (
    <Nav.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll' padding={2}>
        {/* Header */}
        <UI.Text variant='bodyMedium'>
          Dialog and Popup provide modal and contextual overlays for focused user actions such as confirmations or
          small menus.
        </UI.Text>

        {/* Last actions */}
        {(lastDialogAction || lastPopupAction) && (
          <UI.Box mt={1}>
            {lastDialogAction && (
              <UI.Text variant='labelSmall' color='label'>
                Last dialog action: {lastDialogAction}
              </UI.Text>
            )}
            {lastPopupAction && (
              <UI.Text variant='labelSmall' color='label'>
                Last popup action: {lastPopupAction}
              </UI.Text>
            )}
          </UI.Box>
        )}

        {/* Dialog · basic */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Dialog · basic</UI.Text>

        <UI.Box mt={2}>
          <UI.Button mode='contained' onPress={() => setBasicDialogVisible(true)}>
            Open basic dialog
          </UI.Button>
        </UI.Box>

        <UI.Dialog
          title='Delete item'
          subtitle='Are you sure you want to delete this item? This action cannot be undone.'
          isVisible={basicDialogVisible}
          onClose={() => {
            setLastDialogAction('Cancelled delete');
            setBasicDialogVisible(false);
          }}
          onSubmit={() => {
            setLastDialogAction('Confirmed delete');
            setBasicDialogVisible(false);
          }}
        />

        {/* Dialog · with custom content */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Dialog · with custom content</UI.Text>

        <UI.Box mt={2}>
          <UI.Button mode='outlined' onPress={() => setCustomDialogVisible(true)}>
            Open custom dialog
          </UI.Button>
        </UI.Box>

        <UI.Dialog
          title='Sign out'
          subtitle='You can sign back in at any time.'
          isVisible={customDialogVisible}
          onClose={() => {
            setLastDialogAction('Dismissed sign-out dialog');
            setCustomDialogVisible(false);
          }}
          onSubmit={() => {
            setLastDialogAction('Signed out');
            setCustomDialogVisible(false);
          }}
          submitText='Sign out'
          closeText='Cancel'
        >
          <UI.VerticalLayout padding={2} gap={1}>
            <UI.Text variant='bodySmall'>
              You are about to sign out from this device. Any unsaved changes may be lost.
            </UI.Text>
            <UI.Text variant='bodySmall' color='label'>
              Are you sure you want to continue?
            </UI.Text>
          </UI.VerticalLayout>
        </UI.Dialog>

        {/* Dialog · dismissable */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Dialog · dismissable</UI.Text>

        <UI.Box mt={2}>
          <UI.Button mode='text' onPress={() => setDismissDialogVisible(true)}>
            Open dismissable dialog
          </UI.Button>
        </UI.Box>

        <UI.Dialog
          title='Tips'
          subtitle='Tap outside to dismiss this dialog.'
          isVisible={dismissDialogVisible}
          dismissable
          onClose={() => {
            setLastDialogAction('Closed tips dialog');
            setDismissDialogVisible(false);
          }}
          closeText='Got it'
        >
          <UI.VerticalLayout padding={2} gap={1}>
            <UI.Text variant='bodySmall'>
              Use dismissable dialogs for low-risk information that does not require a strict decision.
            </UI.Text>
          </UI.VerticalLayout>
        </UI.Dialog>

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

export default memo(ModalsScreen);
