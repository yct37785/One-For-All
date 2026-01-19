import React, { memo, useMemo, useState } from 'react';
import { Nav, UI, Manager } from 'framework';

/******************************************************************************************************************
 * Text variants demo
 *
 * Specialized helpers built on top of Text:
 * - LabelText: subtle label styling (onSurfaceVariant)
 * - HighlightText: emphasize a query within a string
 * - HyperlinkText: hyperlink styling + click handler
 ******************************************************************************************************************/
const TextVariantsScreen: Nav.ScreenType = () => {
  const { theme } = Manager.useAppTheme();

  const [query, setQuery] = useState('hero');
  const [tosClicks, setTosClicks] = useState(0);
  const [privacyClicks, setPrivacyClicks] = useState(0);

  const sampleText = useMemo(
    () =>
      `Hero is a title reserved for those who perform truly great feats.
Too many are undeserving—just money worshipers playing hero.
Until this society wakes up and rectifies itself, I will continue to do my work.`,
    []
  );

  return (
    <Nav.ScreenLayout showTitle title='Text variants'>
      <UI.VerticalLayout constraint='scroll' pad={2}>

        {/* Intro */}
        <UI.Text variant='bodyMedium'>
          Helpers that add small behavior on top of Text.
        </UI.Text>

        {/* LabelText */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>LabelText</UI.Text>

        <UI.Box mt={1}>
          <UI.LabelText>Subtle label color (onSurfaceVariant).</UI.LabelText>
          <UI.LabelText variant='labelSmall'>Smaller label.</UI.LabelText>
          <UI.LabelText variant='labelLarge'>Larger label.</UI.LabelText>
        </UI.Box>

        {/* HighlightText */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>HighlightText</UI.Text>

        <UI.LabelText>
          Highlights matching substrings in a plain string.
        </UI.LabelText>

        <UI.Box mt={1}>
          <UI.TextInput
            type='search'
            placeholder='Type a query…'
            value={query}
            onChange={setQuery}
          />
        </UI.Box>

        <UI.Box mt={2}>
          <UI.HighlightText
            query={query}
            variant='bodyMedium'
            queryHighlightColor='rgba(255, 235, 59, 0.5)'
          >
            {sampleText}
          </UI.HighlightText>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.HighlightText
            query={query}
            variant='bodySmall'
            caseSensitive
            queryColor={theme.colors.error}
            queryHighlightColor='rgba(255, 205, 210, 0.8)'
          >
            Case-sensitive: type Hero with a capital H to match only exact case.
          </UI.HighlightText>
        </UI.Box>

        {/* HyperlinkText */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>HyperlinkText</UI.Text>

        <UI.LabelText>
          Primary color + underline, built on Text so it can be inline.
        </UI.LabelText>

        <UI.Box mt={2}>
          <UI.Text variant='bodySmall'>
            By continuing, you agree to our{' '}
            <UI.HyperlinkText onPress={() => setTosClicks(c => c + 1)}>
              Terms of Service
            </UI.HyperlinkText>{' '}
            and{' '}
            <UI.HyperlinkText onPress={() => setPrivacyClicks(c => c + 1)}>
              Privacy Policy
            </UI.HyperlinkText>
            .
          </UI.Text>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.LabelText variant='labelSmall'>
            Terms clicked: {tosClicks} · Privacy clicked: {privacyClicks}
          </UI.LabelText>
        </UI.Box>

      </UI.VerticalLayout>
    </Nav.ScreenLayout>
  );
};

export default memo(TextVariantsScreen);
