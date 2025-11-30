import React, { useState, useEffect, memo } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Screen, UI } from 'framework';
import { faker } from '@faker-js/faker';

const padSize = 4;

const ListTypes = {
  flashlist: UI.ListImplementationType.flashlist,
  flatlist: UI.ListImplementationType.flatlist,
} as const;

/******************************************************************************************************************
 * List demo
 *
 * - Search bar in the app bar
 * - Filter section using ChipOptions + ListFilterMap
 * - Switch between FlashList / FlatList
 * - Material-style, non-elevated rows separated by dividers
 ******************************************************************************************************************/
const ListScreen: Screen.ScreenType = () => {
  const [listType, setListType] = useState<UI.ListImplementationType>(
    UI.ListImplementationType.flashlist
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [productList, setProductList] = useState<UI.ListItem[]>([]);
  const [matChipsSchema, setMatChipsSchema] = useState<Set<string>>(new Set());
  const [filterMap, setFilterMap] = useState<UI.ListFilterMap>({
    material: new Set(),
  });

  useEffect(() => {
    const fakeData = faker.helpers.multiple(createRandomProduct, { count: 200 });

    const matNext: Set<string> = new Set();
    fakeData.forEach((item) => {
      matNext.add(item.filterable.material);
    });

    setMatChipsSchema(matNext);
    setProductList(fakeData);
  }, []);

  /**
   * Create a random product item.
   * Keep the data aligned with ListItem types: strings only in searchable/filterable/none.
   */
  const createRandomProduct = (): UI.ListItem => {
    return {
      searchable: {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        desc: faker.commerce.productDescription(),
        category: faker.commerce.department(),
      },
      filterable: {
        material: faker.commerce.productMaterial().toLowerCase(),
      },
      none: {
        img: faker.image.urlPicsumPhotos(),
      },
    };
  };

  /**
   * Handle selection of material chips
   */
  function onChipsSelected(selectedValues: Set<string>) {
    filterMap.material = selectedValues;
    setFilterMap({ ...filterMap });
  }

  /**
   * Card-style (but non-elevated) list item renderer.
   * We derive price/rating/inStock from the index so we don't modify the ListItem type.
   */
  const renderItem: UI.renderListItemFunc = (item, index) => {
    const { name, desc, category } = item.searchable as any;
    const { material } = item.filterable as any;
    const { img } = item.none as any;

    // Derived fields for visual richness (not stored in ListItem)
    const price = 19 + (index % 80); // 19–98
    const rating = 3 + ((index * 7) % 20) / 10; // 3.0–4.9
    const inStock = index % 4 !== 0;

    return (
      <View>
        <UI.Box style={styles.rowContainer} bgColor='#FFFFFF'>
          <UI.HorizontalLayout gap={1}>
            {/* Image */}
            <View style={styles.imageContainer}>
              <Image
                style={styles.img}
                source={{ uri: img }}
                resizeMode='cover'
              />
            </View>

            {/* Text content */}
            <UI.VerticalLayout flex={1} gap={1}>
              {/* Title + category/material */}
              <UI.VerticalLayout gap={0}>
                <UI.HighlightText query={searchQuery} variant='titleSmall'>
                  {name}
                </UI.HighlightText>
                <UI.Text variant='labelSmall' color='label'>
                  {category} • {material}
                </UI.Text>
              </UI.VerticalLayout>

              {/* Price + rating + stock as 'pills' */}
              <UI.HorizontalLayout gap={1}>
                <UI.Box
                  bgColor='#E3F2FD'
                  align='center'
                  justify='center'
                  style={styles.pill}
                >
                  <UI.Text variant='labelSmall' color='primary' bold>
                    ${price}
                  </UI.Text>
                </UI.Box>

                <UI.Box
                  bgColor='#FFF3E0'
                  align='center'
                  justify='center'
                  style={styles.pill}
                >
                  <UI.Text variant='labelSmall' color='label'>
                    ⭐ {rating.toFixed(1)}
                  </UI.Text>
                </UI.Box>

                <UI.Box
                  bgColor={inStock ? '#E8F5E9' : '#FFEBEE'}
                  align='center'
                  justify='center'
                  style={styles.pill}
                >
                  <UI.Text
                    variant='labelSmall'
                    color={inStock ? 'primary' : 'error'}
                  >
                    {inStock ? 'In stock' : 'Out of stock'}
                  </UI.Text>
                </UI.Box>
              </UI.HorizontalLayout>

              {/* Description */}
              <UI.HighlightText
                query={searchQuery}
                variant='bodySmall'
                numberOfLines={2}
                style={styles.description}
              >
                {desc}
              </UI.HighlightText>
            </UI.VerticalLayout>
          </UI.HorizontalLayout>
        </UI.Box>

        {/* Divider between items */}
        <UI.Divider spacing={0} />
      </View>
    );
  };

  /**
   * LeftContent for ScreenLayout: search bar in the app bar
   */
  const leftContent = (
    <View>
      <UI.TextInput
        type='search'
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder='Search'
      />
    </View>
  );

  /**
   * Empty state for List when no items match query + filters.
   */
  const emptyComponent = (
    <UI.Box align='center' justify='center' style={styles.emptyContainer}>
      <UI.Text variant='titleSmall'>No results</UI.Text>
      <UI.Text variant='bodySmall' color='label'>
        Try changing your search or clearing filters.
      </UI.Text>
    </UI.Box>
  );

  return (
    <Screen.ScreenLayout LeftContent={leftContent} showTitle={false}>
      {/* Main content area – List is primary, no outer scroll to avoid nested scrolling */}
      <UI.VerticalLayout gap={1}>
        {/* Intro / header */}
        <UI.Box>
          <UI.Text variant='titleLarge'>List</UI.Text>
          <UI.Text variant='bodySmall' color='label'>
            List renders large data sets with built-in search and filters. You
            define the row layout, and List handles matching and efficient rendering
            with FlashList or FlatList.
          </UI.Text>
        </UI.Box>

        {/* Filter (collapsible) */}
        <UI.CollapsibleContainer text='Filter' icon='tune'>
          <UI.Box mt={1}>
            <UI.Text variant='bodySmall' color='label'>
              This example filters by{' '}
              <UI.Text variant='bodySmall' color='label'>
                material
              </UI.Text>
              . Selected chip values are stored in{' '}
              <UI.Text variant='bodySmall' color='label'>
                ListFilterMap
              </UI.Text>{' '}
              and applied before rendering.
            </UI.Text>

            <UI.HorizontalLayout constraint='scroll' flex={0}>
              <UI.ChipOptions
                schema={matChipsSchema}
                onSelected={onChipsSelected}
                style={{ width: 700 }}
              />
            </UI.HorizontalLayout>
          </UI.Box>
        </UI.CollapsibleContainer>

        {/* List implementation (collapsible) */}
        <UI.CollapsibleContainer
          text='List implementation'
          icon='swap-vertical'
        >
          <UI.Box mt={1}>
            <UI.Text variant='bodySmall' color='label'>
              Choose which list engine to use:
            </UI.Text>
            <UI.Text variant='bodySmall' color='label'>
              •{' '}
              <UI.Text variant='bodySmall' color='label'>
                FlashList
              </UI.Text>{' '}
              – optimized for large, high-performance lists (default).
            </UI.Text>
            <UI.Text variant='bodySmall' color='label'>
              •{' '}
              <UI.Text variant='bodySmall' color='label'>
                FlatList
              </UI.Text>{' '}
              – standard React Native list component.
            </UI.Text>

            <UI.RadioGroup
              options={ListTypes}
              value={listType}
              onValueChange={(s: string) =>
                setListType(s as UI.ListImplementationType)
              }
            />
          </UI.Box>
        </UI.CollapsibleContainer>

        {/* List itself */}
        <UI.Box flex={1}>
          <UI.List
            dataArr={productList}
            query={searchQuery}
            filterMap={filterMap}
            renderItem={renderItem}
            listImplementationType={listType}
            emptyComponent={emptyComponent}
          />
        </UI.Box>
      </UI.VerticalLayout>
    </Screen.ScreenLayout>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    paddingHorizontal: padSize,
    paddingVertical: padSize,
  },
  imageContainer: {
    width: 90,
    height: 90,
    borderRadius: padSize,
    overflow: 'hidden',
    marginRight: padSize,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  pill: {
    borderRadius: padSize,
    paddingHorizontal: padSize,
    paddingVertical: padSize / 3,
  },
  description: {
    marginTop: padSize / 2,
  },
  emptyContainer: {
    paddingVertical: padSize * 2,
  },
});

export default memo(ListScreen);
