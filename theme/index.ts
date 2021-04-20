import { createGlobalStyle } from "styled-components"
import { StyledTheme } from "../pages/api/interfaces"

export const styledTheme: StyledTheme = {

    colors: {
        backGround: "#ff1313",
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
        src: local('Montserrat'), url(./fonts/Montserrat-Black) format('ttf');
        font-display: swap;
    }

    body {
        height: 100%;
        width: 100%;
        font-family: Montserrat, sans-serif;
        background-color: #f2f2f2;
        margin: 0 auto;
    }

    a { text-decoration : none; text-align: center; }

    * { box-sizing: borderRadius-box; }

    h1, strong { font-weight: bold; }

    strong { color: ${styledTheme.colors.backGround}; }

    p { color: ${styledTheme.text.color.secondary}; }
`

