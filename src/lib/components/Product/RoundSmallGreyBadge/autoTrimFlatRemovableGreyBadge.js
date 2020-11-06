import React from 'react';
import {View} from 'react-native';
import {FlatRemovableGreyBadge} from './flatRemovableGreyBadge.js';

import {TRIM_TEXT_LIMIT} from '../ProductList/ProductList.env.js';

function AutoTrimFlatRemovableGreyBadge(props) {
  const limit = props.limit ?? TRIM_TEXT_LIMIT;
  const displayTitle = props.title.length > limit
                       ? props.title.slice(0, limit) + '...'
                       : props.title;

  return (
      <View style={{marginRight: 2}}>
        <FlatRemovableGreyBadge {...props} title={displayTitle} width={120}/>
      </View>
  );
}

export {AutoTrimFlatRemovableGreyBadge};
