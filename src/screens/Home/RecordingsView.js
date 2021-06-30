import React, { useEffect, useState } from "react";

import * as RNFS from "react-native-fs";
import { PermissionsAndroid, Dimensions } from "react-native";
import { Text, Button, Column, Box, Wrap, Image} from "native-base";

import Color from "../../App/Color";
import { ScrollView } from "react-native-gesture-handler";

const RecordingsView = ({ navigation }) => {

    const [tableau, setTableau] = useState([]);

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

    const readFolder = async () => {
        try {
            const listOfImages = await RNFS.readDir(`${ RNFS.PicturesDirectoryPath }/LittleFlight Images`);
            console.log(listOfImages);
            setTableau(listOfImages);
        } catch (xxx) {
            console.log(xxx);
        }        
    };

    useEffect(() => {
        saveFile();
        readFolder();
    }, []);

    return (
        <Column bg={ Color.blue } flex={1}>

            <Button.Group 
                height={100}
                variant="solid"
                isAttached>
                <Button bg={ Color.blue } flex={1}>
                    <Text>Photo</Text>
                </Button>
                <Button bg={ Color.blue } flex={1}>
                    <Text>Video</Text>
                </Button>
            </Button.Group>

            <Box bg={ Color.black }>

                <ScrollView>

                    <Wrap direction="row" paddingBottom={100}>

                        { tableau.concat(tableau).map(_it => 
                            <Image source={{ uri: `file://${ _it.path }` }}
                                style={{ width: Dimensions.get('window').width / 2, height: Dimensions.get('window').width / 2 }} 
                                />
                        ) }

                    </Wrap>

                </ScrollView>

            </Box>

        </Column>
    );
};

export default RecordingsView