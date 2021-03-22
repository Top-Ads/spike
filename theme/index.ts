import { createGlobalStyle } from "styled-components"
import { StyledTheme } from "../interfaces"

export const GlobalStyle = createGlobalStyle`
    body {
        height: 100%;
        width: 100%;
        font-family : 'Raleway', sans-serif;
        background-color: "#fff";
        margin: 0 auto;
    }

    a { text-decoration : none; }

    * { box-sizing: borderRadius-box; }
`
export const styledTheme: StyledTheme = {

    colors: {
        primary: "#eb372b",
        secondary: "",
        tertiary: "",
        gradient: "#ed5e58"
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
    }
}

