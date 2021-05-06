
export const PRODUCERS = `
query producers($limit: Int, $start: Int) {
    producers(limit: $limit, start: $start) {
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