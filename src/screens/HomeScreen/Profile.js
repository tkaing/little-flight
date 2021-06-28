import React, { useEffect, useState } from 'react'
import { Text, View, SafeAreaView, Image, ScrollView, DatePickerAndroid } from "react-native";
import { Ionicons, MaterialIcons, AntDesign, Entypo, FontAwesome5} from "@expo/vector-icons";
import SearchBar from "../../components/SearchBarComponent";
import { Icon , Button, Toast} from "native-base";
import Share from 'react-native-share';
import * as SecureStore from "expo-secure-store";
import * as api_default from "../../api/api_default";
import * as api_secure_store from "../../api/api_secure_store";
import axios from "axios";


const Profile = ({ navigation, currentUser }) => {
    console.log("lale");
    const [username, setUsername] = useState();
    const [errorManager, setErrorManager] = useState({});

    const myCustomShare = async() => {
        const shareOptions = {
          message: 'Im a droner! See my profile on the new app : LittleFlght',
          //url: files.appLogo,
          // urls: [files.image1, files.image2]
        }
    
        try {
          const ShareResponse = await Share.open(shareOptions);
          console.log(JSON.stringify(ShareResponse));
        } catch(error) {
          console.log('Error => ', error);
        }
      };

    const on = {
        Search: async ( username ) => {
            try {
                const currentToken = await SecureStore.getItemAsync(api_secure_store.TOKEN);
                const apiResponse = await axios.post(api_default.person.add_friend(), {
                    username: username
                },
                {
                headers: {'Authorization': `Bearer ${ currentToken }`}, timeout: 5000
                })
                const _data = apiResponse.data;
                console.log("=== DATA +++", _data);
                //errorManager = _data;
            } catch (failure) {
                console.log("=== FAILURE ===", failure.response);
                errorManager({addFriend: failure.response})
            }
        },
        List: async ( ) => {
            try {
                const currentToken = await SecureStore.getItemAsync(api_secure_store.TOKEN);
                const apiResponse = await axios.get(api_default.person.list_of_friends(), {
                    headers: {'Authorization': `Bearer ${ currentToken }`}, timeout: 5000
                });
                const apiData = apiResponse.data;
                console.log(apiData);
            } catch (failure) {
                console.log(failure);
            }
        }
      };

    return (
        <SafeAreaView style={ styles.container }>
            <ScrollView showsVerticalScrollIndicator={ false }>
                <View style={ styles.titleBar }>
                    <SearchBar state={{ username, setUsername }}/>
                    <View style={ styles.search }>
                        <Button 
                            style={ styles.button } 
                            onPress={() => {
                                
                                on.Search(username);

                                /*switch (errorManager.addFriend) {
                                    case "duplicate":
                                        DatePickerAndroid;
                                        case ""
                                }*/

                                if (errorManager.addFriend) {
                                    Toast.show({
                                        text: "Wrong job!",
                                        textStyle: { color: "yellow" },
                                        buttonText: `${username} doesn't exist`
                                    });
                                }
                                else {
                                    Toast.show({
                                        text: "Good job!",
                                        textStyle: { color: "green" },
                                        buttonText: `Okay ${username} is added`
                                    });
                                }
                            }}
                        >
                        <Icon name="person-add-outline"></Icon>
                        </Button>
                    </View>
                </View>

                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image source={require("./ken.jpeg")} style={styles.image} resizeMode="center"></Image>
                    </View>
                    <View style={styles.dm}>
                        <Ionicons 
                            name="share-outline" 
                            onPress={myCustomShare } 
                            size={18} 
                            color="#DFD8C8">
                        </Ionicons>
                    </View>
                    {/* <View style={styles.active}></View> */}
                    <View style={styles.add}>
                        <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>Kengg</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Dev</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>2</Text>
                        <Text style={[styles.text, styles.subText]}>Medias</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>45</Text>
                        <Text style={[styles.text, styles.subText]}>Droners</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>300</Text>
                        <Text style={[styles.text, styles.subText]}>Drone Points</Text>
                    </View>
                </View>

                <View style={{ alignItems: "center" }}>
                    <View style={styles.recentItem}>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Profile;

const styles = {
    container: {
        flex: 1,
    },
    text: {
        //fontFamily: "HelveticaNeue",
        color: "#e9eaec"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        //marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        //alignSelf: "center",
        flexDirection: "column",
        alignItems: "center",
        //marginTop: 25, 
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        //alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    },
    search: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        //height:150
    },
    button: {
        height:60,
        marginLeft: 5
    },
};

