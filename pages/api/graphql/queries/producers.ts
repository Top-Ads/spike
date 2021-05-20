
export const PRODUCERS = `
query producers($countryCode: String, $start: Int, $sort: String) {
    producers(
        start: $start,
        sort: $sort,
        where : { 
            country : {code : $countryCode},
          },
        ) {
        id
        name
        website
        description
        image {
            url
        }
        slug
        bottomArticle       
    }
}
` 