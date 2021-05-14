import React from "react";

import { Container, Text, View } from "native-base";
import FpvRemote from "./FpvScreen/FpvRemote";

const FpvScreen = (
    { navigation }
) => {

    return (
        <Container>
            <View style={{ ...styles.content }}>

                <View style={{ ...styles.streamView }}>
                    <Text>xxx</Text>
                </View>

                <View style={{ ...styles.remoteView }}>
                    <FpvRemote />
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
    streamView: { flex: 2 },
    remoteView: { flex: 1 },
};

export default FpvScreen;