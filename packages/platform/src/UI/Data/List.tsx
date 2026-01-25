import React, { useMemo, memo, forwardRef, useImperativeHandle, useRef } from 'react';
import { View, FlatList, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { FlashList } from '@shopify/flash-list';

/******************************************************************************************************************
 * Select which list implementation to use.
 * 
 * @property flashlist  - Uses @shopify/flash-list for improved performance with large datasets
 * @property flatlist   - Uses React Native's built-in FlatList
 ******************************************************************************************************************/
export enum ListType {
  flashlist = 'flashlist',
  flatlist = 'flatlist',
}

/******************************************************************************************************************
 * Define the structure of a single list item used for search and filter.
 *
 * @property searchable   - Key/value pairs included in text search
 * @property filterable   - Key/value pairs used for equality-based filtering
 * @property none         - Arbitrary values not involved in search or filter
 *
 * @usage
 * ```ts
 * const item: ListItem = {
 *   searchable: { name: 'chair', desc: 'wooden' },
 *   filterable: { material: 'wood' },
 *   none: { id: '123' }
 * }
 * ```
 ******************************************************************************************************************/
export type ListItem = {
  searchable: Record<string, string>;
  filterable: Record<string, string>;
  none: Record<string, any>;
};

/******************************************************************************************************************
 * Represent active filters applied to the list.
 *
 * @usage
 * ```ts
 * const filters: ListFilterMap = {
 *   material: new Set(['wood', 'cloth'])
 * }
 * ```
 ******************************************************************************************************************/
export type ListFilterMap = {
  [key: string]: Set<string>;
};

/******************************************************************************************************************
 * Function signature for rendering a list item row.
 *
 * @param item  - List item data
 * @param index - Item index
 *
 * @usage
 * ```ts
 * const renderItem: renderListItemFunc = (item) => <Text>{item.searchable.name}</Text>
 * ```
 ******************************************************************************************************************/
export type renderListItemFunc = (item: ListItem, index: number) => React.ReactNode;

/******************************************************************************************************************
 * Imperative handle for controlling list.
 *
 * @usage
 * ```ts
 * const listRef = useRef<ListHandle>(null);
 *
 * listRef.current?.scrollToIndex(10);
 * listRef.current?.scrollToEnd();
 * listRef.current?.scrollToTop(false);
 * ```
 ******************************************************************************************************************/
export type ListHandle = {
  /**
   * Scrolls the list to a specific item index.
   *
   * @param index     - Target item index
   * @param animated? - Whether the scroll should be animated (default: true)
   */
  scrollToIndex: (index: number, animated?: boolean) => void;

  /**
   * Scrolls the list to the very end.
   *
   * @param animated? - Whether the scroll should be animated (default: true)
   */
  scrollToEnd: (animated?: boolean) => void;

  /**
   * Scrolls the list to the very top.
   *
   * @param animated? - Whether the scroll should be animated (default: true)
   */
  scrollToTop: (animated?: boolean) => void;
};

export type ListProps = {
  dataArr: ListItem[];
  query: string;
  filterMap: ListFilterMap;
  renderItem: renderListItemFunc;
  listType?: ListType;
  emptyComponent?: React.ReactNode;
  initialScrollIndex?: number;
  startFromEnd?: boolean;
  style?: StyleProp<ViewStyle>;
};

/******************************************************************************************************************
 * A scrollable vertical container for presenting lists of items, searchable and filterable.
 * 
 * Features:
 * - Text search across `item.searchable`
 * - Filtering via `filterMap` (Set-based per category)
 * - Pluggable list engine (FlashList / FlatList)
 * - Optional empty state component
 * 
 * @param dataArr                - Input dataset to render
 * @param query                  - Case-insensitive search query applied to searchable values
 * @param filterMap              - Active filters applied to filterable keys
 * @param renderItem             - Function that renders a row for a given item
 * @param ListType               - Underlying list implementation (default flashlist)
 * @param emptyComponent         - Custom view when no results
 * @param initialScrollIndex     - Starts the list at a given index
 * @param startFromEnd           - Starts the list scrolled to the last item
 * @param style?                 - Optional wrapper style
 * 
 * @usage
 * ```tsx
 * <List
 *   dataArr={items}
 *   query={searchTerm}
 *   filterMap={{ material: new Set(['wood']) }}
 *   renderItem={(it) => <Text>{it.searchable.name}</Text>}
 *   listImplementationType={ListImplementationType.flashlist}
 * />
 * ```
 * 
 * @TODO update screen demo with ListHandle
 ******************************************************************************************************************/
export const List = memo(
  forwardRef<ListHandle, ListProps>(
    (
      {
        dataArr = [],
        query = '',
        filterMap = {},
        renderItem,
        listType = ListType.flashlist,
        emptyComponent,
        style,
        initialScrollIndex,
        startFromEnd
      },
      ref
    ) => {
      const flashListRef = useRef<any>(null);
      const flatListRef = useRef<FlatList<ListItem>>(null);

      useImperativeHandle(ref, () => ({
        scrollToIndex: (index: number, animated: boolean = true) => {
          if (listType === ListType.flashlist) {
            flashListRef.current?.scrollToIndex({ index, animated });
            return;
          }
          flatListRef.current?.scrollToIndex({ index, animated });
        },
        scrollToEnd: (animated: boolean = true) => {
          if (listType === ListType.flashlist) {
            flashListRef.current?.scrollToEnd({ animated });
            return;
          }
          flatListRef.current?.scrollToEnd({ animated });
        },
        scrollToTop: (animated: boolean = true) => {
          if (listType === ListType.flashlist) {
            flashListRef.current?.scrollToOffset({ offset: 0, animated });
            return;
          }
          flatListRef.current?.scrollToOffset({ offset: 0, animated });
        },
      }));

      /**************************************************************************************************************
       * Filters the dataset using both search and filter criteria.
       **************************************************************************************************************/
      const filteredData = useMemo(() => {
        const hasQuery = query.trim().length > 0;
        const hasAnyFilters = Object.values(filterMap).some(
          (set: Set<string>) => set && set.size > 0
        );

        // fast path: no search and no active filters → return original data
        if (!hasQuery && !hasAnyFilters) {
          return dataArr;
        }

        const normalizedQuery = query.toLowerCase();

        return dataArr.filter((item) => {
          // --- search ---
          let matchesSearch = true;
          if (hasQuery) {
            const searchable = item.searchable || {};
            matchesSearch = Object.values(searchable).some((value) =>
              String(value).toLowerCase().includes(normalizedQuery)
            );
          }

          // --- filters ---
          let matchesFilter = true;
          if (hasAnyFilters) {
            matchesFilter = Object.entries(filterMap).every(
              ([category, categoryValues]) => {
                const set = categoryValues as Set<string>;
                const hasFilters = set && set.size > 0;
                if (!hasFilters) return true;

                const itemValue = item.filterable?.[category] || '';
                return set.has(itemValue);
              }
            );
          }

          return matchesSearch && matchesFilter;
        });
      }, [dataArr, query, filterMap]);

      /**************************************************************************************************************
       * Resolve initial scroll index:
       * - startFromEnd takes precedence
       * - falls back to initialScrollIndex if provided
       **************************************************************************************************************/
      const resolvedInitialScrollIndex = useMemo(() => {
        if (startFromEnd && filteredData.length > 0) {
          return filteredData.length - 1;
        }
        return initialScrollIndex;
      }, [startFromEnd, initialScrollIndex, filteredData.length]);

      /**************************************************************************************************************
       * Derive a stable key for the list so FlashList/FlatList fully remounts when
       * the result set shrinks/grows or filters change drastically.
       **************************************************************************************************************/
      const listKey = useMemo(() => {
        const filterKey = Object.entries(filterMap)
          .map(([category, set]) => {
            const values = Array.from(set || []).sort().join(',');
            return `${category}:${values}`;
          })
          .join('|');

        return `${listType}-${filteredData.length}-${query}-${filterKey}`;
      }, [listType, filteredData.length, query, filterMap]);

      /**************************************************************************************************************
       * Adapter to wrap renderItem into FlatList/FlashList signature.
       **************************************************************************************************************/
      const renderListItem = ({
        item,
        index,
      }: {
        item: ListItem;
        index: number;
      }) => (
        <View style={styles.itemWrapper}>{renderItem(item, index)}</View>
      );

      /**************************************************************************************************************
       * Prefer a stable key if the item has an "id" in searchable.
       * Falls back to index as a last resort.
       **************************************************************************************************************/
      const keyExtractor = (item: ListItem, index: number) => {
        const maybeId = (item.searchable as any)?.id;
        return typeof maybeId === 'string' && maybeId.length > 0
          ? maybeId
          : index.toString();
      };

      /**************************************************************************************************************
       * Optional empty state component.
       **************************************************************************************************************/
      const ListEmptyComponent = emptyComponent
        ? () => <>{emptyComponent}</>
        : undefined;

      const sharedListProps = {
        data: filteredData,
        renderItem: renderListItem,
        keyExtractor,
        ListEmptyComponent,
      };

      const renderList = () => {
        if (listType === ListType.flashlist) {
          return (
            <FlashList
              ref={flashListRef}
              key={listKey}
              {...sharedListProps}
              initialScrollIndex={resolvedInitialScrollIndex}
            // FlashList v2: size estimates are no longer needed or read.
            />
          );
        }

        return (
          <FlatList
            ref={flatListRef}
            key={listKey}
            {...sharedListProps}
            initialScrollIndex={resolvedInitialScrollIndex}
            windowSize={5}
          />
        );
      };

      return (
        <View style={[styles.container, style as StyleProp<ViewStyle>]}>
          {renderList()}
        </View>
      );
    }
  )
);

/******************************************************************************************************************
 * styles
 ******************************************************************************************************************/
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemWrapper: {
    // avoid flex: 1 here; let each row size itself naturally so virtualized layouts can measure correctly
  },
});
