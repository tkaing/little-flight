import React, { useState } from "react";
import { Content, Text, View } from "native-base";
import { useGamepads } from 'react-gamepads';

const Profile = ({ navigation }) => {
    const [gamepads, setGamepads] = useState({})
    useGamepads((gamepads) => setGamepads(gamepads))
    console.log(gamepads.length);
    return (
        <Content>
            <View>
                {gamepads[0].buttons[4].pressed ? 'Pressed' : 'Not Pressed'}
            </View>
        </Content>
    )
};

export default Profile;