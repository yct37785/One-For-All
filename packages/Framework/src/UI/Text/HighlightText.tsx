import React, { memo, ReactNode } from 'react';
import type { TextStyle, StyleProp } from 'react-native';
import { Text, TextProps } from './Text';

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const defaultHighlightColor = 'rgba(255, 235, 59, 0.4)';

/******************************************************************************************************************
 * Highlight text props.
 * 
 * @property query                - Substring to highlight
 * @property caseSensitive?       - Match case (default: false)
 * @property queryColor?          - Queried text color
 * @property queryHighlightColor? - Queried text highlight color
 ******************************************************************************************************************/
export interface HighlightTextProps extends TextProps {
  query: string;
  caseSensitive?: boolean;
  queryColor?: string;
  queryHighlightColor?: string;
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
    numberOfLines,
    query,
    caseSensitive = false,
    queryColor,
    queryHighlightColor,
    children,
    ...rest
  }) => {
    // fallback: no highlighting needed
    if (typeof children !== 'string' || !query) {
      return (
        <Text numberOfLines={numberOfLines} {...rest}>{children}</Text>
      );
    }

    const safe = escapeRegExp(query);
    const flags = caseSensitive ? 'g' : 'gi';
    const re = new RegExp(`(${safe})`, flags);
    const parts = children.split(re);

    const normalizedQuery = caseSensitive ? query : query.toLowerCase();

    return (
      <Text numberOfLines={numberOfLines} {...rest}>
        {parts.map((part, i) => {
          const match = caseSensitive
            ? part === normalizedQuery
            : part.toLowerCase() === normalizedQuery;

          if (!match) {
            return <React.Fragment key={`t-${i}`}>{part}</React.Fragment>;
          }

          // build inner <Text> props (override only color + highlight)
          const innerProps: TextProps = {
            ...rest,

            ...(queryColor !== undefined ? { customColor: queryColor } : {}),

            highlightColor:
              queryHighlightColor ?? defaultHighlightColor,
          };

          return (
            <Text key={`h-${i}`} {...innerProps}>
              {part}
            </Text>
          );
        })}
      </Text>
    );
  }
);
