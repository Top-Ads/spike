import { createGlobalStyle } from "styled-components"
import { StyledTheme } from "../interfaces"

export const GlobalStyle = createGlobalStyle`

    @font-face {
        font-family: 'Montserrat';
        src: local('Montserrat'), url(./fonts/Montserrat/Montserrat-Regular.ttf) format('ttf');
        font-display: swap;
    }

    @font-face {
        font-family: 'Montserrat-light';
        src: local('Montserrat'), url(./fonts/Montserrat/Montserrat-ExtraLight.ttf) format('ttf');
        font-display: swap;
    }

    body {
        height: 100%;
        width: 100%;
        font-family : Montserrat, sans-serif;
        background-color: #f2f2f2;
        margin: 0 auto;
    }

    a { text-decoration : none; text-align: center;}

    * { box-sizing: borderRadius-box; }

    h1, strong { font-weight: bold; }
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
    }
}

