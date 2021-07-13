import React, { FunctionComponent, useEffect, useState } from 'react'
import Image from 'next/image'
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
import { Bonus, Spins, Stats } from '../../../interfaces'
import SpinsTable from '../../../components/Tables/SpinsTable'
import LazyLoad from 'react-lazyload'
import BonusTable from '../../../components/Tables/BonusTable'
import AquaClient from '../../api/graphql/aquaClient'
import { BONUSES } from '../../api/graphql/queries/bonuses'
import BonusCard from '../../../components/Cards/BonusCard'
import { device } from '../../../utils/device'

type PageProps = {
    statsData: Stats[],
    spinsData: Spins[],
    bonusData: Bonus[]
};

const MonopolyPage: FunctionComponent<PageProps> = ({statsData, spinsData, bonusData}) => {

    const [stats, setStats] = useState<Stats[]>(statsData)
    const [spins, setSpins] = useState<Spins[]>(spinsData)
    const [socket, setSocket] = useState<Socket | undefined>()
    const [selected, setSelected] = useState<string>('24h')
    const [lastUpdate, setLastUpdate] = useState<Date>(new Date(Date.now()))

    const fetchStatsData = async (timeFrame: string) => {
        const dataStataRequest  = await axios.get(`${APISOCKET.MONOPOLY}/api/data-for-the-last-hours/${timeFrame}`)
        setStats(dataStataRequest.data.stats.stats)
    }

    useEffect( () => {
        setSocket(io(APISOCKET.MONOPOLY, {secure:true, rejectUnauthorized : false, transports: ["websocket"]}))

        return () => { socket && socket.disconnect() }
    }, [])

    useEffect(() => {
        if(socket) {
            socket.emit(selected)
            socket.on(selected, (data) => {
                console.log('statsData', data)

                setStats(data.stats.stats)
                setSpins(data.spins)
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
        <Layout title="">
             <div className="space-around">

                <Header className="intro-header">
                    <h2>Statistiche delle Estrazioni in Tempo Reale Monopoly Live</h2>

                    <p>
                        Sono disponibili qui tutte le informazioni e i dati relativi alle estrazioni in tempo reale della ruota del game show di Evolution Gaming.
                        In questo modo potrai comparare le <strong>probabilità teoriche con i numeri che sono realmente stati estratti,</strong>,
                        sulla ruota e definire al meglio la tua strategia di gioco, con l'aiuto dei vari dati forniti da tale pagina.
                    </p>

                    <Divider/>  
                </Header>
                <Main>

                <StatsContainer>

                    <Header className="stats-card-header">
                        <div>
                            <h3>Statistiche Crazy Time</h3>
                            <span suppressHydrationWarning>Last Updated: {lastUpdate.toLocaleString()}</span>
                        </div>
                    
                        <CustumSelect setSelected={setSelected}/>
                    </Header>
                    <Divider/>

                    <Grids className={"stats-cards"}>
                        <GridCards
                            type={GridType.STATS} 
                            content={ stats.map( (stats: Stats, index: number) => 
                                <StatsCard key={index} data={stats} timeFrame={selected} type={LiveStats.MONOPOLY}/>
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
                    <h3>Puoi giocare alla CRAZY TIME QUI</h3>
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
                    <SpinsTable data={spins} type={LiveStats.MONOPOLY}/>
                </SpinsContainer>

                </Main>

                <Footer>
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

                    <h3>Quali sono i vantaggi dei dati mostrati tramite Monopoly Live Stats?</h3>
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

                    <p>  Per avere ulteriori informazioni potete consultare la nostra <strong> Guida a Monopoly Live</strong>.
                        Buon divertimento a tutti.
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

const Main = styled.div`
`

const Footer = styled.div`
    margin-top: 40px;

    h3 {
        color: ${({theme}) => theme.colors.background};
    }
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

const Thumbnail = styled.div`
    flex-grow: 1;
    width: 100%;
`

export async function getStaticProps() {
    
    const aquaClient = new AquaClient()

    const dataStatsRequest  = await axios.get(`${APISOCKET.MONOPOLY}/api/data-for-the-last-hours/24h`)
    const dataSpinsRequest  = await axios.get(`${APISOCKET.MONOPOLY}/api/get-latest/15`)

    const PAGE_BONUSES = ["BetFlag", "LeoVegas", "888 Casino", "StarCasinò", "Unibet", "PokerStars Casino"]

    const bonusRequest = await aquaClient.query({ 
        query: BONUSES, 
        variables: { countryCode: 'it', limit: PAGE_BONUSES.length, start: 0, names: PAGE_BONUSES } })
        
    return {
        props: {
          statsData: dataStatsRequest.data.stats.stats,
          spinsData: dataSpinsRequest.data.latestSpins,
          bonusData: bonusRequest.data.data.bonuses
        }
      }
    
}

export default MonopolyPage
