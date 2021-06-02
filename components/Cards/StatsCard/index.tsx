import React, { FunctionComponent } from 'react'
import Image from 'next/image'
import { Fragment } from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'
import { CDN } from '../../../public/environment'
import UpdateIcon from '@material-ui/icons/Update'
import { Stats } from '../../../interfaces'

type PageProps = {
   data: Stats
};

const dataCard: FunctionComponent<PageProps> = ({data}) => {

    const injectSymbolImage = (symbolString : string) => {
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

    return (
        <Fragment>
             <Container>
                <UpdateIcon className="update-icon"/>
                
                <Thumbnail>
                    <LazyLoad height={200} offset={200}>
                        <Image
                            alt={data.symbol}
                            src={injectSymbolImage(data.symbol)}
                            layout="responsive"
                            priority={true}
                            width={data.symbol === 'one' || data.symbol === 'two' || data.symbol === 'five' || data.symbol === 'ten' ? 140 : 215}
                            height={data.symbol === 'one' || data.symbol === 'two' || data.symbol === 'five' || data.symbol === 'ten' ? 140 : 130}/> 
                    </LazyLoad>
                </Thumbnail>
                <Main>
                    <li className="live-result">Total Spins: <span>{data.spinSince}</span></li>
                    <li className="live-result">In the last 24h: <span>{`${Math.round(data.percentage * 100) / 100}%`}</span></li>
                    <li className="live-result">Total Draws: <span>{data.lands}</span></li>
                </Main>
            </Container>
            
        </Fragment>
    )
} 

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    padding: 10px 5px;
    min-height: 100px;
    flex-wrap: wrap;

    .update-icon {
        position: absolute;
        top: 2px;
        right: 2px;
    }
`

const Main = styled.ul`
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-content: start;

    font-weight: normal;
    text-align: left;
   
    font-size: 12px;

    li.live-result {
        width: fill-available;
        margin: 2px 0px;

        span {
            font-weight: bold;
            color: red;
        }
   }
`

const Thumbnail = styled.div`
    min-width: 100px;
`

export default dataCard
