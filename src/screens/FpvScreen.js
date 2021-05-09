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
            <View style={{ flexDirection: 'row', flex: 1 }}>

                <View style={{ flex: 2 }}>
                    <Text>xxx</Text>
                </View>

                <View style={{ flexDirection: 'column', flex: 1 }}>

                    <View style={{ ...styles.pad_line, flex: 2, backgroundColor: '#40E0D0' }}>
                        <View style={{ ...styles.centered_item }}>
                            <AxisPad
                                size={ 100 }
                                handlerSize={ 60 }
                                resetOnRelease
                                autoCenter
                                onValue={ ({ x, y }) => console.log(x, y) } />
                        </View>
                        <View style={{ ...styles.centered_item }}>
                            <Text style={{ padding: 10, textAlign: 'center', color: '#2F2D55', fontWeight: 'bold' }}>
                                Utilise le Joystick 😇
                            </Text>
                        </View>
                    </View>

                    <View style={{ ...styles.pad_line, flex: 2, backgroundColor: '#DE3163' }}>
                        <View style={{ ...styles.centered_item }}>
                            <DirectionalBox
                                options={{ icon: 'sync-outline' }}
                                leftOptions={{ icon: 'caret-back-sharp' }}
                                rightOptions={{ icon: 'caret-forward-sharp' }} />
                        </View>
                        <View style={{ ...styles.centered_item }}>
                            <DirectionalBox
                                options={{ icon: 'swap-vertical-sharp' }}
                                leftOptions={{ icon: 'caret-down-sharp' }}
                                rightOptions={{ icon: 'caret-up-sharp' }} />
                        </View>
                    </View>

                    <View style={{ ...styles.pad_line, flex: 1, backgroundColor: '#CCCCFF' }}>
                        <View style={{ ...styles.centered_item }}>

                        </View>
                        <View style={{ ...styles.centered_item }}>

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
            <View style={ { ...styles.pad_line, ...styles.directional_item } }>
                <TouchableHighlight
                    style={ { ...styles.directional_btn } }
                    onPress={ () => {} }
                    onShowUnderlay={ on.LeftBtnPressed }
                    onHideUnderlay={ on.LeftBtnUnPressed }>
                    <Icon name={ leftOptions.icon }
                          style={ { ...styles.directional_icon } } />
                </TouchableHighlight>

                <TouchableHighlight
                    style={ { ...styles.directional_btn } }
                    onPress={ () => {} }
                    onShowUnderlay={ on.RightPressed }
                    onHideUnderlay={ on.RightUnPressed }>
                    <Icon name={ rightOptions.icon }
                          style={ { ...styles.directional_icon } } />
                </TouchableHighlight>
            </View>

            <View style={ { ...styles.pad_line, ...styles.centered_item } }>
                <Icon name={ options.icon } />
            </View>
        </View>
    );
};

const styles = {
    pad_line: {
        flexDirection: 'row'
    },
    centered_item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    directional_btn: {
        backgroundColor: '#2F2D55',
        paddingVertical: 10,
        marginHorizontal: 5,
        paddingHorizontal: 10,
    },
    directional_item: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    directional_icon: {
        fontSize: 15
    }
};

export default FpvScreen;