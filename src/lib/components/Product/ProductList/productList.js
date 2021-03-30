import React, { useState, useEffect } from 'react'
import { 
	ScrollView, 
	View, 
	Text, 
	Image, 
	FlatList, 
	TouchableOpacity, 
	SafeAreaView, 
	Checkbox,
	StyleSheet
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Item from './item'
import FilterAndSortTags from './filterAndSortTags'
import FilterOptions from './filter'
import SortOptions from './sort'
import { useProductList } from '../../../../talon/Product/useProductList'

const ProductList = props => {
	const { id } = props.route.params
	const [isGrid, setIsGrid] = useState(true)
	const [isFilterActive, setIsFilterActive] = useState(false)
	const [isSortActive, setIsSortActive] = useState(false)
	const [activeFilterCategories, setActiveFilterCategories] = useState([])
	const [activeSortOption, setActiveSortOption] = useState(99)
	const [activeSortLabel, setActiveSortLabel] = useState([])
	const [filterValues, setFilterValues] = useState([])
	const [attributeCodes, setAttributeCodes] = useState([]) //attribute codes of filter fields
	const [variablesObject, setVariablesObject] = useState({}) //arguments pass to sortAndFilterProducts function

	const { 
		sortAndFilterProducts, 
		productList,
		sortFields,
		filterFields, 
		loading, 
		derivedErrorMessage 
	} = useProductList(id)

	useEffect(() => {
		setActiveFilterCategories(Array(filterFields.length).fill(false))
		setFilterValues(Array(filterFields.length).fill([]))
		const array = []
		if(filterFields) filterFields.map(({attribute_code}) => array.push(attribute_code))
		setAttributeCodes(array)
		setActiveSortLabel([])
	},[filterFields, id])

	if(!productList) return <View />

	const _renderItem = ({item, index}) => {
		const { id, thumbnail, name, price_range } = item
		return (
			<Item 
				index={index}
				id={id} 
				name={name} 
				thumbnail={thumbnail} 
				price_range={price_range} 
				isGrid={isGrid}
				navigation={props.navigation}
				length={productList.length}
			/>
		)
	}

	const toggleDisplayModeChange = () => setIsGrid(!isGrid)
	const showFilterOptions = () => setIsFilterActive(!isFilterActive)
	const showSortOptions = () => setIsSortActive(!isSortActive)

	if(!isFilterActive && !isSortActive) {
		return (
			<View style={{minHeight: '100%'}}>
				<View style={{height: 64}}/>
				<FilterAndSortTags 
					categoryId={id}
					sortAndFilterProducts={sortAndFilterProducts}
					activeSortLabel={activeSortLabel}
					setActiveSortLabel={setActiveSortLabel}
					setActiveSortOption={setActiveSortOption}
					filterValues={filterValues}
					setFilterValues={setFilterValues}
					filterFields={filterFields}
					variablesObject={variablesObject}
					setVariablesObject={setVariablesObject}
				/>
				<FlatList 
					data={productList}
			        renderItem={_renderItem}
			        keyExtractor={item => item.id}
			        key={isGrid}
			        numColumns={isGrid ? 2 : 1}
			        style={{ flex: 1 }}
			        contentContainerStyle={{marginTop: 10, paddingBottom: 45 }}
				/>
				<View style={styles.footer}>
					<TouchableOpacity style={{padding: 8}} onPress={toggleDisplayModeChange}>
						<Ionicons name={'apps-sharp'} size={24}/>
					</TouchableOpacity>
					<TouchableOpacity style={{padding: 8}} onPress={showFilterOptions}>
						<Ionicons name={'funnel'} size={24}/>
					</TouchableOpacity>
					<TouchableOpacity style={{padding: 8}} onPress={showSortOptions}>
						<MaterialIcons name={'swap-vert'} size={24}/>
					</TouchableOpacity>
				</View>
			</View>	
		)
	} else if (isFilterActive) {
		return (
			<FilterOptions
				categoryId={id}
				filterFields={filterFields}
				showFilterOptions={showFilterOptions}
				activeFilterCategories={activeFilterCategories}
				setActiveFilterCategories={setActiveFilterCategories}
				filterValues={filterValues}
				setFilterValues={setFilterValues}
				attributeCodes={attributeCodes}
				sortAndFilterProducts={sortAndFilterProducts}
				variablesObject={variablesObject}
				setVariablesObject={setVariablesObject}
			/>
		)
	}
	else if(isSortActive) {
		return (
			<SortOptions
				categoryId={id}
				sortFields={sortFields}
				activeSortOption={activeSortOption}
				setActiveSortLabel={setActiveSortLabel}
				setActiveSortOption={setActiveSortOption}
				setIsSortActive={setIsSortActive}
				sortAndFilterProducts={sortAndFilterProducts}
				variablesObject={variablesObject}
				setVariablesObject={setVariablesObject}
			/>
		)
	}
} 

const styles = StyleSheet.create({
	footer: {
		position: 'absolute', 
		bottom: 0, 
		width: '100%', 
		height: 45, 
		backgroundColor: '#BDBDBD',
		opacity: 0.8,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	}
})

export {ProductList}