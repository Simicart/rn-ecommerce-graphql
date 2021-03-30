import React, { useState, useEffect } from 'react'
import { 
	ScrollView, 
	View, 
	Text, 
	Image, 
	FlatList,
	ListView,
	TouchableOpacity, 
	SafeAreaView, 
	Checkbox,
	StyleSheet,
	Dimensions
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Item from './item'
import FilterAndSortTags from './filterAndSortTags'
import FilterOptions from './filter'
import SortOptions from './sort'
import { useProductList } from '../../../../talon/Product/useProductList'

const { height } = Dimensions.get('window');

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
		canLoadMore,
		pageSizeStep,
		loading, 
		derivedErrorMessage 
	} = useProductList(id)

	const [pageSize, setPageSize] = useState(pageSizeStep)

	useEffect(() => {
		setActiveFilterCategories(Array(filterFields.length).fill(false))
		setFilterValues(Array(filterFields.length).fill([]))
		const array = []
		if(filterFields) filterFields.map(({attribute_code}) => array.push(attribute_code))
		setAttributeCodes(array)
		setActiveSortLabel([])
		setVariablesObject({pageSize: pageSizeStep, category_id: id})
		setPageSize(pageSizeStep)
	},[filterFields, id])

	if(!productList) return <Text>Loading</Text>

	const _renderItem = ({item, index}) => {
		const { uid, thumbnail, name, price_range } = item
		return (
			<Item 
				index={index}
				id={uid} 
				name={name} 
				thumbnail={thumbnail} 
				price_range={price_range} 
				isGrid={isGrid}
				navigation={props.navigation}
				length={productList.length}
			/>
		)
	}

	const _renderFooter = () => {
		if(canLoadMore) {
			return (
				<View style={{alignItems: 'center'}}>
					<TouchableOpacity 
						style={{
							alignItems: 'center', 
							justifyContent: 'center',
							width: 100,
						}}
						onPress={() => {
							setVariablesObject({...variablesObject, pageSize: pageSize + pageSizeStep})
							setPageSize(pageSize + pageSizeStep)
							sortAndFilterProducts({variables: {...variablesObject, pageSize: pageSize + pageSizeStep}})
						}}
					>
						<Text style={{
							paddingHorizontal: 10, 
							paddingBottom: 20, 
							textDecorationLine: 'underline'
						}}>Load more</Text>
					</TouchableOpacity>
				</View>
			)
		}
		else return <View />
	}

	const toggleDisplayModeChange = () => setIsGrid(!isGrid)
	const showFilterOptions = () => setIsFilterActive(!isFilterActive)
	const showSortOptions = () => setIsSortActive(!isSortActive)

	if(!isFilterActive && !isSortActive) {
		return (
			<View style={{height: '100%', minHeight: '100%'}}>
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
			        keyExtractor={item => item.uid}
			        key={isGrid}
			        numColumns={isGrid ? 2 : 1}
			        style={{ flex: 1 }}
			        contentContainerStyle={{marginTop: 10, paddingBottom: 45}}
			        ListFooterComponent={_renderFooter}
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