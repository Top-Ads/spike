
export const BONUSES = `
query bonuses($countryCode: String, $limit: Int, $start: Int) {
    bonuses( 
          where : { country : {code : $countryCode} },
          sort:"updated_at", 
          limit: $limit,
          start: $start ) {
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