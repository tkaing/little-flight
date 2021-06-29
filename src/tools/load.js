import axios from "axios";

import * as SecureStore from "expo-secure-store";

import * as api_node_js from "../Api/Nodejs";
import * as api_secure_store from "../Api/SecureStore";

import * as app_service from "../App/Service";

import { redirectTo } from './../tools'

export default {
    app: {
        appUser: async ({}, {
            toast,
            appUser, setAppUser,
            loading, setLoading,
        }) => {

            const currentToken = await SecureStore.getItemAsync(api_secure_store.TOKEN);

            if (currentToken) {

                if (appUser) {

                    setLoading(false);

                } else {

                    try {

                        setLoading(true);

                        const { data } = await axios.get(
                            api_node_js.PersonCall.find_by_token(), {
                                headers: {'Authorization': `Bearer ${ currentToken }`}, timeout: 5000
                            }
                        );
                        const { email, username } = data;

                        setLoading(false);

                        setAppUser({ email: email, username: username });

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

                        setAppUser();
                    }
                }
            }
        },
        googleAuthResponse: async ({}, {
            toast,
            response,
            appUser, setAppUser,
            loading, setLoading,
        }) => {

            if (response) {
                try {
                    setLoading(true);

                    if (response.type === 'error') {

                        setLoading(false);

                        app_service.toast(toast, 'danger', 'Unable to connect to Google');
                    }

                    if (response.type === 'success') {

                        const accessToken = response.params.access_token;

                        const { data } = await axios.post(
                            api_node_js.PersonCall.sign_in_with_google(accessToken),
                            {}, { timeout: 5000 }
                        );

                        await SecureStore.setItemAsync(api_secure_store.TOKEN, data.jwt);

                        await this.appUser({}, {
                            appUser, setAppUser,
                            loading, setLoading,
                        });
                    }
                } catch (failure) {

                    setLoading(false);

                    app_service.toast(
                        toast,
                        'danger',
                        failure.code === 'ECONNABORTED' || failure.message === 'Network Error'
                            ? `Unable to connect to Api.`
                            : `Unable to connect to Google.`
                    );
                }
            }
        }
    },
    home: {
        profile: {
            listOfFriends: async ({ toast, navigation }, {
                setAppUser,
                setListOfFriends,
            }) => {
                try {
                    const _response = await axios.get(
                        api_node_js.PersonCall.list_of_friends(), await api_node_js.Config()
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
                                setAppUser();
                                redirectTo.Auth(navigation);
                                break;
                        }
                    }
                }
            }
        }
    }
}
