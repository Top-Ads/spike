import { createGlobalStyle } from "styled-components"
import { StyledTheme } from "../schemas"

export const styledTheme: StyledTheme = {

    palette: {
        background: 'rgba(226, 185, 109, 1)',
        backgroundImage: 'linear-gradient(180deg, rgb(224 198 133) 0%, rgba(226, 185, 109, 0.8) 50%)',
        gradient: 'rgb(224 198 133)'
    },
    text: {
        primaryFont: 'Montserrat, sans-serif',
        color: {
            white: '#fff',
            black: '#3a3935'
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
        font-family: 'Montserrat-Medium';
        src: 
            url(https://casino-squad.b-cdn.net/fonts/Montserrat/Montserrat-Medium.ttf) format('ttf'),
            url(https://casino-squad.b-cdn.net/fonts/Montserrat/Montserrat-Medium.ttf) format('truetype');
        font-display: swap;
    }

    @font-face {
        font-family: 'Montserrat-SemiBold';
        src: 
            url(https://casino-squad.b-cdn.net/fonts/Montserrat/Montserrat-SemiBold.ttf) format('ttf'),
            url(https://casino-squad.b-cdn.net/fonts/Montserrat/Montserrat-SemiBold.ttf) format('truetype');
        font-display: swap;
    }

    @font-face {
        font-family: 'Montserrat-ExtraBold';
        src: 
            url(https://casino-squad.b-cdn.net/fonts/Montserrat/Montserrat-ExtraBold.ttf) format('ttf'),
            url(https://casino-squad.b-cdn.net/fonts/Montserrat/Montserrat-ExtraBold.ttf) format('truetype');
        font-display: swap;
    }

    html {
        /* Firefox */
        scrollbar-width: thin;
        scrollbar-color: ${styledTheme.palette.background} #fff;

        /* Chrome, Edge, and Safari */
        ::-webkit-scrollbar {
            width: 14px;
        }

        ::-webkit-scrollbar-track {
            background-color: #ffffff;
        }
        
        ::-webkit-scrollbar-thumb {
            background-color: ${styledTheme.palette.background};
            border-radius: 10px;
            border: 4px solid #ffffff;
        }
    }

    body {
        height: 100%;
        width: 100%;
        max-width: 1600px;
        font-family: "Montserrat-SemiBold", sans-serif;
        background-color: #f2f2f2;
        margin: 0 auto;
        padding: 0;
        /* To avoid padding effect when open modal */
        overflow-y: auto !important;
    }

    a { text-decoration : none; text-align: center; color: inherit; font-family: 'Montserrat-Medium'}

    * { box-sizing: borderRadius-box; }

    h1, strong { font-weight: bold; }

    strong, h1 { color: ${styledTheme.palette.background}; }

    p { 
        color: ${styledTheme.text.color.black}; 
        line-height: 1.5em; word-spacing: normal; 
        font-family: 'Montserrat-Medium';
    }

    .custom-scroll {
        scrollbar-width: thin;
        scrollbar-color: ${styledTheme.palette.background} #fff;

        /* Chrome, Edge, and Safari */
        ::-webkit-scrollbar {
            width: 14px;
        }

        ::-webkit-scrollbar-track {
            background-color: #ffffff;
        }
        
        ::-webkit-scrollbar-thumb {
            background-color: ${styledTheme.palette.background};
            border-radius: 10px;
            border: 4px solid #ffffff;
        }
    }

`