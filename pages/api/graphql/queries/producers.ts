
export const PRODUCERS = `
query producers($limit: Int, $start: Int, $sort: String) {
    producers(limit: $limit, start: $start, sort: $sort) {
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