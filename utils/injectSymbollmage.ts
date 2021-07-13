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
                    width: 215,
                    height: 140
                }
    
            case 'fourrolls':
                return {
                    url: `${API}/monopoly-4r-card_abbeacf82a.png`,
                    width: 215,
                    height: 140
                }
    
            case 'chance':
                return {
                    url: `${API}/monopoly-chance-card_0faa3808a5.png`,
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
  
}