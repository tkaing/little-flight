import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class AxisBar extends React.Component {
	render() {
		let width = (50 + (this.props.value)*50) + '%';
		return (
			<View style={styles.view_content_1}>
				<View style={[styles.view_content_2, { width: width }]}></View>
				<Text style={styles.view_content_3}>{this.props.text}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
    view_content_1: {
        margin: 2,
        borderColor: '#22f5',
        borderWidth: 1
    },
    view_content_2: {
        height: '100%', 
        position:'absolute', 
        backgroundColor: '#22f5'
    },
    view_content_3: {
        textAlign:'center'
    }
  })

//export default AxisBar;