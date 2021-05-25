import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import StatsCard from '../../components/Cards/StatsCard'
import Divider from '../../components/Divider'
import GridCards from '../../components/GridCards'
import CustumSelect from '../../components/Inputs/Select'
import Layout from '../../components/Layout'
import { GridType } from '../../utils/constants'

type PageProps = {
   data: any
};

const LiveStatsPage: FunctionComponent<PageProps> = () => {
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
                                content={ [... new Array(8)].map( (stats, index) => 
                                    <StatsCard key={index} data={stats}/>
                                )}
                                AlignItem={"center"}
                                xs={6} sm={3} md={3}
                                showBoxShadow
                                bgColor="#fff"
                                spacing={2}/>
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
export default LiveStatsPage
