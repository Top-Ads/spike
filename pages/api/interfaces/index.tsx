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

export interface Slot {
    categories: [],
    gameName: string,
    gamePreviewUrl: string,
    gameThumbnail: string
}
   
export interface Bonus {
    description: string,
    backgroundColor: string,
    borderColor: string,
    link: string,
    name: string,
    noDeposit: string,
    withDeposit: string,
    rating: number,
    tips: string,
    slug: string,
    status: string,
    freeSpins: number
}