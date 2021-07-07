import React, { useEffect, useState } from "react";

import { MainLoader } from "../core";
import { Column, useToast, Image } from "native-base";
import { lockAsync, OrientationLock } from "expo-screen-orientation";

import { SignIn, SignUp } from "./Auth";

import { load, redirect_to } from "./../tools";


const AuthScreen = (
    {
        state: {
            appUser, setAppUser,
            loading, setLoading,
        },
        navigation,
    }
) => {

    const toast = useToast();

    // == useState ===

    const [isSignIn, setSignIn] = useState(true);

    // == useEffect ===

    useEffect(() => {
        load.appUser({ toast }, {
            appUser, setAppUser,
            loading, setLoading,
        });
        //lockAsync(OrientationLock.PORTRAIT);
    }, []);

    useEffect(() => {
        console.log("=== BLABLA ===", appUser);
        if (appUser)
            redirect_to.home(navigation);
    }, [appUser]);

    useEffect(() => {
        //return navigation.addListener('focus', () => {
            //lockAsync(OrientationLock.PORTRAIT);
        //});
    }, [navigation]);

    const signState = {
        toast,
        appUser, setAppUser,
        loading, setLoading,
        isSignIn, setSignIn,
    };

    return (
        <Column px={10} pt={70} bg={"#282828"} flex={1}>

            <Image alt="logo" alignSelf="center" source={require('../../assets/DroneLogo.jpeg')} mb={10}/>

            { isSignIn &&
                <SignIn state={{ ...signState }} />
            }
            { !isSignIn &&
                <SignUp state={{ ...signState }} />
            }
            { loading && <MainLoader /> }
        </Column>
    );
};

export default AuthScreen
