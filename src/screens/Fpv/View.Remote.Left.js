import React, { useState } from "react";

import { Box, Button, Center, Column, Text } from "native-base";

import DirectionalButton from '../../components/DirectionnalButton'

const RemoteLeft = ({  }) => {

    const [takeoff, setTakeoff] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <Column flex={ 1 } bg="#595758">

            <Box flex={ 1 } justifyContent="center" alignItems="center">
                <Button variant="blue">
                    <Text>START / STOP</Text>
                </Button>
            </Box>

            <Center flex={ 3 }>
                <DirectionalButton />
            </Center>

            <Center mb={ 5 }>
                <Text>🔄 rotation 🔄</Text>
            </Center>

        </Column>
    );
};

export default RemoteLeft
