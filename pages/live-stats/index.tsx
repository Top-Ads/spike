import React, { FunctionComponent, useEffect, useState } from 'react'
import styled from 'styled-components'
import StatsCard from '../../components/Cards/StatsCard'
import Divider from '../../components/Divider'
import GridCards from '../../components/GridCards'
import CustumSelect from '../../components/Inputs/Select'
import Layout from '../../components/Layout'
import { GridType } from '../../utils/constants'
import axios from 'axios'
import { APISOCKET } from '../../public/environment'
import { io, Socket } from 'socket.io-client'

type PageProps = {
    statsData: any
};

const LiveStatsPage: FunctionComponent<PageProps> = ({statsData}) => {

    const [stats, setStats] = useState<any>(statsData.stats)
    
    const [socket, setSocket] = useState<Socket | undefined>()


    useEffect( () => {
        setSocket(io(APISOCKET, {secure:true, rejectUnauthorized : false, transports: ["websocket"]}))

        return () => {
            socket && socket.disconnect()
        }

    }, [])

    useEffect(() => {
        if(socket) {
            socket.emit('24h')
            socket.on('24h', (data) => {
                setStats(data.stats.stats)
            })
        }
    }, [socket])

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
                            <h3>Statistiche Crazy Time</h3>
                            
                            <CustumSelect/>
                        </Header>
                       
                        <Grids>
                            <GridCards
                                type={GridType.STATS} 
                                content={ stats.map( (stats: any, index: number) => 
                                    <StatsCard key={index} data={stats}/>
                                )}
                                AlignItem={"center"}
                                xs={12} sm={3} md={3}
                                showBoxShadow
                                bgColor="#fff"
                                spacing={3}/>
                        </Grids>

                    </StatsCards>

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

        .update-icon {
            margin-left: 5px;
        }
        strong {
            font-size: 13px;
            margin-left: 5px;
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

    return {
        props: {
          statsData: dataStataRequest.data.stats
        }
      }
    
}
export default LiveStatsPage
