import React, { useEffect } from 'react'
import { ScrollView, View, TouchableOpacity, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const FilterOptions = props => {
	const {
		categoryId,
		filterFields,
		showFilterOptions,
		activeFilterCategories,
		setActiveFilterCategories,
		filterValues,
		setFilterValues,
		attributeCodes,
		sortAndFilterProducts,
		variablesObject,
		setVariablesObject
	} = props

	let varObj = new Object
	attributeCodes.map((att, i) => varObj[att] = filterValues[i])
	varObj['category_id'] = categoryId
	delete varObj['price']

	useEffect(() => {
		setVariablesObject({...variablesObject, ...varObj})
	}, [filterValues])

	const filterOptions = (
		<View style={{ paddingHorizontal: 10, marginTop: 33 }}>
			{filterFields.map(({label, options}, i) => {
				const optionsBlock = (
					<View>
						{options.map(({label, value, count}, index) => {
							return (
								<TouchableOpacity
									key={index} 
									activeOpacity={1}
									style={{flexDirection: 'row', marginTop: 18, alignItems: 'center'}}
									onPress={() => {
										let allFields = [...filterValues]
										let array = [...filterValues[i]]
										const index = array.indexOf(value)
										if(index < 0) array.push(value)
										else array.splice(index, 1)
										allFields[i] = array;
										setFilterValues(allFields)
									}}
								>
									{filterValues[i].indexOf(value) >= 0 ?
										<Ionicons name={'checkbox'} size={26}/>
										: <Ionicons name={'square-outline'} size={26}/>
									}
									<Text style={{paddingLeft: 10}}>{label}</Text>
									<Text style={{paddingLeft: 5, color: '#888'}}>{`(${count})`}</Text>
								</TouchableOpacity>
							)
						})}
					</View>
				) 
				return (
					<View style={{marginBottom: 18}} key={i}>
						<TouchableOpacity 
							activeOpacity={1}
							style={{
								height: 30,
								borderBottomWidth: 1,
								borderBottomColor: '#E0E0E0',
								flexDirection: 'row',
								justifyContent: 'space-between'
							}}
							onPress={() => {
								let triggeredArray = [...activeFilterCategories]
								triggeredArray.splice(i, 1, !activeFilterCategories[i])
								setActiveFilterCategories(triggeredArray)
							}}
						>
							<Text>{label}</Text>
							{activeFilterCategories[i] ? 
								<Ionicons name={'chevron-down'} color={'#E0E0E0'} size={21}/>
								: <Ionicons name={'chevron-forward'} color={'#E0E0E0'} size={21}/>
							}
						</TouchableOpacity>
						{activeFilterCategories[i] && optionsBlock}
					</View>
				)
			})}
		</View>
	)

	return (
		<View>
			<ScrollView style={{minHeight: '100%'}}>
					<Text style={{
						fontWeight: 'bold', 
						fontSize: 16, 
						paddingTop: 74,
						paddingLeft: 10
					}}>SELECT A FILTER</Text>
					{filterOptions}
					<View style={{height: 45}}/>
			</ScrollView>
			<TouchableOpacity 
				style={{
					position: 'absolute', 
					bottom: 0, 
					width: '100%', 
					height: 45, 
					backgroundColor: '#BDBDBD',
					opacity: 0.8,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center'
				}}
				onPress={() => {
					showFilterOptions()
					sortAndFilterProducts({variables: variablesObject})
				}}
			>
				<View style={{justifyContent: 'center'}}>
					<Text>APPLY</Text>
				</View>
			</TouchableOpacity>
		</View>

	)
}

export default FilterOptions