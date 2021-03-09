import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

const Item = props => {
	const { section, style } = props
	return (
		<TouchableOpacity>
			<Text style={style}>{section}</Text>
		</TouchableOpacity>
	)
}

export default Item