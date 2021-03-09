import React, {useMemo, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {useCatalogContext} from '../../..';
import {useCategory} from '../../../talon/category/useCategory.js';
import categoryQuery from '../../../ui/category/categoryQuery.js';

function CategoryDumpComponent(props) {
  const {navigation} = props;

  const [catalogState, catalogApi] = useCatalogContext();
  const {categories, rootCategoryId} = catalogState;

  const CATEGORY_QUERY = categoryQuery();

  const catalogId = (props?.route?.params?.id) ?? rootCategoryId;
  const renderLayer = categories[catalogId];

  const {updateCategories} = catalogApi;

  const talonProps = useCategory({
    categoryId: catalogId,
    query: CATEGORY_QUERY,
    updateCategories: updateCategories,
  });

  const {error, loading} = talonProps;

  if (loading) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator/>
        </View>
    );
  }

  if (error) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          < Text>Error</Text>
        </View>
    );
  }

  function handleChangePage(id: string) {
    const isRenderProduct = categories[id].children.length === 0;
    console.log(isRenderProduct);

    if (!isRenderProduct) {
      navigation.navigate('Categories', {id: id});
    } else {
      console.log('now render product');
      navigation.navigate('ProductList');
    }
  }

  const data = renderLayer?.children ?
      renderLayer.children.map(x => {
        return {
          id: x,
          name: categories[x].name,
        };
      })
      : [];

  const name = renderLayer?.name ?? 'Such empty';

  // have info, and have children ---> catalog Page. Else jump to product
  if (renderLayer && data.length > 0) {
    return (
        <ScrollView style={styles.categoryOutline}>
          <Text style={styles.categoryTitle}>{name}</Text>

          <View style={styles.subCategoriesOutline}>
            {data.map((x, index) => {
              return (
                  <TouchableOpacity key={index}
                                    style={styles.subCategoryContainer}
                                    onPress={() => {
                                      handleChangePage(x.id);
                                    }}
                  >
                    <Text style={styles.subCategoryText}
                    >{`${x.name}`}</Text>
                    <Text style={styles.arrowIcon}>{'>'}</Text>
                  </TouchableOpacity>
              );
            })}
          </View>
          <Text>{JSON.stringify(Object.keys(navigation), null, 2)}</Text>
          {/*<Button title={'back'} onPress={()=> navigation.goBack()}/>*/}
        </ScrollView>
    );
  }
  return (
      <Text>Default return</Text>
  );
}

const styles = StyleSheet.create({
  categoryTitle: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: 0,
  },
  categoryOutline: {
    marginTop: 63,
    marginLeft: 8,
    marginRight: 8,
  },
  subCategoriesOutline: {
    marginTop: 12,
  },
  subCategoryContainer: {
    marginTop: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#cdc9c3',
    display: 'flex',
    flexDirection: 'row',
  },
  subCategoryText: {
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 16,
    marginTop: 3,
    marginBottom: 14,
    flex: 33,
  },
  arrowIcon: {
    flex: 3,
    fontSize: 24,
    letterSpacing: 0,
    lineHeight: 23,
    color: '#E0E0E0',
  },

});

export default CategoryDumpComponent;

export {CategoryDumpComponent};


