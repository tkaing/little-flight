import React from 'react'

import { View } from 'react-native'
import { Box, Button, Row } from 'native-base'

/*
Component des flèches directionelles
*/
const DirectionalButton = (
    {
        top,
        left,
        right,
        bottom
    }
) => (

    <Box flex={ 1 } justifyContent="center" alignItems="center">

        <Row justifyContent="center">
            <Button
                color='#5067FF'
                onPress={ top }>
                ▲
            </Button>
        </Row>

        <Row>
            <Button
                color='#5067FF'
                onPress={ left }>
                ◄
            </Button>
            <View width={35} height={20} />
            <Button
                color='#5067FF'
                onPress={ right }>
                ►
            </Button>
        </Row>

        <Row justifyContent="center">
            <Button
                color='#5067FF'
                onPress={ bottom }>
                ▼
            </Button>
        </Row>

    </Box>
);

export default DirectionalButton
