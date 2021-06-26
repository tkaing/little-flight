import React from "react";
import styles from "./Styles.History";

import { Text, View } from "native-base";
import { ScrollView } from "react-native";

const HistoryView = ({ navigation }) => {

    return (
        <ScrollView showsVerticalScrollIndicator={ false }>

            <Text style={[ styles.subText, styles.recent ]}>Recent Activity</Text>

            <View style={[ { alignItems: "center" } ]}>
                <View style={[ styles.recentItem ]}>
                    <View style={[ styles.activityIndicator ]} />
                    <View style={[ { width: 250 } ]}>
                        <Text style={[ styles.text, { color: "#41444B", fontWeight: '300' } ]}>
                            Started following
                            <Text style={{ fontWeight: '400' }}>Jake Challeahe</Text>
                            and
                            <Text style={{ fontWeight: '400' }}>Luis Poteer</Text>
                        </Text>
                    </View>
                </View>

                <View style={[ styles.recentItem ]}>
                    <View style={[ styles.activityIndicator ]} />
                    <View style={{ width: 250 }}>
                        <Text style={[ styles.text, { color: "#41444B", fontWeight: '300' } ]}>
                            Started following
                            <Text style={{ fontWeight: '400' }}>Luke Harper</Text>
                        </Text>
                    </View>
                </View>
            </View>

        </ScrollView>
    );
}

export default HistoryView
