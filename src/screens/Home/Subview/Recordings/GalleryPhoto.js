import React from "react";

import { Dimensions, TouchableOpacity, ActionSheetIOS } from "react-native";
import { Image, ScrollView, Wrap, Box } from "native-base";
import { on } from "../../../../tools"

const GalleryPhoto = (
    {
        state: { listOfPhotos }
    }
) => {

    return (
        <ScrollView>
            <Wrap direction="row" paddingBottom={100}>
                { listOfPhotos.map((_it, index) =>
                    <TouchableOpacity key={index} onPress={() => {
                        console.log("OnPress")
                        on.home.recordings.share({url: `file://${ _it.path }`})
                        }}> 
                    
                        <Image
                            style={{ width: Dimensions.get('window').width / 2, height: Dimensions.get('window').width / 2 }}
                            source={{ uri: `file://${ _it.path }` }} 
                        />
                    </TouchableOpacity>
                ) }
            </Wrap>
        </ScrollView>
    );
};

export default GalleryPhoto
