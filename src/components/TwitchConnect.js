import React from "react";
import { Button, Icon, Text } from "native-base";
import * as Facebook from 'expo-auth-session/providers/facebook';
import { ResponseType } from 'expo-auth-session';

const TwitchConnect = ({ style, setLoading }) => {

    const [request, response, promptAsync] = Facebook.useAuthRequest({
        clientId: '1875589772595925',
        iosClientId: '1875589772595925',
        androidClientId: '1875589772595925',
        responseType: ResponseType.Code,
    });

    React.useEffect(() => {
        console.log("FB REQUEST", request);
        console.log("FB RESPONSE", response);
    }, [request, response]);

    const Handling = {
        signInAsync: () => {
            setLoading(true);
            promptAsync()
                .then((result) => console.log(result))
                .catch((failure) => console.log(failure))
                .finally(() => setLoading(false));
        }
    };

    return (
        <Button block primary rounded iconLeft style={{ ...style }}
                onPress={ () => Handling.signInAsync() }>
            <Icon name='logo-facebook' />
            <Text>Log in with Facebook</Text>
        </Button>
    )
};


export default TwitchConnect;