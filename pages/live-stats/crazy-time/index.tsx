import React, { FunctionComponent, useEffect, useState } from 'react'
import Image from 'next/image'
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

const CrazyTimePage: FunctionComponent<PageProps> = ({statsData, spinsData, bonusData}) => {

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

        return () => { socket && socket.disconnect() }
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
                                    <StatsCard key={index} data={stats} timeFrame={selected}/>
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
                        <SpinsTable data={spins}/>
                    </SpinsContainer>
 
                </Main>

                <Footer>
                    <h3>Confronta i numeri in ritardo alla Crazy Time</h3>
                    <p>Crazy Time è il gioco live online che ha spopolato tra i Live Casino Game Show.
                        In questa pagina si può controllare cosa sta succedendo in diretta nel gioco.

                        Cliccando in alto a destra è possibile scegliere l’<b>intervallo di tempo</b> su cui calcolare le statistiche.

                        Su ciascuna casella è indicata la <b>probabilità di uscita</b> che si aggiorna in tempo reale e il 
                        <b>numero di giri dall’ultima estrazione</b>di quel particolare numero o gioco Bonus. Inoltre, 
                        sono anche visibili il <b>numero di volte in cui si è verificata l’estrazione (in base all’intervallo di tempo scelto) 
                        e il valore dato dalla previsione teorica.</b>

                        Nella tabella inferiore è riassunta la storia dettagliata di ciascuno Spin e ci sono disponibili 
                        anche gli eventuali <b>moltiplicatori</b>, il <b>numero dei giocatori vincenti</b> e il <b>montepremi totale distribuito</b>.</p>

                    <h3>Come avvantaggiarsi dei dati mostrati</h3>
                    <p>Questi dati possono essere utili perchè comunicano <b>la differenza tra le previsioni
                        statistiche e l'andamento reale</b>. Sappiamo che i produttori dichiarano il valore medio
                        delle probabilità di uscita di ciascun settore o feature, ma nelle estrazioni reali sono
                        contemplati dei discostamenti variabili attorno ai valori attesi.


                        Come si può immaginare con il giusto buon senso, se alcuni valori sono particolarmente lontanti
                        dal loro valore medio, sarà plausibile che ci saranno estrazioni che andranno a ristabilire le probabilità teoriche.

                        Anche se bisogna sempre stare <b>attenti perché matematicamente non c'è alcuna correlazione tra un giro
                        della ruota e l'altro</b>, si possono sfruttare le informazioni riportate per ottimizzare le proprie puntate
                        in base alle dinamiche del gioco.

                        Facendo un esempio pratico: se stiamo puntando sul Pachinko Bonus, ma ci accorgiamo che è
                        uscito con la giusta frequenza, mentre il Cash Hunt non è stato estratto da vari giri, 
                        <b>sarà utile valutare lo spostamento della puntata</b> verso quest'ultimo.

                        I numeri in ritardo o le funzioni, come il Coin Flip Bonus, sono i candidati più appetibili 
                        che potenzialmente fanno conseguire un recupero del Budget, tenendo sempre a mente che il successo 
                        delle scommesse non sarà mai garantito.</p>
                    
                    <h3>Il divertimento alla Crazy Time non è mai stato così semplice</h3>
                    <p><b>Qualsiasi utente del sito SPIKE Slot può avvantaggiarsi di questo servizio esclusivo
                        in modo totalmente gratuito</b>. La consultazione è comoda, facile e veloce tramite questa pagina.
                        Con la valutazione delle probabilità in tempo reale si potrà modificare la propria strategia
                        di gioco e tentare di <b>ottimizzare l’uso del Budget</b> a disposizione.

                        Si ribadisce ancora una volta, però, che nel lungo periodo qualsiasi tipo di giocata porterà
                        a una perdita del credito come ci si aspetta dall’RTP pari a <b>96,08%</b>.
                        Informazioni approfondite in dettaglio su tutte le caratteristiche della 
                        Crazy Time sono disponibili nella nostra<strong> guida a Crazy Time</strong>.

                        Buon divertimento a tutti alla Crazy Time.</p>

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

                        <p>Giocate solo <b>responsabilmente</b> sapendo che il gioco d’azzardo può causare <b>dipendenza patologica</b>.</p>
  
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

    const dataStatsRequest  = await axios.get(`${APISOCKET}/api/data-for-the-last-hours/24h`)
    const dataSpinsRequest  = await axios.get(`${APISOCKET}/api/get-latest/15`)

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

export default CrazyTimePage
