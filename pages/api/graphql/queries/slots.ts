
export const SLOTS = `
query slots($countryCode: String, $limit: Int, $start: Int, $name_contains: String,) {
    slots( 
          where : { country : {code : $countryCode}, name_contains: $name_contains},
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