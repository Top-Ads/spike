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
    id: string,
    categories: [],
    name: string,
    previewUrl: string,
    thumbnail: string
}
   
export interface Bonus {
    id: string,
    name: string,
    freeSpins: number,
    code: string,
    url: string
}