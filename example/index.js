//https://reactnavigation.org/docs/getting-started/
import 'react-native-gesture-handler';

import React from 'react';
import { AppRegistry, ScrollView, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AppComposite } from 'simicart';
import AppRouter from './route/navigation';

import { name as appName } from './app.json';
import App from './src/App';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppStateDisplay from './src/test_component/appStateDisplay.js';
import CatalogStateDisplay from './src/test_component/catalogStateDisplay.js';
import CartStateDisplay from './src/test_component/cartStateDisplay';
import UserStateDisplay from './src/test_component/userStateDisplay.js';
import CheckoutStateDisplay from './src/test_component/checkoutStateDisplay.js';
import TabBar from './src/components/TabBar/tabBar.js'

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator()

function Index() {
  return (
    <NavigationContainer>
      <AppComposite>
        <Tab.Navigator tabBar={props => <TabBar {...props}/>}>
          <Tab.Screen name={'Cart'} component={CartStateDisplay}/>
          <Tab.Screen name={'App'} component={AppStateDisplay} options={{tabBarLabel: 'Home'}}/>
          <Tab.Screen name={'Catalog'} component={CatalogStateDisplay} />
          <Tab.Screen name={'User'} component={UserStateDisplay} options={{tabBarLabel: 'Chau Bui'}}/>
          <Tab.Screen name={'Checkout'} component={CheckoutStateDisplay} />
        </Tab.Navigator>
      </AppComposite>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Index);

