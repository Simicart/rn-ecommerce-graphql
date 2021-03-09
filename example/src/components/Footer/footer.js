import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import Sections from './Sections/sections'
import SocialMedia from './SocialMedia/listing'

const Footer = props => {
	return (
		<View style={styles.footer}>
			<Image source={require('./logo.png')} style={styles.logo}/>
			<Sections />
			<SocialMedia />
		</View>
	)
}

const styles = StyleSheet.create({
	footer: {
		marginTop: 10,
		paddingTop: 30,
		paddingBottom: 30,
		backgroundColor: '#749867',
		alignItems: 'center'
	},
	logo: {
		width: 150,
		height: 39
	}
})

export default Footer