import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleProvider } from "native-base";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import getTheme from './native-base-theme/components';
import Platform from './native-base-theme/variables/platform';
import AppLoading from "expo-app-loading/src/AppLoading";
import { FpvRoute, AuthRoute, HomeRoute } from "./src/app/app_route";
import FpvScreen from "./src/screens/FpvScreen";
import AuthScreen from "./src/screens/AuthScreen";
import HomeScreen from "./src/screens/HomeScreen";

const Stack = createStackNavigator();

const App = () => {

    const [fontsLoaded] = useFonts({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font
    });

    if (!fontsLoaded)
        return <AppLoading />;

    return (
        <StyleProvider style={ getTheme(Platform) }>
            <NavigationContainer theme={ DarkTheme }>
                <Stack.Navigator>
                    <Stack.Screen
                        name={ AuthRoute.name }
                        options={ AuthRoute.options }
                        component={ AuthScreen }
                    />
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
    );
}

export default App;