import { createGlobalStyle } from "styled-components"
import { StyledTheme } from "../interfaces"

export const GlobalStyle = createGlobalStyle`
    body {
        height: 100%;
        width: 100%;
        font-family : 'Raleway', sans-serif;
        background-color: #f2f2f2;
        margin: 0 auto;
    }

    a { text-decoration : none; }

    * { box-sizing: borderRadius-box; }
`
export const styledTheme: StyledTheme = {

    colors: {
        primary: "#ff1313",
        secondary: "",
        tertiary: "",
        gradient: "#ff5656"
    },

    text: {
        primaryFont: 'Raleway',
        secondaryFont: 'Kanit',
        color: '#fff'
    },

    brand: {
        icon: ''
    },

    header: {
        borderRadius: '0px 0px 20px 20px'
    },
    sideSpace: '10%'
}

