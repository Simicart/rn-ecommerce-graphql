import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

function HomePage(props) {
    const { navigation } = props;
    return (
        <View style={{ flex: 1, padding: 20, paddingTop: 50}}>
            <Text>Home Page</Text>
            <TouchableOpacity style={{ marginTop: 40 }}
                onPress={() => {
                    navigation.navigate('Category')
                }}
            >
                <Text style={{color:'green'}}>Open Category Page</Text>
            </TouchableOpacity>
        </View>
    );
}

export default HomePage;
