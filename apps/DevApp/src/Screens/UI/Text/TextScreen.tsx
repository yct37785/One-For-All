import React, { memo } from 'react';
import { Nav, UI, Manager } from 'framework';

/******************************************************************************************************************
 * Text demo
 *
 * This screen demonstrates the base Text component:
 * - MD3 typography variants (display, headline, title, body, label)
 * - Semantic colors and custom emphasis
 * - Highlighting via highlightColor
 * - Bold and underline helpers
 * - Truncation with numberOfLines
 ******************************************************************************************************************/
const TextScreen: Nav.ScreenType = ({}) => {
  const { theme } = Manager.useAppTheme();
  return (
    <Nav.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll' padding={2}>

        {/* Header */}
        <UI.Text variant='bodyMedium'>
          Text is the base typography component used throughout the UI. It
          provides Material Design 3 variants, semantic colors, highlighting,
          bolding, underline and truncation.
        </UI.Text>

        {/* Variants */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Variants</UI.Text>

        <UI.LabelText>
          Commonly used text roles.
        </UI.LabelText>

        <UI.Box mt={2}>
          <UI.Text variant='displaySmall'>Display Small</UI.Text>
          <UI.Text variant='headlineMedium'>Headline Medium</UI.Text>
          <UI.Text variant='titleLarge'>Title Large</UI.Text>
          <UI.Text variant='titleMedium'>Title Medium</UI.Text>
          <UI.Text variant='titleSmall'>Title Small</UI.Text>
          <UI.Text variant='bodyLarge'>Body Large</UI.Text>
          <UI.Text variant='bodyMedium'>Body Medium (default)</UI.Text>
          <UI.Text variant='bodySmall'>Body Small</UI.Text>
          <UI.Text variant='labelLarge'>Label Large</UI.Text>
          <UI.Text variant='labelMedium'>Label Medium</UI.Text>
          <UI.Text variant='labelSmall'>Label Small</UI.Text>
        </UI.Box>

        {/* Colors */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Colors</UI.Text>

        <UI.LabelText>
          Use semantic colors to match the requirements.
        </UI.LabelText>

        <UI.Box mt={2}>
          <UI.Text color={theme.colors.onSurface}>Default color</UI.Text>
          <UI.Text color={theme.colors.onSurfaceVariant}>Label color</UI.Text>
          <UI.Text color={theme.colors.onSurfaceDisabled}>Disabled text</UI.Text>
          <UI.Text color={theme.colors.primary}>Primary text</UI.Text>
          <UI.Text color={theme.colors.secondary}>Secondary text</UI.Text>
          <UI.Text color={theme.colors.error}>Error text</UI.Text>
        </UI.Box>

        {/* Highlighting */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Highlighting</UI.Text>

        <UI.LabelText>
          highlightColor applies a background behind the text.
        </UI.LabelText>

        <UI.Box mt={2}>
          <UI.Text highlightColor='rgba(255, 235, 59, 0.4)'>
            This sentence has a soft highlight behind it for emphasis.
          </UI.Text>
        </UI.Box>

        {/* Bold & underline */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Bold & underline</UI.Text>

        <UI.LabelText>
          Use bold and underline helpers for lightweight emphasis.
        </UI.LabelText>

        <UI.Box mt={2}>
          <UI.Text bold>
            Bold text using the bold prop.
          </UI.Text>
          <UI.Text underline>
            Underlined text using the underline prop.
          </UI.Text>
          <UI.Text bold underline>
            Bold and underlined text combined.
          </UI.Text>
        </UI.Box>

        {/* Truncation & numberOfLines */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Truncation (numberOfLines)</UI.Text>

        <UI.LabelText>
          Use numberOfLines to clamp text and show ellipsis when content is too long.
        </UI.LabelText>

        <UI.Box mt={2}>
          <UI.Text numberOfLines={1}>
            This is a long single-line piece of text that will be truncated when it
            exceeds the available width in the layout.
          </UI.Text>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Text numberOfLines={2}>
            This example is limited to two lines. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam.
          </UI.Text>
        </UI.Box>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(TextScreen);
