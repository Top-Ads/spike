
export const BONUSES = `
query bonuses($countryCode: String, $limit: Int, $start: Int) {
    bonuses( 
          where : { country : {code : $countryCode} },
          limit: $limit,
          start: $start ) {
        id,
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