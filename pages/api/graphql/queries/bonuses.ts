
export const BONUSES = `
query bonuses($countryCode: String, $limit: Int, $start: Int, $names: [String]) {
    bonuses( 
          where : { country : {code : $countryCode}, name_in: $names },
          limit: $limit,
          start: $start
          ) {
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