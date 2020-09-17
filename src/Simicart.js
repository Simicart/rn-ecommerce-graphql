'use strict';

import React, {Component} from 'react';
import {
    View,
    NativeModules,
    Text,
} from 'react-native';


const {UIManager} = NativeModules;

export default class Simicart extends Component {
    render() {
        return (
            <View>
                <Text>Hello</Text>
            </View>
        )
    }
}
