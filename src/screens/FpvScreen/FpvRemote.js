import React, { useEffect, useState } from "react";

import AxisPad from "react-native-axis-pad";
import { TouchableHighlight } from "react-native";
import { Button, Icon, Text, View, Fab } from "native-base";
import * as app_drone from './.././../app/utils/app_drone';

const FpvRemote = ({ navigation, setFpvRemoteView }) => {

    const [bind, setBind] = useState(false);
    const [takeoff, setTakeoff] = useState(false);
    const [started, setStarted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fabActive, setFabActive] = useState(false);

    useEffect(() => {
        setFabActive(false);
    }, []);

    const use = {
        Bind: { bind: bind, setBind: setBind }
    }

    return (
        <View style={{ ...styles.gamepadView, flex: 1 }}>

            <View style={{ ...styles.gamepadLine, flex: 2,
                backgroundColor: '#40E0D0' }}>

                <View style={{ ...styles.centeredItem, flexDirection: 'row' }}>
                    { [{
                        icon: 'caret-back-sharp',
                        onPress: () => app_drone.run('left 100')
                    }, {
                        icon: 'caret-down-sharp',
                        onPress: () => app_drone.run('back 100')
                    }, {
                        icon: 'caret-up-sharp',
                        onPress: () => app_drone.run('forward 100')
                    }, {
                        icon: 'caret-forward-sharp',
                        onPress: () => app_drone.run('right 100')
                    }].map(_it => (
                        <TouchableHighlight
                            onPress={ _it.onPress } style={ { ...styles.directionalBtn } }>
                            <Icon name={ _it.icon } style={ { ...styles.directionalIcon } } />
                        </TouchableHighlight>
                    )) }
                </View>

            </View>

            <View style={{ ...styles.gamepadLine, flex: 2,
                backgroundColor: '#DE3163' }}>

                <View style={{ ...styles.centeredItem }}>
                    <DirectionalBox
                        options={{ icon: 'sync-outline' }}
                        leftOptions={{
                            icon: 'caret-back-sharp',
                            onPress: () => app_drone.run('ccw 200')
                        }}
                        rightOptions={{
                            icon: 'caret-forward-sharp',
                            onPress: () => app_drone.run('cw 200')
                        }} />
                </View>
                <View style={{ ...styles.centeredItem }}>
                    <DirectionalBox
                        options={{ icon: 'swap-vertical-sharp' }}
                        leftOptions={{
                            icon: 'caret-down-sharp',
                            onPress: () => app_drone.run('down 100')
                        }}
                        rightOptions={{
                            icon: 'caret-up-sharp',
                            onPress: () => app_drone.run('up 100')
                        }} />
                </View>
            </View>

            <View style={{ ...styles.gamepadLine, flex: 1 }}>

                <View style={{ ...styles.actionWrapper, flex: 2 }}>
                    <Button style={{ ...styles.actionButton }}
                            onPress={ () => {
                                app_drone.run(takeoff ? 'land' : 'takeoff');
                                setTakeoff(!takeoff);
                            }}
                            disabled={ loading }
                            block danger rounded>
                        <Text>{ takeoff ? 'Attérir' : 'Décoller' }</Text>
                    </Button>
                </View>
                <View style={{ ...styles.actionWrapper, flex: 1 }}>
                    <Button style={{ ...styles.actionButton }}
                            onPress={ () => {} }
                            block info rounded>
                        <Icon name="information-outline" />
                    </Button>
                </View>
                    <View style={{...styles.actionWrapper, flex: 1 }}>
                        <Fab
                            active={fabActive}
                            direction="up"
                            containerStyle={{ }}
                            style={{ ...styles.actionButton, backgroundColor: '#5067FF', marginTop: 100 }}
                            position="bottomLeft"
                            onPress={() => setFabActive(!fabActive)} block info rounded>
                                <Icon name="share" />
                            <Button style={{ backgroundColor: '#5067FF' }}>
                                <Icon name="ios-settings"/>
                            </Button>
                            <Button style={{ backgroundColor: '#5067FF' }}
                                    onPress={ () => {
                                        setFabActive(false);
                                        setFpvRemoteView(false);
                                    }}>
                                <Icon name="game-controller" />
                            </Button>
                            <Button disabled style={{ backgroundColor: '#5067FF' }}>
                                <Icon name="videocam" />
                            </Button>
                        </Fab>
                    </View>
            </View>
        </View>
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
        if (lPressed) {} else {}
    }, [lPressed]);

    useEffect(() => {
        if (rPressed) {} else {}
    }, [rPressed]);

    return (
        <View>
            <View style={ { ...styles.gamepadLine, ...styles.directionalItem } }>
                <TouchableHighlight
                    style={ { ...styles.directionalBtn } }
                    onPress={ leftOptions.onPress }
                    onShowUnderlay={ on.LeftBtnPressed }
                    onHideUnderlay={ on.LeftBtnUnPressed }>
                    <Icon name={ leftOptions.icon }
                          style={ { ...styles.directionalIcon } } />
                </TouchableHighlight>

                <TouchableHighlight
                    style={ { ...styles.directionalBtn } }
                    onPress={ rightOptions.onPress }
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
    },
    actionButton: {
        marginHorizontal: 5
    },
    actionWrapper: {
        justifyContent: 'center'
    }
};

export default FpvRemote;
