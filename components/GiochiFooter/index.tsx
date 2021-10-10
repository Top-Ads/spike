import Link from 'next/link';
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
                    <Link href={'/producer/wmg'}><a>WMG</a></Link> | 
                    <Link href={'/producer/novomatic'}><a> Novomatic</a></Link> |
                    <Link href={'/producer/netent'}><a> NetEnt</a></Link>
                </div>  
            </Banner>
            <Banner>
                <span className="banner-name">Disponibile su</span>
                <div className="banner-info">
                    <a target="_blank" rel="noopener noreferrer" href="http://record.affiliatelounge.com/_SEA3QA6bJTNajD9O5s8HwmNd7ZgqdRLk/50/"> Starcasino </a> |
                    <a target="_blank" rel="noopener noreferrer" href="https://spikeslot.com/visita/leo_vegas"> Leovegas </a> |
                    <a target="_blank" rel="noopener noreferrer" href="https://mediaserver.entainpartners.com/renderBanner.do?zoneId=2000318"> Gioco Digitale </a>
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
