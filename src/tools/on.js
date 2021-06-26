import axios from "axios";

import * as api_node_js from "../Api/Nodejs";
import * as SecureStore from "expo-secure-store";
import * as api_secure_store from "../Api/SecureStore";
import * as app_service from "../App/Service";

import { load } from ".";

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
                    const apiResponse = failure.response;
                    console.log(apiResponse.data);
                } else {
                    // anything else
                    app_service.toast(toast, 'danger', `Login failed.`);
                }
                setLoading(false);
            }
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
                    const apiResponse = failure.response;
                    console.log(apiResponse.data);
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
        tabChange: ({ index }, { setTabIndex }) => setTabIndex(index)
    },
}
