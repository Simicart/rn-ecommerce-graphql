import React from 'react'
import { Image, View, Text, TouchableOpacity } from 'react-native'
import { Dimensions } from 'react-native';

const {width} = Dimensions.get('window');



function currencyFormat(num) {
	return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const Item = props => {
	const { id, name, thumbnail, price_range, isGrid, navigation, index, length } = props
	const { currency } = price_range.maximum_price.final_price
	const { value: maxPrice } = price_range.maximum_price.final_price
	const { value: minPrice } = price_range.minimum_price.final_price
	const isRange = maxPrice != minPrice

	const price = isRange ?
		<View>
			<Text>{`From: ${currencyFormat(minPrice)}`}</Text>
			<Text>{`To: ${currencyFormat(maxPrice)}`}</Text>
		</View>
		: <Text>{currencyFormat(minPrice)}</Text>
	
	return (
		<TouchableOpacity 
			style={(index === length-1 && length%2===1) ? {
				width: (width-40)/2,
				padding: 10,
				paddingBottom: isGrid ?  10 : 32,
				marginHorizontal: 10,
			    backgroundColor: '#fff',
			    borderRadius: 5,
			    elevation: 2,
				marginBottom: 20,
			} : {
				flex: 1/2,
				padding: 10,
				paddingBottom: isGrid ?  10 : 32,
				marginHorizontal: 10,
			    backgroundColor: '#fff',
			    borderRadius: 5,
			    elevation: 2,
				marginBottom: 20,
			}}
			onPress={() => navigation.navigate('Product Details')}
		>
			<View style={{ marginBottom: isGrid ? 8 : 30 }}>
				<Image 
					style={{ 
						aspectRatio: 1/1, 
						width: '100%', 
						height: undefined,
						borderRadius: 5 
					}}
					source={{uri: thumbnail.url}}
				/>
			</View>
			<Text style={{fontWeight: 'bold', lineHeight: 16}}>{name}</Text>
			{price}
		</TouchableOpacity>
	)
}

export default Item 