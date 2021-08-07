import React, { FunctionComponent, useEffect, useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import StatsCard from '../../../components/Cards/StatsCard'
import Divider from '../../../components/Divider'
import GridCards from '../../../components/GridCards'
import CustumSelect from '../../../components/Inputs/Select'
import Layout from '../../../components/Layout'
import { GridType, LiveStats } from '../../../lib/utils/constants'
import axios from 'axios'
import { APISOCKET } from '../../../public/environment'
import { io, Socket } from 'socket.io-client'
import { Bonus, MonopolyTables, Spin, Stat } from '../../../lib/schemas'
import SpinsTable from '../../../components/Tables/SpinsTable'
import BonusTable from '../../../components/Tables/BonusTable'
import AquaClient from '../../api/graphql/aquaClient'
import { BONUSES } from '../../api/graphql/queries/bonuses'
import BonusCard from '../../../components/Cards/BonusCard'
import { device } from '../../../lib/utils/device'
import { mergeWithUpdate } from '../../../lib/utils/mergeWithUpdate'
import { longDate } from '../../../lib/utils/date'
import LazyLoad from 'react-lazyload'

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
        const dataStataResponse  = await axios.get(`${APISOCKET.DREAMCATCHER}/api/data-for-the-last-hours/${timeFrame}`)

        setStats(dataStataResponse.data.stats.stats)
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

                <Header className="intro-header">
                    <h2>Dream Catcher Stat Live: Tutte le Estrazioni in Tempo Reale</h2>

                    <Intro>
                        <Thumbnail>
                                <LazyLoad height={548} offset={300}>
                                    <Image
                                        alt={'crazy time live stats'}
                                        src={`https://images.spikeslot.com/statistiche-live-dream-catcher_f2cbe49cd8.jpeg`}
                                        layout="responsive"
                                        priority={true}
                                        quality={70}
                                        width={1186}
                                        height={667}/> 
                                </LazyLoad>
                        </Thumbnail>
                    </Intro>
                    
                    <Divider/>  
                </Header>

                <Main>

                    <StatsContainer>
                        <Header className="stats-card-header">
                            <div>
                                <h3>Statistiche Dream Catcher</h3>
                                <span suppressHydrationWarning>Last Updated: {longDate(lastUpdate)}</span>
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

                <Footer>
                    <p>
                    <b>Dream Catcher</b> è una sorta di "ruota della fortuna", un gioco uscito nel 2017, progetto di Evolution Gaming,
                    casa produttrice di successi come <b>Monopoly Live e Crazy Time</b>.
                    Il suo nome significa "acchiappasogni", rievocando alla mente il famoso amuleto dei nativi americani. E un po' fa sognare, 
                    bisogna dirlo!
                    Ci sono modi differenti in cui puoi avvicinarti a questo gioco.
                    Magari ti piace l'idea di sfruttare i segmenti del moltiplicatore, oppure ami un approccio più cauto.
                    Di seguito troverai riassunte le migliori strategie per vincere a <b><b>Dream Catcher</b>, guide giochi online</b>, alcuni consigli e le <b>statistiche Dream Catcher</b>.
                    </p>

                    <section>
                        <h3>Cosa è Dream Catcher?</h3>
                        <p>
                        La <b>Money Wheel</b> di <b>Dream Catcher</b> è un game show che si avvale di un croupier dal vivo.
                        La regia con l'installazione da studio multi-camera, vanta effetti luminosi e sonori che sottolineano l'azione di gioco.
                        I giocatori possono così provare un'esperienza di <b>gioco virtuale</b> coinvolgente, 
                        in cui il l'adrenalina sale, grazie alle riprese da diverse angolazioni dinamiche della telecamera e dei primi piani.
                        </p>
                    </section>

                    <section>
                        <h3>Strategia per vincere a Dream Catcher sfruttando i segmenti del moltiplicatore</h3>
                        <p>
                        Si tratta di un metodo per sfruttare i segmenti del moltiplicatore 2x e 7x.
                        Ad ogni giro, devi piazzare le tue scommesse solo sui segmenti 5, 10, 20 e 40.
                        In questo modo si riescono a coprire gli spazi più remunerativi.
                        E se capita un moltiplicatore, avrai una copertura della ruota che ti farà avere potenzialmente grandi vincite.
                        Una scommessa di 1 euro sulla ruota 40 è di 40 euro da sola. Ma se otterrai il moltiplicatore 7x, 
                        quel 40x si trasforma in un grande 280x.
                        Tuttavia, è una strategia un po' rischiosa e non adatta a tutti i giocatori. 
                        Infatti, chi cerca una strategia di gioco più sicura, apprezzerà di più la seguente strategia.
                        </p>
                    </section>

                    <section>
                        <h3>Strategia per vincere a Dream Catcher Game Show per ottimizzare il bankroll</h3>
                        <p>
                        Nel caso avessi voglia di provare una strategia meno rischiosa per vincere a <b>Dream Catcher Game Show</b>, 
                        ricorda di scommettere sui segmenti 1, 2 e 20. Considera che ci sono un totale di 54 segmenti sulla ruota del gioco Dream Catcher.
                        In effetti, questi numeri offrono una maggior copertura della ruota, corrispondente alla possibilità del 74% di vincere ad ogni giro.
                        È anche una semplice tattica per ottimizzare il tuo bankroll. In effetti, è probabile che il tuo saldo duri molto più a lungo impostando 
                        il tuo gioco sui segmenti 1, 2, 20.
                        Tuttavia, non dovrai però aspettarti vincite elevate, a meno che non ottenga una rara vincita di 20.
                        </p>
                    </section>

                    <section>
                        <h3>Vuoi vincere alla grande a Dream Catcher?</h3>
                        <p>
                        La migliore strategia per vincere cifre interessanti a <b>Dream Catcher</b> è scommettere esclusivamente sul segmento 40.
                        Infatti, questo segmento ti consentirà di vincere un premio totale di 40 volte.
                        E questo si accumulerà con il moltiplicatore 7x e 2x per un potenziale redditizio di vincita.
                        Considera però che il numero 40, ha solo una probabilità dell'1,85% di apparire. Quindi dovrai avere pazienza.
                        </p>
                    </section> 
                    
                    <section> 
                        <h3>E il numero con la più alta probabilità di vincita in Dream Catcher Game Show?</h3>
                        <p>
                        Devi sapere che il numero con la più alta probabilità di vincita in Dream Catcher è il segmento 1. 
                        Infatti, il numero 1 ha una probabilità del 42,59% di apparire in qualsiasi giro di gioco.
                        Puoi anche scegliere di giocare esclusivamente sul numero 1 e vedrai che vincerai molto spesso. Tuttavia, 
                        non si tratta della miglior opzione per sfruttare i segmenti del moltiplicatore; ma offre comunque un – seppur basso - potenziale di premio.
                        </p>
                    </section>

                    <section>
                        <h3>Riassumendo: qual è il miglior consiglio per giocare a Dream Catcher?</h3>
                        <p>
                            Ti consigliamo di provare una strategia che si adatti allo stile di gioco che ti contraddistingue e sia conciliabile con il tuo bankroll.
                            Se desideri vincere spesso, dovrai scegliere una strategia a basso rischio.
                            Invece, se giochi per una vincita più rara ma elevata, scommetti tutto sul segmento 40.
                        </p>
                    </section>

                    <section>
                        <h3>Qual è la migliore strategia di Dream Catcher?</h3>
                        <p>
                        Onestamente, la migliore strategia da utilizzare a <b>Dream Catcher</b>, dipende molto dal tuo stile di gioco.
                        Ricorda che non c'è mai la garanzia di vincere a questo gioco, ma indipendentemente dalla strategia tieni presente 
                        che è sempre importante giocare prima di tutto per divertirsi e non per vincere.
                        Quindi cerca di provare un approccio equilibrato che possa sfruttare al meglio, 
                        tutto ciò che il format di gioco basato sulla ruota della fortuna, Dream Catcher ha da offrire.
                        </p>
                    </section>

                    <section>
                        <h3>Dove provare il gioco da casinò Dream Catcher?</h3>
                        <p>
                        Per provare in tutta sicurezza Dream Catcher puoi consultare i siti di gioco più sicuri e affidabili in Italia. Qualche esempio?
                        Prova Dream Catcher su 888 Casino, StarCasino, PokerStars o NetBet.
                        Si tratta di <b>casinò online</b> che si differenziano perché offrono la possibilità di giocare nuovamente i <b>Bonus di Benvenuto</b> nella sezione Live Casino.
                        Per questo motivo, si tratta di bonus in maggior misura ottimizzabili, che consentono di giocare più a lungo al tuo live game preferito.
                        Inoltre, questi <b>casinò online</b>, vantano software maggiormente affidabili e sicuri.
                        Quindi si tratta di <b>siti di gioco</b> da frequentare con tranquillità, essendo conformi alle normative vigenti.
                        </p>
                    </section>

                    <p>
                    Ricorda inoltre, che per giocare devi essere maggiorenne ed esistono limiti di gioco sugli importi che puoi movimentare.
                    Il <b>gioco da casinò</b> può portare alla dipendenza patologica, 
                    perciò gioca in modo consapevole e responsabile e non giocare mai per recuperare eventuali perdite.</p>
  
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

        span { font-size: 13px;  }
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

const Grids = styled.div`
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
    
    const aquaClient = new AquaClient()

    const dataResponse  = await axios.get(`${APISOCKET.DREAMCATCHER}/api/data-for-the-last-hours/24h`)

    const PAGE_BONUSES = ["BetFlag", "LeoVegas", "888 Casino", "StarCasinò", "Unibet", "PokerStars Casino"]

    const bonusResponse = await aquaClient.query({ 
        query: BONUSES, 
        variables: { countryCode: 'it', limit: PAGE_BONUSES.length, start: 0, names: PAGE_BONUSES } })
    
    return {
        props: {
          statsData: dataResponse.data.stats.stats,
          spinsData: dataResponse.data.spinsInTimeFrame.map( (r: Spin) => {
            r.timeOfSpin = r.timeOfSpin - 1000 * 60 * 60 * 2
            return r
          }),
          bonusData: bonusResponse.data.data.bonuses

        }
      }
}

export default DreamCatcherPage
