import React, { useEffect, useState } from "react";

import { MainLoader } from "../core";
import { Column, useToast } from "native-base";
import { lockAsync, OrientationLock } from "expo-screen-orientation";

import { SignIn, SignUp } from "./Auth";

import { redirectTo } from "./../tools";

const AuthScreen = (
    {
        state: {
            appUser, setAppUser,
            loading, setLoading,
            googlePromptAsync,
        },
        navigation,
    }
) => {

    const toast = useToast();

    // == useState ===

    const [isSignIn, setSignIn] = useState(true);

    // == useEffect ===

    useEffect(() => {
        if (appUser)
            redirectTo.Home(navigation);
        lockAsync(OrientationLock.PORTRAIT);
    }, []);

    useEffect(() => {
        if (appUser)
            redirectTo.Home(navigation);
    }, [appUser]);

    useEffect(() => {
        return navigation.addListener('focus', () => {
            if (appUser)
                redirectTo.Home(navigation);
            lockAsync(OrientationLock.PORTRAIT);
        });
    }, [navigation]);

    const signState = {
        toast,
        appUser, setAppUser,
        loading, setLoading,
        isSignIn, setSignIn,
    };

    return (
        <Column px={40} pt={80}>
            { isSignIn &&
                <SignIn state={{ ...signState, googlePromptAsync }} />
            }
            { !isSignIn &&
                <SignUp state={{ ...signState }} />
            }
            { loading && <MainLoader /> }
        </Column>
    );
};

export default AuthScreen
