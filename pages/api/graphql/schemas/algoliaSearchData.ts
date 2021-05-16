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