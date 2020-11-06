import React, {useMemo, useState} from 'react';
import {ScrollView, Text, View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {useCatalogContext} from '../../..';
import {SpaceBlock} from '../others/spaceBlock.js';

function CategoryList(props) {
  const {name, data, handleChangePage} = props;

  return (
      <View>
        <Text style={styles.categoryTitle}>{name ?? 'Such empty'}</Text>

        <ScrollView style={styles.subCategoriesOutline}>
          {data.map((x, index) => {
            return (
                <TouchableOpacity key={index}
                                  style={styles.subCategoryContainer}
                                  onPress={() => handleChangePage(x.id)}
                >
                  <Text style={styles.subCategoryText}
                  >{`${x.name}`}</Text>
                  <Text style={styles.arrowIcon}>{'>'}</Text>
                </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
  );
}

function CategoryDumpComponent(props) {
  const [catalogState,] = useCatalogContext();
  const {rootCategoryId, categories} = catalogState;

  const {id = rootCategoryId} = props;

  const renderLayer = categories[id];
  const data = renderLayer.children.map(x => {
    return {
      id: x,
      name: categories[x].name
    };
  });

  if (renderLayer) {
    return (
        <CategoryList name={renderLayer.name}
                      data={data}
                      handleChangePage={(id: string) => {
                      }}
        />
    );
  } else {
    return (
        <CategoryList name={renderLayer.name}
                      data={[]}
                      handleChangePage={() => {
                      }}
        />
    );
  }

  // no children ?? maybe last layer before real products

}

function CategoryWrapper(props) {
  const [catalogState] = useCatalogContext();
  const {categories, rootCategoryId} = catalogState;

  const [currentID, setCurrentID] = useState(props.id || rootCategoryId);

  const getDisplayData = (id: string): Array<> => {
    const {children} = categories[id] ?? {};

    if (!children) {
      console.info('no children. This should jump to Product list?');
      //TODO: In this case, switch to Product list
      return [];
    } else {
      return children
          //         get children data
          .map(children_id => {
            return categories[children_id];
          })
          // remove children with no data
          .filter(x => !!x);
    }

  };
  const name: string = categories[currentID]?.name ?? 'Such empty';

  const renderData = useMemo(() => getDisplayData(currentID),
      [currentID, categories, rootCategoryId, name],
  );

  return (
      <ScrollView style={styles.categoryOutline}>
        <CategoryList name={name} data={renderData} handleChangePage={setCurrentID}/>
        <SpaceBlock/>
        <Text>{JSON.stringify({})}</Text>
        <Button title={'RESET'} onPress={() => setCurrentID(rootCategoryId)}/>
      </ScrollView>
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

export default CategoryWrapper;

export {CategoryList, CategoryWrapper, CategoryDumpComponent};


