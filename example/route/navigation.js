import React, { Component } from "react";
// import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { I18nManager, Platform, Dimensions } from 'react-native';
// import Splash from '@screens/splash';
// import MainTain from '@screens/splash/pages/maintain';
// import Home from '@screens/home/pages';
// import Category from '@screens/catalog/pages/categories/catagories';
// import DrawerContent from '../src/core/base/components/drawer';
import AppStateDisplay from '../src/test_component/appStateDisplay';

import { useAppContext } from 'simicart';
import StackRoute from './stack'

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

function AppStack() {
    const [appState] = useAppContext();


    function AppStack() {
        return (
          <StackRoute/>
        );
    }
    const appDrawer = (
        <Drawer.Navigator
            // drawerContent={() => <DrawerContent />}
            drawerPosition={Platform.OS === 'android' ? (I18nManager.isRTL ? 'right' : 'left') : ''}
            drawerWidth={Dimensions.get('screen').width * 3 / 5 > 280 ? 280 : Dimensions.get('screen').width * 2 / 3}>
            <Drawer.Screen name="Root" component={AppStack} />
        </Drawer.Navigator>
    );

    const splashStack = (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={AppStateDisplay} />
        </Stack.Navigator>
    );

    // const maintainStack = (
    //     <Stack.Navigator screenOptions={{ headerShown: false }}>
    //         <Stack.Screen name="MainTain" component={Maintain} />
    //     </Stack.Navigator>
    // );

    const stack = appState.stack
    console.log(stack)
    let navigatorSelection = null;
    switch (stack) {
        case 'splash':
            navigatorSelection = splashStack;
            break;
        case 'maintain':
            // navigatorSelection = maintainStack;
            break;
        default:
            navigatorSelection = appDrawer;
            break;
    }

    return (navigatorSelection);
}

export default AppStack;

