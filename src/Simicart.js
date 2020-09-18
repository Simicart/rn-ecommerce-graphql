'use strict';

import React, {Component} from 'react';
import {
  View,
  Text,
} from 'react-native';
import {Provider} from 'react-redux';
import store from '../Logic/store/demo/NameSlice/store.js';
// import SimicartCounterComponentUsingRedux from './SimicartCounterComponentUsingRedux.js';
import SimicartComponentUsingRedux from './SimicartComponentUsingRedux.js';

export default class Simicart extends Component {
  render() {
    return (
        <Provider store={store}>
          <View>
            <Text>Hello</Text>
            <Text>
              {`This component is rendered correctly at ${Date(Date.now()).toString()}`}
            </Text>
            {/*<SimicartCounterComponentUsingRedux/>*/}
            <SimicartComponentUsingRedux/>
          </View>
        </Provider>
    );
  }
}
