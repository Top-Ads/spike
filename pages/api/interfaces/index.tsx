export interface StyledTheme {
    colors: {
        primary: string,
        gradient: string
    }

    text: {
        primaryFont: string,
        secondaryFont: string,
        color: {
            primary: string,
            secondary: string
        }
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
    freeSpins: number,
    circular_image: {
        url: string,
        previewUrl: string,
        name: string
    }
}