import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {Dimensions} from 'react-native';
import {ThemeContext} from 'react-native-elements';
import {makeId} from '../../../../util/makeRandomString.js';

const windowWidth = Dimensions.get('window').width;

function Product_Placeholder(props) {
  const {data, width_percent = 0.5} = props;
  const { theme } = useContext(ThemeContext);

  return (
      <View style={{
        width: windowWidth * (width_percent - 0.05),
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 8,
        marginTop: 8,
        height: 263,

        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0.5,
        },
        shadowOpacity: 0.20,
        shadowRadius: 0.41,
        elevation: 1,
      }}>
        <View style={{
          height: 171,
          width: windowWidth * (width_percent - 0.115),
          marginTop: 10,
          marginBottom: 10,
          marginLeft: 10,
          marginRight: 10,
          borderColor: 'red',
          borderWidth: 0.5
        }}/>
        <Text style={{
          marginTop: 8,
          marginLeft: 10,
          marginBottom: 8,
          fontSize: 14,
          lineHeight: 16,
          fontWeight: 'bold'
        }}>{makeId(5)}</Text>
        <Text
            style={{
              marginLeft: 10,
              marginBottom: 6,
              fontSize: 14,
              lineHeight: 16,
            }}
        >{makeId(5)}</Text>

        <Text style={{
          marginLeft: 10,
          marginBottom: 10,
          fontSize: 14,
          lineHeight: 16,
        }}
        >{makeId(5)}</Text>

      </View>
  );
}

export {Product_Placeholder};
