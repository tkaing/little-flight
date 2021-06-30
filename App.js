import React, { useState } from 'react';

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

import Theme from "./src/App/Theme";

import * as app_route from "./src/App/Route";
import * as api_firebase from "./src/Api/Firebase";

import { useToast } from "native-base";

import { load } from "./src/tools";

const Stack = createStackNavigator();

const App = () => {

    const toast = useToast();

    // === useState ===

    const [appUser, setAppUser] = useState();
    const [loading, setLoading] = useState(false);

    // === useFonts ===

    const [fontsLoaded] = useFonts({
        Roboto: Roboto_400Regular,
        Roboto_medium: Roboto_500Medium,
        ...Ionicons.font
    });

    // === useEffect ===

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
                                            appUser, setAppUser,
                                            loading, setLoading,
                                        }} />
                        ) }
                    </Stack.Screen>
                    <Stack.Screen
                        name={ app_route.home.name }
                        options={ app_route.home.options }>
                        { props => (
                            <HomeScreen { ...props }
                                        state={{
                                            appUser, setAppUser,
                                            loading, setLoading,
                                        }} />
                        ) }
                    </Stack.Screen>
                    <Stack.Screen
                        name={ app_route.fpv.name }
                        options={ app_route.fpv.options }>
                        { props => (
                            <FpvScreen { ...props }
                                        state={{
                                            appUser, setAppUser,
                                            loading, setLoading,
                                        }} />
                        ) }
                    </Stack.Screen>
                    </Stack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}

export default App
