import React from "react";

import { Button, Icon, Text } from "native-base";

import * as app_common from "./../App/Common";

const GoogleConnect = ({ setLoading, signInWithGoogle }) => {

    const on = {
        signInWithGoogle: () => {
            setLoading(true);
            signInWithGoogle()
                .finally( () => setLoading(false) );
        }
    };

    return (
        <Button
            width="70%"
            variant="red"
            marginTop={ 5 }
            onPress={ () => on.signInWithGoogle() }
            startIcon={ <Icon { ...app_common.Icon.forButton } name='logo-google' /> }>
            <Text>Log in with Google</Text>
        </Button>
    );
};

export default GoogleConnect
