import React from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { useCatalogContext } from '../../lib/context/catalog.js';
import { useCategory } from '../../talon/category/useCategory.js';
import categoryQuery from './categoryQuery.js';

function CategoryPage(props) {
  const CATEGORY_QUERY = categoryQuery();
  const categoryId = '2';
  const [catalogState, catalogApi] = useCatalogContext();

  const { categories } = catalogState;
  const { updateCategories } = catalogApi;

  const talonProps = useCategory({
    categoryId,
    query: CATEGORY_QUERY,
    updateCategories: updateCategories,
  });

  const { error, loading } = talonProps;

  // Potential error when query return
  // but not updated to redux yet.
  // use data with care.
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, marginTop: 40 }}>
      <Text style={{ fontSize: 16, margin: 10 }}>All Category</Text>

      {categories &&
        categories['2'] &&
        categories['2'].children.map((x) => {
          return <Text key={x}>{categories[x].name}</Text>;
        })}
    </ScrollView>
  );
}

export default CategoryPage;
