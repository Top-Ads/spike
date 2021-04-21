
export const SLOTS = `
query slots($countryCode: String, $limit: Int, $start: Int) {
    slots( 
          where : { country : {code : $countryCode} },
          limit: $limit,
          start: $start ) {
            id
            playLink
            linkYoutube
            name
            rating
            tips
            slug
            image {
              url
            }
            type
    }
}
` 