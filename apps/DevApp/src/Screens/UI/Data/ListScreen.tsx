import React, { memo, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { Nav, UI, Manager } from 'framework';
import { faker } from '@faker-js/faker';
import { getDemoColors } from '../../demoColors';

type DemoListItem = {
  searchable: Record<string, string>;
  filterable: Record<string, string>;
  none: Record<string, string>;
};

const CATEGORIES = ['Electronics', 'Clothing', 'Home', 'Books', 'Sports', 'Toys', 'Outdoors'];

// Stable demo thumbnails (more reliable than random image URLs)
const THUMBNAILS = [
  'https://picsum.photos/id/1025/120/120',
  'https://picsum.photos/id/1062/120/120',
  'https://picsum.photos/id/1074/120/120',
  'https://picsum.photos/id/1084/120/120',
  'https://picsum.photos/id/1080/120/120',
];

/******************************************************************************************************************
 * List demo
 *
 * Demonstrates:
 * - UI.List: searchable + filterable list (FlashList under the hood)
 * - Text search via item.searchable
 * - Category filters via item.filterable + filterMap
 * - UI.HighlightText: highlights query matches inside rows
 ******************************************************************************************************************/
const ListScreen: Nav.ScreenType = () => {
  const { isDarkMode } = Manager.useAppSettings();
  const { theme } = Manager.useAppTheme();
  const colors = getDemoColors(isDarkMode);

  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(() => new Set());
  const [chipResetSignal, setChipResetSignal] = useState(0);

  /**
   * Generate a dataset once (demo only)
   */
  const items: DemoListItem[] = useMemo(() => {
    const arr: DemoListItem[] = [];

    for (let i = 0; i < 800; i++) {
      const category = faker.helpers.arrayElement(CATEGORIES);
      const name = faker.commerce.productName();
      const desc = faker.commerce.productDescription();
      const price = faker.commerce.price({ min: 10, max: 500 });

      // pick stable thumbnail (fast + consistent)
      const imageUrl = THUMBNAILS[i % THUMBNAILS.length];

      arr.push({
        searchable: {
          id: String(i + 1),
          name,
          desc,
        },
        filterable: {
          category,
        },
        none: {
          price,
          imageUrl,
        },
      });
    }

    return arr;
  }, []);

  const onCategorySelected = (values: Set<string>) => {
    setSelectedCategories(values);
  };

  const onResetFilters = () => {
    setSelectedCategories(new Set());
    setChipResetSignal(prev => prev + 1);
  };

  const filterMap = {
    category: selectedCategories,
  };

  /**
   * Row renderer
   */
  const renderItem = (item: DemoListItem, index: number) => {
    const { name, desc } = item.searchable;
    const { category } = item.filterable;
    const { price, imageUrl } = item.none;

    // Alternating row background for readability (demo-only)
    const bg = index % 2 === 0 ? colors.neutral_1 : colors.neutral_2;

    return (
      <UI.Box bgColor={bg} p={1}>
        <View style={styles.itemRow}>
          {/* Thumbnail (stable background so layout looks good even while loading) */}
          <UI.Box bgColor={colors.cyan_1} style={styles.thumbContainer}>
            <Image source={{ uri: imageUrl }} style={styles.thumbnail} />
          </UI.Box>

          {/* Text block */}
          <View style={styles.itemText}>
            <UI.HighlightText variant='bodyMedium' bold query={query}>
              {name}
            </UI.HighlightText>

            <UI.HighlightText variant='labelSmall' query={query}>
              {category} · ${price}
            </UI.HighlightText>

            <UI.HighlightText variant='bodySmall' numberOfLines={2} query={query}>
              {desc}
            </UI.HighlightText>
          </View>
        </View>
      </UI.Box>
    );
  };

  /**
   * Header: search bar
   */
  const LeftContent = (
    <UI.Box p={2}>
      <UI.TextInput
        type='search'
        variant='outline'
        value={query}
        placeholder='Search products...'
        onChange={setQuery}
      />
    </UI.Box>
  );

  return (
    <Nav.ScreenLayout showTitle={false} LeftContent={LeftContent} RightContent={null}>

      {/* Header text */}
      <UI.Box ph={2} pt={2}>
        <UI.Text variant='bodyMedium'>
          List renders large datasets efficiently, with optional search and Set-based filters.
        </UI.Text>
      </UI.Box>

      {/* Category filters */}
      <UI.Divider spacing={1} />
      <UI.Box p={1}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipScrollContent}
        >
          <UI.ChipOptions
            schema={new Set(CATEGORIES)}
            onSelected={onCategorySelected}
            resetSignal={chipResetSignal}
          />
        </ScrollView>

        {/* Reset */}
        <UI.Box mt={1} self='flex-start'>
          <UI.TextButton
            onPress={onResetFilters}
            disabled={selectedCategories.size === 0}
            textOpts={{ variant: 'labelSmall', color: theme.colors.onSurfaceVariant }}
          >
            Reset filters
          </UI.TextButton>
        </UI.Box>
      </UI.Box>

      {/* List */}
      <UI.Box flex={1}>
        <UI.List
          dataArr={items}
          query={query}
          filterMap={filterMap}
          renderItem={renderItem}
          emptyComponent={
            <UI.Box p={2}>
              <UI.Text variant='bodySmall' color={theme.colors.onSurfaceVariant}>
                No results. Try clearing the search or filters.
              </UI.Text>
            </UI.Box>
          }
        />
      </UI.Box>

    </Nav.ScreenLayout>
  );
};

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  // container behind the image so the layout is stable while loading
  thumbContainer: {
    width: 52,
    height: 52,
    borderRadius: 6,
    marginRight: 8,
    overflow: 'hidden',
  },
  thumbnail: {
    width: 52,
    height: 52,
    borderRadius: 6,
  },

  itemText: {
    flex: 1,
  },
  chipScrollContent: {
    paddingRight: 16,
  },
});

export default memo(ListScreen);
