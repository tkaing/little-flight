import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert} from 'react-native';

const DirectionalButton = () => (
  <SafeAreaView style={styles.container}>
    <View style={[styles.fixToText, { justifyContent: 'center' }]}>
      <Button
        title="▲"
        color='#5067FF'
        onPress={() => Alert.alert('Cannot press this one')}
      >
      </Button>
    </View>
    <View>
      <View style={styles.fixToText}>
        <View style={styles.button}>
          <Button
            title="◄"
            color='#5067FF'
            onPress={() => Alert.alert('Left button pressed')}
          />
        </View>
        <View style={styles.space} />
        <View style={styles.button}>
          <Button
            title="►"
            color='#5067FF'
            onPress={() => Alert.alert('Right button pressed')}
          />
        </View>
      </View>
    </View>
      <View style={[styles.fixToText, { justifyContent: 'center' }]}>
        <Button
          title="▼"
          color='#5067FF'
          onPress={() => Alert.alert('Cannot press this one')}
        />
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 40
  },
  space: {
    width: 35, // or whatever size you need
    height: 20,
  },
});

export default DirectionalButton;