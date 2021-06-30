import React, { useEffect, useState } from "react";
import styles from "./Styles.Recordings";

import * as RNFS from "react-native-fs";
import RecordingsGallery from "./RecordingsGallery";
import { PermissionsAndroid, Dimensions } from "react-native";
import { Center, Text, Button, Column, Box, Row, Wrap, Image} from "native-base";

import Color from "../../App/Color";



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

        // get a list of files and directories in the main bundle
        console.log('READFOLDER');
        
        let imagesFolder = `${ RNFS.PicturesDirectoryPath }/LittleFlight Images`;
        
        // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)

        try {
            const listOfImages = await RNFS.readDir(imagesFolder);
            console.log(listOfImages);
            setTableau(listOfImages);
        } catch (xxx) {
            console.log(xxx);
        }

       /* RNFS.readDir(imagesFolder) 
            .then(result => {
                console.log('GOT RESULT', result);
                console.log(Array.isArray(result));
               
                return Promise.all([RNFS.stat(result[0].path), result[0].path]);
            })
            .then((statResult) => {
                if (statResult[0].isFile()) {
                    
                    return RNFS.readFile(statResult[1], 'utf8');
                }

        return 'no file';
        })
        .then((contents) => {
        
        console.log(contents);
        })
        .catch((err) => {
        console.log(err.message, err.code);
        });*/
        
    };

    useEffect(() => {
        saveFile();
        readFolder();
    }, []);

    console.log('tableau : ', tableau);

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

            <Box bg={ Color.black } flex={1}>

                <Wrap direction="row" spacing={2} flex={1}>
                    
                    {/*<Image source={{uri:'file:///storage/emulated/0/Pictures/LittleFlight Images/download (2) (1).jpeg'}} style={{width: 200, height: 200}}/>*/}
                    { tableau.map(_it => 
                        <Image source={{ uri: `file://${ _it.path }` }} style={{width: Dimensions.get('window').width / 2, height: Dimensions.get('window').width / 2}}/>
                    ) }

                </Wrap>

                {/*<RecordingsGallery />*/}

            </Box>

        </Column>
    );
};

export default RecordingsView