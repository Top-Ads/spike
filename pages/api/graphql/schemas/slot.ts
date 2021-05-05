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
    slug: string
    likes: number
    producer: Producer
    image: {
        url: string
    },
}


