import AquaClient from '../aquaClient'
import { Bonus } from './../../schemas/index'

const aquaClient = new AquaClient()

export const BonusProps = `
  fragment BonusProps on Bonus {
    id
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
`

const BONUSES = `
  query bonuses(
      $limit: Int,
      $start: Int, 
      $names: [String],
      $sort: String,
      $id: String,
      $slug: String
      ) {
      bonuses( 
            where : { 
              country : {code : "it"}, 
              name_in: $names, 
              id: $id, 
              slug: $slug 
            },
            limit: $limit,
            start: $start
            sort: $sort
      ) {
        ...BonusProps
      }
  }     
  ${BonusProps}
` 

export const getBonuses = async (params: Object, query: string = BONUSES): Promise<Bonus[]> => {
  const request = await aquaClient.query({ 
    query,
    variables: params,
  })

  return request.data.data.bonuses as Bonus[]
}