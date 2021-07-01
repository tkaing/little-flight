import axios from "axios";
import Share from 'react-native-share';

import * as SecureStore from "expo-secure-store";

import * as api_node_js from "../Api/Nodejs";
import * as app_service from "../App/Service";
import * as api_secure_store from "../Api/SecureStore";

import { load, redirect_to } from ".";

export default {
    auth: {
        signInSubmit: async (
            { email, password }, {
                toast,
                appUser, setAppUser,
                loading, setLoading,
            }
        ) => {
            try {
                setLoading(true);

                const _response = await axios.post(
                    api_node_js.PersonCall.sign_in(), {
                        email: email,
                        password: password,
                    }, { timeout: 5000 }
                );

                const _token = _response.data.jwt;

                await SecureStore.setItemAsync(api_secure_store.TOKEN, _token);

                setLoading(false);

            } catch (failure) {

                if (failure.code === 'ECONNABORTED' || failure.message === 'Network Error') {
                    // timeout || network error
                    app_service.toast(toast, 'danger', `Unable to connect to Api. (${ failure.message })`);
                } else if (failure.response) {
                    // an error response (5xx, 4xx)
                    const { data } = failure.response;
                    app_service.toast(toast, 'danger', data);
                } else {
                    // anything else
                    app_service.toast(toast, 'danger', `Login failed.`);
                }

                setLoading(false);

                return;
            }

            await load.appUser({ toast }, {
                appUser, setAppUser,
                loading, setLoading,
            });
        },
        signUpSubmit: async (
            { email, password, username }, {
                toast,
                appUser, setAppUser,
                loading, setLoading,
            }
        ) => {
            try {
                setLoading(true);

                const _response = await axios.post(
                    api_node_js.PersonCall.sign_up(), {
                        email: email,
                        password: password,
                        username: username,
                    }, { timeout: 5000 }
                );

                const _token = _response.data.jwt;

                await SecureStore.setItemAsync(api_secure_store.TOKEN, _token);

                setLoading(false);

            } catch (failure) {

                if (failure.code === 'ECONNABORTED' || failure.message === 'Network Error') {
                    // timeout || network error
                    app_service.toast(toast, 'danger', `Unable to connect to Api. (${ failure.message })`);
                } else if (failure.response) {
                    // an error response (5xx, 4xx)
                    const _response = failure.response;
                    app_service.toast(toast, 'danger', _response.data);
                } else {
                    // anything else
                    app_service.toast(toast, 'danger', `Sign up failed.`);
                }

                setLoading(false);

                return;
            }

            await load.appUser({ toast }, {
                appUser, setAppUser,
                loading, setLoading,
            });
        },
        signInWithGoogle: async ({ toast }, {
            appUser, setAppUser,
            loading, setLoading,
            GoogleResponse
        }) => {

            console.log("=== GOOGLE ===");

            setLoading(true);

            try {

                if (GoogleResponse.type === 'error') {

                    setLoading(false);

                    app_service.toast(
                        toast,
                        'danger',
                        'Unable to connect to Google'
                    );

                    return;
                }

                if (GoogleResponse.type === 'success') {

                    const _token = GoogleResponse.params.access_token;

                    const _response = await axios.post(
                        api_node_js.PersonCall.sign_in_with_google(_token),
                        {}, { timeout: 5000 }
                    );

                    const _data = _response.data;

                    await SecureStore.setItemAsync(api_secure_store.TOKEN, _data.jwt);

                    setLoading(false);
                }

            } catch (failure) {

                setLoading(false);

                app_service.toast(
                    toast,
                    'danger',
                    failure.code === 'ECONNABORTED' || failure.message === 'Network Error'
                        ? `Unable to connect to Api.`
                        : `Unable to connect to Google. (ECONNABORTED)`
                );

                return;
            }

            await load.appUser({ toast }, {
                appUser, setAppUser,
                loading, setLoading,
            });
        }
    },
    home: {
        tabChange: ({ index }, { setTabIndex }) => setTabIndex(index),
        profile: {
            share: async () => {
                try {
                    const _response = await Share.open({
                        message: 'I\'m a droner! See my profile on the new app : LittleFlight',
                        //url: files.appLogo,
                        //urls: [files.image1, files.image2]
                    });
                    console.log('=== SHARE DATA ===', JSON.stringify(_response));

                } catch (failure) {

                    console.log('=== SHARE FAILURE ===', failure);
                }
            },
            addFriend: async ({ toast, navigation }, {
                username,
                setAppUser,
                setLoadingBtn,
                setListOfFriends,
            }) => {
                try {
                    setLoadingBtn(true);

                    const _response = await axios.post(
                        api_node_js.FriendCall.add(), { username: username }, await api_node_js.Config()
                    );

                    setLoadingBtn(false);

                    const _data = _response.data;

                    console.log("=== SEARCH FRIEND DATA ===", _data);

                    setListOfFriends(_data);

                    app_service.toast(toast, 'success', `Okay, ${username} is added !`);

                } catch (failure) {

                    setLoadingBtn(false);

                    const _response = failure.response;

                    //console.log("=== SEARCH FRIEND FAILURE ===", _response);

                    const _data = _response.data;

                    switch (_data) {
                        case 'MYSELF':
                            app_service.toast(toast, 'danger', `${username} __MYSELF__`);
                            break;
                        case 'PENDING':
                            app_service.toast(toast, 'danger', `${username} __PENDING__`);
                            break;
                        case 'ACCEPTED':
                            app_service.toast(toast, 'danger', `${username} __ACCEPTED__`);
                            break;
                        case 'NOT FOUND':
                            app_service.toast(toast, 'danger', `${username} doesn't exist`);
                            break;
                        case 'Invalid token.':
                            setAppUser(null);
                            redirect_to.auth(navigation);
                            break;
                    }
                }
            },
            acceptFriend: async ({ friendId, navigation }, {
                setAppUser,
                setLoadingBtn,
                setListOfFriends
            }) => {
                try {
                    setLoadingBtn(true);

                    const _response = await axios.patch(
                        api_node_js.FriendCall.accept(friendId), {}, await api_node_js.Config()
                    );

                    setLoadingBtn(false);

                    if (_response) {
                        const _data = _response.data;
                        setListOfFriends(_data);
                    }

                } catch (failure) {

                    setLoadingBtn(false);

                    const _response = failure.response;

                    if (_response) {

                        const _data = _response.data;

                        console.log("=== FJIOSJO ===", _data);

                        switch (_data) {
                            case 'Invalid token.':
                                setAppUser(null);
                                redirect_to.auth(navigation);
                                break;
                            case 'Malformed token.':
                                setAppUser(null);
                                redirect_to.auth(navigation);
                                break;
                        }
                    }
                }
            },
            rejectFriend: async ({ friendId, navigation }, {
                setAppUser,
                setLoadingBtn,
                setListOfFriends
            }) => {
                try {
                    setLoadingBtn(true);

                    const _response = await axios.delete(
                        api_node_js.FriendCall.reject(friendId), await api_node_js.Config()
                    );

                    setLoadingBtn(false);

                    if (_response) {
                        const _data = _response.data;
                        setListOfFriends(_data);
                    }

                } catch (failure) {

                    setLoadingBtn(false);

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
            },
        }
    },
}
