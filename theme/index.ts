import { createGlobalStyle } from "styled-components"
import { StyledTheme } from "../pages/api/interfaces"

export const GlobalStyle = createGlobalStyle`

    /* @font-face {
        font-family: '';
        src: local('Montserrat'), url(./fonts/) format('ttf');
        font-display: swap;
    } */

    body {
        height: 100%;
        width: 100%;
        font-family : Roboto;
        background-color: #f2f2f2;
        margin: 0 auto;
    }

    a { text-decoration : none; text-align: center; }

    * { box-sizing: borderRadius-box; }

    h1, strong { font-weight: bold; }

    strong { color: #ff1313 }

    p { color: #212530; text-align: justify; }
`
export const styledTheme: StyledTheme = {

    colors: {
        primary: "#ff1313",
        gradient: "#ff5656"
    },

    text: {
        primaryFont: 'Roboto',
        secondaryFont: 'Raleway',
        color: {
            primary: '#fff',
            secondary: '#212529'
        }
    }
}

