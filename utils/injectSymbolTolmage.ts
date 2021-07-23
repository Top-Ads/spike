import { CDN } from "../public/environment"
import { LiveStats, SymbolLayout } from "./constants"

export const injectSymbolImage = (symbol: string, type: LiveStats, symbolLayout?: SymbolLayout): any => {

    const API = `https://spike-images.s3.eu-central-1.amazonaws.com`
    
    if(type === LiveStats.CRAZYTIME) {
        switch(symbol) {
            case 'one':
                return {
                    url: `${API}/ico-crazytime-slot-1_db272f778d.png`,
                    width: 140,
                    height: 140
                }
        
            case 'two':
                return {
                    url: `${API}/ico-crazytime-slot-2_9fae79a563.png`,
                    width: 140,
                    height: 140
                }
    
            case 'five':
                return {
                    url: `${API}/ico-crazytime-slot-5_4b584c0988.png`,
                    width: 140,
                    height: 140
                }
            case 'ten':
                return {
                    url: `${API}/ico-crazytime-slot-10_c72360b662.png`,
                    width: 140,
                    height: 140
                }
    
            case 'coinflip':
                return {
                    url: `${API}/ico-crazytime-slot-cf_7ed53595a8.png`,
                    width: 215,
                    height: 140
                }
    
            case 'cashhunt':
                return {
                    url: `${API}/ico-crazytime-slot-ch_08e236c7e7.png`,
                    width: 215,
                    height: 140
                }
    
            case 'crazytime':
                return {
                    url: `${API}/ico-crazytime-slot-ct_d430610c57.png`,
                    width: 215,
                    height: 140
                }
    
            case 'pachinko':
                return {
                    url:  `${API}/ico-crazytime-slot-pa_1b1b4d7d6f.png`,
                    width: 215,
                    height: 140
                }
    
            default:
                return {
                    url: `${CDN}/svg/no_img_available.svg`,
                    width: 'auto',
                    height: 'auto'
                }
        }
    }

    if(type === LiveStats.MONOPOLY && symbolLayout === SymbolLayout.CARD)   {
        switch(symbol) {
            case 'one':
                return {
                    url: `${API}/monopoly-1-card_1412ffb4dd.png`,
                    width: 148,
                    height: 80
                }
                   
            case 'two':
                return {
                    url: `${API}/monopoly-2-card_fac87cd080.png`,
                    width: 148,
                    height: 80
                }
                 
            case 'five':
                return {
                    url: `${API}/monopoly-2-card_fac87cd080.png`,
                    width: 148,
                    height: 80
                }
                   
            case 'ten':
                return {
                    url: `${API}/monopoly-10-card_b6b453773a.png`,
                    width: 148,
                    height: 80
                }
    
            case 'tworolls':
                return {
                    url: `${API}/monopoly-2r-card_7607c7f4e2.png`,
                    width: 148,
                    height: 80
                }
    
            case 'fourrolls':
                return {
                    url: `${API}/monopoly-4r-card_abbeacf82a.png`,
                    width: 148,
                    height: 80
                }
    
            case 'chance':
                return {
                    url: `${API}/monopoly-chance-card_0faa3808a5.png`,
                    width: 148,
                    height: 80
                }
                
            default:
                return {
                    url: `${CDN}/svg/no_img_available.svg`,
                    width: 'auto',
                    height: 'auto'
                }
        }
    }
    
    if(type === LiveStats.MONOPOLY && symbolLayout === SymbolLayout.TABLE)   {
        switch(symbol) {
            case 'one':
                return {
                    url: `${API}/monopoly-1_33a076459b.png`,
                    width: 148,
                    height: 80
                }
                   
            case 'two':
                return {
                    url: `${API}/monopoly-2_76b8237627.png`,
                    width: 148,
                    height: 80
                }
                 
            case 'five':
                return {
                    url: `${API}/monopoly-5_23a698085f.png`,
                    width: 148,
                    height: 80
                }
                   
            case 'ten':
                return {
                    url: `${API}/monopoly-10_abec4dd827.png`,
                    width: 148,
                    height: 80
                }
    
            case 'tworolls':
                return {
                    url: `${API}/monopoly-2r_ee78ad08f5.png`,
                    width: 215,
                    height: 140
                }
    
            case 'fourrolls':
                return {
                    url: `${API}/monopoly-4r_404d02b0de.png`,
                    width: 215,
                    height: 140
                }
    
            case 'chance':
                return {
                    url: `${API}/chance-monopoly_f668ac3e67.png`,
                    width: 215,
                    height: 140
                }
                
            default:
                return {
                    url: `${CDN}/svg/no_img_available.svg`,
                    width: 'auto',
                    height: 'auto'
                }
        }
    }

    if(type === LiveStats.DREAMCATCHER && symbolLayout === SymbolLayout.CARD) {
        switch(symbol) {
            case 'one':
                return {
                    url: `${API}/dc-stat-1_ebd7750b06.png`,
                    width: 148,
                    height: 80
                }
        
            case 'two':
                return {
                    url: `${API}/dc-stat-2_a37e4208fd.png`,
                    width: 148,
                    height: 80
                }
    
            case 'five':
                return {
                    url: `${API}/dc-stat-5_c33567ad9d.png`,
                    width: 148,
                    height: 80
                }
            case 'ten':
                return {
                    url: `${API}/dc-stat-10_570e4c7d79.png`,
                    width: 148,
                    height: 80
                }

            case 'twenty':
                return {
                    url: `${API}/dc-stat-20_1d6b83d48a.png`,
                    width: 148,
                    height: 80
                }

            case 'fourty':
                return {
                    url: `${API}/dc-stat-40_86269dad25.png`,
                    width: 148,
                    height: 80
                }
    
            case 'twox':
                return {
                    url: `${API}/dc-stat-2x_f9cc0df223.png`,
                    width: 148,
                    height: 80
                }
    
            case 'sevenx':
                return {
                    url: `${API}/dc-stat-7x_6f84041aad.png`,
                    width: 148,
                    height: 80
                }

            default:
                return {
                    url: `${CDN}/svg/no_img_available.svg`,
                    width: 'auto',
                    height: 'auto'
                }
        }
    }

    if(type === LiveStats.DREAMCATCHER && symbolLayout === SymbolLayout.TABLE) {
        switch(symbol) {
            case 'one':
                return {
                    url: `${API}/dream-1_833467952a.png`,
                    width: 148,
                    height: 80
                }
        
            case 'two':
                return {
                    url: `${API}/dream-2_56ce403c16.png`,
                    width: 148,
                    height: 80
                }
    
            case 'five':
                return {
                    url: `${API}/dream-5_c9b1f823b1.png`,
                    width: 148,
                    height: 80
                }
            case 'ten':
                return {
                    url: `${API}/dream-10_45ea179a8c.png`,
                    width: 148,
                    height: 80
                }

            case 'twenty':
                return {
                    url: `${API}/dream-20_25b58433fd.png`,
                    width: 148,
                    height: 80
                }

            case 'fourty':
                return {
                    url: `${API}/dream-40_2d67647708.png`,
                    width: 148,
                    height: 80
                }
    
            case 'twox':
                return {
                    url: `${API}/dream-2x_ca1958f422.png`,
                    width: 148,
                    height: 80
                }
    
            case 'sevenx':
                return {
                    url: `${API}/dream-7x_710530a00a.png`,
                    width: 148,
                    height: 80
                }

            default:
                return {
                    url: `${CDN}/svg/no_img_available.svg`,
                    width: 'auto',
                    height: 'auto'
                }
        }
    }
  
}