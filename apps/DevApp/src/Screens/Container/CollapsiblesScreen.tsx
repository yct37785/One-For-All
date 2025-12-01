import React, { memo } from 'react';
import { Screen, UI } from 'framework';

/******************************************************************************************************************
 * Collapsible & Accordion demo
 *
 * This screen demonstrates:
 * - UI.CollapsibleContainer: single header that toggles its body.
 * - UI.AccordionContainer: multiple headers where one section is open at a time.
 ******************************************************************************************************************/
const CollapsibleScreen: Screen.ScreenType = () => {
  return (
    <Screen.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll' padding={2}>

        {/* Header */}
        <UI.Text variant='bodyMedium'>
          CollapsibleContainer and AccordionContainer wrap content with tappable headers that expand or collapse
          their children.
        </UI.Text>

        {/* CollapsibleContainer · basic */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>CollapsibleContainer · basic</UI.Text>

        <UI.CollapsibleContainer text='Tap to toggle'>
          <UI.Box bgColor='#e3f2fd' p={1}>
            <UI.Text variant='bodySmall'>Simple collapsible content.</UI.Text>
          </UI.Box>
        </UI.CollapsibleContainer>

        {/* CollapsibleContainer · icon & text (expanded colors) */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>CollapsibleContainer · colored headers</UI.Text>

        {/* Primary */}
        <UI.Box mt={2}>
          <UI.CollapsibleContainer
            text='Profile settings'
            icon='account-circle'
            textOpts={{ variant: 'titleSmall', color: 'primary' }}
            iconOpts={{ color: 'primary' }}
          >
            <UI.Box bgColor='#fff3e0' p={1}>
              <UI.Text variant='bodySmall'>Primary themed header.</UI.Text>
            </UI.Box>
          </UI.CollapsibleContainer>
        </UI.Box>

        {/* Secondary */}
        <UI.Box mt={2}>
          <UI.CollapsibleContainer
            text='Notifications'
            icon='notifications'
            textOpts={{ variant: 'titleSmall', color: 'secondary' }}
            iconOpts={{ color: 'secondary' }}
          >
            <UI.Box bgColor='#e8eaf6' p={1}>
              <UI.Text variant='bodySmall'>Secondary themed header.</UI.Text>
            </UI.Box>
          </UI.CollapsibleContainer>
        </UI.Box>

        {/* Error */}
        <UI.Box mt={2}>
          <UI.CollapsibleContainer
            text='Danger zone'
            icon='alert'
            textOpts={{ variant: 'titleSmall', color: 'error' }}
            iconOpts={{ color: 'error' }}
          >
            <UI.Box bgColor='#ffebee' p={1}>
              <UI.Text variant='bodySmall'>Error themed header.</UI.Text>
            </UI.Box>
          </UI.CollapsibleContainer>
        </UI.Box>

        {/* Custom colored header */}
        <UI.Box mt={2}>
          <UI.CollapsibleContainer
            text='Custom color'
            icon='palette'
            textOpts={{ variant: 'titleSmall', customColor: '#8e24aa' }}
            iconOpts={{ customColor: '#8e24aa' }}
          >
            <UI.Box bgColor='#f3e5f5' p={1}>
              <UI.Text variant='bodySmall'>Header using custom hex color.</UI.Text>
            </UI.Box>
          </UI.CollapsibleContainer>
        </UI.Box>

        {/* AccordionContainer · basic */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>AccordionContainer · basic</UI.Text>

        <UI.Box mt={2}>
          <UI.AccordionContainer
            sections={[
              { text: 'First' },
              { text: 'Second' },
              { text: 'Third' },
            ]}
          >
            <UI.Box bgColor='#e0f7fa' p={1}>
              <UI.Text variant='bodySmall'>First section content.</UI.Text>
            </UI.Box>
            <UI.Box bgColor='#fff9c4' p={1}>
              <UI.Text variant='bodySmall'>Second section content.</UI.Text>
            </UI.Box>
            <UI.Box bgColor='#f1f8e9' p={1}>
              <UI.Text variant='bodySmall'>Third section content.</UI.Text>
            </UI.Box>
          </UI.AccordionContainer>
        </UI.Box>

        {/* AccordionContainer · styled headers */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>AccordionContainer · styled headers</UI.Text>

        <UI.Box mt={2} mb={4}>
          <UI.AccordionContainer
            sections={[
              {
                text: 'Info',
                icon: 'information-outline',
                textOpts: { variant: 'titleSmall', color: 'primary' },   // primary
                iconOpts: { color: 'primary' },
              },
              {
                text: 'Warning',
                icon: 'alert-outline',
                textOpts: { variant: 'titleSmall', customColor: '#fb8c00' }, // custom orange
                iconOpts: { customColor: '#fb8c00' },
              },
              {
                text: 'Success',
                icon: 'check-circle-outline',
                textOpts: { variant: 'titleSmall', customColor: '#2e7d32' }, // custom green
                iconOpts: { customColor: '#2e7d32' },
              },
            ]}
          >
            <UI.Box bgColor='#e3f2fd' p={1}>
              <UI.Text variant='bodySmall'>Info content.</UI.Text>
            </UI.Box>
            <UI.Box bgColor='#fff3e0' p={1}>
              <UI.Text variant='bodySmall'>Warning content.</UI.Text>
            </UI.Box>
            <UI.Box bgColor='#e8f5e9' p={1}>
              <UI.Text variant='bodySmall'>Success content.</UI.Text>
            </UI.Box>
          </UI.AccordionContainer>
        </UI.Box>

      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(CollapsibleScreen);
