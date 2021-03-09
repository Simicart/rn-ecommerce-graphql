import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const activeTintColor = '#749867'
const inactiveTintColor = 'gray'

function TabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ 
      flexDirection: 'row',
      backgroundColor:"#DEDEDE",
      paddingTop: 5,
      paddingBottom: 5,
      justifyContent:"center",
      alignItems:"center" 
    }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        let cartCounter
        if(route.name === 'Cart') {
          const count = 3;
          cartCounter = count ? 
            <View 
              style={{
                position: 'absolute', 
                backgroundColor: '#D23B1F',
                zIndex: 1,
                padding: 1,
                height: 11,
                width: 11,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                left: 37
              }}
            >
              <Text style={{fontSize: 9, color: 'white'}}>{count}</Text>
            </View>
            : null
        }

        let iconName;
        if (route.name === 'App') {
          iconName = isFocused ? 'home-sharp' : 'home-outline';
        } else if (route.name === 'Cart') {
          iconName = isFocused ? 'cart' : 'cart-outline';
        } else if (route.name === 'Catalog') {
          iconName = isFocused ? 'list' : 'list-outline';
        } else if (route.name === 'User') {
          iconName = isFocused ? 'person' : 'person-outline';
        } else if (route.name === 'Checkout') {
          iconName = isFocused ? 'card' : 'card-outline';
        } 

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems:"center" }}
          >
            {cartCounter}
            <Ionicons name={iconName} size={20} color={isFocused ? activeTintColor : inactiveTintColor}/>
            <Text style={{ color: isFocused ? activeTintColor : inactiveTintColor }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default TabBar