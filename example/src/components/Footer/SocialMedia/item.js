import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'

const Item = props => {
	const { icon } = props
	return (
		<TouchableOpacity>
			<Image source={icon} style={styles.icon}/>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	icon: {
		width: 25,
		height: 25
	}
})

export default Item