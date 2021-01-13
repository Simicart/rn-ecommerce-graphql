import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {Input} from 'react-native-elements';
import {isDeeplyEqual} from "../../../util/isObjectDeeplyEqual";
import type {looseFieldData} from '../data.flow.js';
import {fieldType} from '../fieldType.js';

const _BasicText = (props: looseFieldData) => {
  const [inputRef, setInputRef] = useState(null);
  const {
    onBlur,
    onChangeText,
    value,
    title,
    returnKeyType,
    onSubmitEditing,
    editable,
    isFocused,
    inputType,
    params,
    touched,
    onFocus,
    isRequired,
  } = props;

  const {formContainer = null} = params ?? {};

  const resolveInputType = useCallback((type: string): string => {
    switch (type) {
      case fieldType.TEXT:
        return 'default';
      case fieldType.EMAIL:
        return 'email-address';
      case fieldType.PHONE:
        return 'number-pad';
      default:
        return 'default';
    }
  }, []);

  useEffect(() => {
    if (isFocused && inputRef && editable) {
      inputRef.focus();
      if (onFocus) {
        onFocus();
      }
    }
  }, [isFocused]);

  return (
      <View>
        <Input
            ref={(input) => setInputRef(input)}
            onBlur={onBlur}
            onSubmitEditing={onSubmitEditing}
            onChangeText={onChangeText}
            value={value}
            label={isRequired ? title + ' *' : title}
            returnKeyType={returnKeyType}
            keyboardType={resolveInputType(inputType)}
            secureTextEntry={inputType === fieldType.PASSWORD}
            errorStyle={{color: 'red', marginLeft: 0}}
            disabled={!editable}
            errorMessage={touched ? props.error ?? '' : ''}
            {...params}
        />
      </View>
  );
};

export const BasicText = React.memo(_BasicText, (prevProps, nextProps) => {
  return isDeeplyEqual(prevProps, nextProps);
});
