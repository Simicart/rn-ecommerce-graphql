//https://reactnavigation.org/docs/getting-started/
import 'react-native-gesture-handler';

import React from 'react';
import { AppRegistry, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppComposite } from 'simicart';
import AppRouter from './route/navigation';

import { name as appName } from './app.json';
import counterSlice from './src/customReducer/counterSlice';
import Config from './src/Helper/config';
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";

function Index() {
  const netInfo = useNetInfo();
  return (
    <NavigationContainer>
      <View style={{
      	paddingLeft: 5,
      	backgroundColor: netInfo.isConnected ? 'green' : 'red',
      	paddingBottom: 2,
      	alignItems: 'center'
      }}>
      	<Text style={{color: '#fff', fontSize: 12}}>
      	  {netInfo.isConnected ? 'Connected to the Internet' : 'No internet connection'}
      	</Text>
      </View>
      <AppComposite customReducer={counterSlice} apiBase={Config.merchant_url}>
        <AppRouter />
      </AppComposite>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Index);
