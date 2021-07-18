import React, { FunctionComponent } from 'react'
import Image from 'next/image'
import { Fragment } from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'
import UpdateIcon from '@material-ui/icons/Update'
import { Stats } from '../../../interfaces'
import { injectSymbolImage } from '../../../utils/injectSymbolTolmage'
import { LiveStats, SymbolLayout } from '../../../utils/constants'
import { crazyTimeProbability, monopolyProbability } from '../../../utils/livsStatsProbality'

type PageProps = {
   data: Stats,
   timeFrame: string,
   type: LiveStats
};

const StatsCard: FunctionComponent<PageProps> = ({data, timeFrame, type}) => {

    return (
        <Fragment>
             <Container>
                <UpdateIcon className="update-icon" fontSize={'small'}/>
                
                <Thumbnail>
                    <LazyLoad height={200} offset={200}>
                        <Image
                            alt={data.symbol}
                            src={injectSymbolImage(data.symbol, type, SymbolLayout.CARD).url}
                            layout="responsive"
                            priority={true}
                            width={injectSymbolImage(data.symbol, type, SymbolLayout.CARD).width}
                            height={injectSymbolImage(data.symbol, type, SymbolLayout.CARD).height}/> 
                    </LazyLoad>
                </Thumbnail>
                <Main>
                    <li className="live-result">Total Spins: <span>{data.spinSince}</span></li>
                    <li className="live-result">In the last {timeFrame}: <span>{`${Math.round(data.percentage * 100) / 100}%`}</span></li>
                    <li className="live-result">Total Draws: <span>{data.lands}</span></li>
                    <li className="live-result">{type === LiveStats.CRAZYTIME ?  crazyTimeProbability(data.symbol) : monopolyProbability(data.symbol)}</li>
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

export default StatsCard


