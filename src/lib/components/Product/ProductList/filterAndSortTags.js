import React, { Fragment } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const FilterAndSortTags = (props) => {
	const { 
		categoryId,
		activeSortLabel,
		setActiveSortLabel,
		setActiveSortOption,
		sortAndFilterProducts,
		filterValues,
		setFilterValues,
		filterFields,
		variablesObject,
		setVariablesObject
	} = props

	const values = []
	filterFields.map(({options}) => {
		const arr = []
		options.map(({value}) => {
			arr.push(value)
		})
		values.push(arr)
	})

	const Tags = 
		<Fragment style={{flexDirection: 'row', flexWrap: 'wrap'}}>
			{filterValues.map((arr, i) => {
				return (
					<Fragment style={{flexDirection: 'row'}}>
						{arr.map(val => {
							const index = values[i].indexOf(val)
							if(index > -1) {
								const tag = filterFields[i].options[index].label
								return (
									<View style={styles.tag}>
										<Text>{tag}</Text>
										<TouchableOpacity 
											style={{padding: 5}}
											onPress={() => {
												let _filterValues = [...filterValues]
												_filterValues[i].splice(filterValues[i].indexOf(val), 1)
												setFilterValues(_filterValues)
												let varObj = {}
												varObj[filterFields[i].attribute_code] = _filterValues[i]
												sortAndFilterProducts({variables: {...variablesObject, ...varObj}})
												setVariablesObject({...variablesObject, ...varObj})
											}}
										>
											<Ionicons name={'close-outline'} size={20} color={'#868686'}/>
										</TouchableOpacity>
									</View>
								)
							}
						})}
					</Fragment>
				)
			})}
			{activeSortLabel.length > 0 && 
				<View style={styles.tag}>
					<Text>{activeSortLabel[0]}</Text>
					<TouchableOpacity 
						style={{padding: 5}}
						onPress={() => {
							let varObj = {...variablesObject}
							delete varObj[activeSortLabel[1]]
							setActiveSortLabel([])
							setActiveSortOption(99)
							sortAndFilterProducts({variables: varObj})
							setVariablesObject(varObj)
						}}
					>
						<Ionicons name={'close-outline'} size={20} color={'#868686'}/>
					</TouchableOpacity>
				</View>
			}
		</Fragment>

	return (
		<View style={{flexDirection: 'row', paddingHorizontal: 10, flexWrap: 'wrap'}}>
			{Tags}
			{(filterValues.flat(1).length > 0 || activeSortLabel.length > 0) && 
				<TouchableOpacity 
					style={{height: 30, justifyContent: 'center'}}
					onPress={() => {
						setFilterValues(Array(filterFields.length).fill([]))
						setActiveSortLabel([])
						setActiveSortOption(99)
						sortAndFilterProducts({variables: {category_id: categoryId}})
					}}
				>
					<Text>Clean all</Text>
				</TouchableOpacity>
			}
		</View>
	)
}

const styles = StyleSheet.create({
	tag: {
		flexDirection: 'row',
		height: 30,
		backgroundColor: '#D8D8D8',
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: 10,
		marginRight: 15,
		marginBottom: 10
	}
})

export default FilterAndSortTags