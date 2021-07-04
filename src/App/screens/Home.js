import React from 'react';

import { translate } from '../../locale/local';

import {
    Home,
    History,
    Profile,
    Settings,
    Recordings
} from "../../screens/Home";

const listOfTabs = [
    {
        name: translate("HOME"),
        icon: 'home-sharp',
        style: {},
        content: <Home />
    },
    {
        name: translate("HISTORY"),
        icon: 'analytics-outline',
        style: {},
        content: <History />
    },
    {
        name: translate("RECORDING"),
        icon: 'film',
        style: { /*fontSize: 9*/ },
        content: <Recordings />
    },
    {
        name: translate("SETTING"),
        icon: 'settings',
        style: {},
        content: <Settings />
    },
    {
        name: translate("PROFILE"),
        icon: 'person',
        style: {},
        content: <Profile />
    },
];

export { listOfTabs };
