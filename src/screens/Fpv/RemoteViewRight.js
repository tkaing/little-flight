import React, { useState } from "react";

import {Button, Fab, Icon, View} from "native-base";
import { TouchableHighlight } from "react-native";
import {styles, direction, box, Box, Footer, classes} from './Remote';
import DirectionalButton from '../../components/DirectionnalButton'

const RemoteViewRight = ({ setFpvRemoteView }) => {

    const [takeoff, setTakeoff] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fabActive, setFabActive] = useState(false);


    return (
        <View style={{ flexDirection: 'column', backgroundColor: '#595758'}}>
            <View style={[ classes.recordingsButtons ]}>
                <Button onPress={() => {} } block info rounded>
                    <Icon style={styles.icon} name="videocam" />
                </Button>
                <Button onPress={() => {} } block info rounded>
                    <Icon style={styles.icon} name="camera-outline" />
                </Button>
            </View>
                <DirectionalButton/>

            <View style={[ classes.fab ]}>
                <Fab
                    active={ fabActive }
                    direction="up"
                    style={[ styles.actionButton ]}
                    position="bottomRight"
                    onPress={() => setFabActive(fabActive), console.log(fabActive)} block info rounded>
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

        /*<View style={[ styles.gamepadView, { flex: 1 } ]}>

            {/!* SECTION = 4 DIRECTIONS *!/}
            <View style={[ styles.gamepadLine, { flex: 2, backgroundColor: '#40E0D0' } ]}>
                <View style={[ styles.centeredItem, { flexDirection: 'row' } ]}>
                    { direction.list.map(_it => (
                        <TouchableHighlight
                            onPress={ _it.onPress } style={[ styles.directionalBtn ]}>
                            <Icon name={ _it.icon } style={[ styles.directionalIcon ]} />
                        </TouchableHighlight>
                    )) }
                </View>
            </View>

            {/!* SECTION = ROTATE AND UP/DOWN *!/}
            <View style={[ styles.gamepadLine, { flex: 2, backgroundColor: '#DE3163' } ]}>
                <View style={[ styles.centeredItem ]}>
                    <Box { ...box.rotationProps } />
                </View>
                <View style={[ styles.centeredItem ]}>
                    <Box { ...box.altitudeProps } />
                </View>
            </View>

            {/!* SECTION = FOOTER *!/}
            <View style={[ styles.gamepadLine, { flex: 1 } ]}>
                <Footer loading={ loading }
                        takeoff={ takeoff }
                        setTakeoff={ setTakeoff }
                        setFpvRemoteView={ setFpvRemoteView } />
            </View>
        </View>*/
    );
};

export default RemoteViewRight
