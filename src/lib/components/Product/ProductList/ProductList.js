import React, {useContext, useState} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import {SpaceBlock} from '../../others/spaceBlock.js';
import {Product_Placeholder} from './placeholder/product_Placeholder.js';
import {generateFilterLabelName} from './ApplyingLabel/ProductFilterLabel.js';
import {generateSortLabelName} from './ApplyingLabel/productSortLabel.js';
import {getFilteredData} from './logic/filter.js';
import {getSortedData} from './logic/sort.js';
import {AutoTrimFlatRemovableGreyBadge} from '../RoundSmallGreyBadge/autoTrimFlatRemovableGreyBadge.js';
import {filterArray, sortArray} from './layers.flow.js';

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
  const { theme } = useContext(ThemeContext);


  const handleSort = (sortLayers: sortArray) => {
    setSortLayers(sortLayers);
  };
  const handleFilter = (filterLayers: filterArray) => {
    setFilterLayers(filterLayers);
  };
  const cleanup = () => {
    setSortLayers([]);
    setFilterLayers([]);
  };

  const renderLabels = (sortLayers: sortArray, filterLayers: filterArray) => {
    const labelList = generateSortLabelName(sortLayers)
        .concat(generateFilterLabelName(filterLayers));

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

  const ProductListHeader = () => {
    return (
        <View>
          <SpaceBlock value={62}/>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginBottom: 20,
            marginLeft: 10,
          }}>
            {renderLabels(sortLayers, filterLayers)}

            <TouchableOpacity style={{marginLeft: 5, marginTop: 7}}
                              onPress={cleanup}
            >
              {(sortLayers.length + filterLayers.length) > 0 &&
               <Text style={{fontSize: 14, lineHeight: 16}}>Clean up</Text>
              }
              <View/>
            </TouchableOpacity>
          </View>
          <SpaceBlock value={10}/>
        </View>
    );
  };

  const ProductListFooter = () => {
    return (
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: theme.color.primary,
          height: 45,
          paddingLeft: 8,
        }}>
          {/*TODO: add nav to this*/}
          <TouchableOpacity style={{flex: 8, marginTop: 11}}
                            onPress={() => {
                            }}>
            <Text style={{color: theme.color.on.primary}}>☰</Text>
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
            <Text style={{color: theme.color.on.primary}}>z</Text>
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
            <Text style={{color: theme.color.on.primary}}>⇵</Text>
          </TouchableOpacity>

        </View>
    );
  };

  // TODO: memo labels, remove inline style
  return (
      <View style={{flex: 1}}>
        <ProductListHeader/>
        <FlatList data={getSortedData(getFilteredData(productData, filterLayers), sortLayers)}
                  renderItem={(value) => {
                    return (
                        <Product_Placeholder data={value}/>

                    );
                  }}
                  keyExtractor={(item) => md5(JSON.stringify(item))}
                  numColumns={2}
                  initialNumToRender={15}
        />
        <ProductListFooter/>
      </View>
  );
}


export {ProductList};
