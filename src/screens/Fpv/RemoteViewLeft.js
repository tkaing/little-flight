import React, { useState } from "react";

import {Button, Icon, Text, View} from "native-base";
import { TouchableHighlight } from "react-native";
import {styles, direction, box, Box, Footer, classes} from './Remote';

const RemoteViewLeft = ({ setFpvRemoteView }) => {

    const [takeoff, setTakeoff] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <View>
            <View style={[ classes.startAndStop ]}>
                <Button onPress={() => {} } block info rounded iconLeft>
                    <Text> START / STOP </Text>
                </Button>
            </View>

            <View style={[ classes.rotation ]}>
                <View style={[ classes.circle ]} />
            </View>
        </View>

        /*<View style={[ styles.gamepadView, { flex: 1 } ]}>

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

            <View style={[ styles.gamepadLine, { flex: 2, backgroundColor: '#DE3163' } ]}>
                <View style={[ styles.centeredItem ]}>
                    <Box { ...box.rotationProps } />
                </View>
                <View style={[ styles.centeredItem ]}>
                    <Box { ...box.altitudeProps } />
                </View>
            </View>

            <View style={[ styles.gamepadLine, { flex: 1 } ]}>
                <Footer loading={ loading }
                        takeoff={ takeoff }
                        setTakeoff={ setTakeoff }
                        setFpvRemoteView={ setFpvRemoteView } />
            </View>
        </View>*/
    );
};

export default RemoteViewLeft
