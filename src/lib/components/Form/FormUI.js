import React, {useCallback} from 'react';
import {Text, View} from 'react-native';
import {BasicText} from './BasicComponents';
import type {strictFieldData} from './data.flow.js';
import {FormikProps, FormikValues} from 'formik';
import {fieldType} from './fieldType.js';

const _RenderFormUIClass = (props: RenderProps) => {
	const {data, formik, isFocused, handleInputChange} = props;
	const {
		key,
		isDisabled,
		isRequired,
		type,
		iconName,
		initialValue,
		isPickerEditable,
		display,
		needWarning,
		params,
		picker_data,
		pickerKeyForDisplay,
		pickerKeyForSave,
		shouldRenderBorder,
		title,
		CustomElement,
		optOut,
	} = data;

	const handleSubmitInput = useCallback(() => handleInputChange(key), [
		handleInputChange,
		key,
	]);

	// optOut Component doesn't interact with form
	if (optOut) {
		return <CustomElement key={key} data={data} {...params} />;
	}
	// Elements must call handleSubmitInput to switch focus to next element.
	// use isFocus prop to manually focus element in component
	// User handle formik
	if (CustomElement) {
		return (
			<CustomElement
				key={key}
				formik={formik}
				data={data}
				isFocused={isFocused}
				onSubmitEditing={handleSubmitInput}
				onChangeText={formik.handleChange(key)}
				onBlur={formik.handleBlur(key)}
				value={formik.values[key]}
				{...params}
			/>
		);
	}

	switch (type) {
		case fieldType.TEXT:
		case fieldType.EMAIL:
		case fieldType.PASSWORD:
		case fieldType.PHONE:
		case fieldType.ZIP_CODE:
			return (
				<BasicText
					key={key}
					inputType={type}
					title={title}
					editable={!isDisabled}
					onChangeText={formik.handleChange(key)}
					onBlur={formik.handleBlur(key)}
					value={formik.values[key]}
					returnKeyType={'next'}
					onSubmitEditing={handleSubmitInput}
					isFocused={isFocused}
					touched={formik.touched[key]}
					error={formik.errors[key]}
					params={params}
					isRequired={isRequired}
				/>
			);
		// case fieldType.RATING:
		// 	return (
		// 		<Ratings
		// 			key={key}
		// 			submitKey={key}
		// 			title={title}
		// 			setFieldValue={formik.setFieldValue}
		// 			params={params}
		// 		/>
		// 	);
		// case fieldType.TEXTAREA:
		// 	return (
		// 		<TextArea
		// 			key={key}
		// 			inputType={type}
		// 			title={title}
		// 			editable={!isDisabled}
		// 			onChangeText={formik.handleChange(key)}
		// 			onBlur={formik.handleBlur(key)}
		// 			value={formik.values[key]}
		// 			error={formik.errors[key]}
		// 			returnKeyType={'next'}
		// 			onSubmitEditing={handleSubmitInput}
		// 			isFocused={isFocused}
		// 			params={params}
		// 		/>
		// 	);
		// case fieldType.CHECKBOX:
		// 	return (
		// 		<MagicCheckBox
		// 			handleChange={formik.handleChange(key)}
		// 			value={formik.values[key]}
		// 			title={title}
		// 		/>
		// 	);
		// case fieldType.WHOLE_PAGE_PICKER:
		// 	return (
		// 		<NewWholePagePicker
		// 			key={key}
		// 			inputType={type}
		// 			title={title}
		// 			editable={!isDisabled}
		// 			onChangeText={formik.handleChange(key)}
		// 			onBlur={formik.handleBlur(key)}
		// 			value={formik.values[key]}
		// 			returnKeyType={'next'}
		// 			onSubmitEditing={handleSubmitInput}
		// 			isFocused={isFocused}
		// 			touched={formik.touched[key]}
		// 			error={formik.errors[key]}
		// 			params={params}
		// 			picker_data={picker_data}
		// 			pickerKeyForDisplay={pickerKeyForDisplay}
		// 			pickerKeyForSave={pickerKeyForSave}
		// 			isRequired={isRequired}
		// 		/>
		// 	);
		//
		// case fieldType.COUNTRY_STATE:
		// 	return (
		// 		<CountryStatePicker
		// 			key={key}
		// 			inputType={type}
		// 			title={title}
		// 			editable={!isDisabled}
		// 			onChangeText={formik.handleChange(key)}
		// 			onBlur={formik.handleBlur(key)}
		// 			value={formik.values[key]}
		// 			returnKeyType={'next'}
		// 			onSubmitEditing={handleSubmitInput}
		// 			isFocused={isFocused}
		// 			touched={formik.touched[key]}
		// 			error={formik.errors[key]}
		// 			params={params}
		// 			picker_data={picker_data}
		// 			pickerKeyForDisplay={pickerKeyForDisplay}
		// 			pickerKeyForSave={pickerKeyForSave}
		// 			isRequired={isRequired}
		// 		/>
		// 	);
		//
		// case fieldType.DATE_PICKER:
		// 	return (
		// 		<SmallDateTimePicker
		// 			value={formik.values[key]}
		// 			title={title}
		// 			handleChange={formik.handleChange(key)}
		// 			isRequired={isRequired}
		// 			isFocused={isFocused}
		// 		/>
		// 	);
		//
		default:
			console.warn(`Not implemented ${type} in FormUI`);
	}
};

type RenderProps = {
	data: strictFieldData,
	formik: FormikProps<FormikValues>,
	isFocused: boolean,
	handleInputChange: (key: string) => any,
};

export const FormUI = React.memo(_RenderFormUIClass);
