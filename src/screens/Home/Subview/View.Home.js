import React from "react";

import { HomeCarousel } from "../../../components";
import { Box, Button, Center, Icon, Text } from "native-base";

import * as app_route from "../../../App/Route";
import * as app_common from "../../../App/Common";

import { translate } from '../../../locale/local';

const Home = ({ navigation }) => {

    return (
        <Box flex={ 1 }>

            <Box flex={ 3 } pt={ 8 }>
                <HomeCarousel />
            </Box>

            <Center flex={ 1 }>
                <Button
                    mx={ 10 }
                    px={ 10 }
                    variant="green"
                    onPress={ () => navigation.navigate(app_route.fpv.name) }
                    startIcon={ <Icon { ...app_common.Icon.forButton } name='videocam-outline' /> }>
                    <Text>{translate("FPV_BUTTON")}</Text>
                </Button>
            </Center>

        </Box>
    )
};

export default Home
