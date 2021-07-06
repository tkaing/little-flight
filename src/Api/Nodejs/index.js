import PersonCall from './calls/PersonCall';
import FriendCall from './calls/FriendCall';
import ReportCall from './calls/ReportCall';
import SessionCall from './calls/SessionCall';

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
    PersonCall,
    FriendCall,
    ReportCall,
    SessionCall, 
    DronyCall
};
