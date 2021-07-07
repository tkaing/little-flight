import axios from "axios";

import * as SecureStore from "expo-secure-store";

import * as api_node_js from "../Api/Nodejs";
import * as api_secure_store from "../Api/SecureStore";

import * as app_service from "../App/Service";

import { redirect_to } from './../tools'

export default {
    app: {},
    home: {
        profile: {
            listOfFriends: async ({ toast, navigation }, {
                setAppUser,
                setListOfFriends,
            }) => {
                try {
                    const _response = await axios.get(
                        api_node_js.FriendCall.list(), await api_node_js.Config()
                    );

                    if (_response) {
                        const _data = _response.data;
                        setListOfFriends(_data);
                    }

                } catch (failure) {

                    const _response = failure.response;

                    if (_response) {
                        const _data = _response.data;
                        console.log(_data);
                        switch (_data) {
                            case 'Invalid token.':
                                setAppUser(null);
                                redirect_to.auth(navigation);
                                break;
                        }
                    }
                }
            }
        },
        history: {
            listOfSessions: async ({ toast, navigation }, {
                setListOfSessions,
                setAppUser, setLoading
            }) => {
                try {
                    setLoading(true);

                    let overview = await SecureStore.getItemAsync(api_secure_store.TELLO_OVERVIEW);

                    if (overview && Array.isArray( JSON.parse(overview) ) ) {

                        overview = JSON.parse(overview);

                        console.log("=== OVERVIEW ===", overview);

                        if (overview.length > 0) {

                            const _response = await axios.post(
                                api_node_js.SessionCall.import(), {
                                    list: overview
                                }, await api_node_js.Config()
                            );

                            if (_response) {
                                setListOfSessions(_response.data);
                                await SecureStore.deleteItemAsync(api_secure_store.TELLO_OVERVIEW);
                            }
                        }
                    } else {

                        const _response = await axios.get(
                            api_node_js.SessionCall.list_by_token(), await api_node_js.Config()
                        );

                        if (_response) {
                            setListOfSessions(_response.data);
                            await SecureStore.deleteItemAsync(api_secure_store.TELLO_OVERVIEW);
                        }
                    }

                    setLoading(false);

                } catch (failure) {

                    setLoading(false);

                    const _response = failure.response;

                    if (_response) {
                        const _data = _response.data;
                        switch (_data) {
                            case 'Invalid token.':
                                setAppUser(null);
                                redirect_to.auth(navigation);
                                break;
                        }
                    }
                }
            }
        },
        recordings: {
            listOfFolders: () => {

            }
        }
    },
    appUser: async ({ toast }, {
        appUser, setAppUser,
        loading, setLoading,
    }) => {

        const currentToken = await SecureStore.getItemAsync(api_secure_store.TOKEN);

        if (currentToken) {

            if (!appUser) {

                try {

                    setLoading(true);

                    const { data } = await axios.get(
                        api_node_js.PersonCall.find_by_token(), await api_node_js.Config()
                    );

                    setLoading(false);

                    const { email, username, dronies } = data;

                    console.log("=== TOKEN ===", data);

                    setAppUser({ email, username, dronies });

                } catch (failure) {

                    setLoading(false);

                    app_service.toast(
                        toast,
                        'danger',
                        failure.code === 'ECONNABORTED'
                            ? `Unable to connect to Api.`
                            : `Session expired. Please try to sign in again.`
                    );

                    await SecureStore.deleteItemAsync(api_secure_store.TOKEN);

                    setAppUser(null);
                }
            }
        }
    }
}
