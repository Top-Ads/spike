import { createGlobalStyle } from "styled-components"
import { StyledTheme } from "../interfaces"

export const styledTheme: StyledTheme = {

    color: {
        background:  '#e2b96d',
        gradient: '#e0c685'
    },
    text: {
        primaryFont: 'Montserrat, sans-serif',
        color: {
            white: '#fff',
            black: '#212530'
        }    
    },
    button: {
        boxShadowX: '0px 1px 0px 4px rgba(0,0,0,0.29)',
        boxShadowY: '0px 0px 5px 5px rgba(255,255,255,0.4)',
        borderRadius: '5px'
    }
}

export const GlobalStyle = createGlobalStyle`

    @font-face {
        font-family: 'Montserrat';
        src: 
            url(https://casino-squad.b-cdn.net/fonts/Montserrat/Montserrat-Medium.ttf) format('ttf'),
            url(https://casino-squad.b-cdn.net/fonts/Montserrat/Montserrat-Medium.ttf) format('truetype'),
        font-display: swap;
    }

    html {
        scrollbar-width: thin;
        scrollbar-color: ${styledTheme.color.background} #fff;

        /* Chrome, Edge, and Safari */
    
        ::-webkit-scrollbar {
            width: 14px;
        }

        ::-webkit-scrollbar-track {
            background: #ffffff;
        }
        
        ::-webkit-scrollbar-thumb {
            background-color: ${styledTheme.color.background};
            border-radius: 10px;
            border: 4px solid #ffffff;
        }
    }

    body {
        height: 100%;
        width: 100%;
        font-family: "Montserrat", sans-serif;
        background-color: #f2f2f2;
        margin: 0 auto;
        overflow-y: scroll;
    }

    a { text-decoration : none; text-align: center; color: inherit;}

    * { box-sizing: borderRadius-box; }

    h1, strong { font-weight: bold; }

    strong, h1 { color: ${styledTheme.color.background}; }

    p { color: ${styledTheme.text.color.black}; line-height: 1.5em; word-spacing: normal; }

`