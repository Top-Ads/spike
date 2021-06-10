
export const SLOTS = `
query slots(
    $countryCode: String,
    $limit: Int, $start: Int, 
    $name_contains: String,
    $slug: String, 
    $sort: String, 
    $producer: String
    ) {
    slots( 
          where : { 
            country : {code : $countryCode},
            name_contains: $name_contains,
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
            
    }
}
` 