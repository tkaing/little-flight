import React, { useEffect, useState } from "react"
import styles from "../Styles.Remote";

import { Button, Fab, Icon, Text, View } from "native-base";

import * as app_drone from "../../../App/Drone";

const Footer = (
    { takeoff, setTakeoff, loading, setFpvRemoteView }
) => {

    const [fabActive, setFabActive] = useState(false);

    useEffect(() => {
        setFabActive(false);
    }, []);

    return (
      <>
          <View style={[ styles.actionWrapper, { flex: 2 } ]}>
              <Button style={[ styles.actionButton ]}
                      onPress={ () => {
                          app_drone.run(takeoff ? 'land' : 'takeoff');
                          setTakeoff(!takeoff);
                      }}
                      disabled={ loading }
                      block danger rounded>
                  <Text>{ takeoff ? 'Attérir' : 'Décoller' }</Text>
              </Button>
          </View>
          <View style={[ styles.actionWrapper, { flex: 1 } ]}>
              <Fab
                  active={ fabActive }
                  direction="up"
                  containerStyle={{ }}
                  style={[ styles.actionButton, { backgroundColor: '#5067FF', marginTop: 100 } ]}
                  position="bottomRight"
                  onPress={() => setFabActive(!fabActive)} block info rounded>
                  <Icon name="share" />
                  <Button style={{ backgroundColor: '#5067FF' }}>
                      <Icon name="ios-settings"/>
                  </Button>
                  <Button style={{ backgroundColor: '#5067FF' }}
                          onPress={ () => {
                              setFabActive(false);
                              setFpvRemoteView(false);
                          }}>
                      <Icon name="game-controller" />
                  </Button>
                  <Button disabled style={{ backgroundColor: '#5067FF' }}>
                      <Icon name="videocam" />
                  </Button>
              </Fab>
          </View>
      </>
    );
};

export default Footer
