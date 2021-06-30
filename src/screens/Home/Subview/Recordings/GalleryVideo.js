import React from "react";

import { Dimensions } from "react-native";
import { Image, ScrollView, Wrap } from "native-base";

const GalleryVideo = (
    {
        state: { listOfVideos }
    }
) => {

    return (
        <ScrollView>
            <Wrap direction="row" paddingBottom={100}>
                { listOfVideos.map(_it =>
                    <Image
                        alt="Video"
                        style={{ width: Dimensions.get('window').width / 2, height: Dimensions.get('window').width / 2 }}
                        source={{ uri: `file://${ _it.path }` }}
                        />
                ) }
            </Wrap>
        </ScrollView>
    );
};

export default GalleryVideo
