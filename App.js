import React, { useState, useEffect } from 'react';

import axios from "axios";
import getTheme from './native-base-theme/components';
import Platform from './native-base-theme/variables/platform';
import FpvScreen from "./src/screens/FpvScreen";
import AppLoading from "expo-app-loading/src/AppLoading";
import AuthScreen from "./src/screens/AuthScreen";
import HomeScreen from "./src/screens/HomeScreen";
import * as Google from "expo-auth-session/providers/google";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import * as SecureStore from "expo-secure-store";
import { createStackNavigator } from '@react-navigation/stack';
import { Root, StyleProvider, Toast } from "native-base";
import { NavigationContainer, DarkTheme } from '@react-navigation/native';

import * as api_default from "./src/api/api_default";
import * as api_firebase from "./src/api/api_firebase";
import * as api_secure_store from "./src/api/api_secure_store";

import { FpvRoute, AuthRoute, HomeRoute } from "./src/app/app_route";

const Stack = createStackNavigator();

const App = () => {

    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState();

    const [,response, promptAsync] = Google.useAuthRequest({
        iosClientId: '817789782056-kkqgj9ec0sl5lhae82gg3cu7f1q8ebjo.apps.googleusercontent.com',
        expoClientId: '817789782056-50c858j1vr440iaoegqksn3442ql6ljr.apps.googleusercontent.com',
        androidClientId: '817789782056-2i4ju976pjcs7nl9qur39ov6anl6leum.apps.googleusercontent.com',
    });

    const Handling = {
        showToast: (message) => {
            Toast.show({
                text: message,
                type: 'warning',
                duration: 10000
            });
        },
        loadCurrentUser: async () => {
            const currentToken = await SecureStore.getItemAsync(api_secure_store.TOKEN);
            if (currentToken && !currentUser) {
                try {
                    setLoading(true);
                    const defaultApiResponse = await axios.get(api_default.person.find_by_token(), {
                        headers: { 'Authorization': `Bearer ${ currentToken }` }
                    });
                    const { email, username } = defaultApiResponse.data;
                    setCurrentUser({ email: email, username: username });
                    setLoading(false);
                } catch (failure) {
                    setLoading(false);
                    Handling.showToast('Invalid/Expired token');
                    await SecureStore.deleteItemAsync(api_secure_store.TOKEN);
                    setCurrentUser(undefined);
                }
            }
        },
        responseCallback: async () => {
            if (response) {
                setLoading(true);
                if (response.type === 'error') {
                    Handling.showToast('Unable to connect to Google');
                    setLoading(false);
                }
                if (response.type === 'success') {
                    try {
                        const accessToken = response.params.access_token;
                        const defaultApiResponse = await axios.post(api_default.person.sign_in_with_google(accessToken));
                        const defaultApiToken = defaultApiResponse.data.jwt;
                        await SecureStore.setItemAsync(api_secure_store.TOKEN, defaultApiToken);
                        setLoading(false);
                        await Handling.loadCurrentUser();
                    } catch (failure) {
                        Handling.showToast('Unable to connect to Google');
                        setLoading(false);
                    }
                }
            }
        }
    };

    /*useEffect(async () => {
        await SecureStore.deleteItemAsync(api_secure_store.TOKEN);
    }, []);*/

    useEffect(() => {
        Handling.responseCallback();
    }, [response]);

    useEffect(() => {
        Handling.loadCurrentUser();
    }, [currentUser]);

    const [fontsLoaded] = useFonts({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font
    });

    if (!firebase.apps.length)
        firebase.initializeApp(api_firebase.config);

    if (!fontsLoaded)
        return <AppLoading />;

    return (
        <Root>
            <StyleProvider style={ getTheme(Platform) }>
                <NavigationContainer theme={ DarkTheme }>
                    <Stack.Navigator>
                        <Stack.Screen
                            name={ AuthRoute.name }
                            options={ AuthRoute.options }>
                            { (props) => (
                                <AuthScreen { ...props }
                                            loading={ loading }
                                            setLoading={ setLoading }
                                            currentUser={ currentUser }
                                            loadCurrentUser={ Handling.loadCurrentUser }
                                            googlePromptAsync={ promptAsync } />
                            ) }
                        </Stack.Screen>
                        <Stack.Screen
                            name={ HomeRoute.name }
                            options={ HomeRoute.options }
                            component={ HomeScreen }
                        />
                        <Stack.Screen
                            name={ FpvRoute.name }
                            options={ FpvRoute.options }
                            component={ FpvScreen }
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </StyleProvider>
        </Root>
    );
}

export default App;