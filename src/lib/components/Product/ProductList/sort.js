import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const SortOptions = props => {
	const {
		categoryId,
		sortFields,
		setActiveSortLabel,
		activeSortOption,
		setActiveSortOption,
		setIsSortActive,
		sortAndFilterProducts,
		variablesObject,
		setVariablesObject
	} = props

	const SortField = (i, label, value) => {
		const tagLabel = `${label} (${i%2 ? 'DESC' : 'ASC'})`
		const varObj = new Object
		varObj['category_id'] = categoryId
		varObj[`${value}Dir`] = i%2 ? 'DESC' : 'ASC'

		return (
			<TouchableOpacity 
				key={i}
				activeOpacity={1}
				style={{
					flexDirection: 'row', 
					alignItems: 'center', 
					justifyContent: 'space-between',
					borderBottomWidth: 1,
					borderBottomColor: '#E0E0E0',
					height: 35,
					marginBottom: 16
				}}
				onPress={() => {
					sortAndFilterProducts({variables: {...variablesObject, ...varObj}})
					setVariablesObject({...variablesObject, ...varObj})
					setActiveSortLabel([tagLabel, `${value}Dir`, i%2 ? 'DESC' : 'ASC'])
					setActiveSortOption(i)
					setIsSortActive(false)
				}}
			>
				<View style={{flexDirection: 'row'}}>
					<Text style={{paddingRight: 5}}>{label}</Text> 
					{i % 2 ?
						<Ionicons name={'arrow-down'} size={20}/>
						: <Ionicons name={'arrow-up'} size={20}/>
					}
				</View>
				{activeSortOption === i && <Ionicons name={'checkmark-sharp'} size={20}/>}
			</TouchableOpacity>
		)
	} 

	return (
		<View style={{
			paddingHorizontal: 10,
			marginTop: 74
		}}>
			{sortFields.map(({value, label}, i) => {
				return (
					<React.Fragment>
						{SortField(i*2,label,value)}
						{SortField(i*2+1, label, value)}
					</React.Fragment>
				)
			})}
		</View>
	)
}

export default SortOptions