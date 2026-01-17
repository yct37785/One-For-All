import React, { memo, useState } from 'react';
import { Nav, UI, Manager } from 'framework';

/******************************************************************************************************************
 * Text demo
 *
 * Text is your base typography wrapper over React Native Paper:
 * - Variants (MD3)
 * - Color + highlight
 * - Bold / underline
 * - numberOfLines truncation
 * - top spacing
 * - onPress
 ******************************************************************************************************************/
const TextScreen: Nav.ScreenType = () => {
  const { theme } = Manager.useAppTheme();
  const [clicks, setClicks] = useState(0);

  return (
    <Nav.ScreenLayout showTitle title='Text'>
      <UI.VerticalLayout constraint='scroll' padding={2}>

        {/* Intro */}
        <UI.Text variant='bodyMedium'>
          Text is the base typography component used across the UI.
        </UI.Text>

        {/* Variants */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Variants</UI.Text>
        <UI.LabelText>Common roles.</UI.LabelText>

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
        <UI.LabelText>Use theme colors for intent.</UI.LabelText>

        <UI.Box mt={2}>
          <UI.Text color={theme.colors.onSurface}>Default</UI.Text>
          <UI.Text color={theme.colors.onSurfaceVariant}>Subtle</UI.Text>
          <UI.Text color={theme.colors.onSurfaceDisabled}>Disabled</UI.Text>
          <UI.Text color={theme.colors.primary}>Primary</UI.Text>
          <UI.Text color={theme.colors.secondary}>Secondary</UI.Text>
          <UI.Text color={theme.colors.error}>Error</UI.Text>
        </UI.Box>

        {/* Highlight */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Highlight</UI.Text>
        <UI.LabelText>Background emphasis via highlightColor.</UI.LabelText>

        <UI.Box mt={2}>
          <UI.Text highlightColor='rgba(255, 235, 59, 0.4)'>
            Soft highlight behind text.
          </UI.Text>
        </UI.Box>

        {/* Emphasis */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Emphasis</UI.Text>
        <UI.LabelText>Bold and underline helpers.</UI.LabelText>

        <UI.Box mt={2}>
          <UI.Text bold>Bold</UI.Text>
          <UI.Text underline>Underline</UI.Text>
          <UI.Text bold underline>Bold + underline</UI.Text>
        </UI.Box>

        {/* Truncation */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Truncation</UI.Text>
        <UI.LabelText>Clamp text using numberOfLines.</UI.LabelText>

        <UI.Box mt={2}>
          <UI.Text numberOfLines={1}>
            This is a long single-line piece of text that will truncate when it exceeds the available width.
          </UI.Text>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Text numberOfLines={2}>
            Two-line clamp. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua.
          </UI.Text>
        </UI.Box>

        {/* top spacing */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Top spacing</UI.Text>
        <UI.LabelText>top adds vertical spacing using your design pad scale.</UI.LabelText>

        <UI.Box mt={2} bgColor={theme.colors.surfaceVariant} p={1} br={12}>
          <UI.Text>First line</UI.Text>
          <UI.Text top={1}>top={1}</UI.Text>
          <UI.Text top={2}>top={2}</UI.Text>
        </UI.Box>

        {/* Pressable text */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>Pressable</UI.Text>
        <UI.LabelText>Text can be clickable via onPress.</UI.LabelText>

        <UI.Box mt={2}>
          <UI.Text onPress={() => setClicks(c => c + 1)}>
            Tap this text
          </UI.Text>

          <UI.Box mt={2}>
            <UI.LabelText variant='labelSmall'>
              Clicks: {clicks}
            </UI.LabelText>
          </UI.Box>
        </UI.Box>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(TextScreen);
