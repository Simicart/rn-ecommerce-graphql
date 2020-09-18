/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import Simicart from 'simicart';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View>
          <Text>{`This component is rendered correctly at ${Date(Date.now()).toString()}`}</Text>
          <Simicart/>
        </View>
    );
  }
}

export default App;
