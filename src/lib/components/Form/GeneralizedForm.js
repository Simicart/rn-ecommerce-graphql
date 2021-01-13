import {Formik, FormikProps, FormikValues} from 'formik';
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Keyboard, ScrollView, View} from 'react-native';
import md5 from 'md5';

import {DefaultSubmitButton} from './DefaultSubmitButton.js';
import {defaultSubmitHandler} from './defaultSubmitHandler.js';
import {DataNormalizeClass} from './dataNormalizeClass.js';
import {fieldType} from './fieldType.js';
import {FormValidationClass} from './formValidationClass.js';
import {FormUI} from './FormUI.js';
import {isDeeplyEqual} from "../../util/isObjectDeeplyEqual";

import type {looseFieldData, strictFieldData} from './data.flow.js';

type FormProps = {
  shouldUseInitialData?: boolean,
  initialValue?: {},
  formShape: Array<looseFieldData>,
  validationObject?: any,
  shouldDisplayButton?: boolean,
  showSubmitButton?: boolean, // same as above, but added for compatibility
  SubmitButton?: ReactElement<{
    title: string,
    onPress: (submitValues: {}) => any,
    valid: boolean,
  }>,
  scrollViewStyle?: any,
  buttonTitle?: string,

  onSubmit?: (submitValues: {}) => any,
  children?: any,
};

export const GeneralizedForm = (props: FormProps) => {
  const shouldUseInitialData = props?.shouldUseInitialData ?? true;
  const [formShape, setFormShape] = useState(props?.formShape ?? []);

  const [customizedValidationObject, setValidationObject] = useState(
      props?.validationObject ?? null,
  );
  const [focusIndex, setFocusIndex] = useState(null);
  const [initialValue, _] = useState(props.initialValue ?? {});

  const [scrollOffset, setScrollOffset] = useState(0);

  if (!isDeeplyEqual(formShape, props?.formShape ?? [])) {
    setFormShape(props?.formShape ?? []);
  }

  // if (
  // 	!isDeeplyEqual(
  // 		customizedValidationObject,
  // 		props?.validationObject ?? null,
  // 	)
  // ) {
  // 	setValidationObject(props?.validationObject ?? null);
  // }

  const normalizedFieldData = useMemo(
      () => DataNormalizeClass.serialNormalizeFields(formShape),
      [formShape],
  );

  const initialValues = useMemo(
      () =>
          DataNormalizeClass.getInitialValues(
              normalizedFieldData,
              shouldUseInitialData,
              initialValue,
          ),
      [normalizedFieldData, shouldUseInitialData],
  );

  const validationSchema = useMemo(
      () =>
          FormValidationClass.getValidationSchema(
              normalizedFieldData,
              customizedValidationObject,
          ),
      [normalizedFieldData, customizedValidationObject],
  );

  const SubmitButton = props?.SubmitButton ?? DefaultSubmitButton;

  const submitHandler = props?.onSubmit
      ? (value) => {
        const country_state_list = normalizedFieldData.filter(
            (field) => field.type === fieldType.COUNTRY_STATE,
        );
        if (country_state_list.length > 0) {
          props.onSubmit({
            ...value,
            ...JSON.parse(value[country_state_list[0].key]),
          });
        } else {
          props.onSubmit(value);
        }
      }
      : (value) => {
        const country_state_list = normalizedFieldData.filter(
            (field) => field.type === fieldType.COUNTRY_STATE,
        );
        if (country_state_list.length > 0) {
          defaultSubmitHandler({
            ...value,
            ...JSON.parse(value[country_state_list[0].key]),
          });
        } else {
          defaultSubmitHandler(value);
        }
      };

  const _fieldNames = normalizedFieldData
      .filter((field) => field.optOut === false)
      .map((field: strictFieldData) => field.key);

  const [fieldNames, setFieldNames] = useState(_fieldNames);
  if (!isDeeplyEqual(fieldNames, _fieldNames)) {
    setFieldNames(_fieldNames);
  }

  const handleInputChange = useCallback(
      (key: string, scrollValue?: number) => {
        const keyIndex = fieldNames.indexOf(key);
        if (keyIndex !== -1 && keyIndex + 1 < fieldNames.length) {
          setFocusIndex(fieldNames[keyIndex + 1]);
        } else {
          setFocusIndex(null);
          Keyboard.dismiss();
        }
      },
      [fieldNames],
  );

  const changeScrollOffset = useCallback(
      (event) => {
        setScrollOffset(event.nativeEvent.contentOffset.y);
      },
      [setScrollOffset],
  );

  const renderFields = (formik) => {
    return normalizedFieldData.map((data: strictFieldData) => {
      return (
          <FormUI
              data={data}
              formik={formik}
              isFocused={focusIndex === data.key}
              handleInputChange={handleInputChange}
              key={md5(data.key)}
          />
      );
    });
  };

  // useEffect(() => {
  // 		console.info('Form re-rendered');
  // });

  return (
      <Formik
          enableReinitialize={true} validateOnMount={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitHandler}>
        {(formik: FormikProps<FormikValues>) => {
          return (
              <View style={{flex: 1, width: '100%'}}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={
                      props?.scrollViewStyle ?? {paddingBottom: 100}
                    }>
                  {renderFields(formik)}
                  {(props.showSubmitButton ||
                      props.shouldDisplayButton) && (
                      <SubmitButton
                          title={props?.buttonTitle ?? 'Submit'}
                          onPress={formik.handleSubmit}
                          valid={formik.isValid}
                      />
                  )}
                </ScrollView>
                {props.children}
              </View>
          );
        }}
      </Formik>
  );
};
