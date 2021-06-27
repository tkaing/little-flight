import React from "react";
import styles from "./Styles.Fab";

import { Button, Icon, View } from "native-base";

const Fab = (
    {
        state: {
            fabActive, setFabActive
        }
    }
) => {

    return (
        <View style={[ styles.fab ]}>
            <Fab
                active={ fabActive }
                position="bottomRight"
                direction="up"
                onPress={ () => setFabActive(fabActive) } block info rounded>

                <Icon name="share" />

                <Button style={{ backgroundColor: '#5067FF' }}>
                    <Icon name="ios-settings"/>
                </Button>

                <Button style={{ backgroundColor: '#5067FF' }}
                        onPress={ () => setFabActive(false) }>
                    <Icon name="game-controller" />
                </Button>

                <Button disabled style={{ backgroundColor: '#5067FF' }}>
                    <Icon name="videocam" />
                </Button>
            </Fab>
        </View>
    );
}

export default Fab
