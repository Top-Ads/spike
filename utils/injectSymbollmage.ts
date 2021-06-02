import { CDN } from "../public/environment"

export const injectSymbolImage = (symbolString : string) => {
    switch(symbolString){
        case 'one':
            return `https://spike-images.s3.eu-central-1.amazonaws.com/ico-crazytime-slot-1_db272f778d.png`
        case 'two':
            return `https://spike-images.s3.eu-central-1.amazonaws.com/ico-crazytime-slot-2_9fae79a563.png`
        case 'five':
            return `https://spike-images.s3.eu-central-1.amazonaws.com/ico-crazytime-slot-5_4b584c0988.png`
        case 'ten':
            return `https://spike-images.s3.eu-central-1.amazonaws.com/ico-crazytime-slot-10_c72360b662.png`
        case 'coinflip':
            return `https://spike-images.s3.eu-central-1.amazonaws.com/ico-crazytime-slot-cf_7ed53595a8.png`
        case 'cashhunt':
            return `https://spike-images.s3.eu-central-1.amazonaws.com/ico-crazytime-slot-ch_08e236c7e7.png`
        case 'crazytime':
            return `https://spike-images.s3.eu-central-1.amazonaws.com/ico-crazytime-slot-ct_d430610c57.png`
        case 'pachinko':
            return `https://spike-images.s3.eu-central-1.amazonaws.com/ico-crazytime-slot-pa_1b1b4d7d6f.png`
        default:
            return `${CDN}/svg/no_img_available.svg`
    }
}