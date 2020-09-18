import React from 'react';
import {View, Text, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  decrement,
  increment,
  incrementAsync,
  selectCount,
} from '../Logic/store/demo/CounterSlice/counterSlice.js';

function SimicartCounterComponentUsingRedux() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  const increase = () => {
    dispatch(increment());
  };
  const decrease = () => {
    dispatch(decrement());
  };
  const increaseAfter2 = () => {
    dispatch(incrementAsync(1));
  };

  return (
      <View>
        <View style={{height: 20}}/>
        <Text>{`Counter: ${count}`}</Text>
        <Button title={'+'} onPress={increase}/>
        <Button title={'-'} onPress={decrease}/>
        <Button title={'+ after 2'} onPress={increaseAfter2}/>
        <View style={{height: 20}}/>
      </View>
  );
}

export default SimicartCounterComponentUsingRedux;
