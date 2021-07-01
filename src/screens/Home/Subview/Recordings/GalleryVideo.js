import React from "react";

import { Dimensions, StyleSheet } from "react-native";
import { Image, ScrollView, Wrap } from "native-base";
import Video from 'react-native-video';

const GalleryVideo = (
    {
        state: { listOfVideos }
    }
) => {

    let player;

    return (
        <ScrollView>
            { listOfVideos.map(_it =>
                <Video
                    source={{ uri: `file://${ _it.path }` }}
                    resizeMode="cover"
                    autoplay={false}
                    controls={true}
                    ref={(ref) => {
                        this.player = ref
                    }}
                    style={ styles.backgroundVideo }
                />                  
            ) }
        </ScrollView>
    );
};

var styles = StyleSheet.create({
    backgroundVideo: {
      width: Dimensions.get('window').width,
      height: 250
    },
  });

export default GalleryVideo
