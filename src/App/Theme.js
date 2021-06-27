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
            },
            variants: {
                headline: {
                    my: 10,
                    fontSize: "2xl",
                    style: {
                        textTransform: 'capitalize'
                    }
                }
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
