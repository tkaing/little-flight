import React, { useEffect, useState } from "react";

import { MainLoader } from "../core";
import { Container, Content } from "native-base";
import { lockAsync, OrientationLock } from "expo-screen-orientation";

import { SignIn, SignUp, styles } from "./Auth";
import * as app_route from '../App/Route';

const AuthScreen = (
    {
        loading,
        setLoading,
        navigation,
        currentUser,
        loadCurrentUser,
        googlePromptAsync
    }
) => {

    const [isSignIn, setSignIn] = useState(true);

    const on = {
        RedirectToHome: () => navigation.navigate(app_route.home.name),
        SignInWithGoogle: () => googlePromptAsync()
    };

    useEffect(() => {
        if (currentUser)
            on.RedirectToHome();
        lockAsync(OrientationLock.PORTRAIT);
    }, []);

    useEffect(() => {
        return navigation.addListener('focus', () => {
            if (currentUser)
                on.RedirectToHome();
            lockAsync(OrientationLock.PORTRAIT);
        });
    }, [navigation]);

    useEffect(() => {
        if (currentUser)
            on.RedirectToHome();
    }, [currentUser]);

    return (
        <Container>
            <Content style={[ { flexDirection: 'column' } ]}
                     padder
                     contentContainerStyle={[ styles.content ]}>
                { isSignIn &&
                    <SignIn setSignIn={ setSignIn }
                            setLoading={ setLoading }
                            loadCurrentUser={ loadCurrentUser }
                            signInWithGoogle={ on.SignInWithGoogle } />
                }
                { !isSignIn &&
                    <SignUp setSignIn={ setSignIn }
                            setLoading={ setLoading }
                            loadCurrentUser={ loadCurrentUser } />
                }
                { loading && <MainLoader /> }
            </Content>
        </Container>
    );
};

export default AuthScreen
