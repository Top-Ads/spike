import React, { FunctionComponent, useEffect, useState } from 'react'
import styled from 'styled-components'
import StatsCard from '../../../components/Cards/StatsCard'
import Divider from '../../../components/Divider'
import GridCards from '../../../components/GridCards'
import CustumSelect from '../../../components/Inputs/Select'
import Layout from '../../../components/Layout'
import { GridType, LiveStats } from '../../../utils/constants'
import axios from 'axios'
import { APISOCKET } from '../../../public/environment'
import { io, Socket } from 'socket.io-client'
import { Bonus, MonopolyTables, Spin, Stat } from '../../../interfaces'
import SpinsTable from '../../../components/Tables/SpinsTable'
import BonusTable from '../../../components/Tables/BonusTable'
import AquaClient from '../../api/graphql/aquaClient'
import { BONUSES } from '../../api/graphql/queries/bonuses'
import BonusCard from '../../../components/Cards/BonusCard'
import { device } from '../../../utils/device'
import { mergeWithUpdate } from '../../../utils/mergeWithUpdate'

type PageProps = {
    statsData: Stat[],
    spinsData: Spin[],
    bonusData: Bonus[],
    tablesData: MonopolyTables
};

const DreamCatcherPage: FunctionComponent<PageProps> = ({statsData, spinsData, bonusData}) => {

    const [stats, setStats] = useState<Stat[]>(statsData)
    const [spins, setSpins] = useState<Spin[]>(spinsData)
    const [socket, setSocket] = useState<Socket | undefined>()
    const [selected, setSelected] = useState<string>('24h')
    const [lastUpdate, setLastUpdate] = useState<Date>(new Date(Date.now()))

    const fetchStatsData = async (timeFrame: string) => {
        const dataStataRequest  = await axios.get(`${APISOCKET.DREAMCATCHER}/api/data-for-the-last-hours/${timeFrame}`)

        setStats(dataStataRequest.data.stats.stats)
    }

    useEffect( () => {
        setSocket(io(APISOCKET.DREAMCATCHER, {secure:true, rejectUnauthorized : false, transports: ["websocket"]}))

        return () => { socket && socket.disconnect() }
    }, [])

    useEffect(() => {
        if(socket) {
            socket.emit(selected)
            socket.on(selected, (data) => {
                setStats(data.stats.stats)
                
                setSpins(mergeWithUpdate(spins, data.spins.map((r: Spin) => {
                    r.timeOfSpin = r.timeOfSpin - 1000 * 60 * 60 * 2
                    return r
                  })))

                setLastUpdate(new Date(Date.now()))
            })
        }

        return () => { socket && socket.disconnect() }
    }, [socket])

    useEffect( () => {
        if (selected)
            fetchStatsData(selected)
    }, [selected])

    return (
        <Layout title="LiveStats - Dream Catcher">
             <div className="space-around">

                <Main>

                    <StatsContainer>
                        <Header className="stats-card-header">
                            <div>
                                <h3>Statistiche Dream Catcher</h3>
                                <span suppressHydrationWarning>Last Updated: {lastUpdate.toLocaleString()}</span>
                            </div>
                        
                            <CustumSelect setSelected={setSelected}/>
                        </Header>
                        <Divider/>

                        <Grids className={"stats-cards"}>
                            <GridCards
                                type={GridType.STATS} 
                                content={ stats.map( (stats: Stat, index: number) => 
                                    <StatsCard key={index} data={stats} timeFrame={selected} type={LiveStats.DREAMCATCHER}/>
                                )}
                                AlignItem={"center"}
                                xs={12} sm={3} md={3}
                                showBoxShadow
                                bgColor="#fff"
                                spacing={3}/>
                        </Grids>
                    </StatsContainer>

                    <br/>

                    <BonusContainer>
                        <h3>Puoi giocare alla DREAM CATCHER qui:</h3>
                        <div className="bonus-table">
                            <BonusTable data={bonusData}/>
                        </div>
                        
                        <Grids className={"bonus-cards"}>
                            <GridCards
                                type={GridType.BONUS}
                                content={ bonusData.map( (bonus) => 
                                    <BonusCard key={bonus.id} data={bonus}/>
                                )}
                                AlignItem={"center"}
                                xs={12} sm={12} md={12}
                                showIndex
                                showBoxShadow
                                bgColor="#fff"
                                spacing={2}
                            />
                        </Grids>
                    </BonusContainer>

                    <br/>

                    <SpinsContainer>
                        <h3>Storico degli Spin</h3>
                        <SpinsTable data={spins} gameType={LiveStats.DREAMCATCHER}/>
                    </SpinsContainer>

                    <br/>

                </Main>

                </div>
            
        </Layout>
    )
} 


const Header = styled.div`
   &.stats-card-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        h3 {
            display: flex;
            align-items: center;
        }

        span {
            font-size: 13px;
        }
   }
`

const Main = styled.div`
`

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const BonusContainer = styled.div`
    .bonus-table {
        display: revert;
        @media ${device.mobileL} {
            display: none; 
        }
    }      
    
    .bonus-cards { 
        display: none; 
        @media ${device.mobileL} {
             display: revert;
        }
    }
`

const SpinsContainer = styled.div`
`

const Grids = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export async function getStaticProps() {
    
    const aquaClient = new AquaClient()

    const dataRequest  = await axios.get(`${APISOCKET.DREAMCATCHER}/api/data-for-the-last-hours/24h`)


    const PAGE_BONUSES = ["BetFlag", "LeoVegas", "888 Casino", "StarCasinò", "Unibet", "PokerStars Casino"]

    const bonusRequest = await aquaClient.query({ 
        query: BONUSES, 
        variables: { countryCode: 'it', limit: PAGE_BONUSES.length, start: 0, names: PAGE_BONUSES } })
    
    return {
        props: {
          statsData: dataRequest.data.stats.stats,
          spinsData: dataRequest.data.spinsInTimeFrame.map( (r: Spin) => {
            r.timeOfSpin = r.timeOfSpin - 1000 * 60 * 60 * 2
            return r
          }),
          bonusData: bonusRequest.data.data.bonuses

        }
      }
    
}

export default DreamCatcherPage
