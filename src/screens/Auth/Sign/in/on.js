import axios from "axios";

import * as SecureStore from "expo-secure-store";
import * as app_service from "../../../../App/Service";
import * as api_node_js from "../../../../Api/Nodejs";
import * as api_secure_store from "../../../../Api/SecureStore";

export default {
    submit: async (
        { email, password },
        { setLoading, loadCurrentUser }
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
            loadCurrentUser();

        } catch (failure) {

            if (failure.code === 'ECONNABORTED' || failure.message === 'Network Error') {
                // timeout || network error
                app_service.toast('danger', `Unable to connect to Api. (${ failure.message })`);
            } else if (failure.response) {
                // an error response (5xx, 4xx)
                const apiResponse = failure.response;
                console.log(apiResponse.data);
            } else {
                // anything else
                app_service.toast('danger', `Login failed.`);
            }
            setLoading(false);
        }
    }
}
