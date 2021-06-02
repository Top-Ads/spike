import React, { FunctionComponent, useEffect, useState } from 'react'
import styled from 'styled-components'
import StatsCard from '../../../components/Cards/StatsCard'
import Divider from '../../../components/Divider'
import GridCards from '../../../components/GridCards'
import CustumSelect from '../../../components/Inputs/Select'
import Layout from '../../../components/Layout'
import { GridType } from '../../../utils/constants'
import axios from 'axios'
import { APISOCKET } from '../../../public/environment'
import { io, Socket } from 'socket.io-client'
import { Spins, Stats } from '../../../interfaces'
import SpinsTable from '../../../components/Tables/SpinsTable'

type PageProps = {
    statsData: Stats[],
    spinsData: Spins[]
};

const CrazyTimePage: FunctionComponent<PageProps> = ({statsData, spinsData}) => {

    const [stats, setStats] = useState<Stats[]>(statsData)
    const [spins, setSpins] = useState<Spins[]>(spinsData)
    const [socket, setSocket] = useState<Socket | undefined>()
    const [selected, setSelected] = useState<string>('24h')
    const [lastUpdate, setLastUpdate] = useState<Date>(new Date(Date.now()))

    const fetchStatsData = async (timeFrame: string) => {
        const dataStataRequest  = await axios.get(`${APISOCKET}/api/data-for-the-last-hours/${timeFrame}`)
        setStats(dataStataRequest.data.stats.stats)
    }

    useEffect( () => {
        setSocket(io(APISOCKET, {secure:true, rejectUnauthorized : false, transports: ["websocket"]}))

        return () => { socket && socket.disconnect() }
    }, [])

    useEffect(() => {
        if(socket) {
            socket.emit(selected)
            socket.on(selected, (data) => {
                setStats(data.stats.stats)
                setSpins(data.spins)
                setLastUpdate(new Date(Date.now()))
            })
        }
    }, [socket])

    useEffect( () => {
        if (selected)
            fetchStatsData(selected)
    }, [selected])

    return (
        <Layout title="Live Stats">
             <div className="space-around">

                <Header className="intro-header">
                    <h2>Crazy Time Stats Live: Tutte le Estrazioni in Tempo Reale</h2>

                    <p>
                        In questa pagina si trovano tutti i <strong>dati sulle estrazioni in diretta live alla ruota della Crazy Time</strong>.
                        Si possono confrontare le probabilità teoriche rispetto ai valori usciti effettivamente sulla ruota.
                        Sarà possibile <strong>trovare i numeri ritardatari che rappresentano le migliori opportunità per variare
                        la strategia di gioco</strong>,
                        insieme a tanti altri comodi dati che raccontano l'evoluzione della ruota nel tempo.
                    </p>

                    <Divider/>  
                </Header>

                <Main>

                    <StatsCards>

                        <Header className="stats-card-header">
                            <div>
                                <h3>Statistiche Crazy Time</h3>
                                <span>Last Updated: {lastUpdate.toLocaleString()}</span>
                            </div>
                           
                            <CustumSelect setSelected={setSelected}/>
                        </Header>
                        <Divider/>

                        <Grids>
                            <GridCards
                                type={GridType.STATS} 
                                content={ stats.map( (stats: Stats, index: number) => 
                                    <StatsCard key={index} data={stats} timeFrame={selected}/>
                                )}
                                AlignItem={"center"}
                                xs={12} sm={3} md={3}
                                showBoxShadow
                                bgColor="#fff"
                                spacing={3}/>
                        </Grids>

                    </StatsCards>

                    <br/>

                    <h3>Storico degli Spin</h3>
                    <SpinsTable data={spins}/>
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
const StatsCards = styled.div`
  display: flex;
  flex-direction: column;
`

const Grids = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const getServerSideProps = async () => {
    const dataStataRequest  = await axios.get(`${APISOCKET}/api/data-for-the-last-hours/24`)
    const dataSpinsRequest  = await axios.get(`${APISOCKET}/api/get-latest/15`)

    return {
        props: {
          statsData: dataStataRequest.data.stats.stats,
          spinsData: dataSpinsRequest.data.latestSpins
        }
      }
    
}
export default CrazyTimePage
