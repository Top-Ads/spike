import { Slot } from './../../schemas/index'
import AquaClient from '../aquaClient'
import { BonusProps } from './bonuses'

const aquaClient = new AquaClient()

export const SlotProps = `
  fragment SlotProps on Slot {
    id
    created_at
    updated_at
    description
    rtp
    winningSpinFrequency
    volatility
    playLink
    theme
    type
    maxLines
    gameMode
    linkYoutube
    videoDescription
    name
    rating
    tips
    slug
    producer {
      id
      name
    }
    image {
      url
    }
  }
`

const SLOTS = `
  query slots(
      $limit: Int,
      $start: Int, 
      $name_contains: String,
      $type_contains: String,
      $slug: String, 
      $sort: String, 
      $producer: String,
      ) {
      slots( 
            where : { 
              country : {code : "it"},
              name_contains: $name_contains,
              type_contains: $type_contains,
              slug: $slug,
              producer: {
                slug: $producer
              },
              type: "online"
            },
            limit: $limit,
            start: $start,
            sort: $sort
            ) {
              ...SlotProps
              mainBonus {
                id
              }
              bonuses {
                ...BonusProps
              }
              relatedSlots {
                ...SlotProps
            }
      }
  }
  ${BonusProps}, ${SlotProps}
`

export const getSlots = async (
	params: Object,
	query: string = SLOTS
): Promise<Slot[]> => {
	const request = await aquaClient.query({
		query,
		variables: params,
	})

	return request.data.data.slots as Slot[]
}
