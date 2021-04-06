export interface StyledTheme {
    colors: {
        primary: string
        secondary: string,
        tertiary: string,
        gradient: string
    }

    text: {
        primaryFont: string,
        secondaryFont: string,
        color: string
    }

    brand: {
        icon: string
    }
    
    header: {
        borderRadius: string 
    }
}

export interface Game {
    categories: [],
    gameName: string,
    gamePreviewUrl: string,
    gameThumbnail: string
}
   
export interface Bonus {
    bonusName: string,
    bonusFreeSpins: number,
    bonusCode: string,
    bonusUrl: string
}