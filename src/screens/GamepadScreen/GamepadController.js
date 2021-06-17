import React from 'react';
//import { View } from 'react-native';
import { Text, View, Content} from "native-base";
import { WebView } from 'react-native-webview';

const HTML = `
<!DOCTYPE html>\n
<html>
  <head>
    <title>Alerts</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=320, user-scalable=no">
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        font: 62.5% arial, sans-serif;
        background: #ccc;
      }
    </style>
  </head>
  <script>
  window.addEventListener('gamepadconnected', function (e) {
    window.alert(
      'Gamepad connected at index %d: %s. %d buttons, %d axes.',
      e.gamepad.index,
      e.gamepad.id,
      e.gamepad.buttons.length,
      e.gamepad.axes.length
    )
  })
  </script>
  <body>
    <p> Test </p>
    <p id="demo"></p>    
  </body>
</html>
`;

export default class GamepadController extends React.Component {
	parseMessage(data){
        console.log("data : " + data);
		data = JSON.parse(data);
		if(data.type == 'data'){
			if(this.props.onData) this.props.onData(data.data);
		}else if(data.type == 'connect'){
			if(this.props.onConnect) this.props.onConnect(data.data);
		}else if(data.type == 'disconnect'){
			if(this.props.onDisconnectt) this.props.onDisconnect(data.data);
		}
	}

	render() {
		return (
			<View style={{flex:1}}>
            <Text> vfdv</Text>
			<WebView
				source={{html: HTML}}
                //mixedContentMode={'compatibility'}
				//onMessage={(evt)=> this.parseMessage(evt.nativeEvent.data)}
                /*onMessage={(event) => {
                    console.log('event: ', event)
                  }}*/
                javaScriptEnabled={true}
				//injectedJavaScript={`console.log("jzjz");`}
			/>
			</View>
		);
	}
}
