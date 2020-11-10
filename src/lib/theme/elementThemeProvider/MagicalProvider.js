import React, { useMemo} from 'react';
import {ThemeProvider} from "react-native-elements";
import {formatTheme, joinNestedTheme} from "../utils";
import {defaultTheme} from "../localTheme/defaultTheme.js";
import {styledTheme} from "../localTheme/styledTheme";
import {useUserContext} from "../../..";



export const MagicalProvider = (props) => {
    const [userState,] = useUserContext();
    const {isSignedIn} = userState;

    const theme = useMemo(() => {
            const joinedTheme = joinNestedTheme(defaultTheme, styledTheme)
            if (isSignedIn) {
                return formatTheme(joinNestedTheme(joinedTheme, joinedTheme))
            } else {
                return formatTheme(joinedTheme)
            }
        }, []
    )

    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    )
};


