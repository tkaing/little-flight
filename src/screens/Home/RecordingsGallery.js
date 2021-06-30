import React, { useEffect, useState } from "react";

import {
    View,
    Image,
    FlatList
} from 'react-native';

import { 
    Box 
} from 'native-base';

import CameraRoll from 'rn-camera-roll';
  
const styles = {
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    image: {
        width: 100,
        height: 100,
        margin: 10
      },
    imageGrid: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center'
    }
};
  
const PHOTOS_COUNT_BY_FETCH = 24;

const RecordingsGallery = () => {

    const [ds, setDs] = useState(
        new FlatList.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
    );
    const [images, setImages] = useState([]);
    const [dataSource, setDataSource] = useState();
    const [lastPhotoFetched, setLastPhotoFetched] = useState(undefined);

    const on = {
        init: () => {
            setDataSource(ds.cloneWithRows(images));
            on.fetchPhotos();
        },
        getPhotosFromCameraRollData: (data) => {
            return data.edges.map((asset) => {
              return asset.node.image;
            });
        },
        onPhotosFetchedSuccess: (data) => {
            const newPhotos = on.getPhotosFromCameraRollData(data);
            console.log(data);

            setImages(images.concat(newPhotos));
            setDataSource(ds.cloneWithRows(images));

            if (newPhotos.length) 
                setLastPhotoFetched( newPhotos[newPhotos.length - 1].uri );
        },
        onPhotosFetchError: (err) => console.log(err),  
        fetchPhotos: (count = PHOTOS_COUNT_BY_FETCH, after) => {
            CameraRoll.getPhotos({
              first: count,
              after,
            }, on.onPhotosFetchedSuccess, on.onPhotosFetchError);
        },
        onEndReached: () => on.fetchPhotos(PHOTOS_COUNT_BY_FETCH, lastPhotoFetched)
    };

    useEffect(() => {
        on.init();
    }, [])

    console.log(dataSource);

    return (
        <Box style={ styles.container } flex={1}>

            <FlatList 
                data={ dataSource }
                renderItem={ ({ item }) => 
                    <View>
                        <Image
                            style={ styles.image }
                            source={{ uri: item.uri }} />
                    </View>    
                }
            />

            {/*<ListView
                dataSource={ dataSource }
                onEndReached={ on.onEndReached }
                onEndReachedThreshold={ 100 }
                contentContainerStyle={ styles.imageGrid }
                showsVerticalScrollIndicator={ false }
                renderRow={ image =>         
                    <View>
                        <Image
                            style={ styles.image }
                            source={{ uri: image.uri }} />
                    </View>
                } />*/}
        </Box>
    );
};

export default RecordingsGallery