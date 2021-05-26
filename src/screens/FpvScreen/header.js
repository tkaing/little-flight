import {useNavigation} from '@react-navigation/native';
import {Button, Fab, Icon, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Image, Platform, SafeAreaView, StyleSheet} from 'react-native';
import {red} from '../../Settings/Theme';

const Header = () => {
  const [fabActive, setFabActive] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    setFabActive(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Icon name="home" type="FontAwesome5" style={styles.iconStyle} />
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image
          style={styles.logoStyle}
          source={{
            
            uri: `urltologo`,
          }}
        />
      </View>
      <View style={{flex: 1}}>
        <Fab
          active={fabActive}
          direction="down"
          containerStyle={{
            marginTop: 24,
            marginRight: 15,
          }}
          style={{
            backgroundColor: red,
            height: 63,
            width: 63,
            borderRadius: 32.5,
            shadowOffset: {height: 0, width: 0},
            shadowOpacity: 0,
            elevation: 0,
          }}
          position="topRight"
          onPress={() => setFabActive(!fabActive)}>
          <Icon
            name={fabActive ? 'times' : 'plus'}
            type="FontAwesome5"
            style={{fontSize: 28}}
          />
          {fabActive ? (
            <Button
              style={{
                backgroundColor: red,
                height: 48,
                width: 48,
                borderRadius: 24,
              }}
              onPress={() => {
                setFabActive(false);
                navigation.navigate('Contact');
              }}>
              <Icon name="newspaper" type="FontAwesome5" />
            </Button>
          ) : null}
          {fabActive ? (
            <Button
              style={{
                marginTop: 10,
                backgroundColor: red,
                height: 48,
                width: 48,
                borderRadius: 24,
              }}>
              <Icon name="lightbulb" type="FontAwesome5" />
            </Button>
          ) : null}
          {fabActive ? (
            <Button
              style={{
                marginTop: 20,
                backgroundColor: red,
                height: 48,
                width: 48,
                borderRadius: 24,
              }}>
              <Icon name="calendar-week" type="FontAwesome5" />
            </Button>
          ) : null}
          {fabActive ? (
            <Button
              style={{
                marginTop: 30,
                backgroundColor: red,
                height: 48,
                width: 48,
                borderRadius: 24,
              }}>
              <Icon name="list" type="FontAwesome5" />
            </Button>
          ) : null}
        </Fab>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  iconStyle: {
    marginTop: 40,
    color: 'white',
    fontSize: 32,
    backgroundColor: red,
    padding: 15,
    borderWidth: 0,
    overflow: 'hidden',
    borderRadius: 32,
  },
  logoStyle: {
    height: 135,
    width: 135,
    resizeMode: 'contain',
  },
});

export default Header;