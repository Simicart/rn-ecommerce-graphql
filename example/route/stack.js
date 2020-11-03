import React from 'react'
import CartStateDisplay from "../src/test_component/cartStateDisplay";
import CatalogStateDisplay from '../src/test_component/catalogStateDisplay'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function StackRoute() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Cart" component={CartStateDisplay} />
            <Stack.Screen name="Category" component={CatalogStateDisplay} />
        </Stack.Navigator>
    );
}