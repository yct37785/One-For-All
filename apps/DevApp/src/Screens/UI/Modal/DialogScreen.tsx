import React, { memo, useState } from 'react';
import { Nav, UI, State } from 'framework';

/******************************************************************************************************************
 * Dialog demo
 *
 * Dialog is a focused modal surface for confirmations and short decisions.
 ******************************************************************************************************************/
const DialogScreen: Nav.ScreenType = () => {
  const { theme } = State.useAppTheme();

  const [basicVisible, setBasicVisible] = useState(false);
  const [customVisible, setCustomVisible] = useState(false);
  const [dismissVisible, setDismissVisible] = useState(false);

  const [lastAction, setLastAction] = useState<string | null>(null);

  return (
    <Nav.ScreenLayout showTitle title='Dialog'>
      <UI.VerticalLayout constraint='scroll' flex={1} pad={2} gap={1}>

        {/* Intro */}
        <UI.Text variant='bodyMedium'>
          Dialog blocks the screen to focus attention on a choice.
        </UI.Text>

        <UI.Box mt={1}>
          <UI.LabelText variant='labelSmall'>
            Last action: {lastAction}
          </UI.LabelText>
        </UI.Box>

        {/* Basic confirm/cancel */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Confirm</UI.Text>

        <UI.Box mt={1}>
          <UI.Button mode='contained' icon='trash-can-outline' onPress={() => setBasicVisible(true)}>
            Delete item
          </UI.Button>
        </UI.Box>

        <UI.Dialog
          title='Delete item'
          subtitle="This can't be undone."
          isVisible={basicVisible}
          closeText='Cancel'
          submitText='Delete'
          onClose={() => {
            setLastAction('Cancelled delete');
            setBasicVisible(false);
          }}
          onSubmit={() => {
            setLastAction('Confirmed delete');
            setBasicVisible(false);
          }}
        />

        {/* Custom content */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Custom content</UI.Text>

        <UI.Box mt={1}>
          <UI.Button mode='outlined' icon='logout' onPress={() => setCustomVisible(true)}>
            Sign out
          </UI.Button>
        </UI.Box>

        <UI.Dialog
          title='Sign out'
          subtitle='You can sign back in anytime.'
          isVisible={customVisible}
          closeText='Cancel'
          submitText='Sign out'
          onClose={() => {
            setLastAction('Cancelled sign out');
            setCustomVisible(false);
          }}
          onSubmit={() => {
            setLastAction('Signed out');
            setCustomVisible(false);
          }}
        >
          <UI.VerticalLayout flex={1} pad={2} gap={1}>
            <UI.Text variant='bodySmall'>
              Signing out will remove your session from this device.
            </UI.Text>
            <UI.Text variant='bodySmall' color={theme.colors.onSurfaceVariant}>
              Continue?
            </UI.Text>
          </UI.VerticalLayout>
        </UI.Dialog>

        {/* Dismissable info */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Dismissable</UI.Text>

        <UI.Box mt={1}>
          <UI.Button mode='text' icon='information-outline' onPress={() => setDismissVisible(true)}>
            Tips
          </UI.Button>
        </UI.Box>

        <UI.Dialog
          title='Tips'
          subtitle='Tap outside to dismiss.'
          isVisible={dismissVisible}
          dismissable
          closeText='Got it'
          onClose={() => {
            setLastAction('Closed tips');
            setDismissVisible(false);
          }}
        >
          <UI.VerticalLayout flex={1} pad={2} gap={1}>
            <UI.Text variant='bodySmall'>
              Use dismissable dialogs for low-risk info that doesn't require a strict decision.
            </UI.Text>
          </UI.VerticalLayout>
        </UI.Dialog>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(DialogScreen);
