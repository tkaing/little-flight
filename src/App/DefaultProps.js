import Color from "./Color";
import { Ionicons } from "@expo/vector-icons";

const Default = {
    Icon: {
        as: Ionicons,
        color: Color.white
    },
    Text: {
        color: Color.white
    }
};

const DefaultProps = {
    Icon: {
        default: Default.Icon,
        forInput: {
            ...Default.Icon,
            ml: 4,
            size: 6
        },
        forButton: {
            ...Default.Icon,
            size: 8
        },
        forFooterTab: {
            ...Default.Icon,
            mb: 1,
            size: "xs"
        }
    },
    Text: {
        default: Default.Text,
        forFooterTab: {
            ...Default.Icon,
            fontSize: 14
        }
    },
    Link: {
        _text: {
            color: Color.blue,
            fontWeight: 'bold'
        }
    }
}

export default DefaultProps
