import React from 'react';
import {
    HomeView,
    HistoryView,
    ProfileView,
    SettingsView,
    RecordingsView,
} from "../../screens/Home";

const listOfTabs = [
    {
        name: 'home',
        icon: 'home-sharp',
        style: {},
        content: <HomeView />
    },
    {
        name: 'history',
        icon: 'analytics-outline',
        style: {},
        content: <HistoryView />
    },
    {
        name: 'recordings',
        icon: 'film',
        style: { /*fontSize: 9*/ },
        content: <RecordingsView />
    },
    {
        name: 'settings',
        icon: 'settings',
        style: {},
        content: <SettingsView />
    },
    {
        name: 'profile',
        icon: 'person',
        style: {},
        content: <ProfileView />
    },
];

export { listOfTabs };
