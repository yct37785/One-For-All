import React, { memo, ReactNode } from 'react';
import type { TextStyle, StyleProp } from 'react-native';
import { Text, TextProps } from './Text';

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const defaultHighlightStyle: TextStyle = {
  backgroundColor: 'yellow',
};

/******************************************************************************************************************
 * Highlight text props.
 * 
 * @property query            - Substring to highlight
 * @property caseSensitive?   - Match case (default: false)
 * @property highlightStyle?  - Extra style for highlighted parts (e.g., { backgroundColor: 'yellow' })
 ******************************************************************************************************************/
export type HighlightTextProps = TextProps & {
  query: string;
  caseSensitive?: boolean;
  highlightStyle?: StyleProp<TextStyle>;
  children?: string | ReactNode;
};

/******************************************************************************************************************
 * A text component that visually emphasizes substrings matching a search or filter query.
 * 
 * @usage
 * ```tsx
 * <TextHighlight
      variant='body'
      query='react'
      highlightStyle={{ backgroundColor: t.colors.primary, color: t.colors.onPrimary }}
    >
      React Native makes mobile development easy with React.
    </TextHighlight>
 * ```
 ******************************************************************************************************************/
export const HighlightText: React.FC<HighlightTextProps> = memo(
  ({
    variant = 'bodyMedium',
    color,
    style,
    query,
    caseSensitive = false,
    highlightStyle,
    children,
    ...rest
  }) => {
    // only operate on plain strings, otherwise fall back to a single node
    if (typeof children !== 'string' || !query) {
      return (
        <Text variant={variant} color={color} style={style} {...rest}>
          {children}
        </Text>
      );
    }

    const flags = caseSensitive ? 'g' : 'gi';
    const safe = escapeRegExp(query);
    const re = new RegExp(`(${safe})`, flags);
    const parts = children.split(re);

    const resolvedHighlightStyle: StyleProp<TextStyle> =
      highlightStyle ?? defaultHighlightStyle;

    const normalizedQuery = caseSensitive ? query : query.toLowerCase();

    return (
      <Text variant={variant} color={color} style={style} {...rest}>
        {parts.map((part, i) => {
          const match = caseSensitive
            ? part === normalizedQuery
            : part.toLowerCase() === normalizedQuery;

          return match ? (
            <Text key={`h-${i}`} variant={variant} style={resolvedHighlightStyle}>
              {part}
            </Text>
          ) : (
            <React.Fragment key={`t-${i}`}>{part}</React.Fragment>
          );
        })}
      </Text>
    );
  }
);
