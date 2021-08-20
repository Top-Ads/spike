import AquaClient from '../aquaClient'
import { Bonus } from './../../schemas/index'

const aquaClient = new AquaClient()

const BONUSES = `
  query bonuses(
      $countryCode: String, 
      $limit: Int,
      $start: Int, 
      $names: [String], 
      $sort: String,
      $id: String,
      ) {
      bonuses( 
            where : { country : {code : $countryCode}, name_in: $names, id: $id },
            limit: $limit,
            start: $start
            sort: $sort
            ) {
          id,
          updated_at
          description
          backgroundColor
          borderColor
          link
          name
          noDeposit
          withDeposit
          rating
          tips
          slug
          status
          freeSpins
          circular_image {
              url
              previewUrl
              name
            }
      }
  }
` 

export const getBonuses = async (params: Object): Promise<Bonus[]> => {
  const request = await aquaClient.query({ 
    query: BONUSES,
    variables: params,
  })

  return request.data.data.bonuses as Bonus[]
}