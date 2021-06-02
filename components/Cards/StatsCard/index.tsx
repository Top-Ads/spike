import React, { FunctionComponent } from 'react'
import Image from 'next/image'
import { Fragment } from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'
import UpdateIcon from '@material-ui/icons/Update'
import { Stats } from '../../../interfaces'
import { injectSymbolImage } from '../../../utils/injectSymbollmage'

type PageProps = {
   data: Stats,
   timeFrame: string
};

const dataCard: FunctionComponent<PageProps> = ({data, timeFrame}) => {

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
                    <li className="live-result">In the last {timeFrame}: <span>{`${Math.round(data.percentage * 100) / 100}%`}</span></li>
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
