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

export interface Slot {
    id: string,
    playLink: string,
    linkYoutube: string,
    name: string,
    rating: number,
    tips: string,
    slug: string,
    type: string,
    image: {
        url: string,
    }
}
   
export interface Bonus {
    id: string,
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