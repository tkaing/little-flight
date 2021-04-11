import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleProvider } from "native-base";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import getTheme from './native-base-theme/components';
import Platform from './native-base-theme/variables/platform';
import AppLoading from "expo-app-loading/src/AppLoading";
import AppScreen from "./src/application/app_screen";

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
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name={ AppScreen.Home.name }
                        component={ AppScreen.Home.component }
                        options={{ title: 'My Home' }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </StyleProvider>
    );
}

export default App;