import React from "react";
import styles from "./Styles.Home";

import { HomeCarousel } from "../../components";
import {Box, Button, Center, Column, Icon, Row, Text} from "native-base";

import * as app_route from "../../App/Route";
import DefaultProps from "../../App/DefaultProps";

const HomeView = ({ navigation }) => {

    return (
        <Center flex={ 1 }>

            <Box flex={ 3 }>
                <HomeCarousel />
            </Box>

            <Box flex={ 1 }>
                <Button
                    px={ 10 }
                    variant="green"
                    onPress={ () => navigation.navigate(app_route.fpv.name) }
                    startIcon={ <Icon { ...DefaultProps.Icon.forButton } name='videocam-outline' /> }>
                    <Text>Go FPV Screen</Text>
                </Button>
            </Box>

        </Center>
    )
};

export default HomeView
