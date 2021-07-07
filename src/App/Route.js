/*
Différentes routes de l'application
*/

import React from "react"

import { HeaderBackButton } from "@react-navigation/stack"

import { redirect_to } from './../tools'

const forFade = ({ current }) => ({
    cardStyle: {
        opacity: current.progress
    }
});

const fpv = {
    name: 'fpv',
    options: ({ navigation }) => ({
        title: 'My FPV Screen',
        cardStyleInterpolator: forFade,
        headerLeft: () => (
            <HeaderBackButton
                onPress={ () => {
                    redirect_to.home(navigation);
                    setTimeout(function () {
                        alert(`Pensez à vous reconnecter à Internet 😎`);
                    },100);
                }}
            />
        )
    }),
};

const auth = {
    name: 'auth',
    options: {
        headerShown: false,
        cardStyleInterpolator: forFade
    }
};

const home = {
    name: 'home',
    options: {
        headerShown: false,
        cardStyleInterpolator: forFade
    }
};

export {
    fpv,
    auth,
    home,
};
