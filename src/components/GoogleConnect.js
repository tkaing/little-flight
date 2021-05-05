import React from "react";
import * as Google from "expo-auth-session/providers/google";
import { Button, Icon, Text } from "native-base";

const GoogleConnect = ({ style, setLoading }) => {

    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: '817789782056-kkqgj9ec0sl5lhae82gg3cu7f1q8ebjo.apps.googleusercontent.com',
        expoClientId: '817789782056-50c858j1vr440iaoegqksn3442ql6ljr.apps.googleusercontent.com',
        androidClientId: '817789782056-2i4ju976pjcs7nl9qur39ov6anl6leum.apps.googleusercontent.com',
    });

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
        <Button block danger rounded iconLeft style={{ ...style }}
                onPress={ () => Handling.signInAsync() }>
            <Icon name='logo-google' />
            <Text>Log in with Google</Text>
        </Button>
    )
};

export default GoogleConnect;