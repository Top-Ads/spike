import { Producer } from '../../schemas'
import AquaClient from '../aquaClient'

const aquaClient = new AquaClient()

const PRODUCERS = `
    query producers($countryCode: String, $start: Int, $sort: String) {
        producers(
            start: $start,
            sort: $sort,
            where : { 
                country : {code : $countryCode},
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

export const getProducers = async (params: Object): Promise<Producer[]> => {
    const request = await aquaClient.query({ 
      query: PRODUCERS,
      variables: params,
    })
    
    return request.data.data.producers as Producer[]
}