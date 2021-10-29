import { createGlobalStyle } from "styled-components"
import { StyledTheme } from "../schemas"
import { device } from "../utils/device"

export const styledTheme: StyledTheme = {

    palette: {
        background: 'rgba(226, 185, 109, 1)',
        backgroundImage: 'linear-gradient(180deg, rgb(224 198 133) 0%, rgb(217 187 106 / 92%)  50%)',
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
        max-width: 1920px;
        font-family: "Montserrat", sans-serif;
        background-color: #f2f2f2;
        margin: 0 auto;
        padding: 0;
        /* To avoid padding effect when open modal */
        overflow-y: auto !important;
    }

    a { text-decoration : none; text-align: center; color: inherit; }

    * { box-sizing: borderRadius-box; }

    h1, strong { font-weight: bold; }

    strong, h1 { color: ${styledTheme.palette.background}; }

    p, li { 
        line-height: 1.7em; 
        word-spacing: normal; 
    }
    
    @media ${device.mobileL} {  
        ul, ol {
            padding: 0 20px; 
        }
        li {
            width: auto;
        }
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