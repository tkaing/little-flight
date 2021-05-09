import React from 'react';
import Home from "../../screens/HomeScreen/Home";
import Profile from "../../screens/HomeScreen/Profile";
import History from "../../screens/HomeScreen/History";
import Settings from "../../screens/HomeScreen/Settings";
import Recordings from "../../screens/HomeScreen/Recordings";

const listOfTabs = [
    {
        name: 'home',
        icon: 'home-sharp',
        style: {},
        content: <Home />
    },
    {
        name: 'history',
        icon: 'analytics-outline',
        style: {},
        content: <History />
    },
    {
        name: 'recordings',
        icon: 'film',
        style: { /*fontSize: 9*/ },
        content: <Recordings />
    },
    {
        name: 'settings',
        icon: 'settings',
        style: {},
        content: <Settings />
    },
    {
        name: 'profile',
        icon: 'person',
        style: {},
        content: <Profile />
    },
];

export { listOfTabs };