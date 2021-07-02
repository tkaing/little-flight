import PersonCall from './calls/PersonCall';
import PersonModel from './models/PersonModel';

import FriendCall from './calls/FriendCall';
import FriendModel from './models/FriendModel';

import ReportCall from './calls/ReportCall';

import * as SecureStore from "expo-secure-store";
import * as api_secure_store from "../SecureStore";

const Config = async (withToken = true) => {
    const _token = withToken ? await SecureStore.getItemAsync(api_secure_store.TOKEN) : "";
    return {
        timeout: 5000,
        headers: { 'Authorization': `Bearer ${ _token }` }
    };
};

export {
    Config,
    // Person
    PersonCall,
    PersonModel,
    ReportCall,
    // Friend
    FriendCall,
    FriendModel,
};
