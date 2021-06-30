import React, {cloneElement, useEffect, useState} from "react";

import { Dimensions } from "react-native";
import { Column, Text, Button, Box, ScrollView, Wrap, Image } from "native-base";

import Color from "../../../App/Color";
import RecordingsTabConst from "../../../App/const/RecordingsTabConst";

import { on } from "./../../../tools"
import GalleryPhoto from "./Recordings/GalleryPhoto";
import GalleryVideo from "./Recordings/GalleryVideo";

const Recordings = ({ navigation }) => {

    const [tabIndex, setTabIndex] = useState(0);
    const [listOfPhotos, setListOfPhotos] = useState([]);
    const [listOfVideos, setListOfVideos] = useState([]);

    useEffect(() => {
        on.home.recordings.initFoldersAndMedias({}, {
            setListOfPhotos, setListOfVideos
        });
    }, []);

    console.log("=== LIST OF PHOTOS ===", listOfPhotos);
    console.log("=== LIST OF VIDEOS ===", listOfVideos);

    return (
        <Column bg={ Color.blue } flex={1}>

            {/* === List Of Tabs === */}
            <Button.Group
                height={70}
                variant="solid"
                isAttached>
                { RecordingsTabConst.LIST.map((_it, index) =>
                    <Button bg={ Color.blue }
                            flex={1}
                            onPress={ () => on.home.recordings.tabChange({ index }, { setTabIndex }) }>
                        <Text>{ _it.name }</Text>
                    </Button>
                ) }
            </Button.Group>

            {/* === Gallery Photo / Video === */}
            <Box flex={1} bg={ Color.black }>
                { tabIndex === 0 &&
                    <GalleryPhoto state={{ listOfPhotos }} />
                }
                { tabIndex === 1 &&
                    <GalleryVideo state={{ listOfVideos }} />
                }
            </Box>

        </Column>
    );
};

export default Recordings
