export const injectDiceToImage = (diceNumber : number) => {

    const API = `https://spike-images.s3.eu-central-1.amazonaws.com`

    switch(diceNumber){
        case 1:
            return` ${API}/monopoly-dice-1_0966155b4b.png`
        
        case 2:
            return` ${API}/monopoly-dice-2_3cb8578a5c.png`

        case 3:
            return `${API}/monopoly-dice-3_4673da1e82.png`

        case 4:
            return `${API}/monopoly-dice-4_84d401792c.png`
        
        case 5:
            return `${API}/monopoly-dice-5_ab51b04528.png`
        
        case 6:
            return `${API}/monopoly-dice-6_3a3352669d.png`
    }
}