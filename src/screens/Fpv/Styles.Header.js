import {Platform} from "react-native";

export default {
    container: {
        paddingTop: Platform.OS === 'android' ? 30 : 0,
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    iconStyle: {
        marginTop: 40,
        color: 'white',
        fontSize: 32,
        backgroundColor: red,
        padding: 15,
        borderWidth: 0,
        overflow: 'hidden',
        borderRadius: 32,
    },
    logoStyle: {
        height: 135,
        width: 135,
        resizeMode: 'contain',
    },
}
