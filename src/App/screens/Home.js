import React from 'react';

import {
    Home,
    History,
    Profile,
    Settings,
    Recordings
} from "../../screens/Home";

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
