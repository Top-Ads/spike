import { createGlobalStyle } from "styled-components"
import { StyledTheme } from "../interfaces"

export const styledTheme: StyledTheme = {

    colors: {
        background: "#ff1313",
        gradient: "#ff5656"
    },
    text: {
        primaryFont: 'Montserrat, sans-serif',
        color: {
            primary: '#fff',
            secondary: '#212530'
        }    
    },
    button: {
        boxShadowX: '0px 0px 5px 5px rgba(33,37,41,0.4)',
        boxShadowY: '0px 0px 5px 5px rgba(255,255,255,0.4)',
        borderRadius: '5px'
    }
}

export const GlobalStyle = createGlobalStyle`

    @font-face {
        font-family: 'Montserrat';
        src: local('Montserrat'), url(https://spikewebsitemedia.b-cdn.net/spike_v2/fonts/Montserrat-Black) format('ttf');
        font-display: swap;
    }

    body {
        height: 100%;
        width: 100%;
        font-family: Montserrat, sans-serif;
        background-color: #f2f2f2;
        margin: 0 auto;
        overflow-y: scroll !important;
    }

    a { text-decoration : none; text-align: center; }

    * { box-sizing: borderRadius-box; }

    h1, strong { font-weight: bold; }

    strong { color: ${styledTheme.colors.background}; }

    p { color: ${styledTheme.text.color.secondary}; }
`