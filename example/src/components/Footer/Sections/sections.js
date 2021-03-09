import React from 'react'
import { View, StyleSheet } from 'react-native'
import Item from './item'

const Sections = props => {
	const sections = [
		'About Us',
		'Privacy Policy',
		'Cookie Policy',
		'Contact',
	]
	return (
		<View style={styles.container}>
			{
				sections.map(section => {
					return <Item section={section} style={styles.item}/>
				})
			}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
	},
	item: {
		color: '#3a3c3c',
		fontSize: 16,
		lineHeight: 25,
		textAlign: 'center',
	}
})

export default Sections