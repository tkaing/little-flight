import React from "react";
import { Button, Icon, Text } from "native-base";
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';

const discovery = {
    authorizationEndpoint: 'https://id.twitch.tv/oauth2/authorize',
    tokenEndpoint: 'https://id.twitch.tv/oauth2/token',
    revocationEndpoint: 'https://id.twitch.tv/oauth2/revoke',
};

const TwitchConnect = ({ style, setLoading }) => {

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: 'CLIENT_ID',
            redirectUri: makeRedirectUri({
                scheme: 'your.app'
            }),
            scopes: ['openid', 'user_read', 'analytics:read:games'],
        },
        discovery
    );

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
            <Icon name='logo-twitch' />
            <Text>Log in with Twitch</Text>
        </Button>
    )
};

export default TwitchConnect;