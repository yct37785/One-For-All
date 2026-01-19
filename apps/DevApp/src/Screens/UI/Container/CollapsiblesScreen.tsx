import React, { memo } from 'react';
import { Nav, UI, Manager } from 'framework';
import { getDemoColors } from '../../demoColors';

/******************************************************************************************************************
 * Collapsible & Accordion demo
 *
 * - CollapsibleContainer: one header that toggles one body.
 * - AccordionContainer: multiple headers where only one section is open at a time.
 ******************************************************************************************************************/
const CollapsibleScreen: Nav.ScreenType = () => {
  const { isDarkMode } = Manager.useAppSettings();
  const { theme } = Manager.useAppTheme();
  const colors = getDemoColors(isDarkMode);

  return (
    <Nav.ScreenLayout showTitle title='Collapsibles'>
      <UI.VerticalLayout constraint='scroll' pad={2}>

        {/* Intro */}
        <UI.Text variant='bodyMedium'>
          These components hide and reveal content behind a tappable header.
        </UI.Text>

        {/* Collapsible · minimal */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>CollapsibleContainer</UI.Text>

        <UI.LabelText>
          A single toggle that expands or collapses its content.
        </UI.LabelText>

        <UI.CollapsibleContainer text='Tap to toggle'>
          <UI.Box bgColor={colors.neutral_2} p={1}>
            <UI.Text variant='bodySmall'>
              This content is hidden until the header is opened.
            </UI.Text>
          </UI.Box>
        </UI.CollapsibleContainer>

        {/* Styled / colored headers */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>CollapsibleContainer · styled headers</UI.Text>

        <UI.LabelText>
          Headers can be styled with icons, colors, and text variants to convey meaning.
        </UI.LabelText>

        <UI.Box mt={1}>

          {/* Info (primary) */}
          <UI.CollapsibleContainer
            text='Information'
            icon='information-outline'
            textOpts={{ variant: 'titleSmall', color: theme.colors.primary }}
            iconOpts={{ color: theme.colors.primary }}
          >
            <UI.Box bgColor={colors.cyan_1} p={1}>
              <UI.Text variant='bodySmall'>
                Informational content, tips, or helpful context.
              </UI.Text>
            </UI.Box>
          </UI.CollapsibleContainer>

          {/* Warning (tertiary) */}
          <UI.CollapsibleContainer
            text='Warning'
            icon='alert-outline'
            textOpts={{ variant: 'titleSmall', color: theme.colors.tertiary }}
            iconOpts={{ color: theme.colors.tertiary }}
          >
            <UI.Box bgColor={colors.amber_1} p={1}>
              <UI.Text variant='bodySmall'>
                Warnings, edge cases, or things to be careful about.
              </UI.Text>
            </UI.Box>
          </UI.CollapsibleContainer>

          {/* Danger (error) */}
          <UI.CollapsibleContainer
            text='Danger zone'
            icon='alert'
            textOpts={{ variant: 'titleSmall', color: theme.colors.error }}
            iconOpts={{ color: theme.colors.error }}
          >
            <UI.Box bgColor={colors.red_1} p={1}>
              <UI.Text variant='bodySmall'>
                Destructive actions, irreversible changes, or sensitive settings.
              </UI.Text>
            </UI.Box>
          </UI.CollapsibleContainer>

          {/* Custom (pure demoColors styling) */}
          <UI.CollapsibleContainer
            text='Custom color'
            icon='palette'
            textOpts={{ variant: 'titleSmall', color: colors.purple_3 }}
            iconOpts={{ color: colors.cyan_3 }}
          >
            <UI.Box bgColor={colors.purple_1} p={1}>
              <UI.Text variant='bodySmall'>
                Header using demoColors tiers (not tied to theme tokens).
              </UI.Text>
            </UI.Box>
          </UI.CollapsibleContainer>

        </UI.Box>

        {/* Accordion · minimal */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>AccordionContainer</UI.Text>

        <UI.LabelText>
          Multiple sections share one open state — opening one closes the others.
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.AccordionContainer
            sections={[
              {
                text: 'Info',
                icon: 'information-outline',
                textOpts: { variant: 'titleSmall', color: theme.colors.primary },
                iconOpts: { color: theme.colors.primary },
              },
              {
                text: 'Warning',
                icon: 'alert-outline',
                textOpts: { variant: 'titleSmall', color: theme.colors.tertiary },
                iconOpts: { color: theme.colors.tertiary },
              },
              {
                text: 'Success',
                icon: 'check-circle-outline',
                textOpts: { variant: 'titleSmall', color: theme.colors.secondary },
                iconOpts: { color: theme.colors.secondary },
              },
            ]}
          >
            <UI.Box bgColor={colors.cyan_1} p={1}>
              <UI.Text variant='bodySmall'>Info content: helpful details or explanations.</UI.Text>
            </UI.Box>

            <UI.Box bgColor={colors.amber_1} p={1}>
              <UI.Text variant='bodySmall'>Warning content: things to pay attention to.</UI.Text>
            </UI.Box>

            <UI.Box bgColor={colors.green_1} p={1}>
              <UI.Text variant='bodySmall'>Success content: confirmations or completed steps.</UI.Text>
            </UI.Box>
          </UI.AccordionContainer>
        </UI.Box>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(CollapsibleScreen);
