import React, { useEffect, useState } from 'react';
import styles from "./Styles.Header";

import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView } from 'react-native';
import { Button, Fab, Icon, View } from "native-base";

const Header = () => {

    const navigation = useNavigation();

    const [fabActive, setFabActive] = useState(false);

    useEffect(() => {
        setFabActive(false);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex: 1, alignItems: 'center'}}>
                <Icon name="home" type="FontAwesome5" style={ styles.iconStyle } />
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
                <Image
                    style={ styles.logoStyle }
                    source={{ uri: `urltologo` }}
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
                        backgroundColor: 'red',
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
                                backgroundColor: 'red',
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
                                backgroundColor: 'red',
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
                                backgroundColor: 'red',
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
                                backgroundColor: 'red',
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

export default Header
