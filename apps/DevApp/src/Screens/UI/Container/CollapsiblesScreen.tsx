import React, { memo } from 'react';
import { Nav, UI, Manager } from 'framework';
import { getDemoColors } from '../../demoColors';

/******************************************************************************************************************
 * Collapsible & Accordion demo
 *
 * This screen demonstrates:
 * - UI.CollapsibleContainer: single header that toggles its body.
 * - UI.AccordionContainer: multiple headers where one section is open at a time.
 ******************************************************************************************************************/
const CollapsibleScreen: Nav.ScreenType = ({}) => {
  const { isDarkMode } = Manager.useAppSettings();
  const colors = getDemoColors(isDarkMode);

  return (
    <Nav.ScreenLayout showTitle>
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
          <UI.Box bgColor={colors.skyBg} p={1}>
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
            <UI.Box bgColor={colors.orangeBg} p={1}>
              <UI.Text variant='bodySmall'>Primary themed header.</UI.Text>
            </UI.Box>
          </UI.CollapsibleContainer>
        </UI.Box>

        {/* Secondary */}
        <UI.Box mt={2}>
          <UI.CollapsibleContainer
            text='Notifications'
            icon='bell'
            textOpts={{ variant: 'titleSmall', color: 'secondary' }}
            iconOpts={{ color: 'secondary' }}
          >
            <UI.Box bgColor={colors.purpleBg} p={1}>
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
            <UI.Box bgColor={colors.red} p={1}>
              <UI.Text variant='bodySmall'>Error themed header.</UI.Text>
            </UI.Box>
          </UI.CollapsibleContainer>
        </UI.Box>

        {/* Custom colored header */}
        <UI.Box mt={2}>
          <UI.CollapsibleContainer
            text='Custom color'
            icon='palette'
            textOpts={{ variant: 'titleSmall', customColor: colors.cyanC }}
            iconOpts={{ customColor: colors.purpleB }}
          >
            <UI.Box bgColor={colors.purpleBg} p={1}>
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
            <UI.Box bgColor={colors.cyanBg} p={1}>
              <UI.Text variant='bodySmall'>First section content.</UI.Text>
            </UI.Box>
            <UI.Box bgColor={colors.amber} p={1}>
              <UI.Text variant='bodySmall'>Second section content.</UI.Text>
            </UI.Box>
            <UI.Box bgColor={colors.neutralAlt} p={1}>
              <UI.Text variant='bodySmall'>Third section content.</UI.Text>
            </UI.Box>
          </UI.AccordionContainer>
        </UI.Box>

        {/* AccordionContainer · styled headers */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>AccordionContainer · styled headers</UI.Text>

        <UI.Box mt={2}>
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
                textOpts: { variant: 'titleSmall', customColor: colors.amber }, // custom orange
                iconOpts: { customColor: colors.amber },
              },
              {
                text: 'Success',
                icon: 'check-circle-outline',
                textOpts: { variant: 'titleSmall', customColor: colors.greenStrong }, // custom green
                iconOpts: { customColor: colors.greenStrong },
              },
            ]}
          >
            <UI.Box bgColor={colors.skyBg} p={1}>
              <UI.Text variant='bodySmall'>Info content.</UI.Text>
            </UI.Box>
            <UI.Box bgColor={colors.orangeBg} p={1}>
              <UI.Text variant='bodySmall'>Warning content.</UI.Text>
            </UI.Box>
            <UI.Box bgColor={colors.neutralAlt} p={1}>
              <UI.Text variant='bodySmall'>Success content.</UI.Text>
            </UI.Box>
          </UI.AccordionContainer>
        </UI.Box>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(CollapsibleScreen);
