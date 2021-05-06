
export const SLOTS = `
query slots($countryCode: String, $limit: Int, $start: Int, $name_contains: String, $sort: String) {
    slots( 
          where : { country : {code : $countryCode}, name_contains: $name_contains},
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