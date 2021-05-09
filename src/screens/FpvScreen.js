import React, { useEffect, useState } from "react";

import AxisPad from 'react-native-axis-pad';
import { TouchableHighlight } from 'react-native';
import { OrientationLock, lockAsync } from "expo-screen-orientation";
import { Container, Icon, Text, View } from "native-base";

const FpvScreen = (
    { navigation }
) => {

    useEffect(() => {
        lockAsync(OrientationLock.LANDSCAPE);
    }, []);

    useEffect(() => {
        return navigation.addListener('focus', () => {
            lockAsync(OrientationLock.LANDSCAPE);
        });
    }, [navigation]);

    return (
        <Container>
            <View style={{ ...styles.content }}>

                <View style={{ ...styles.streamView, flex: 2 }}>
                    <Text>xxx</Text>
                </View>

                <View style={{ ...styles.gamepadView, flex: 1 }}>

                    <View style={{ ...styles.gamepadLine, flex: 2,
                        backgroundColor: '#40E0D0' }}>

                        <View style={{ ...styles.centeredItem }}>
                            <AxisPad
                                size={ 100 }
                                onValue={ ({ x, y }) => console.log(x, y) }
                                autoCenter
                                handlerSize={ 60 }
                                resetOnRelease />
                        </View>
                        <View style={{ ...styles.centeredItem }}>
                            <Text style={{ ...styles.joystickText }}>
                                Utilise le Joystick 😇
                            </Text>
                        </View>

                    </View>

                    <View style={{ ...styles.gamepadLine, flex: 2,
                        backgroundColor: '#DE3163' }}>

                        <View style={{ ...styles.centeredItem }}>
                            <DirectionalBox
                                options={{ icon: 'sync-outline' }}
                                leftOptions={{ icon: 'caret-back-sharp' }}
                                rightOptions={{ icon: 'caret-forward-sharp' }} />
                        </View>
                        <View style={{ ...styles.centeredItem }}>
                            <DirectionalBox
                                options={{ icon: 'swap-vertical-sharp' }}
                                leftOptions={{ icon: 'caret-down-sharp' }}
                                rightOptions={{ icon: 'caret-up-sharp' }} />
                        </View>

                    </View>

                    <View style={{ ...styles.gamepadLine, flex: 1,
                        backgroundColor: '#CCCCFF' }}>

                        <View style={{ ...styles.centeredItem }}>

                        </View>
                        <View style={{ ...styles.centeredItem }}>

                        </View>

                    </View>
                </View>

            </View>
        </Container>
    );
};

const DirectionalBox = (
    { options, leftOptions, rightOptions }
) => {

    const [lPressed, setLPressed] = useState(false);
    const [rPressed, setRPressed] = useState(false);

    const on = {
        LeftBtnPressed: () => {
            setLPressed(true);
            console.log('L pressed !');
        },
        LeftBtnUnPressed: () => {
            setLPressed(false);
            console.log('L unpressed !');
        },
        RightPressed: () => {
            setRPressed(true);
            console.log('R pressed !');
        },
        RightUnPressed: () => {
            setRPressed(false);
            console.log('R unpressed !');
        }
    };

    useEffect(() => {
        if (lPressed) {

        } else {

        }
    }, [lPressed]);

    useEffect(() => {
        if (rPressed) {

        } else {

        }
    }, [rPressed]);

    return (
        <View>
            <View style={ { ...styles.gamepadLine, ...styles.directionalItem } }>
                <TouchableHighlight
                    style={ { ...styles.directionalBtn } }
                    onPress={ () => {} }
                    onShowUnderlay={ on.LeftBtnPressed }
                    onHideUnderlay={ on.LeftBtnUnPressed }>
                    <Icon name={ leftOptions.icon }
                          style={ { ...styles.directionalIcon } } />
                </TouchableHighlight>

                <TouchableHighlight
                    style={ { ...styles.directionalBtn } }
                    onPress={ () => {} }
                    onShowUnderlay={ on.RightPressed }
                    onHideUnderlay={ on.RightUnPressed }>
                    <Icon name={ rightOptions.icon }
                          style={ { ...styles.directionalIcon } } />
                </TouchableHighlight>
            </View>
            <View style={ { ...styles.gamepadLine, ...styles.centeredItem } }>
                <Icon name={ options.icon } />
            </View>
        </View>
    );
};

const styles = {
    content: {
        flex: 1,
        flexDirection: 'row'
    },
    streamView: {},
    gamepadView: { flexDirection: 'column' },
    gamepadLine: {
        flexDirection: 'row'
    },
    joystickText: {
        color: '#2F2D55',
        padding: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    centeredItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    directionalBtn: {
        backgroundColor: '#2F2D55',
        paddingVertical: 10,
        marginHorizontal: 5,
        paddingHorizontal: 10,
    },
    directionalItem: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    directionalIcon: {
        fontSize: 15
    }
};

export default FpvScreen;