import { Slot } from "./slot";

export interface Producer {
    id: number
    name: string
    website: string
    description: string
    image: {
        url: string
    }
    slug: string
    bottomArticle?: string
    slots: Slot[]
}