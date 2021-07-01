import React from "react";

import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Image, ScrollView, Wrap, Column, Box, Row } from "native-base";
import Video from 'react-native-video';
import Color from "../../../../App/Color"
import { on } from "../../../../tools"

const GalleryVideo = (
    {
        state: { listOfVideos }
    }
) => {

    let player;

    return (
        <ScrollView>
            
                { listOfVideos.map((_it, index) =>
                    <Row flex={1} height={250}>
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

                        <TouchableOpacity key={index} onPress={() => {
                            console.log("OnPress")
                            on.home.recordings.share({url: `file://${ _it.path }`})
                            }}>

                            <Box bg={ Color.blue } height={250} width={50}/>   

                        </TouchableOpacity> 
                                            
                          
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
