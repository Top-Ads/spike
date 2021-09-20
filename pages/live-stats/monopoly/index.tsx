import React, { FunctionComponent, useEffect, useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import StatsCard from '../../../components/Cards/StatsCard'
import Divider from '../../../components/Divider'
import GridLayout from '../../../components/GridLayout'
import CustumSelect from '../../../components/Inputs/Select'
import Layout from '../../../components/Layout'
import { GridType, LiveStats } from '../../../lib/utils/constants'
import axios from 'axios'
import { APISOCKET } from '../../../public/environment'
import { io, Socket } from 'socket.io-client'
import { Bonus, MonopolyTables, Spin, Stat } from '../../../lib/schemas'
import SpinsTable from '../../../components/Tables/SpinsTable'
import LazyLoad from 'react-lazyload'
import BonusTable from '../../../components/Tables/BonusTable'
import BonusCard from '../../../components/Cards/BonusCard'
import { device } from '../../../lib/utils/device'
import DiceRollTable from '../../../components/Tables/DiceRollTable'
import { getBonuses } from '../../../lib/graphql/queries/bonuses'
import { format } from 'date-fns'

type PageProps = {
    statsData: Stat[],
    spinsData: Spin[],
    bonusData: Bonus[],
    tablesData: MonopolyTables
};

const MonopolyPage: FunctionComponent<PageProps> = ({statsData, spinsData, bonusData, tablesData}) => {
    const [stats, setStats] = useState<Stat[]>(statsData)
    const [spins, setSpins] = useState<Spin[]>(spinsData)
    const [tables, setTables] = useState<MonopolyTables>(tablesData)
    const [socket, setSocket] = useState<Socket | undefined>()
    const [selected, setSelected] = useState<string>('24h')
    const [lastUpdate, setLastUpdate] = useState<Date>(new Date(Date.now()))

    const fetchStatsData = async (timeFrame: string) => {
        const dataStataResponse  = await axios.get(`${APISOCKET.MONOPOLY}/api/data-for-the-last-hours/${timeFrame}`)
        setStats(dataStataResponse.data.stats.stats)
    }

    useEffect( () => {
        setSocket(io(APISOCKET.MONOPOLY, {secure:true, rejectUnauthorized : false, transports: ["websocket"]}))

        return () => { socket && socket.disconnect() }
    }, [])

    useEffect(() => {
        if(socket) {
            socket.emit(selected)
            socket.on(selected, (data) => {
                setStats(data.stats.stats)
                setSpins(data.spins)
                setTables(data.tables[0])    
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
        <Layout title="LiveStats - Monopoly">
             <div className="layout-container">

                <Header className="intro-header">
                    <h2>Monopoly Stat Live: Tutte le Estrazioni in Tempo Reale</h2>

                    <Intro>
                        <p>
                            Sono disponibili qui tutte le informazioni e i dati relativi alle estrazioni in tempo reale della ruota del game show di Evolution Gaming.
                            In questo modo potrai comparare le <strong>probabilità teoriche con i numeri che sono realmente stati estratti,</strong>,
                            sulla ruota e definire al meglio la tua strategia di gioco, con l'aiuto dei vari dati forniti da tale pagina.
                        </p>

                        <Thumbnail>
                                <LazyLoad height={548} offset={300}>
                                    <Image
                                        alt={'monopoly live stats'}
                                        src={`https://images.spikeslot.com/monopoly-live-stats_3f844ffed7.jpeg`}
                                        layout="responsive"
                                        priority={true}
                                        quality={70}
                                        width={892}
                                        height={501}/> 
                                </LazyLoad>
                        </Thumbnail>
                    </Intro>

                    <Divider/>  
                </Header>

                <Main>

                    <StatsContainer>
                        <Header className="stats-card-header">
                            <div>
                                <h3>Statistiche Monopoly</h3>
                                <span suppressHydrationWarning>Last Updated: { format(new Date(lastUpdate), 'dd MMM yyyy • HH:mm').toString() }</span>
                            </div>
                        
                            <CustumSelect setSelected={setSelected}/>
                        </Header>
                        <Divider/>

                        <GridContainer className={"stats-cards"}>
                            <GridLayout
                                gridType={GridType.STATS} 
                                content={ stats.map( (stats: Stat, index: number) => 
                                    <StatsCard key={index} data={stats} timeFrame={selected} type={LiveStats.MONOPOLY}/>
                                )}
                                AlignItem={"center"}
                                xs={12} sm={3} md={3}
                                showBoxShadow
                                bgColor="#fff"
                                spacing={3}/>
                        </GridContainer>
                    </StatsContainer>

                    <br/>

                    <BonusContainer>
                        <h3>Puoi giocare alla MONOPOLY QUI</h3>
                        <div className="bonus-table">
                            <BonusTable data={bonusData}/>
                        </div>
                        
                        <GridContainer className={"bonus-cards"}>
                            <GridLayout
                                gridType={GridType.BONUS}
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
                        </GridContainer>
                    </BonusContainer>

                    <br/>

                    <SpinsContainer>
                        <h3>Storico degli Spin</h3>
                        <SpinsTable data={spins} gameType={LiveStats.MONOPOLY}/>
                    </SpinsContainer>

                    <br/>

                    <DiceRollContainer>
                        <DiceRollTable type='low' data={tables.lowTierTable.rows}/> 
                        <DiceRollTable type='mid' data={tables.midTierTable.rows}/>  
                        <DiceRollTable type='high' data={tables.highTierTable.rows}/> 
                    </DiceRollContainer> 

                </Main>

                <Footer>
                    <section>
                        <h3>Scopri gli ultimi numeri usciti al Monopoly Live</h3>
                        <p>
                            La famosa ruota ormai presente in molti Casinò Online è uno dei giochi dal vivo più amati dai giocatori,
                            in quanto rappresenta la versione online del classico gioco da tavolo. <b>Scoprire quindi quali sono gli ultimi numeri usciti</b>, 
                            può aiutare il giocatore ad essere sempre aggiornato in tempo reale.
                            Nella parte superiore dello schermo, sulla destra, sarà possibile <b>selezionare l'arco temporale su cui calcolare le statistiche</b>.
                            Ogni singola casella specifica la probabilità di uscita che viene sempre aggiornata <b>in diretta</b> e il numero di giri 
                            che intercorre dall'ultima estrazione di ciascun numero oppure 2 rolls, 4 rolls e chance.
                            Con questo strumento di <b>live tracker Monopoly Live</b> è inoltre possibile visionare il numero 
                            di volte in cui ciascun numero o roll è stato estratto, insieme al valore correlato dato dalla previsione teorica.
                            Nella parte inferiore della pagina, invece, è possibile visualizzare informazioni specifiche relative ad ogni singolo
                            Spin tra cui il numero di giocatori vincenti, il montepremi totale distribuito e il moltiplicatore nel caso della chance,
                            del 2 rolls o del 4 rolls.
                        </p>
                    </section>

                    <section>
                        <h3>Quali sono i vantaggi dei dati mostrati tramite Monopoly Live Stat?</h3>
                        <p>
                            L'utilità dei dati forniti da tale pagina sta nella possibilità di <b>vedere la differenza</b> tra le previsioni date dalla probabilità teorica
                            all’andamento effettivo che sta avendo la ruota.
                            Ogni produttore dichiara il valore medio delle probabilità di uscita di ciascun settore presente sulla ruota ma, qualora uno o più valori
                            dovessero essere lontani da tale valore medio, <b>sarà molto probabile assistere ad estrazioni che ristabiliranno le probabilità teoriche</b>.
                            Pur ricordando che<b> non ci sono correlazioni matematiche tra uno spin e l'altro</b>, sarà possibile utilizzare le statistiche qui presenti
                            per poter definire una propria strategia con la speranza che funzioni sul breve periodo.
                            Consideriamo un esempio pratico: se stiamo puntando sul 2 rolls, ma ci rendiamo conto che è uscito con la giusta frequenza,
                            mentre il 4 rolls non esce da vari giri, sarà conveniente considerare di puntare il 4 rolls.
                            I numeri che non escono da vari giri oppure i rolls potrebbero permette al giocatore di recuperare il proprio Budget, 
                            anche se bisogna tenere in considerazione che il successo delle scommesse non è mai assicurato.
                        </p>
                    </section>

                    <section>
                        <h3>Basta poco per divertirsi a questo classico dei Live Casinò</h3>
                        <p>
                            Tutti gli utenti del sito SPIKE Slot possono <b>usufruire di questo servizio in modo totalmente gratuito</b>, avendo quindi la possibilità di
                            consultare questa pagina in modo semplice e veloce.
                            Seguendo il gioco in tempo reale si avrà sempre la possibilità di modificare eventualmente la propria strategia e di provare ad ottimizzare
                            l'uso del Budget a disposizione.
                            Bisogna sempre ricordare però che, a lungo termine, qualsiasi tipo di giocata porterà ad una perdita del credito, 
                            come è possibile intuire dall'RTP di<b> 96.23%</b>.
                            Per avere ulteriori informazioni potete consultare la nostra <strong> Guida a Monopoly Live</strong>.
                            Buon divertimento a tutti.
                        </p>
                    </section>

                    <p>  Per avere ulteriori informazioni potete consultare la nostra <strong> Guida a Monopoly Live</strong>.
                        Buon divertimento a tutti.
                    </p>

                    <p>Ricordo di giocare responsabilmente, in quanto il gioco è vietato ai minori di 18 anni e può creare dipendenza patologica.</p>
  
                </Footer>
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

const Intro = styled.div`
    display: flex;
    margin-bottom: 15px;
    flex-wrap: wrap;
   
    p { 
        width: 50%; 
        @media ${device.mobileL} {  width: 100%; }
    }
`

const Main = styled.div`
`

const Footer = styled.div`
    section { margin: 40px 0px; }
    h3 { color: ${({theme}) => theme.palette.background}; }
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

const DiceRollContainer = styled.div`
    display : flex;
    justify-content: space-between;
    flex-wrap : wrap;
`

const GridContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const Thumbnail = styled.div`
    width: 350px;
    margin: auto;

    @media ${device.mobileL} {  width: 100%; }
`

export async function getStaticProps() {
    
    const dataStatsResponse  = await axios.get(`${APISOCKET.MONOPOLY}/api/data-for-the-last-hours/24h`)
    const dataSpinsResponse  = await axios.get(`${APISOCKET.MONOPOLY}/api/get-latest/15`)

    const PAGE_BONUSES = ["BetFlag", "LeoVegas", "888 Casino", "StarCasinò", "Unibet", "PokerStars Casino"]

    return {
        props: {
          statsData: dataStatsResponse.data.stats.stats,
          spinsData: dataSpinsResponse.data.latestSpins,
          bonusData: await getBonuses({ limit: PAGE_BONUSES.length, start: 0, names: PAGE_BONUSES }),
          tablesData: dataStatsResponse.data.tables[0]
        }
      }
}

export default MonopolyPage
