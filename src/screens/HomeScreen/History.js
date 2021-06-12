import React, { useEffect, useState } from "react";
import { Text, View, Content} from "native-base";
import GamepadController from "../GamepadScreen/GamepadController";
import 'react-native-get-random-values';





//const History = ({  }) => {

    export default class Gamepad extends React.Component {
        constructor(){
            super();
    
            this.state = {gamepads: []};
        }
    
        onGamepadData(data){
            console.log('iici');
            let gamepads = this.state.gamepads;
            gamepads[data.gamepadID] = data;
            this.setState({gamepads: gamepads});
        }
    
        onGamepadConnected(gamepadID){
            console.log('Connected gamepad', gamepadID);
        }
    
        render() {
            return (
                <View style={{flex:1, marginTop: 25, padding: 10}}>
                    <GamepadController
                        onConnect={(data) => { this.onGamepadConnected(data) }}
                        onData={(data)=>{ this.onGamepadData(data) }}
                    />
    
                    {
                        this.state.gamepads.length == 0 ? (
                            <Text>There are no connected gamepads. Make sure you're connected, then press some buttons</Text>
                        ):(
                            <View>
                                <Text>Gamepads: {this.state.gamepads.length}</Text>
                                {
                                    this.state.gamepads.map((pad, i) => <ControllerView key={i} axes={pad.axes} buttons={pad.buttons} />)
                                }
                            </View>
                        )
                    }
                </View>
            );
        }
    }
//}

//export default History;