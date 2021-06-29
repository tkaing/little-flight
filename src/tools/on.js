import axios from "axios";
import Share from 'react-native-share';

import * as SecureStore from "expo-secure-store";

import * as api_node_js from "../Api/Nodejs";
import * as app_service from "../App/Service";
import * as api_secure_store from "../Api/SecureStore";

import { load, redirectTo } from ".";

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

                const apiResponse = await axios.post(
                    api_node_js.PersonCall.sign_in(), {
                        email: email,
                        password: password,
                    }, { timeout: 5000 }
                );
                const apiToken = apiResponse.data.jwt;
                await SecureStore.setItemAsync(api_secure_store.TOKEN, apiToken);

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

            await load.app.appUser({}, {
                toast,
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

                const apiResponse = await axios.post(
                    api_node_js.PersonCall.sign_up(), {
                        email: email,
                        password: password,
                        username: username,
                    }, { timeout: 5000 }
                );
                const apiToken = apiResponse.data.jwt;
                await SecureStore.setItemAsync(api_secure_store.TOKEN, apiToken);

                setLoading(false);

                await load.app.appUser({}, {
                    appUser, setAppUser,
                    loading, setLoading,
                });

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
                    app_service.toast(toast, 'danger', `Sign up failed.`);
                }
                setLoading(false);
            }
        },
        signInWithGoogle: (googlePromptAsync) => googlePromptAsync()
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
            acceptFriend: async ({ friendId, navigation }, {
                setAppUser,
                loadingBtn,
                setLoadingBtn,
                setListOfFriends
            }) => {
                try {
                    setLoadingBtn(true);

                    const _response = await axios.patch(
                        api_node_js.PersonCall.accept_friend(friendId), {}, await api_node_js.Config()
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
                                setAppUser();
                                redirectTo.Auth(navigation);
                                break;
                            case 'Malformed token.':
                                setAppUser();
                                redirectTo.Auth(navigation);
                                break;
                        }
                    }
                }
            },
            rejectFriend: async ({ friendId, navigation }, {
                setAppUser,
                loadingBtn,
                setLoadingBtn,
                setListOfFriends
            }) => {
                try {
                    setLoadingBtn(true);

                    const _response = await axios.delete(
                        api_node_js.PersonCall.reject_friend(friendId), await api_node_js.Config()
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
                                setAppUser();
                                redirectTo.Auth(navigation);
                                break;
                        }
                    }
                }
            },
            searchFriend: async ({ navigation }, {
                toast, username,
                appUser, setAppUser,
                loadingBtn, setLoadingBtn,
            }) => {
                try {
                    setLoadingBtn(true);

                    const _token = await SecureStore.getItemAsync(api_secure_store.TOKEN);

                    const _response = await axios.post(
                        api_node_js.PersonCall.add_friend(),
                        {username: username},
                        {timeout: 5000, headers: {'Authorization': `Bearer ${_token}`}}
                    );

                    setLoadingBtn(false);

                    const _data = _response.data;

                    console.log("=== SEARCH FRIEND DATA ===", _data);

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
                            setAppUser();
                            redirectTo.Auth(navigation);
                            break;
                    }
                }
            },
        }
    },
}
