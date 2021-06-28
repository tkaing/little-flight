import React, { useEffect } from "react"

import { Center, Text } from "native-base"

import * as RNFS from "react-native-fs"
import {PermissionsAndroid} from "react-native";

const Recordings = ({ navigation }) => {

    const saveFile = async () => {

        try {
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            );
        } catch (_failure) {
            console.log(_failure);
        }

        const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

        if (!writeGranted) {
            console.log('Read and write permissions have not been granted');
            return;
        }

        console.log("=== GRANTED ===");

        let videoFolder = `${ RNFS.PicturesDirectoryPath }/LittleFlight Video`;
        let imagesFolder = `${ RNFS.PicturesDirectoryPath }/LittleFlight Images`;

        await RNFS.mkdir(videoFolder);
        await RNFS.mkdir(imagesFolder);

        imagesFolder += '/mytest.txt';

        RNFS.writeFile(imagesFolder, "Dossier Image", 'utf8')
            .then(() => {
                console.log('Successful !');
            })
            .catch(_failure => {
                console.log(_failure.message);
            });
    };

    useEffect(() => {
        saveFile();
    }, []);

    return (
        <Center flex={ 1 }>
            <Text>Recordings</Text>
        </Center>
    );
};

export default Recordings
