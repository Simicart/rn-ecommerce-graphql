import React from 'react';
import {View, Text, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {myName, toUpper, toLower} from '../Logic/store/demo/NameSlice/DemoSlice.js';

function SimicartComponentUsingRedux() {
  const currentCount = useSelector(myName);
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(toUpper());
  };
  const handleDecrease = () => {
    dispatch(toLower());
  };

  return (
      <View>
        <View style={{height: 20}}/>
        <Text>{`Current name: ${currentCount}`}</Text>
        <Button title={'To Upper'} onPress={handleIncrease}/>
        <Button title={'To Lower'} onPress={handleDecrease}/>
        <View style={{height: 20}}/>
      </View>
  );
}

export default SimicartComponentUsingRedux;
