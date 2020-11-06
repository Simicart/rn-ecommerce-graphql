import React, {useMemo, useState} from 'react';
import {ScrollView, Text, Vibration, View} from 'react-native';
import {Product_Placeholder} from './placeholder/product_Placeholder.js';
import {useCatalogContext} from '../../../..';
import {Button} from 'react-native-elements';
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
                <AutoTrimFlatRemovableGreyBadge title={label}/>
            );
          })}
        </View>
    );
  };

  // TODO: memo labels, remove inline style
  return (
      <View style={{flex: 1}}>
        {Platform.OS === 'ios' ? <View style={{height: 50}}/> : null}
        <ScrollView>
          <Button title={'Reset me'} onPress={() => {
            console.log('Filtering');
            handleFilter([]);
            handleSort([]);
          }}/>

          {renderLabels(filterLayers, sortLayers)}

          <View style={{height: 10}}/>

          {getSortedData(getFilteredData(productData, filterLayers), sortLayers).map((value) => {
            return (
                <Product_Placeholder key={md5(JSON.stringify(value))} data={value}/>
            );
          })}
        </ScrollView>

        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Button title={'Sort me'}
                  style={{flex: 1}}
                  onPress={() => {
                    handleSort([
                      {
                        name: 'name',
                        type: 'ascending',
                      },
                    ]);
                  }}/>

          <View style={{height: 20}}/>

          <Button title={'Filter me'}
                  style={{flex: 1}}
                  onPress={() => {
                    console.log('Filtering');
                    handleFilter([
                      {
                        name: 'name',
                        filterValue: 'd',
                        type: 'greater_equal',
                      },
                    ]);
                  }}/>
        </View>
      </View>
  );
}

export {ProductList};
