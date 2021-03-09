import React from 'react'
import { View, StyleSheet } from 'react-native'
import Item from './item'

const SocialMedia = props => {
	const icons = [
		require('./facebook.png'),
		require('./linkedin.png'),
		require('./twitter.png')
	]
	return (
		<View style={styles['social-container']}>
			{
				icons.map(icon => {
					return <Item icon={icon}/>
				})
			}
		</View>
	)
}

const styles = StyleSheet.create({
	'social-container': {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: 120,
		marginTop: 20,
	}
})

export default SocialMedia