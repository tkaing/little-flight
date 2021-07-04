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
                    <TouchableOpacity key={index} onPress={() => { //Rend les Images cliquable pour partager sur les réseaux
                        console.log("OnPress")
                        on.home.recordings.share({url: `file://${ _it.path }`}) //Appel le On.share pour partager sur les réseaux avec le liens Photo du FS
                        }}> 
                    
                        <Image
                            style={{ width: Dimensions.get('window').width / 2, height: Dimensions.get('window').width / 2 }}
                            source={{ uri: `file://${ _it.path }` }} //Affichage de l'image avec son path du fileSystem
                        />
                    </TouchableOpacity>
                ) }
            </Wrap>
        </ScrollView>
    );
};

export default GalleryPhoto
