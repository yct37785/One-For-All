import React, { memo, useState } from 'react';
import { Screen, UI } from 'framework';

/******************************************************************************************************************
 * Text variants demo
 *
 * This screen demonstrates specialized variants built on top of the base Text
 * component:
 * - HighlightText: emphasizes substrings that match a query
 * - HyperlinkText: dedicated hyperlink styling that calls onPress when tapped
 ******************************************************************************************************************/
const TextVariantsScreen: Screen.ScreenType = ({}) => {
  const [query, setQuery] = useState('hero');
  const [tosClicks, setTosClicks] = useState(0);
  const [privacyClicks, setPrivacyClicks] = useState(0);

  return (
    <Screen.ScreenLayout showTitle>
      <UI.VerticalLayout constraint='scroll' padding={2}>

        {/* Header */}
        <UI.Text variant='bodyMedium'>
          This screen showcases variants of Text that add focused behavior.
        </UI.Text>

        {/* HighlightText */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>HighlightText</UI.Text>

        <UI.Text variant='labelMedium' color='label'>
          Highlights parts of the text that match a query, with optional
          case-sensitivity and custom highlight colors.
        </UI.Text>

        <UI.Box mt={2}>
          <UI.Text variant='labelSmall' color='label'>
            Try changing the query to see different parts highlighted.
          </UI.Text>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.TextInput
            type='search'
            placeholder='Search phrase…'
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
            Hero is a title reserved for those who perform truly great feats.
            Too many are undeserving—just money worshipers playing hero. Until
            this society wakes up and rectifies itself, I will continue to do my
            work.
          </UI.HighlightText>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.HighlightText
            query={query}
            variant='bodySmall'
            caseSensitive
            queryColor='#d32f2f'
            queryHighlightColor='rgba(255, 205, 210, 0.8)'
          >
            Case-sensitive matching: type Hero with a capital H to match only
            exact case.
          </UI.HighlightText>
        </UI.Box>

        {/* HyperlinkText */}
        <UI.Divider spacing={1} />
        <UI.Text variant='titleMedium'>HyperlinkText</UI.Text>

        <UI.Text variant='labelMedium' color='label'>
          A dedicated hyperlink component that always uses primary color +
          underline and calls onPress when tapped.
        </UI.Text>

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
          <UI.Text variant='labelSmall' color='label'>
            Terms clicked: {tosClicks} · Privacy clicked: {privacyClicks}
          </UI.Text>
        </UI.Box>

        <UI.Box mt={1}>
          <UI.Text variant='labelSmall' color='label'>
            HyperlinkText can be used inline with regular Text to build richer
            paragraphs with tappable sections.
          </UI.Text>
        </UI.Box>

      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

export default memo(TextVariantsScreen);
