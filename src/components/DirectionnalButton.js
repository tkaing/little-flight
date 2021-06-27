import React from 'react'

import { StyleSheet, View, SafeAreaView, Alert } from 'react-native'
import {Box, Button, Row} from 'native-base'

const DirectionalButton = () => (

    <Box flex={ 1 } justifyContent="center" alignItems="center">

        <Row justifyContent="center">
            <Button
                color='#5067FF'
                onPress={ () => Alert.alert('Cannot press this one') }>
                ▲
            </Button>
        </Row>

        <Row>
            <Button
                color='#5067FF'
                onPress={ () => Alert.alert('Left button pressed') }>
                ◄
            </Button>
            <View width={35} height={20} />
            <Button
                color='#5067FF'
                onPress={ () => Alert.alert('Right button pressed') }>
                ►
            </Button>
        </Row>

        <Row justifyContent="center">
            <Button
                color='#5067FF'
                onPress={() => Alert.alert('Cannot press this one')}>
                ▼
            </Button>
        </Row>

    </Box>
);

export default DirectionalButton
