import React, { FunctionComponent, useEffect, useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import StatsCard from '../../../components/Cards/StatsCard'
import Divider from '../../../components/Commons/Divider'
import GridLayout from '../../../components/Commons/GridLayout'
import CustumSelect from '../../../components/Commons/Inputs/Select'
import Layout from '../../../components/Layout'
import { GridType, LiveStats } from '../../../lib/utils/constants'
import axios from 'axios'
import { APISOCKET } from '../../../public/environment'
import { io, Socket } from 'socket.io-client'
import { Bonus, MonopolyTables, Spin, Stat } from '../../../lib/schemas'
import SpinsTable from '../../../components/Commons/Tables/SpinsTable'
import BonusTable from '../../../components/Commons/Tables/BonusTable'
import BonusCard from '../../../components/Cards/BonusCard'
import { device } from '../../../lib/utils/device'
import { mergeWithUpdate } from '../../../lib/utils/mergeWithUpdate'
import LazyLoad from 'react-lazyload'
import { getBonuses } from '../../../lib/graphql/queries/bonuses'
import { format } from 'date-fns'
import italianLocale  from 'date-fns/locale/it'
import Head from 'next/head'
import { useTranslation } from 'react-i18next'

type PageProps = {
    statsData: Stat[],
    spinsData: Spin[],
    bonusesData: Bonus[],
    tablesData: MonopolyTables
};

const DreamCatcherPage: FunctionComponent<PageProps> = ({statsData, spinsData, bonusesData}) => {

    const { t } = useTranslation()

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
        <Layout title="Casino Squad | LiveStats Dream Catcher: Tutte le Estrazioni in Tempo Reale">
            <Head>
                <meta 
                property="og:description" 
                content="Gioca ora alla Dream Catcher, statistiche, classifiche ed estrazione dal vivo " 
                key="description"/>
            </Head>

             <div className="layout-container">

                <Header className="intro-header">
                    <h2>{t("LiveStats Dream Catcher: Tutte le Estrazioni in Tempo Reale. ")} </h2>

                    <Intro>
                        <p>
                        {t("Dream Catcher significa “acchiappasogni” e ricorda il famoso amuleto dei nativi americani")} <br/>
                        {t("Si tratta di una ruota della fortuna di Evolution Gaming, gioco digitale uscito nel 2017. ")}

                        </p>
                        <Thumbnail>
                                <LazyLoad height={548}>
                                    <Image
                                        alt={'LiveStats Dream Catcher'}
                                        src={`https://images.spikeslot.com/statistiche-live-dream-catcher_f2cbe49cd8.jpeg`}
                                        layout="responsive"
                                        priority={true}
                                        sizes={"30vw"}
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
                                <h3>{t("Statistiche Dream Catcher")}</h3>
                                <span style={{textTransform: 'capitalize'}} suppressHydrationWarning>
                                    {t("Ultimo Aggiornamento:")} {format(new Date(lastUpdate), 'dd MMM yyyy • HH:mm', { locale: italianLocale }).toString()}
                                </span>
                            </div>
                        
                            <CustumSelect setSelected={setSelected}/>
                        </Header>
                        <Divider/>

                        <GridContainer className={"stats-cards"}>
                            <GridLayout
                                gridType={GridType.STATS} 
                                content={ stats.map( (stats: Stat, index: number) => 
                                    <StatsCard key={index} data={stats} timeFrame={selected} type={LiveStats.DREAMCATCHER}/>
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
                        <h3>{t("Puoi giocare alla DREAM CATCHER qui:")}</h3>
                        <div className="bonus-table">
                            <BonusTable data={bonusesData}/>
                        </div>
                        
                        <GridContainer className={"bonus-cards"}>
                            <GridLayout
                                gridType={GridType.BONUS}
                                content={ bonusesData.map( (bonus) => 
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
                        <h3>{t("Storico degli Spin")}</h3>
                        <SpinsTable data={spins} gameType={LiveStats.DREAMCATCHER}/>
                    </SpinsContainer>

                    <br/>

                </Main>

                <Footer>
                    <section>
                        <h3>{t("Cosa è Dream Catcher?")}</h3>
                        <p>
                        {t("Dream Catcher è una Money Wheel, un game show che si avvale della presenza di un croupier dal vivo. ")}
                        {t("Vanta una regia da studio multi-camera, con effetti luminosi e sonori a sottolineare l'azione di gioco. ")}
                        {t("L’esperienza di gioco virtuale è coinvolgente, grazie a riprese da diverse angolazioni in movimento della telecamera e dei primi piani. ")}
                        {t("Il marchio Evolution Gaming è garanzia di qualità e divertimento, se consideri giochi Live Game Show come Monopoly Live e Crazy Time. ")} 
                        {t("Puoi approcciarti a questo gioco live in modi differenti: sfruttando i segmenti del moltiplicatore, oppure adottando un approccio più prudente. ")} 
                        {t("In questa sezione, puoi consultare le migliori strategie per vincere a Dream Catcher. Inoltre, avrai a disposizione un po’ di consigli e le statistiche in tempo reale di Dream Catcher. ")}
                        {t("Puoi scegliere la puntata migliore, analizzando i dati della ruota di Dream Catcher, così come giocare anche con soldi veri. ")}

                        </p>
                    </section>

                    <section>
                        <h3>{t("Vincere a Dream Catcher utilizzando i segmenti del moltiplicatore")}</h3>
                        <p>
                        {t("Una strategia di Dream Catcher è quella di sfruttare i segmenti del moltiplicatore 2x e 7x. ")} 
                        {t("Ad ogni giro, bisogna puntare solo sui segmenti 5, 10, 20 e 40: così si possono coprire gli spazi più remunerativi. ")} <br/>
                        {t("Se capita un moltiplicatore, avrai una copertura della ruota che farà avere potenzialmente grandi vincite. ")} <br/>
                        {t("Per esempio, una puntata di 1 euro sulla ruota 40 è di 40 euro da sola. ")} <br/>
                        {t("Tuttavia, se ottieni il moltiplicatore 7x, quel 40x si trasforma in un grande 280x. ")} <br/>
                        {t("La strategia è rischiosa, ma non adatta a tutti i giocatori. Ad ogni modo, ne esistono di più sicure. ")}

                        </p>
                    </section>

                    <section>
                        <h3>{t("Strategia di ottimizzazione del bankroll a Dream Catcher Game Show")} </h3>
                        <p>
                        {t("Vuoi provare una strategia meno rischiosa per vincere a Dream Catcher Game Show?")}
                        {t("Allora ricordati di scommettere sui segmenti 1, 2 e 20. ")} <br/>
                        {t("Infatti, hai un totale di 54 segmenti sulla ruota del gioco Dream Catcher. ")}<br/>
                        {t("I numeri sopracitati, offrono un’ampia copertura della ruota, ovvero, il 74% di probabilità di vincita ad ogni giro. ")} <br/>
                        {t("Si tratta di un modo davvero semplice per ottimizzare il tuo bankroll. ")} 
                        {t("Insomma, è probabile che il tuo saldo duri molto più a lungo, se imposti il tuo gioco sui segmenti 1, 2, 20. ")} 

                        </p>
                    </section>

                    <section>
                        <h3>{t("Come realizzare vincite interessanti a Dream Catcher?")}</h3>
                        <p>
                        {t("Per provare a realizzare vincite interessanti a Dream Catcher,")} 
                        {t("devi scommettere esclusivamente sul segmento 40: è la porzione che ti consentirà di vincere un premio totale di 40 volte. ")} <br/>
                        {t("Accumulandosi con il moltiplicatore 7x e 2x, potrai ambire ad un potenziale redditizio di vincita. ")} <br/>
                        {t("Considera che il numero 40, ha la probabilità dell'1,85% di manifestarsi, quindi ci vuole pazienza. ")}

                        </p>
                    </section> 
                    
                    <section> 
                        <h3>{t("Qual è il numero con la più alta probabilità di vincita in Dream Catcher Game Show?")}</h3>
                        <p>
                        {t("Il numero con la più elevata probabilità di vincita in Dream Catcher è il segmento 1. ")} <br/>
                        {t("Infatti, l’1 ha la probabilità del 42,59% di comparire in qualsiasi giro di gioco. ")} <br/>
                        {t("Se scegli di giocare solo sul numero 1, avrai la possibilità di vincere abbastanza spesso. ")}<br/>
                        {t("Occorre dire che non si tratta della miglior opzione per sfruttare i segmenti del moltiplicatore, anche se offre un potenziale di premio, seppur ridotto. ")}

                        </p>
                    </section>

                    <section>
                        <h3>{t("Il miglior consiglio di Casino Squad per giocare a Dream Catcher")}</h3>
                        <p>
                        {t("Casino Squad ti consiglia di provare una strategia adatta al tuo personale stile di gioco che")}
                        {t("sia conciliabile con il tuo bankroll. ")} <br/>
                        {t("Insomma, se vuoi la possibilità di vincere spesso, dovrai optare per una strategia a basso rischio. ")} <br/>
                        {t("Invece, se desideri una vincita più rara ma d’importo elevato, punta sul segmento 40. ")}<br/>

                        </p>
                    </section>

                    <section>
                        <h3>{t("La migliore strategia di Dream Catcher")}</h3>
                        <p>
                        {t("Ribadiamo che la migliore strategia da utilizzare a Dream Catcher deve essere in accordo con il tuo stile di gioco. ")} <br/>
                        {t("La garanzia di vincere a Dream Catcher non è scontata, indipendentemente dalla strategia. ")}<br/>
                        {t("Tieni presente che il gioco digitale è prima di tutto un divertimento, non un modo per arricchirsi. ")}<br/>
                        {t("Quindi prova un approccio equilibrato che possa darti al meglio di Dream Catcher!")}

                        </p>
                    </section>

                    <section>
                        <h3>{t("Dove posso giocare a Dream Catcher?")}</h3>
                        <p>
                        {t("Puoi provare il gioco live Dream Catcher sui migliori casinò digitali italiani come Dream Catcher su 888 Casino, StarCasino, PokerStars o NetBet. ")} <br/>
                        {t("Questi casinò online si differenziano perché propongono l’opportunità di giocare nuovamente i Bonus di Benvenuto nella sezione Live Casino. ")} <br/>
                        {t("Quindi, si tratta di Bonus ottimizzabili, con la possibilità di giocare più a lungo a Dream Catcher. ")}
                        {t("I migliori casinò digitali offrono software affidabili e sicuri. ")}<br/><br/>
                        
                        {t("Ricorda che il gioco da casinò è riservato ad un pubblico maggiorenne e sono predisposti limiti di gioco, sugli importi che puoi gestire. ")} 
                        {t("Inoltre, ogni tipo di gioco da casinò può causare dipendenza patologica e per questo ti consigliamo di giocare in modo consapevole e responsabile. ")}

                        </p>
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

export async function getServerSideProps() {
    
    const dataResponse  = await axios.get(`${APISOCKET.DREAMCATCHER}/api/data-for-the-last-hours/24h`)

    const PAGE_BONUSES = ["LeoVegas", "888 Casino", "StarCasinò", "Unibet"]

    const pageBonusesRemapping: any = {
        LeoVegas: "https://ads.leovegas.com/redirect.aspx?pid=3708703&bid=14965",
        "888 Casino": "https://ic.aff-handler.com/c/43431?sr=1864253",
        StarCasinò: "http://record.affiliatelounge.com/_SEA3QA6bJTMP_fzV1idzxmNd7ZgqdRLk/135/",
        Unibet: "https://b1.trickyrock.com/redirect.aspx?pid=74444446&bid=27508"
    }
    
    return {
        props: {
          statsData: dataResponse.data.stats.stats,
          spinsData: dataResponse.data.spinsInTimeFrame.map( (r: Spin) => {
            r.timeOfSpin = r.timeOfSpin - 1000 * 60 * 60 * 2
            return r
          }),
          bonusesData: (await getBonuses({ names: PAGE_BONUSES, sort: 'rating:desc' })).map((b) => {
            b.link = pageBonusesRemapping[b.name]
            return b
            }),
        }
      }
}

export default DreamCatcherPage
