import React, { useState } from "react";

import { Icon, View } from "native-base";
import { TouchableHighlight } from "react-native";
import { styles, direction, box, Box, Footer } from './Remote';

const RemoteView = ({ setFpvRemoteView }) => {

    const [takeoff, setTakeoff] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <View style={[ styles.gamepadView, { flex: 1 } ]}>

            {/* SECTION = 4 DIRECTIONS */}
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

            {/* SECTION = ROTATE AND UP/DOWN */}
            <View style={[ styles.gamepadLine, { flex: 2, backgroundColor: '#DE3163' } ]}>
                <View style={[ styles.centeredItem ]}>
                    <Box { ...box.rotationProps } />
                </View>
                <View style={[ styles.centeredItem ]}>
                    <Box { ...box.altitudeProps } />
                </View>
            </View>

            {/* SECTION = FOOTER */}
            <View style={[ styles.gamepadLine, { flex: 1 } ]}>
                <Footer loading={ loading }
                        takeoff={ takeoff }
                        setTakeoff={ setTakeoff }
                        setFpvRemoteView={ setFpvRemoteView } />
            </View>
        </View>
    );
};

export default RemoteView
