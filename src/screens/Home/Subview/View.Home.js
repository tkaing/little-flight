import React, {useState} from "react";

import { HomeCarousel } from "../../../components";
import { Box, Button, Center, Icon, Text, useToast } from "native-base";

import * as app_route from "../../../App/Route";
import * as app_common from "../../../App/Common";

import { translate } from '../../../locale/local';
import { on } from "../../../tools";
import * as app_service from "../../../App/Service";

const Home = ({ navigation }) => {

    const toast = useToast();

    const [loadingGranted, setLoadingGranted] = useState(false);

    return (
        <Box flex={ 1 }>

            <Box flex={ 3 } pt={ 8 }>
                <HomeCarousel />
            </Box>

            <Center flex={ 1 }>
                <Button
                    mx={ 10 }
                    px={ 10 }
                    variant="blue"
                    isDisabled={ loadingGranted }
                    onPress={ async () => {
                        setLoadingGranted(true);
                        const granted = await on.fpv.askForFolderPermissions({ toast }, {});
                        setLoadingGranted(false);
                        if (granted)
                            navigation.navigate(app_route.fpv.name);
                        else
                            app_service.toast(toast, 'danger', `Oups! Veuillez accorder les permissions de LittleFlight`, 2000);
                    }}
                    startIcon={ <Icon { ...app_common.Icon.forButton } name='videocam' /> }>
                    <Text>{translate("FPV_BUTTON")}</Text>
                </Button>
            </Center>
            <Center flex={ 1 }>
                <Button
                    mx={ 10 }
                    px={ 10 }
                    variant="green"
                    isDisabled={ loadingGranted }
                    onPress={   () => {
                    }}
                    startIcon={ <Icon { ...app_common.Icon.forButton } name='videocam' /> }>
                    <Text>Go VR Screen</Text>
                </Button>
            </Center>

        </Box>
    )
};

export default Home
