import { Producer } from "./producer"

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
    technicals: string
    legacyId: string
    slug: string
    producer: Producer
    image: {
        url: string
    },
}


