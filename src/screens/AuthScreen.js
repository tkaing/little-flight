import React, { useEffect, useState } from "react";

import SignIn from "./AuthScreen/SignIn";
import SignUp from "./AuthScreen/SignUp";
import MainLoader from "../components/core/MainLoader";
import { Container, Content } from "native-base";
import { lockAsync, OrientationLock } from "expo-screen-orientation";

import { HomeRoute } from '../app/app_route';

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
        RedirectToHome: () => navigation.navigate(HomeRoute.name),
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
            <Content style={{ flexDirection: 'column' }}
                     padder
                     contentContainerStyle={{ ...styles.content }}>
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

const styles = {
    content: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    }
};

export default AuthScreen;