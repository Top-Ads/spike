import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { device } from '../../lib/utils/device'

type Props = {
   totalSlots?: number
};

const GiochiFooter: FunctionComponent<Props> = ({totalSlots}) => {
    return (
        <Main>
            <Banner>
                <span className="banner-name">Slot disponibili</span>
                <div className="banner-info">{totalSlots}+</div> 
            </Banner>
            <Banner>
                <span className="banner-name">Migliori fornitori</span>
                <div className="banner-info">
                    <a>WMG </a>|
                    <a> Novomatic </a>|
                    <a> WMS</a>
                </div>  
            </Banner>
            <Banner>
                <span className="banner-name">Disponibile su</span>
                <div className="banner-info">
                    <a>888 </a>|
                    <a> Casino </a>|
                    <a> Leovegas </a>|
                    <a> Starcasino</a>
                </div> 
            </Banner>	
            <Banner>
                <span className="banner-name">Tipo di gioco</span>
                <div className="banner-info">
                    <a>Gioco gratis</a>
                </div> 
            </Banner>
        </Main> 
    )
} 

const Main = styled.div`
    border: 1px solid white;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    background-color: ${({theme}) => theme.palette.background};
    padding: 10px;
    flex-wrap: wrap;
    color: #fff;
    margin: 10px 0px;
`
const Banner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    @media ${device.mobileL} {
        width: 100%;
        margin: 5px 0px;
    }

    .banner-name {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 2px;
    }

    .banner-info {
        font-size: 13px;
        font-weight: normal;
        
    }
`

export default GiochiFooter
