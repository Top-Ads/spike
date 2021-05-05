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