import React from "react";
import styles from "./Styles.Home";

import { HomeCarousel } from "../../../components";
import { Box, Button, Icon, Text } from "native-base";

import * as app_route from "../../../App/Route";
import * as app_common from "../../../App/Common";

const Home = ({ navigation }) => {

    return (
        <Box flex={ 1 }>

            <Box flex={ 3 }>
                <HomeCarousel />
            </Box>

            <Box flex={ 1 }>
                <Button
                    px={ 10 }
                    variant="green"
                    onPress={ () => navigation.navigate(app_route.fpv.name) }
                    startIcon={ <Icon { ...app_common.Icon.forButton } name='videocam-outline' /> }>
                    <Text>Go FPV Screen</Text>
                </Button>
            </Box>

        </Box>
    )
};

export default Home
