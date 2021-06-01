import React, { FunctionComponent } from 'react'
import Image from 'next/image'
import { Fragment } from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'
import { CDN } from '../../../public/environment'

type PageProps = {
   data: any
};

const StatsCard: FunctionComponent<PageProps> = ({data}) => {

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
                <Thumbnail>
                    <LazyLoad height={200} offset={200}>
                        <Image
                            alt={'one'}
                            src={injectSymbolImage(data.symbol)}
                            layout="responsive"
                            priority={true}
                            width={data.symbol === 'one' || data.symbol === 'two' || data.symbol === 'five' || data.symbol === 'ten' ? 140 : 215}
                            height={data.symbol === 'one' || data.symbol === 'two' || data.symbol === 'five' || data.symbol === 'ten' ? 140 : 130}/> 
                    </LazyLoad>
                </Thumbnail>
                <Main>
                    <div className="live-result">Total Spins: <span>{data.spinSince}</span></div>
                    <div className="live-result">In the last 12h: <span>{`${Math.round(data.percentage * 100) / 100}%`}</span></div>
                    <div className="live-result">Total Draws: <span>{data.lands}</span></div>
                </Main>
            </Container>
            
        </Fragment>
    )
} 

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 5px;
    min-height: 75px;
`

const Main = styled.div`
   display: flex;
   flex-direction: column;
   font-weight: normal;
   justify-content: space-around;
   text-align: left;
   border-left: 1px solid;
   padding-left: 5px;
   font-size: 14px;

   .live-result {
        width: fill-available;

        span {
            font-weight: bold;
            color: red;
        }
   }

`

const Thumbnail = styled.div`
   min-width: 80px;
   margin: 0px 10px;
`

export default StatsCard
