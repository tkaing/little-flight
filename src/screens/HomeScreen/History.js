import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import GamepadController from "../GamepadScreen/GamepadController";
import 'react-native-get-random-values';
import { WebView } from 'react-native-webview';
import AxisBar from "../GamepadScreen/AxisBar";




const History = ({  }) => {

    const [gamepads, setGamepads] = useState([]);

	/*onGamepadData(data){
		let gamepads = this.state.gamepads;
		gamepads[data.gamepadID] = data;
		this.setState({gamepads: gamepads});
	}

    onGamepadConnected(gamepadID){
		console.log('Connected gamepad', gamepadID);
	}*/


    const onData = {
        onGamepadData: (data) => {
            gamepadsOn[data.gamepadID] = data;
            setGamepads([...gamepadsOn]);
        }
    }

    const onConnect = {
        onGamepadConnected: (gamepadID) => {
            console.log('Connected gamepad', gamepadID);
        }
    }

    return (
        <View style={{flex:1, marginTop: 25, padding: 10}}>
            <GamepadController
                onConnect={(data) =>  onConnect.onGamepadConnected(data) }
                onData={(data)=> onData.onGamepadData(data) }
            />
            <Text> 
                Laaaal
            </Text>

            {
                gamepads.length == 0 ? (
                    <Text>There are no connected gamepads. Make sure you're connected, then press some buttons</Text>
                ):(
                    <View>
                        <Text>Gamepads: {gamepads.length}</Text>
                        {
                            gamepads.map((pad, i) => {
                                console.log(gamepads.length)
                                return <ControllerView key={i} axes={pad.axes} buttons={pad.buttons} />
                            })
                        }
                    </View>
                )
            }
        </View>
    );
}

class ControllerView extends React.Component {
	render() {
		return (
			<View>
				<View>
				{
					this.props.axes.map((value, i) => <AxisBar key={i} value={value} text={'Axis ' + i + ': ' + value} />)
				}
				</View>

				<View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>{
					this.props.buttons.map((value, i) =>
						<Text key={i}
							style={{
								borderWidth:1,
								backgroundColor: value ? '#22f5': '#fff',
								borderColor: '#22f5',
								padding: 4,
								margin: 4,
								width: 32,
								borderRadius:16,
								textAlign: 'center',
							}}
						>{i}</Text>)
				}</View>
			</View>
		);
	}
}

export default History;