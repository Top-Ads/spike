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

export interface AlgoliaSearchData {
    name: string
    type: 'slot' | 'bonus' | 'producer'
    slug: string
    country: string
    image: string 
    bonuses: [{ link: string }],
    rating: number
    link?: string
    producer?: {
        id: number
    }
}

export interface Bonus {
    id: number
    description: string
    backgroundColor: string
    borderColor: string
    link: string
    name: string
    noDeposit: string
    withDeposit: string
    rating: number
    tips: string
    legacyId: string
    slug: string
    bonus_guide?: {
        slug: string
    }
    circular_image: {
        url: string
    }
}

export interface Producer {
    id: number
    name: string
    website: string
    description: string
    image: [any]
    slug: string
    bottomArticle?: string
}

export interface Slot {
    id: string
    created_at: Date
    updated_at: Date
    description: string
    rtp: number
    winningSpinFrequency: number
    volatility: string
    isPopularInCountry: boolean
    playLink: string
    linkYoutube: string
    videoDescription: string
    name: string
    rating: number
    tips: string
    slug: string
    likes: number
    producer: Producer
    image: {
        url: string
    },
}

export interface Stats {
    lands: number,
    percentage: number,
    spinSince: number,
    symbol: string
}