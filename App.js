import React, { useState, useEffect } from 'react';

import * as Google from "expo-auth-session/providers/google";
import * as firebase from "firebase";

import AppLoading from "expo-app-loading/src/AppLoading";

import { Ionicons } from "@expo/vector-icons";
import { NativeBaseProvider } from "native-base/src/core/NativeBaseProvider";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { useFonts, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';

import FpvScreen from "./src/screens/FpvScreen.js";
import HomeScreen from "./src/screens/HomeScreen.js";
import AuthScreen from "./src/screens/AuthScreen.js";

import * as app_route from "./src/App/Route";
import * as api_firebase from "./src/Api/Firebase";

import { load } from "./src/tools";
import {useToast} from "native-base";
import Theme from "./src/App/Theme";

const Stack = createStackNavigator();

const App = () => {

    // === useState ===

    const [appUser, setAppUser] = useState();
    const [loading, setLoading] = useState(false);
    const [,response, promptAsync] = Google.useAuthRequest({
        iosClientId: '817789782056-kkqgj9ec0sl5lhae82gg3cu7f1q8ebjo.apps.googleusercontent.com',
        expoClientId: '817789782056-50c858j1vr440iaoegqksn3442ql6ljr.apps.googleusercontent.com',
        androidClientId: '817789782056-2i4ju976pjcs7nl9qur39ov6anl6leum.apps.googleusercontent.com',
    });

    // === useToast ===

    const toast = useToast();

    // === useFonts ===

    const [fontsLoaded] = useFonts({
        Roboto: Roboto_400Regular,
        Roboto_medium: Roboto_500Medium,
        ...Ionicons.font
    });

    // === useEffect ===

    useEffect(() => {
        load.app.appUser(
            {},
            {
                toast,
                appUser, setAppUser,
                loading, setLoading,
            }
        );
    }, [appUser]);

    useEffect(() => {
        load.app.googleAuthResponse(
            {},
            {
                response,
                appUser, setAppUser,
                loading, setLoading,
            }
        );
    }, [response]);

    if (!firebase.apps.length)
        firebase.initializeApp(api_firebase.Config);

    if (!fontsLoaded)
        return <AppLoading />;

    return (
        <NativeBaseProvider theme={ Theme }>
            <NavigationContainer theme={ DarkTheme }>
                <Stack.Navigator>
                    <Stack.Screen
                        name={ app_route.auth.name }
                        options={ app_route.auth.options }>
                        { props => (
                            <AuthScreen { ...props }
                                        state={{
                                            toast,
                                            appUser, setAppUser,
                                            loading, setLoading,
                                            googlePromptAsync: promptAsync
                                        }} />
                        ) }
                    </Stack.Screen>
                    <Stack.Screen
                        name={ app_route.home.name }
                        options={ app_route.home.options }
                        component={ HomeScreen }
                    />
                    <Stack.Screen
                        name={ app_route.fpv.name }
                        options={ app_route.fpv.options }
                        component={ FpvScreen }
                    />
                    </Stack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}

export default App
