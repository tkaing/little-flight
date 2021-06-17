import React, { useState, useEffect } from 'react';

import * as Google from "expo-auth-session/providers/google";
import * as firebase from "firebase";
import * as SecureStore from "expo-secure-store";

import axios from "axios";
import getTheme from './native-base-theme/components';
import Platform from './native-base-theme/variables/platform';
import AppLoading from "expo-app-loading/src/AppLoading";

import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Root, StyleProvider } from "native-base";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';

import FpvScreen from "./src/screens/FpvScreen.js";
import HomeScreen from "./src/screens/HomeScreen.js";
import AuthScreen from "./src/screens/AuthScreen.js";

import * as app_route from "./src/App/Route";
import * as app_service from "./src/App/Service";

import * as api_node_js from "./src/Api/Nodejs";
import * as api_firebase from "./src/Api/Firebase";
import * as api_secure_store from "./src/Api/SecureStore";

const Stack = createStackNavigator();

const App = () => {

    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState();

    const [,response, promptAsync] = Google.useAuthRequest({
        iosClientId: '817789782056-kkqgj9ec0sl5lhae82gg3cu7f1q8ebjo.apps.googleusercontent.com',
        expoClientId: '817789782056-50c858j1vr440iaoegqksn3442ql6ljr.apps.googleusercontent.com',
        androidClientId: '817789782056-2i4ju976pjcs7nl9qur39ov6anl6leum.apps.googleusercontent.com',
    });

    const on = {
        loadCurrentUser: async () => {

            const currentToken = await SecureStore.getItemAsync(api_secure_store.TOKEN);

            if (currentToken) {
                if (currentUser) {
                    setLoading(false);
                } else {
                    try {
                        setLoading(true);

                        const { data } = await axios.get(
                            api_node_js.PersonCall.find_by_token(), {
                                headers: {'Authorization': `Bearer ${ currentToken }`}, timeout: 5000
                            }
                        );
                        const { email, username } = data;

                        setLoading(false);
                        setCurrentUser({ email: email, username: username });

                    } catch (failure) {

                        setLoading(false);
                        app_service.toast(
                            'danger',
                            failure.code === 'ECONNABORTED'
                                ? `Unable to connect to Api.`
                                : `Session expired. Please try to sign in again.`
                        );

                        await SecureStore.deleteItemAsync(api_secure_store.TOKEN);
                        setCurrentUser(undefined);
                    }
                }
            }
        },
        responseCallback: async () => {
            if (response) {
                try {
                    setLoading(true);

                    if (response.type === 'error') {
                        setLoading(false);
                        app_service.toast(
                            'danger', 'Unable to connect to Google'
                        );
                    }
                    if (response.type === 'success') {

                        const accessToken = response.params.access_token;

                        const { data } = await axios.post(
                            api_node_js.PersonCall.sign_in_with_google(accessToken),
                            {}, { timeout: 5000 }
                        );

                        await SecureStore.setItemAsync(api_secure_store.TOKEN, data.jwt);
                        await on.loadCurrentUser();
                    }
                } catch (failure) {
                    setLoading(false);
                    app_service.toast(
                        'danger',
                        failure.code === 'ECONNABORTED' || failure.message === 'Network Error'
                            ? `Unable to connect to Api.`
                            : `Unable to connect to Google.`
                    );
                }
            }
        }
    };

    useEffect(() => {
        on.responseCallback();
    }, [response]);

    useEffect(() => {
        on.loadCurrentUser();
    }, [currentUser]);

    const [fontsLoaded] = useFonts({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font
    });

    if (!firebase.apps.length)
        firebase.initializeApp(api_firebase.Config);

    if (!fontsLoaded)
        return <AppLoading />;

    return (
        <Root>
            <StyleProvider style={ getTheme(Platform) }>
                <NavigationContainer theme={ DarkTheme }>
                    <Stack.Navigator>
                        <Stack.Screen
                            name={ app_route.auth.name }
                            options={ app_route.auth.options }>
                            { (props) => (
                                <AuthScreen { ...props }
                                            loading={ loading }
                                            setLoading={ setLoading }
                                            currentUser={ currentUser }
                                            loadCurrentUser={ on.loadCurrentUser }
                                            googlePromptAsync={ promptAsync } />
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
            </StyleProvider>
        </Root>
    );
}

export default App
