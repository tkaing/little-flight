import React, {useEffect, useState} from "react";

import { HomeCarousel } from "../../../components";
import { Box, Button, Column, Icon, Text, useToast } from "native-base";

import * as app_route from "../../../App/Route";
import * as app_common from "../../../App/Common";

import { on } from "../../../tools";
import { translate } from '../../../locale/local';
import * as app_service from "../../../App/Service";
import * as SecureStore from "expo-secure-store";
import * as api_secure_store from "../../../Api/SecureStore";

const Home = (
    {
        navigation,
        state: {
            appUser, setAppUser
        }
    }
) => {

    const toast = useToast();

    const [hasVR, setHasVR] = useState(true);
    const [loadingGranted, setLoadingGranted] = useState(false);

    useEffect(() => {
        (async () => {
            setHasVR(await SecureStore.getItemAsync(api_secure_store.HAS_VR) !== null);
        })();
    }, []);

    return (
        <Box flex={1}>

            <Box flex={3} pt={8} marginTop={5}>
                <HomeCarousel />
            </Box>

            <Column flex={1}>
                <Button
                    mx={10}
                    px={10}
                    variant="blue"
                    onPress={ async () => {
                        setLoadingGranted(true);
                        const granted = await on.fpv.askForFolderPermissions({ toast }, {});
                        setLoadingGranted(false);
                        if (granted)
                            navigation.navigate(app_route.fpv.name);
                        else
                            app_service.toast(toast, 'danger', `Oups! Veuillez accorder les permissions de LittleFlight`, 2000);
                    }}
                    startIcon={ <Icon { ...app_common.Icon.forButton } name='videocam' /> }
                    isDisabled={ loadingGranted }>
                    <Text>{translate("FPV_BUTTON")}</Text>
                </Button>

                { !hasVR &&
                    <Button
                        mx={10}
                        px={10}
                        variant="green"
                        onPress={ async () =>  on.home.home.buyVR({ toast, navigation }, {
                            appUser,
                            setAppUser,
                            setLoadingGranted
                        }) }
                        startIcon={ <Icon { ...app_common.Icon.forButton } name='videocam' /> }
                        marginTop={8}
                        isDisabled={ loadingGranted }>
                        <Text>Unlock VR mode</Text>
                    </Button>
                }
            </Column>

        </Box>
    )
};

export default Home
