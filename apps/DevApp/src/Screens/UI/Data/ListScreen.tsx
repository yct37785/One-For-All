import React, { memo, useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Screen, UI } from 'framework';
import { faker } from '@faker-js/faker';

type DemoListItem = {
  searchable: Record<string, string>;
  filterable: Record<string, string>;
  none: Record<string, string>;
};

const CATEGORIES = ['Electronics', 'Clothing', 'Home', 'Books', 'Sports', 'Toys', 'Outdoors'];

/******************************************************************************************************************
 * List demo
 *
 * This screen demonstrates:
 * - UI.List: searchable + filterable list (FlashList under the hood).
 * - UI.TextInput: search bar in the custom header.
 * - UI.ChipOptions: category filters in a horizontal scroll row.
 * - UI.HighlightText: inline highlighting of the search term within each list item.
 ******************************************************************************************************************/
const ListScreen: Screen.ScreenType = ({}) => {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(() => new Set());
  const [chipResetSignal, setChipResetSignal] = useState(0);

  // generate a large dataset once using Faker
  const items: DemoListItem[] = useMemo(() => {
    const arr: DemoListItem[] = [];
    for (let i = 0; i < 1200; i++) {
      const category = faker.helpers.arrayElement(CATEGORIES);
      const name = faker.commerce.productName();
      const desc = faker.commerce.productDescription();
      const price = faker.commerce.price({ min: 10, max: 500 });
      const imageUrl = faker.image.url(); // generic image URL

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
    setChipResetSignal((prev) => prev + 1);
  };

  const filterMap = {
    category: selectedCategories,
  };

  // row renderer for List (with image + highlighted text)
  const renderItem = (item: DemoListItem, index: number) => {
    const { name, desc } = item.searchable;
    const { category } = item.filterable;
    const { price, imageUrl } = item.none;

    const bg = index % 2 === 0 ? '#ffffff' : '#fafafa';

    return (
      <UI.Box bgColor={bg} p={1}>
        <View style={styles.itemRow}>
          {/* Thumbnail */}
          <Image source={{ uri: imageUrl }} style={styles.thumbnail} />

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

  // custom header: description + search bar + horizontal chips
  const LeftContent = (
    <UI.Box p={2}>
      <UI.TextInput
        type='search'
        variant='outline'
        value={query}
        placeholder='Search...'
        onChange={setQuery}
      />
    </UI.Box>
  );

  return (
    <Screen.ScreenLayout showTitle={false} LeftContent={LeftContent} RightContent={null}>

      {/* Header */}
      <UI.Box ph={2}>
        <UI.Text variant='bodyMedium'>
          List renders large datasets with text search, category filters, and inline highlighting.
        </UI.Text>
      </UI.Box>
      
      {/* Chips filter */}
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

        {/* Reset filters */}
        <UI.Box mt={1} self='flex-start'>
          <UI.TextButton
            onPress={onResetFilters}
            disabled={selectedCategories.size === 0}
            textOpts={{ variant: 'labelSmall', color: 'label' }}
          >
            Reset filters
          </UI.TextButton>
        </UI.Box>
      </UI.Box>

      {/* List as the main scrollable content */}
      <UI.Box flex={1} mt={0}>
        <UI.List dataArr={items} query={query} filterMap={filterMap} renderItem={renderItem} listType={UI.ListType.flashlist} />
      </UI.Box>

    </Screen.ScreenLayout>
  );
};

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  thumbnail: {
    width: 52,
    height: 52,
    borderRadius: 6,
    marginRight: 8,
  },
  itemText: {
    flex: 1,
  },
  chipScrollContent: {
    paddingRight: 16,
  },
});

export default memo(ListScreen);
