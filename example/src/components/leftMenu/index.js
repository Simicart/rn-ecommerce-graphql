import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const LeftMenu = ({ state, descriptors, navigation }) => {
	return (
		<View style={{paddingTop: 40}}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
		        const label =
		          	options.tabBarLabel !== undefined
			            ? options.tabBarLabel
			            : options.title !== undefined
			            ? options.title
			            : route.name;
						
			    const isFocused = state.index === index;

			    let iconName;
		        if (route.name === 'Root') {
		          	iconName = isFocused ? 'home-sharp' : 'home-outline';
		        } else if (route.name === 'Category') {
		          	iconName = isFocused ? 'layers' : 'layers-outline';
		        } else if (route.name === 'Categories') {
		          	iconName = isFocused ? 'layers' : 'layers-outline';
		      	}

		        const onPress = () => {
		          	const event = navigation.emit({
			            type: 'tabPress',
			            target: route.key,
		          	});

		         	if (!isFocused && !event.defaultPrevented) {
		            	navigation.navigate(route.name);
		          	}
		        };

		        const onLongPress = () => {
		          	navigation.emit({
			            type: 'tabLongPress',
			            target: route.key,
		          	});
		        };

				return (
					<TouchableOpacity onPress={onPress} style={styles.item}>
						<Ionicons name={iconName} size={20}/>
						<Text style={styles.itemText}>{label}</Text>
					</TouchableOpacity>
				)
			})}
			<View 
				style={{
					justifyContent: 'center', 
					backgroundColor: '#000',
					paddingLeft: 16,
					height: 40,
					marginBottom: 20
				}}
			>
				<Text style={{color: '#fff'}}>MORE</Text>
			</View>
			<TouchableOpacity style={styles.item}>
				<Ionicons name={'call-outline'} size={20}/>
				<Text style={styles.itemText}>Contact Us</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.item}>
				<Ionicons name={'scan-outline'} size={20}/>
				<Text style={styles.itemText}>Scan Now</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.item}>
				<Ionicons name={'settings-outline'} size={20}/>
				<Text style={styles.itemText}>Setting</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	item: {
		paddingBottom: 20,
		paddingLeft: 16,
		flexDirection: 'row'
	},
	itemText: {
		paddingLeft: 10
	}
})

export default LeftMenu