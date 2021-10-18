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
import { Bonus, Spin, Stat } from '../../../lib/schemas'
import SpinsTable from '../../../components/Tables/SpinsTable'
import LazyLoad from 'react-lazyload'
import BonusTable from '../../../components/Tables/BonusTable'
import BonusCard from '../../../components/Cards/BonusCard'
import { device } from '../../../lib/utils/device'
import { mergeWithUpdate } from '../../../lib/utils/mergeWithUpdate'
import { getBonuses } from '../../../lib/graphql/queries/bonuses'
import { format } from 'date-fns'
import italianLocale  from 'date-fns/locale/it'
import Head from 'next/head'

type PageProps = {
    statsData: Stat[],
    spinsData: Spin[],
    bonusData: Bonus[]
};

const CrazyTimePage: FunctionComponent<PageProps> = ({statsData, spinsData, bonusData}) => {

    const [stats, setStats] = useState<Stat[]>(statsData)
    const [spins, setSpins] = useState<Spin[]>(spinsData)
    const [socket, setSocket] = useState<Socket | undefined>()
    const [timeFrame, seTimeFrame] = useState<string>('24h')
    const [lastUpdate, setLastUpdate] = useState<Date>(new Date(Date.now()))

    const fetchStatsData = async (timeFrame: string) => {
        const dataStataResponse  = await axios.get(`${APISOCKET.CRAZYTIME}/api/data-for-the-last-hours/${timeFrame}`)
        setStats(dataStataResponse.data.stats.stats)
    }

    useEffect( () => {
        setSocket(io(APISOCKET.CRAZYTIME, {secure:true, rejectUnauthorized : false, transports: ["websocket"]}))

        return () => { socket && socket.disconnect() }
    }, [])

    useEffect(() => {
        if(socket) {
            socket.emit(timeFrame)
            socket.on(timeFrame, (data) => {
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
        if (timeFrame)
            fetchStatsData(timeFrame)
    }, [timeFrame])

    return (
        <Layout title="Statistiche Crazy Time live online game show interattivo e divertente">

            <Head>
                <meta 
                property="og:description" 
                content="Segui in tempo reale le statistiche della ruota di Crazy Time: controlla tutte le statistiche live, per scegliere i tuoi numeri vincenti e scopri gli incredibili BONUS!" 
                key="description"/>
            </Head>

             <div className="layout-container">

                <Header className="intro-header">
                    <h2>Statistiche Crazy Time Live: Tutte le Estrazioni in Tempo Reale</h2>

                    <Intro>

                        <p>
                        Benvenuto sulla pagina dedicata alle Statistiche Live di Crazy Time.
                        Qui puoi seguire in tempo reale le statistiche della ruota di Crazy Time.
                        Esamina le statistiche live per selezionare i numeri vincenti e scoprire Bonus incredibili”<br/><br/>

                        Hai a disposizione i dati sulle estrazioni in diretta alla ruota della Crazy Time. 
                        In questa sezione puoi confrontare le probabilità teoriche rispetto ai numeri usciti realmente a questi Game Show.<br/>
                        Inoltre, hai a disposizione i dati sui numeri ritardatari – la migliore occasione per elaborare la tua strategia di gioco,
                        oltre a informazioni che raccontano la storia di questo gioco digitale.

                        </p>

                        <Thumbnail>
                            <LazyLoad height={548} offset={300}>
                                <Image
                                    alt={'crazy time live stats'}
                                    src={`https://spike-images.s3.eu-central-1.amazonaws.com/crazy-time-stats_1c1293a185.jpeg`}
                                    layout="responsive"
                                    priority={true}
                                    quality={70}
                                    width={975}
                                    height={548}/> 
                            </LazyLoad>
                        </Thumbnail>

                      
                    </Intro>
                    
                    <Divider/>  
                </Header>

                <Main>

                    <StatsContainer>

                        <Header className="stats-card-header">
                            <div>
                                <h3>Statistiche Crazy Time</h3>
                                <span style={{textTransform: 'capitalize'}} suppressHydrationWarning>
                                    Ultimo Aggiornamento: {format(new Date(lastUpdate), 'dd MMM yyyy • HH:mm', { locale: italianLocale }).toString()}
                                </span>
                            </div>
                           
                            <CustumSelect setSelected={seTimeFrame}/>
                        </Header>
                        <Divider/>

                        <GridContainer className={"stats-cards"}>
                            <GridLayout
                                gridType={GridType.STATS} 
                                content={ stats.map( (stats: Stat, index: number) => 
                                    <StatsCard key={index} data={stats} timeFrame={timeFrame} type={LiveStats.CRAZYTIME}/>
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
                        <h3>Puoi giocare alla CRAZY TIME QUI</h3>
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
                        <SpinsTable data={spins} gameType={LiveStats.CRAZYTIME}/>
                    </SpinsContainer>
 
                </Main>

                <Footer>
                    <section>
                        <h3>Consulta i numeri ritardatari della Crazy Time</h3>
                        <p>
                        Fra i Live Casino Game Show, la ruota della Crazy Time è di certo il gioco più popolare.
                        In questa parte puoi dare un’occhiata a ciò che accade in diretta nel gioco. <br/>
                        In più, è possibile anche visionare il numero di volte in cui si è verificata l’estrazione 
                        – in considerazione dell’intervallo di tempo scelto del valore della previsione teorica.

                        </p>
                    </section>

                    <section>
                    <h3>Perché questi dati sono utili?</h3>
                        <p>
                        Questi dati possono aiutarti perché rivelano la differenza tra previsioni statistiche e ciò che accade nel gioco reale.<br/><br/>
                        Devi sapere che i produttori dichiarano il valore medio delle probabilità di uscita, 
                        tuttavia nelle estrazioni reali, si contemplano discostamenti che possono variare intorno ai valori attesi. <br/>
                        Quindi, se alcuni valori sono particolarmente distanti dal valore medio atteso, 
                        si può ipotizzare che ci saranno estrazioni tendenti a ristabilire le possibilità teoriche. <br/>
                        Come abbiamo spesso detto, devi comunque considerare che “la probabilità non ha memoria”. 
                        Ciò significa che un giro della ruota è indipendente dell’altro.<br/>
                        Però è possibile utilizzare le informazioni proposte per predisporre le puntate, rispetto alle dinamiche del gioco stesso.

                        </p>
                    </section>
                    <section>
                        <h3>Crazy Time: divertimento assicurato!</h3>

                        <div>
                            <p>
                            Qualsiasi utente di Casino Squad, può sfruttare questo servizio esclusivo e totalmente gratis.
                            La ricerca attraverso questa sezione è immediata, semplice e comoda.<br/>
                            Avendo la possibilità di valutare in tempo reale le probabilità, 
                            puoi adattare la tua strategia di gioco e provare l’ottimizzazione del Budget a disposizione. 
                            Dobbiamo sottolineare che sul lungo periodo, ogni tipo di giocata porta alla perdita del credito, se si considera l’RTP pari a 96,08%. <br/>
                            Per tutte le informazioni dettagliate e per scoprire tutte le caratteristiche della Crazy Time, consulta la guida al Live Game Show Crazy Time. 
                            Buon divertimento con la celeberrima ruota della Crazy Time!<br/>
                            Ricorda di giocare con coscienza e responsabilità, nella consapevolezza che il gioco da casinò può causare dipendenza patologica.
                            </p>
                        </div>
                    </section>
  
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

        @media ${device.mobileL} { display: none; }
    }      
    
    .bonus-cards { 
        display: none; 
        @media ${device.mobileL} { display: revert; }
    }
`

const SpinsContainer = styled.div`
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
    
    const dataResponse  = await axios.get(`${APISOCKET.CRAZYTIME}/api/data-for-the-last-hours/24h`)

    const PAGE_BONUSES = ["BetFlag", "LeoVegas", "888 Casino", "StarCasinò", "Unibet", "PokerStars Casino"]

    return {
        props: {
          statsData: dataResponse.data.stats.stats,
          spinsData: dataResponse.data.spinsInTimeFrame.map( (r: Spin) => {
            r.timeOfSpin = r.timeOfSpin - 1000 * 60 * 60 * 2
            return r
          }),
          bonusData: await getBonuses({ names: PAGE_BONUSES, sort: 'rating:desc' })
        }
      }
}

export default CrazyTimePage
