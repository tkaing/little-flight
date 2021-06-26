import { extendTheme } from "native-base";
import Color from "./Color";

export default extendTheme({
    components: {
        Box: {
            variants: {
                black: ({ colorScheme }) => {
                    return {
                        bg: Color.black
                    };
                },
            }
        },
        Row: {
            variants: {
                pink: ({ colorScheme }) => {
                    return {
                        bg: Color.pink
                    };
                },
            }
        },
        Text: {
            baseStyle: {
                color: Color.white
            }
        },
        Input: {
            baseStyle: {
                color: Color.white
            }
        },
        Button: {
            defaultProps: {
                size: 'sm'
            },
            variants: {
                red: ({ colorScheme }) => {
                    return {
                        bg: Color.red,
                    };
                },
                blue: ({ colorScheme }) => {
                    return {
                        bg: Color.blue
                    };
                },
                green: ({ colorScheme }) => {
                    return {
                        bg: Color.green
                    };
                },
            },
        }
    },
});
