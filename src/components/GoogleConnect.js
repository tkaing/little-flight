import React from "react";
import { Button, Icon, Text } from "native-base";

const GoogleConnect = ({ style, setLoading, signInWithGoogle }) => {

    const on = {
        signInWithGoogle: () => {
            setLoading(true);
            signInWithGoogle()
                .finally(() => setLoading(false));
        }
    };

    return (
        <Button block danger rounded iconLeft style={[ ...style ]}
                onPress={ () => on.signInWithGoogle() }>
            <Icon name='logo-google' />
            <Text>Log in with Google</Text>
        </Button>
    )
};

export default GoogleConnect
