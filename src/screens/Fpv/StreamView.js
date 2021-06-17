import React, { useState, useEffect } from "react";

import { styles, ffmpeg } from "./Stream";
import { Button, Icon, Text, Thumbnail, View } from "native-base";

import * as app_drone from "../../App/Drone";

const StreamView = ({}) => {

    const [newFrame, setNewFrame] = useState();
    const [openStream, setOpenStream] = useState(false);
    const [listOfFrames, setListOfFrames] = useState([]);

    useEffect(() => {
        setNewFrame();
        setListOfFrames([]);
        return () => {
            setNewFrame();
            setListOfFrames([]);
        };
    }, []);

    useEffect(() => {
        if (newFrame) {
            switch (listOfFrames.length) {
                case 0:
                    setListOfFrames([newFrame]);
                    break;
                case 1:
                    setListOfFrames([listOfFrames[0], newFrame]);
                    break;
                case 2:
                    setListOfFrames([listOfFrames[1], newFrame]);
                    break;
            }
        }
    }, [newFrame]);

    useEffect(() => {
        if (!openStream) {
            setNewFrame();
            setListOfFrames([]);
        }
    }, [openStream]);

    useEffect(() => {
        if (listOfFrames.length === 0)
            console.log([]);
        else
            console.log(
                listOfFrames.map(_it => _it.uri.substr(0, 100))
            );
    }, [listOfFrames]);

    return (
        <>
            {/* Command Drone / Stream / FFMPEG */}
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button onPress={ () => app_drone.run('command') }
                        block primary rounded>
                    <Icon name="airplane-outline" />
                </Button>
                <Button onPress={ () => app_drone.run('streamon') }
                        block primary rounded>
                    <Icon name="videocam-outline" />
                </Button>
                <Button onPress={ () => app_drone.run('battery') }
                        block primary rounded>
                    <Icon name="battery-full-outline" />
                </Button>
                <Button onPress={ async () => openStream
                    ? ffmpeg.close(setOpenStream)
                    : await ffmpeg.core(setOpenStream, setNewFrame)
                } block danger rounded>
                    <Text>{ openStream ? 'Stopper' : 'Lancer' } le stream</Text>
                </Button>
            </View>

            {/* Stream Preview */}
            { openStream &&
                <View style={[ styles.frameView ]}>
                    { listOfFrames.map(_it => (
                        <Thumbnail fadeDuration={ 0 }
                                   source={{ uri: _it.uri }}
                                   square
                                   style={[ styles.frame ]}
                                   large
                                   key={ _it.number } />
                    ))}
                </View>
            }
        </>
    )
};

export default StreamView
