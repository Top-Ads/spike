import { Slot } from './../../schemas/index';
import AquaClient from '../aquaClient'

const aquaClient = new AquaClient()

const SLOTS = `
  query slots(
      $countryCode: String,
      $limit: Int, $start: Int, 
      $name_contains: String,
      $type_contains: String,
      $slug: String, 
      $sort: String, 
      $producer: String,
      ) {
      slots( 
            where : { 
              country : {code : $countryCode},
              name_contains: $name_contains,
              type_contains: $type_contains,
              slug: $slug,
              producer: {
                name: $producer
              }
            },

            limit: $limit,
            start: $start,
            sort: $sort
            ) {
              id
              created_at
              updated_at
              description
              rtp
              winningSpinFrequency
              volatility
              playLink
              linkYoutube
              videoDescription
              name
              rating
              tips
              slug
              likes
              type
              producer {
                id
                name
              }
              image {
                url
              }
              mainBonus {
                id
              }
      }
  }
` 

export const getSlots = async (params: Object): Promise<Slot[]> => {
  const request = await aquaClient.query({ 
    query: SLOTS,
    variables: params
  })

  return request.data.data.slots as Slot[]
}