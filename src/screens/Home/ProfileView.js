import React from "react";

import { styles } from './Profile';
import { Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import { Ionicons, MaterialIcons, AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";

const ProfileView = ({ navigation }) => {

    return (
        <SafeAreaView style={[ styles.container ]}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={[ styles.titleBar ]}>
                    <Ionicons name="ios-arrow-back" size={ 24 } color="#52575D" />
                </View>

                <View style={{ alignSelf: "center" }}>
                    <View style={[ styles.profileImage ]}>
                        <Image
                            style={[ styles.image ]}
                            source={ require("../../../assets/ken.jpeg") }
                            resizeMode="center" />
                    </View>
                    <View style={[ styles.dm ]}>
                        <MaterialIcons
                            name="chat" size={ 18 }
                            color="#DFD8C8" />
                    </View>
                    <View style={[ styles.add ]}>
                        <Ionicons
                            name="ios-add"
                            size={ 48 }
                            color="#DFD8C8"
                            style={{ marginTop: 6, marginLeft: 2 }} />
                    </View>
                </View>

                <View style={[ styles.infoContainer ]}>
                    <Text style={[ styles.text, { fontWeight: '200', fontSize: 36 } ]}>Ken</Text>
                    <Text style={[ styles.text, { color: "#AEB5BC", fontSize: 14 } ]}>Dev</Text>
                </View>

                <View style={[ styles.statsContainer ]}>
                    <View style={[ styles.statsBox ]}>
                        <Text style={[ styles.text, { fontSize: 24 } ]}>2</Text>
                        <Text style={[ styles.text, styles.subText ]}>Medias</Text>
                    </View>
                    <View style={[ styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 } ]}>
                        <Text style={[ styles.text, { fontSize: 24 } ]}>45</Text>
                        <Text style={[ styles.text, styles.subText ]}>Droners</Text>
                    </View>
                    <View style={[ styles.statsBox ]}>
                        <Text style={[ styles.text, { fontSize: 24 } ]}>300</Text>
                        <Text style={[ styles.text, styles.subText ]}>Drone Points</Text>
                    </View>
                </View>

                <View style={[ { alignItems: "center" } ]}>
                    <View style={[ styles.recentItem ]}>
                        <View style={[ styles.infoContainer ]}>
                            <AntDesign
                                name="instagram"
                                size={ 24 } color="white" />
                        </View>
                        <View style={[ styles.infoContainer ]}>
                            <Entypo
                                name="youtube"
                                size={ 24 } color="white" />
                        </View>
                        <View style={[ styles.infoContainer ]}>
                            <FontAwesome5
                                name="facebook"
                                size={ 24 } color="white" />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ProfileView
