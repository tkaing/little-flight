import React, {useEffect, useState} from "react";

import {Button, Icon, Text, useToast} from "native-base";

import * as app_common from "./../App/Common";

import {load, on} from './../tools'
import * as Google from "expo-auth-session/providers/google";

const GoogleConnect = (
    {
        state: {
            appUser, setAppUser,
            loading, setLoading
        }
    }
) => {

    const toast = useToast();

    const [GoogleResponse, setGoogleResponse] = useState();

    const [,response, promptAsync] = Google.useAuthRequest({
        iosClientId: '817789782056-kkqgj9ec0sl5lhae82gg3cu7f1q8ebjo.apps.googleusercontent.com',
        expoClientId: '817789782056-50c858j1vr440iaoegqksn3442ql6ljr.apps.googleusercontent.com',
        androidClientId: '817789782056-2i4ju976pjcs7nl9qur39ov6anl6leum.apps.googleusercontent.com',
    });

    useEffect(() => {
        if (response && !GoogleResponse) {
            on.auth.signInWithGoogle(
                { toast }, {
                    appUser, setAppUser,
                    loading, setLoading,
                    GoogleResponse: response
                }
            );
            setGoogleResponse(response);
        }
    }, [response]);

    return (
        <Button
            width="70%"
            variant="red"
            onPress={
                () => {
                    promptAsync().finally(() => {
                        if (GoogleResponse) {
                            on.auth.signInWithGoogle(
                                { toast }, {
                                    appUser, setAppUser,
                                    loading, setLoading,
                                    GoogleResponse
                                }
                            );
                        }
                    })
                }
            }
            marginTop={5}
            startIcon={ <Icon { ...app_common.Icon.forButton } name='logo-google' /> }>
            <Text>Log in with Google</Text>
        </Button>
    );
};

export default GoogleConnect
