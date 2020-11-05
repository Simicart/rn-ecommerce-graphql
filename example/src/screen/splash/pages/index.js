
import React from 'react';
import { View, Text } from 'react-native';
import { useAppContext } from 'simicart';

function SplashPage() {
    const [appState, appApi] = useAppContext();
    const { switchStack } = appApi;
    setTimeout(function () {
        switchStack('app');
    }, 1000);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 33 }}>Welcome to SimiCart</Text>
        </View>
    );
}

export default SplashPage;
