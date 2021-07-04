import React, { useState, useEffect } from "react"
import styles from "./Styles.Stream"

import {Box, Button, Image, Row, Text, useToast, View} from "native-base"

import { ffmpeg } from "./../../tools";
import { RNFFmpeg } from "react-native-ffmpeg";
import Video from "react-native-video";
import LiveConst from "../../App/const/LiveConst";
import Color from "../../App/Color";

const Stream = (
    {
        droneSocket,
        state: {
            openVR,
            newFrame,
            setOpenVR,
            liveExecId,
            setNewFrame,
            setLiveExecId,
        }
    }
) => {

    const toast = useToast();

    const [openStream, setOpenStream] = useState(false);
    const [listOfFrames, setListOfFrames] = useState([]);

    useEffect(() => {
        setOpenStream(true);
        return () => {
            setOpenStream(false);
        };
    }, []);

    useEffect(() => {
        //console.log(newFrame);
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
        if (openStream) {
            RNFFmpeg.cancel();
            ffmpeg.launchLive({ toast }, {
                liveExecId,
                setNewFrame,
                setLiveExecId
            });
        }
        if (!openStream) {
            RNFFmpeg.cancel();
            setNewFrame(null);
            setListOfFrames([]);
        }
    }, [openStream]);

    useEffect(() => {
        /*if (listOfFrames.length === 0)
            console.log([]);
        else
            console.log(
                listOfFrames.map(_it => _it.uri.substr(0, 100))
            );*/
    }, [listOfFrames]);

    return (
        <Row flex={1}>

            { openVR &&
                <Box>
                    <Button variant="green"
                            onPress={ () => setOpenVR(false) }>
                        <Text>FPV</Text>
                    </Button>
                </Box>
            }

            {/* Stream Preview */}
            { openStream &&
                <Row flex={1}>
                    <Box flex={1} style={[ styles.frameView ]}
                        {
                            ...(openVR ? {
                                borderTopWidth: 1,
                                borderTopColor: Color.blue,
                                borderBottomWidth: 1,
                                borderBottomColor: Color.blue
                            } : {})
                        }
                    >
                        { listOfFrames.map((_it, index) =>
                            <Image fadeDuration={ 0 }
                                   source={{ uri: _it.uri }}
                                   square
                                   style={[ styles.frameImage ]}
                                   large
                                   alt="xxx"
                                   key={ _it.number + index } />
                        )}
                    </Box>

                    { openVR &&
                        <Box flex={1} style={[ styles.frameView ]}
                             borderTopWidth={1}
                             borderTopColor={ Color.red }
                             borderBottomWidth={1}
                             borderBottomColor={ Color.red }
                        >
                            { listOfFrames.map((_it, index) =>
                                <Image fadeDuration={ 0 }
                                       source={{ uri: _it.uri }}
                                       square
                                       style={[ styles.frameImage ]}
                                       large
                                       alt="xxx"
                                       key={ _it.number + index } />
                            )}
                        </Box>
                    }
                </Row>
            }
        </Row>
    );
}

export default Stream
