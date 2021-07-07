import React from "react";

import { Center, Text, Row, Box, Column } from "native-base";
import { Linking } from "react-native"
import Color from "../../../App/Color"

const Settings = ({ navigation }) => {
    return (
        <Column flex={1} >
            <Box flex={1}>
                <Text fontSize={30} fontWeight="bold" mt={3} alignSelf="center" >Little Flight</Text>
            </Box>
            <Box flex={6}>
                <Text fontWeight="bold" fontSize={20}>A propos</Text>
                <Text mt={10}>  - Vue FPV pour accèder au commande du drone</Text>
                <Text mt={3}>  - Controle de drone avec l'application</Text>
                <Text mt={3}>  - Retour en directe de la caméra du drone</Text>
                <Text mt={3}>  - Possibilité d'enregistrer des photos et vidéos en plein vol </Text>
                <Text mt={3}>  - VR accessible depuis la vue FPV </Text>
                <Text mt={3}>  - Accèss à un profile personnalisé avec la possibilité d'ajouter des amis et de leurs envoyer des points </Text>
                <Text mt={3}>  - Partage de photo et vidéo sur les réseaux </Text>
            </Box>
            <Box flex={1}>
                <Text style={{color:Color.pink}}
                    onPress={() => Linking.openURL('https://youngkenjo.wixsite.com/littleflight/politique-de-confidentialit%C3%A9')}
                    alignSelf="center"
                    fontSize={30}
                    fontWeight="bold"
                    >
                    Mentions legal
                </Text>
            </Box>
            <Box flex={1}>
                <Text alignSelf="center">Contacter nous</Text>
                <Text alignSelf="center">littleflight21@gmail.com</Text>
            </Box>
        </Column>
    )
};

export default Settings
