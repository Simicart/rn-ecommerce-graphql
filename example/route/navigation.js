import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { I18nManager, Platform, Dimensions } from 'react-native';

import { useAppContext, CategoryDumpComponent, CategoryPage } from 'simicart';
import StackRoute from './stack';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

function AppStack() {
  const [appState] = useAppContext();

  function AppStack() {
    let screens = [];
    for (const key in StackRoute) {
      if (StackRoute.hasOwnProperty(key)) {
        const element = StackRoute[key];
        if (element.active) {
          screens.push(
            <Stack.Screen
              name={element.route_name}
              component={element.component}
            />
          );
        }
      }
    }
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {screens}
        {/* <Stack.Screen name="Cart" component={stackRoute.Cart.component} /> */}
      </Stack.Navigator>
    );
  }

  const appDrawer = (
    <Drawer.Navigator
      drawerPosition={
        Platform.OS === 'android' ? (I18nManager.isRTL ? 'right' : 'left') : ''
      }
      drawerWidth={
        (Dimensions.get('screen').width * 3) / 5 > 280
          ? 280
          : (Dimensions.get('screen').width * 2) / 3
      }
    >
      <Drawer.Screen name="Root" component={AppStack} />
      <Drawer.Screen
        name="Category"
        component={StackRoute.category.component}
      />
      <Drawer.Screen name="Categories" component={CategoryDumpComponent} />
    </Drawer.Navigator>
  );

  const splashStack = (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={StackRoute.splash.route_name}
        component={StackRoute.splash.component}
      />
    </Stack.Navigator>
  );

  const stack = appState.stack;
  let navigatorSelection = null;
  switch (stack) {
    case 'splash':
      navigatorSelection = splashStack;
      break;
    default:
      navigatorSelection = appDrawer;
      break;
  }

  return navigatorSelection;
}

export default AppStack;