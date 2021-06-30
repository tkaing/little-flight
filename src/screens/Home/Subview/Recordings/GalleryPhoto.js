import React from "react";

import { Dimensions } from "react-native";
import { Image, ScrollView, Wrap } from "native-base";

const GalleryPhoto = (
    {
        state: { listOfPhotos }
    }
) => {

    return (
        <ScrollView>
            <Wrap direction="row" paddingBottom={100}>
                { listOfPhotos.map(_it =>
                    <Image
                        alt="Photo"
                        style={{ width: Dimensions.get('window').width / 2, height: Dimensions.get('window').width / 2 }}
                        source={{ uri: `file://${ _it.path }` }}
                    />
                ) }
            </Wrap>
        </ScrollView>
    );
};

export default GalleryPhoto
