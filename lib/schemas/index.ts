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


export interface AlgoliaSpikeType {
    name: string
    type: 'slot' | 'bonus' | 'producer' | 'blog'
    slug: string
    country: string
    image: string 
    rating: number
    link?: string
    producer?: {
        id: number
    }
    objectID?: string
}

export interface AlgoliaBlogType {
    imageUrl: string
    link: string
    objectID: string
    title: string 
    _highlightResult: {
        imageUrl: highlightType
        link: highlightType
        title: highlightType
    }
    type: string
}

export interface highlightType {
    fullyHighlighted: string
    matchLevel: string
    matchedWords: string[]
    value: string
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
    image: [{
        url: string
    }]
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
    maxLines: number
    winningSpinFrequency: number
    volatility: 'high' | 'mediumHigh' | 'medium' | 'mediumLow'| 'low'
    gameMode: string
    playLink: string
    linkYoutube: string
    videoDescription: string
    name: string
    rating: number
    tips: string
    slug: string
    type: SlotType
    theme: string
    producer: Producer
    mainBonus: Bonus
    bonuses: [Bonus]
    image: {
        url: string
    }
    relatedSlots: [Slot]
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
    multiplierInfo: 'heads' | 'tails' | 'ct' | 'none'
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

export interface StrapiImage {
    url: string
    alternativeText?: string
}

export interface MainArgument {
    name: string
    slug: string
    secondaryArguments: SecondaryArgument[]
}

export interface SecondaryArgument {
    name: string
    slug: string
    mainArgument: MainArgument
}

export interface Article {
    id?: string
    title: string
    description: string
    content: any
    slug: string
    image: StrapiImage
    main_argument: MainArgument
    secondaryArgument: SecondaryArgument
    published_at?: string
    author: Writer
}

export interface Writer {
  id?: string
  name: string
  picture: UploadFile
  email: string
}

export interface UploadFile { 
    id?: string
    name: string
    caption: string
    width: number
    height: number
    url: string
}

export interface HomeData {
    mainArticle: Article
    secondArticle: Article
    thirdArticle: Article
}

export interface Banner {
    link: string
    image: StrapiImage
}

export interface NavbarData {
    logo: StrapiImage
    items: { mainArgument: MainArgument }[]
    externalLinks: ExternalLink[]
}

export interface ExternalLink {
    label: string
    link: string
    rel: 'dofollow' | 'nofollow'
}

export interface SubscriptionResponse {
    code: string
    message: string
}