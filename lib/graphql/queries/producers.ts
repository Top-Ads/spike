import { Producer } from '../../schemas'
import AquaClient from '../aquaClient'

const aquaClient = new AquaClient()

const PRODUCERS = `
    query producers(
        $start: Int, 
        $sort: String, 
        $slug: String,
        ) {
        producers(
            start: $start,
            sort: $sort,
            where : { 
                country : {code : "it"}, 
                slug: $slug
            },
            ) {
            id
            name
            website
            description
            image {
                url
            }
            slug
            bottomArticle       
        }
    }
`

export const getProducers = async (params: Object, query: string = PRODUCERS): Promise<Producer[]> => {
    const request = await aquaClient.query({ 
      query,
      variables: params,
    })
    
    return request.data.data.producers as Producer[]
}