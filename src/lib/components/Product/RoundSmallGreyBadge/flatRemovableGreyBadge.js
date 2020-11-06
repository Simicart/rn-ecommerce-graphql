import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {StylableButton} from '../../Button';

function FlatRemovableGreyBadge(props) {
  const {width} = props;

  return (
      <View style={[styles.badge, {maxWidth: width}]}>
        <Text style={styles.content}>
          {`${props.title}`}
        </Text>
        <StylableButton style={styles.cut_button} title={'x'}/>
      </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: 'grey',
    paddingTop: 0,
    paddingBottom: 4,
    paddingLeft: 7,
    paddingRight: 7,
    flex: 5,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 20,
    maxWidth: 200,
    marginLeft: 2,
  },
  content: {
    marginTop: 7,
  },
  cut_button: {
    marginLeft: 5,
    flex: 1,
    fontSize: 20,
    borderRadius: 50,

  },
});

export {FlatRemovableGreyBadge};
