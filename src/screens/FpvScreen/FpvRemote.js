import React, { useEffect, useState } from "react";

import axios from "axios";
import AxisPad from "react-native-axis-pad";
import { TouchableHighlight } from "react-native";
import { Button, Icon, Text, View, Fab, Container, Header } from "native-base";

import * as api_default from "../../api/api_default";

const FpvRemote = ({ navigation, setFpvRemoteView }) => {

    const [started, setStarted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fabActive, setFabActive] = useState(false);

    const on = {
        StartAndStopPress: async () => {
            const updatedStarted = !started;
            if (updatedStarted) {
                try {
                    setLoading(true);
                    const apiResponse = await axios.get(api_default.drone.command());
                    const apiResponseBis = await axios.get(api_default.drone.takeoff());
                    setLoading(false);
                } catch (failure) {
                    setLoading(false);
                    console.log(failure);
                }
            } else {
                try {
                    setLoading(true);
                    const apiResponse = await axios.get(api_default.drone.command());
                    const apiResponseBis = await axios.get(api_default.drone.land());
                    setLoading(false);
                } catch (failure) {
                    setLoading(false);
                    console.log(failure);
                }
            }
            setStarted(updatedStarted);
        }
    };

    useEffect(() => {
        setFabActive(false);
    }, []);     

    return (
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

            <View style={{ ...styles.gamepadLine, flex: 1 }}>

                <View style={{ ...styles.actionWrapper, flex: 2 }}>
                    { started &&
                    <Button style={{ ...styles.actionButton }}
                            disabled={ loading }
                            onPress={ on.StartAndStopPress } block danger rounded>
                        <Text>Stop</Text>
                    </Button>
                    }
                    { !started &&
                    <Button style={{ ...styles.actionButton }}
                            disabled={ loading }
                            onPress={ on.StartAndStopPress } block primary rounded>
                        <Text>Start</Text>
                    </Button>
                    }
                </View>
                {/*<View style={{ ...styles.actionWrapper, flex: 1 }}>
                    <Button style={{ ...styles.actionButton }}
                            onPress={ () => {} } block info rounded>
                        <Icon name="information-outline" />
                    </Button>
                </View>*/}
                    <View style={{...styles.actionWrapper, flex: 1 }}>
                        <Fab
                            active={fabActive}
                            direction="up"
                            containerStyle={{ }}
                            style={{ ...styles.actionButton, backgroundColor: '#5067FF', marginTop: 100 }}
                            position="bottomRight"
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
    },
    actionButton: {
        marginHorizontal: 5
    },
    actionWrapper: {
        justifyContent: 'center'
    }
};

export default FpvRemote;