import React, { useEffect, useState } from "react";

import { Container, Text, View, Fab, Icon, Button } from "native-base";
import { lockAsync, OrientationLock } from "expo-screen-orientation";

const Gamepad = (
    { useFpvRemote }
) => {
    
    const [fabActive, setFabActive] = useState(false);

    const { isFpvRemoteView, setFpvRemoteView } = useFpvRemote;

    const on = {
        SwitchScreen: async () => setFpvRemoteView(!isFpvRemoteView),
    };

    useEffect(() => {
        setFabActive(false);
        lockAsync(OrientationLock.LANDSCAPE_LEFT);
    }, []);

    return (
        <Container>
            <View style={{ ...styles.content }}>

                <View style={{ ...styles.streamView }}>
                    <Text>xxx</Text>
                    <Fab
                        style={{ ...styles.actionButton, backgroundColor: '#5067FF' }}
                        active={ fabActive }
                        position="bottomRight"
                        direction="up"
                        block info rounded 
                        onPress={ () => setFabActive(!fabActive) }>
                        <Icon name="share" />
                        <Button style={{ backgroundColor: '#5067FF' }}>
                            <Icon name="information-circle-outline" />
                        </Button>
                        <Button style={{ backgroundColor: '#5067FF' }}
                            onPress={ () => {
                                console.log("lalaal");
                                setFabActive(false);
                                on.SwitchScreen(); 
                            }}>
                            <Icon name="game-controller" />
                        </Button>
                        <Button disabled style={{ backgroundColor: '#5067FF' }}>
                            <Icon name="camera-reverse-outline" />
                        </Button>
                    </Fab>
                </View>

            </View>
        </Container>
    );
};

const styles = {
    content: {
        flex: 1,
        flexDirection: 'row'
    },
    streamView: { flex: 1},
};

export default Gamepad;