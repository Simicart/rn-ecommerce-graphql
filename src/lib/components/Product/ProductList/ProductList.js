import React, {useMemo, useState} from 'react';
import {
  FlatList,
  ScrollView,
  SectionList,
  Text,
  TouchableOpacity,
  Vibration,
  View
} from 'react-native';
import {SpaceBlock} from '../../others/spaceBlock.js';
import {Product_Placeholder} from './placeholder/product_Placeholder.js';

import {generateFilterLabelName} from './ApplyingLabel/ProductFilterLabel.js';
import {generateSortLabelName} from './ApplyingLabel/productSortLabel.js';
import {filterArray, sortArray} from './layers.flow.js';
import {getFilteredData} from './logic/filter.js';
import {getSortedData} from './logic/sort.js';
import {AutoTrimFlatRemovableGreyBadge} from '../RoundSmallGreyBadge/autoTrimFlatRemovableGreyBadge.js';

const md5 = require('md5');

const fakeData = [...Array(30).keys()].map((x, index) => {
  return {
    name: md5(x.toString() + index),
    size: x % 4 + 1,
    binary: (x % 2 === 0) ? 'up' : 'down',
  };
});

function ProductList(props) {

  const {productData = fakeData} = props;
  const [sortLayers, setSortLayers] = useState([]);
  const [filterLayers, setFilterLayers] = useState([]);

  const handleSort = (sortLayers: sortArray) => {
    setSortLayers(sortLayers);
  };

  const handleFilter = (filterLayers: filterArray) => {
    setFilterLayers(filterLayers);
  };

  const renderLabels = (sortLayers: sortArray, filterLayers: filterArray) => {
    const labelList = generateSortLabelName(sortLayers).
        concat(generateFilterLabelName(filterLayers));

    return (
        <View style={{flexDirection: 'row'}}>
          {labelList.map(label => {
            return (
                <AutoTrimFlatRemovableGreyBadge key={md5(label)} title={label}/>
            );
          })}
        </View>
    );
  };

  // TODO: memo labels, remove inline style
  return (
      <View style={{flex:1}}>
        <SpaceBlock value={62}/>

        <View style={{flex:1}}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginBottom: 20,
            marginLeft: 10
          }}>
            {renderLabels(sortLayers, filterLayers)}

            <TouchableOpacity style={{marginLeft: 5, marginTop: 7}}
                              onPress={() => {
                                handleFilter([]);
                                handleSort([]);
                              }}
            >
              {(sortLayers.length + filterLayers.length) > 0 &&
              <Text style={{fontSize: 14, lineHeight: 16}}>Clean up</Text>
              }
              <View/>
            </TouchableOpacity>
          </View>

          <View style={{height: 10}}/>

          <FlatList data={getSortedData(getFilteredData(productData, filterLayers), sortLayers)}
                    renderItem={(value) => {
                      return (
                          <Product_Placeholder data={value}/>
                      );
                    }}
                    keyExtractor={(item) => md5(JSON.stringify(item))}
                    numColumns={2}
          />

          {/*<Button title={'Reset me'} onPress={() => {*/}
          {/*  console.log('Filtering');*/}
          {/*  handleFilter([]);*/}
          {/*  handleSort([]);*/}
          {/*}}/>*/}


          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#BDBDBD80',
            height: 45,
            paddingLeft: 8,

          }}>
            <TouchableOpacity style={{flex: 8, marginTop: 11}}
                              onPress={() => {
                              }}>
              <Text>☰</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{flex: 8, marginTop: 11}}
                              onPress={() => {
                                console.log('Filtering');
                                handleFilter([
                                  {
                                    name: 'name',
                                    filterValue: 'd',
                                    type: 'greater_equal',
                                  },
                                ]);
                              }}>
              <Text>z</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{flex: 1, marginTop: 11}}
                              onPress={() => {
                                handleSort([
                                  {
                                    name: 'name',
                                    type: 'ascending',
                                  },
                                ]);
                              }}>
              <Text>⇵</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
  );
}

export {ProductList};
