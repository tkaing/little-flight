import React, {useState} from "react";

import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Image, ScrollView, Wrap, Column, Box, Row, Icon, IconButton } from "native-base";
import Video from 'react-native-video';
import Color from "../../../../App/Color"
import { on } from "../../../../tools"
import * as app_common from "../../../../App/Common";

const GalleryVideo = (
    {
        state: { listOfVideos }
    }
) => {

    const [player, setPlayer] = useState();

    return (
        <ScrollView>
            
                { listOfVideos.map((_it, index) =>
                    <Row flex={1} height={250} >
                        <Video
                            source={{ uri: `file://${ _it.path }` }} //Affichage de la vidéo avec le Path du FileSystem
                            resizeMode="cover"
                            autoplay={false}
                            controls={true}
                            paused={true}
                            poster={`file://${ _it.path }`}
                            style={ styles.backgroundVideo }
                        />

                        <Box flex={1} justifyContent="center">
                            <IconButton //Bouton de Share pour appeler On.share (Partager la vidéo avec le path FS)
                                { ...app_common.IconButton.forProfile }
                                bg="#41444B"
                                icon={ <Icon { ...app_common.Icon.default } name="share-social" size="sm" /> }
                                onPress={ () => on.home.recordings.share({url: `file://${ _it.path }`}) } 
                                alignSelf="center"
                            />
                        </Box>
                    </Row>
      
                ) }
            
        </ScrollView>
    );
};

var styles = StyleSheet.create({
    backgroundVideo: {
      width: Dimensions.get('window').width - 50,
      height: 250
    },
  });

export default GalleryVideo
