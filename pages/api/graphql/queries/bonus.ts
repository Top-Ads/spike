
export const ALL_BONUS = `
query AllBonus($countryCode : String) {
    bonuses(where : {country : {code : $countryCode}}){
        country{
          code
        }
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
    }
}
` 