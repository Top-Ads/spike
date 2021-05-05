export interface StyledTheme {
    colors: {
        background: string,
        gradient: string
    }

    text: {
        primaryFont: string,
        color: {
            primary: string,
            secondary: string
        }
    }

    button: {
        boxShadowX: string,
        boxShadowY: string,
        borderRadius: string
    }
}