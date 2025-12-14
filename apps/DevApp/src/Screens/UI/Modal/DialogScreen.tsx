import React, { memo, useState } from 'react';
import { Nav, UI } from 'framework';

/******************************************************************************************************************
 * Dialogs demo
 *
 * This screen demonstrates:
 * - UI.Dialog: focused modal surfaces for confirmation and decisions.
 ******************************************************************************************************************/
const DialogsScreen: Nav.ScreenType = ({}) => {
  const [basicDialogVisible, setBasicDialogVisible] = useState(false);
  const [customDialogVisible, setCustomDialogVisible] = useState(false);
  const [dismissDialogVisible, setDismissDialogVisible] = useState(false);
  const [lastDialogAction, setLastDialogAction] = useState<string | null>(null);

  return (
    <Nav.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll' padding={2}>
        {/* Header */}
        <UI.Text variant='bodyMedium'>
          Dialog provides a focused modal surface for confirmations, decisions, and important actions.
        </UI.Text>

        {/* Last action */}
        {lastDialogAction && (
          <UI.Box mt={1}>
            <UI.Text variant='labelSmall' color='label'>
              Last dialog action: {lastDialogAction}
            </UI.Text>
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

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(DialogsScreen);
