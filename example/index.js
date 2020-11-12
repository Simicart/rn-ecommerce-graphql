//https://reactnavigation.org/docs/getting-started/
import 'react-native-gesture-handler';

import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppComposite } from 'simicart';
import AppRouter from './route/navigation';

import { name as appName } from './app.json';
import counterSlice from './src/customReducer/counterSlice';
import Config from './src/Helper/config';

function Index() {
  return (
    <NavigationContainer>
      <AppComposite customReducer={counterSlice} apiBase={Config.merchant_url}>
        <AppRouter />
      </AppComposite>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Index);
