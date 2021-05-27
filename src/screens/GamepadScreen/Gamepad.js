import React, { useEffect, useState } from "react";

import { Container, Text, View, Fab, Icon, Button } from "native-base";
import { lockAsync, OrientationLock } from "expo-screen-orientation";

const Gamepad = (
    { setFpvRemoteView }
) => {
    
    const [fabActive, setFabActive] = useState(false);

    const on = {};

    useEffect(() => {
        setFabActive(false);
        lockAsync(OrientationLock.LANDSCAPE_LEFT);
    }, []);

    return (
        <Container>
            <View style={{ ...styles.content }}>

                <View style={{ ...styles.streamView }}>
                    <Text>xxxxx</Text>
                    <Fab
                        style={{ ...styles.actionButton, backgroundColor: '#5067FF' }}
                        active={ fabActive }
                        position="bottomRight"
                        direction="up"
                        block info rounded 
                        onPress={ () => setFabActive(!fabActive) }>
                        <Icon name="share" />
                        <Button style={{ backgroundColor: '#5067FF' }}>
                            <Icon name="ios-settings"/>
                        </Button>
                        <Button style={{ backgroundColor: '#5067FF' }}
                            onPress={ () => {
                                console.log("lalaal");
                                setFabActive(false);
                                setFpvRemoteView(true);
                            }}>
                            <Icon name="ios-phone-landscape-sharp" />
                        </Button>
                        <Button disabled style={{ backgroundColor: '#5067FF' }}>
                            <Icon name="videocam" />
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