import { SlotType } from "../utils/constants"

export interface StyledTheme {
    palette: {
        background: string,
        backgroundImage: string,
        gradient: string
    }

    text: {
        primaryFont: string,
        color: {
            white: string,
            black: string
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
    bonuses: [{ link: string }]
    rating: number
    link?: string
    producer?: {
        id: number
    }
}

export interface Bonus {
    id: string
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

export interface ThemeSlot { 
    newest: Slot []
    online: Slot []
    bar: Slot []
    vlt: Slot []
    popular: Slot[]
}

export interface Slot {
    id: string
    created_at: Date
    updated_at: Date
    description: string
    rtp: number
    winningSpinFrequency: number
    volatility: string
    playLink: string
    linkYoutube: string
    videoDescription: string
    name: string
    rating: number
    tips: string
    slug: string
    likes: number
    type: SlotType
    producer: Producer
    mainBonus: Bonus
    bonuses: [Bonus]
    image: {
        url: string
    },
}

export interface Stat {
    lands: number
    percentage: number
    spinSince: number
    symbol: string
}

export interface Spin {
    _id: string,
    date: string
    multiplier: string
    multiplierInfo: string
    rawTime: string
    sameSlotAndSpinResult: boolean
    slotResult: string
    slotResultSymbol: string
    spinResultSymbol: string
    timeOfSpin: number
    totalPayout: number
    totalWinners: number
    watchVideo: string
}

export interface MonopolyTables {
    _id : string
    time : number
    lowTierTable : {
        id : string,
        type : 'low' | 'mid' | 'high',
        timeOfSpins : number,
        rows : MonopolyTableRow[]
    }
    midTierTable : {
        id : string,
        type : 'low' | 'mid' | 'high',
        timeOfSpins : number,
        rows : {
          rowPosition : number,
          percentage : number,
          lands : number,
          total : number
        }[]
    }
    highTierTable : {
        id : string,
        type : 'low' | 'mid' | 'high',
        timeOfSpins : number,
        rows : {
          rowPosition : number,
          percentage : number,
          lands : number,
          total : number
        }[]
    }
}

export interface MonopolyTableRow {
  rowPosition : number
  percentage : number
  lands : number
  total : number
}