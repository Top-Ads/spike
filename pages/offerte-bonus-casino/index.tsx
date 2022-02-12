import Head from 'next/head'
import React, { Fragment, FunctionComponent } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import { getBonuses } from '../../lib/graphql/queries/bonuses'
import { getSlots } from '../../lib/graphql/queries/slots'
import { Slot, Bonus } from '../../lib/schemas'
import BonusCard from '../../components/Cards/BonusCard'
import GridLayout from '../../components/Commons/GridLayout'
import { GridType } from '../../lib/utils/constants'
import { device } from '../../lib/utils/device'
import BonusTable from '../../components/Commons/Tables/BonusTable'
import SlotCard from '../../components/Cards/SlotCard'
import { format } from 'date-fns'
import italianLocale  from 'date-fns/locale/it'
import LazyLoad from 'react-lazyload'
import { CDN } from '../../public/environment'
import { useTranslation } from 'react-i18next'

type PageProps = {
    topSlotsData: Slot []
    pagesBonusesData: Bonus []
}

const BonusCasinoPage: FunctionComponent<PageProps>= ({topSlotsData, pagesBonusesData}) => { 
    
    const { t } = useTranslation()

    const TOP_BONUSES =  [
        "888 Casino",
        "StarCasinò",
        "LeoVegas",
        "WinCasino"
    ]
    
    const MAIN_BONUSES =  [
    "LeoVegas",
    "StarCasinò",
    "WinCasino",
    "NetBet",
    "GoldBet",
    "888 Casino",
    "King Casino",
    "Eurobet",
    "Betway",
    "Gioco Digitale"]
    
    const topBonusesData = pagesBonusesData.filter( bonus => {
        if ( TOP_BONUSES.includes( bonus.name ) ) {
            return bonus
        }
    })
    
    const mainBonusesData = pagesBonusesData.filter( bonus => {
        if ( MAIN_BONUSES.includes( bonus.name ) ) {
            return bonus
        }
    })

    return (
        <Layout title="Casino Squad | Offerte Attuali Bonus Casino e Promo Aggiornate Giornalmente">
            <Head>
                <meta 
                property="og:description" 
                content="Confronta le offerte selezionate tra I migliori bonus casino esistenti e le ultime promo proposte in tempo reale" 
                key="description"/>
            </Head>
            
            <Main className="layout-container">
        <h2><strong>{t("Lista Italiana dei Migliori Casino con Bonus Senza Deposito")}</strong></h2>

                <Thumbnail>
                    <Image
                        alt="Bonus e promo casino online"
                        src={`${CDN}/jpeg/casinosquad_poster_bonus.jpg`}
                        layout="responsive"
                        priority={true}
                        sizes={"50vw"}
                        width={1920}
                        height={600}/>
                </Thumbnail>

                <p>
                {t("A partire dal 2019, la competizione tra le diverse piattaforme di casino digitali è aumentata in maniera esponenziale,")} 
                {t("portando all’introduzione di una serie di offerte di benvenuto, volte a rendere l’esperienza di gioco ancora più entusiasmante. ")} 
                </p>

                <h3><strong>{("Le migliori piattaforme di Casino Digitali Italiani secondo Casinò Squad")}</strong></h3>
                <p>
                {t("Tutti i casino considerati dispongono della licenza italiana ADM necessaria per operare in questo settore,")} 
                {t("e sono quindi validi e sicuri. Inoltre, nella scelta della piattaforma bisogna sempre tenere conto di alcuni fattori tra cui:")}
                </p>

                <ul>
                    <li>{t("Le tempistiche relative a depositi e prelievi, insieme ai metodi di pagamento offerti. ")}</li>
                    <li>{t("L’offerta di giochi e giochi Live. ")}</li>
                    <li>{t("Le promozioni periodiche rivolte agli utenti della piattaforma e ai nuovi arrivati. ")}</li>
                    <li>{t("L’efficienza dell’assistenza e la presenza di una sezione FAQ all’interno del sito web. ")}</li>
                </ul>

                <p>
                {t("L’elenco che segue racchiude tutte le migliori piattaforme di casino digitali che possono adattarsi alle tue preferenze")} 
                {t("e che hanno i migliori Bonus Benvenuto Senza Deposito; tra queste sono incluse anche le industrie di casino online utilizzate")} 
                {t("da Casinò Squad durante le live, impiegando l’utilizzo di soldi veri. ")}
                <br/>
                {t("Come è possibile notare nella lista sopra elencata, i Bonus di Benvenuto possono variare a seconda del sito considerato,")} 
                {t(" e generalmente offrono: Giri gratis su alcune slot online gratis già prestabilite, o un importo che può essere differente")} 
                {t("tra il Bonus Senza Deposito e il Bonus Con Deposito. ")}
                {t("In linea generale però, i Bonus dei casino online ti permettono di giocare con soldi veri a tutte le migliori slot machine online,")} 
                {t("conferendoti un importo maggiore rispetto a quello depositato in precedenza per usufruire dell’offerta. ")}

                </p>

            </Main>
               
            <div className="layout-container topBonus">
                <GridContainer id="grid-topBonus">
                    <GridLayout
                        gridType={GridType.TOPBONUS} 
                        content={ topBonusesData.map( (bonus) => 
                            <BonusCard key={bonus.id} data={bonus}/>
                        )}
                        label="Migliori Casino Italiani per servizi offerti"
                        AlignItem={"center"}
                        xs={12} sm={4} md={3}
                        showBoxShadow
                        bgColor="#fff"
                        spacing={2}
                    />
                </GridContainer>
            </div>

            <Main className="layout-container">

                <GridContainer id="grid-bonuses">

                    <div className="bonus-table">
                    <BonusTable data={mainBonusesData}/>
                    </div>

                    <div className="bonus-cards">
                        <GridLayout
                            gridType={GridType.BONUS}
                            content={ mainBonusesData.map( (bonus) => 
                                <BonusCard key={bonus.id} data={bonus}/>
                            )}
                            AlignItem={"center"}
                            xs={12} sm={12} md={12}
                            showIndex
                            showBoxShadow
                            bgColor="#fff"
                            spacing={2}
                        />
                    </div>
                </GridContainer>

                <h3><strong>{t("Come funzionano i Bonus di Benvenuto?")}</strong></h3>
                <p>
                {t("I Bonus di Benvenuto rappresentano spesso un incentivo che spinge i giocatori ad iscriversi su una determinata piattaforma di casino online,")} 
                {t("in quanto permettono agli appassionati di migliorare notevolmente l’esperienza di gioco con soldi veri. ")}
                <br/><br/>

                {t("I Bonus Senza Deposito Immediato sono infatti rivolti ai nuovi iscritti di un casino digitale, e possono essere utilizzati")} 
                {t("per provare le migliori slot online gratis in maniera totalmente gratuita, ")}
                {t("valutando successivamente se si ha un reale interesse nel giocare utilizzando soldi reali. ")} 
                <br/><br/>

                {t("Proprio per questo motivo, per usufruire di un Bonus di Benvenuto,")} 
                {t("ti basta consultare nuovamente l’elenco che puoi trovare nella parte superiore della pagina,")} 
                {t("ed eventualmente contattare sui profili social i membri di Casinò Squad per ottenere maggiori informazioni a riguardo. ")}

                <br/><br/>
                {("Inoltre, durante le live di Casinò Squad vi è sempre la possibilità di consultare un comparatore ulteriore, ")}
                {("in cui viene indicato il sito su cui si sta attualmente effettuando la sessione di gioco. ")}
                <br/><br/>

                {t("Una volta selezionato uno dei casino virtuali compresi nella lista superiore,")} 
                {t("la procedura da seguire è molto semplice e richiede alcuni semplici e brevi passaggi. ")}
                <br/><br/>

                {t("Innanzitutto, cliccando sul link inserito all’interno del comparatore, si ha la possibilità di raggiungere direttamente la pagina del sito,")} 
                {t("e più nello specifico dell’offerta di benvenuto. A questo punto, è necessario compilare alcuni moduli che richiedono l’inserimento di dati personali e bancari,")} 
                {t("tenendo in considerazione che tutte le piattaforme di casino online assicurano il massimo della riservatezza, attraverso l’utilizzo di sistemi di crittografia certificati. ")} 
                <br/><br/>

                {t("Tra i dati richiesti, è sempre necessario inserire il proprio codice fiscale ed allegare successivamente una copia del proprio documento d’identità,")} 
                {t("in modo tale che la piattaforma possa assicurarsi della maggiore età del nuovo utente. ")} 

                <br/><br/>
                {t("Una volta conclusa la procedura di registrazione, il giocatore dovrà effettuare un deposito,")} 
                {t("per poter in seguito usufruire del cosiddetto Welcome")} <b>{("Bonus con Deposito")}</b>. 
                {t("Come già accennato in precedenza, le migliori industrie di casino digitali mettono a disposizione dei propri utenti i migliori metodi di pagamento da poter utilizzare")} 
                {t("per effettuare depositi e prelievi; tra questi possiamo infatti considerare le carte di credito o di debito, i portafogli elettronici come Skrill o Neteller, ")}
                {t("e la PostePay. ")} 

                <br/><br/>
                {t("Inoltre, c’è sempre la possibilità di effettuare un deposito attraverso il Bonifico Bancario,")} 
                {t("ma questa procedura è generalmente sconsigliata in quanto richiede tempistiche più lunghe rispetto agli altri metodi considerati. ")} 
                {t("Per quanto riguarda i prelievi invece, questa è una delle modalità più consigliate. ")}
               
                <br/><br/>
                {t("Per essere totalmente sicuri di aver compreso tutti i passaggi da seguire per aprire un conto di gioco,")} 
                {t("si può consultare questa breve sintesi che li racchiude:")}

                </p>

                <ul>
                    <li>{t("Selezionare il casino con certificazione legale ADM che più rispecchia le tue preferenze. ")}</li>
                    <li>{t("Compilare i moduli richiesti e convalidare i propri documenti d’identità. ")}</li>
                    <li>{t("Effettuare un primo deposito con i migliori metodi di pagamento. ")}</li>
                    <li>{t("Attendere l’accredito del Bonus Con Deposito sul proprio conto di gioc. ")}</li>
                </ul>

                <Thumbnail>
                    <LazyLoad  height={400} offset={300}>
                        <Image
                            alt="Bonus e promo casino online"
                            src={`${CDN}/jpeg/casinosquad_poster_bigwin.jpg`}
                            layout="responsive"
                            priority={true}
                            sizes={"50vw"}
                            width={1920}
                            height={600}/>
                    </LazyLoad>
                </Thumbnail>

                <h3><strong>{t("Bisogna inserire i Codici Bonus per ottenere i Bonus di Benvenuto dei casino online?")}</strong></h3>
                <p>
                {t("Molto spesso, le industrie di casino digitali sono popolari per la vasta gamma di slot online gratis che offrono. ")} 
                {t("Tuttavia, si può affermare con assoluta certezza che l’offerta di giochi include tante altre cose, tra cui giochi Live,")} 
                {t("giochi da tavolo, Poker e persino scommesse sportive. ")}

                <br/><br/>
                {t("I giochi Live sono molto amati in tutto il mondo e anche in Italia, in quanto rendono l’esperienza di gioco più reale e meno solitaria. ")} 
                {t("Cosa significa questo? Significa che tutti i partecipanti del gioco possono interagire tra di loro utilizzando una Live chat disponibile nella sessione di gioco;")} 
                {t("inoltre, questa interazione può essere estesa anche al Dealer, che cerca di rispondere alle domande dei giocatori il più possibile. ")} 
                
                <br/><br/>
                {t("I giochi Live più amati da Casinò Squad, e più popolari in generale, sono: Monopoly Live, Deal or No Deal, Crazy Time e Dream Catcher. ")} 

                <br/><br/>
                {t("In aggiunta, per ampliare ulteriormente l’offerta, le migliori piattaforme mettono a disposizione dei giocatori la possibilità")} 
                {t("di effettuare sessioni di gioco al Blackjack o alla Roulette,")} 
                {t("sia in versione Live sia in versione normale. In entrambi i casi, gli appassionati possono mettere alla prova le proprie abilità e testare le proprie strategie. ")} 
                
                <br/><br/>
                {t("Attraverso questa vasta offerta di giochi, gli utenti del casino virtuale possono avere un’esperienza di gioco uguale a quella dei casino tradizionali,")}
                 {("se non migliore, in quanto c’è anche un’intera sezione dedicata alle scommesse sportive. ")}
                </p>

                <h3><strong>{t("Riservatezza dei dati personali")}</strong></h3>
                <p>
                {t("I casino digitali richiedono sempre l’invio del proprio documento d’identità, in modo tale da accertarsi della maggiore età del giocatore. ")} 
                {t("Tuttavia, come sopra menzionato, i sistemi di crittografia garantiscono assoluta privacy e riservatezza dei dati personali di tutti i giocatori. ")} 
                <br/><br/>
                {t("Giocare online è quindi sicuro sotto ogni punto di vista, in quanto le piattaforme che dispongono della certificazione sono sicure ed affidabili. ")} 
                {t("Inoltre, talvolta effettuare una sessione di gioco nei casino tradizionali o nei punti di gioco specifici può risultare complesso per alcuni appassionati,")} 
                {t("mentre nei casino online questo problema non è presente. ")} 
                <br/><br/>
                {t("Si può giocare da soli o in compagnia di qualche amico, così come i membri di Casinò Squad giocano in compagnia della propria community!")}
                </p>

                <h3><strong>{t("Effettuare depositi e prelievi nel massimo della sicurezza")}</strong></h3>
                <p>
                {t("Molto spesso questo rappresenta un tabù per la maggior parte dei giocatori, i quali ritengono non sia sicuro condividere i propri dati bancari con il casino. ")} 
                {t("Ancora una volta, viene garantita la massima riservatezza di tali informazioni, che possono transitare soltanto presso società di competenza del settore. ")}
                <br/><br/>
                {t("Inoltre, sia per quanto riguarda la sezione delle scommesse sia per quella del casino in generale,")} 
                {t("i ticket delle vincite sono automaticamente inseriti in un database all’interno della piattaforma ed è quindi sempre possibile consultarli. ")}  
                </p>

                <h3><strong>{t("Inserimento dei limiti di perdita o limiti di deposito")}</strong></h3>
                <p>
                {t("I siti di casino online prevedono l’impostazione da parte degli utenti di limiti di perdita o limiti di deposito, che possono essere sia settimanali sia mensili. ")} 
                {t("In questo modo, i giocatori stabiliscono un determinato bilancio dedicato al gioco, a cui doversi attenere. ")} 
                
                <br/><br/>
                {t("In aggiunta, tali piattaforme mettono a disposizione dei propri iscritti la possibilità di autoescludersi in maniera temporanea o permanente,")} 
                {t("qualora la situazione fosse fuori controllo. L’autoesclusione è quindi una scelta propria del giocatore,")} 
                {t("il quale può decidere di procedere alla richiesta di attuare tale misura,")} 
                {t("nel momento in cui ad esempio si rende conto di aver giocato troppo durante gli ultimi giorni. ")} 
                
                <br/><br/>
                {t("Una volta effettuata la richiesta di autoesclusione, il codice fiscale del soggetto considerato viene schedato come non idoneo al gioco,")} 
                {t("durante il periodo di tempo dell’autoesclusione stessa. ")} 
                {t("Tuttavia, una volta effettuata l’autoesclusione permanente, bisogna attendere un minimo di sei mesi prima di poter essere inseriti nuovamente. ")} 

                <br/><br/>
                {t("Questa rappresenta una delle misure più efficaci volte a prevenire la dipendenza patologica, che rappresenta un serio problema. ")} 
                {t("Proprio per questo l’Agenzia Dogane e Monopoli ha deciso di attuarla su tutte le piattaforme di casino online certificate,")} 
                {t("cosa che invece non è ancora attuata per le tradizionali Slot da Bar. ")}
                </p>

                <h3><strong>{t("Sezione scommesse sportive")}</strong></h3>
                <p>
                {("Le scommesse sportive sono attualmente molto ricercate, ed è per questo che vi è un’intera sezione a loro dedicata sui casino virtuali. ")} 
                {("I migliori campionati sportivi sono sempre disponibili, così come gli eventi più importanti a livello nazionale e mondiale. ")} 
                </p>

                <h3><strong>{t("Le migliori slot machine online")}</strong></h3>
                <p>
                {("La sessione di gioco alle migliori slot machine online è assicurata su tutte le piattaforme di casino digitali,")} 
                {("che mettono a disposizione dei giocatori la versione Demo per provare tutti i giochi disponibili all’interno del sito,")} 
                {("in modo tale da permettere agli appassionati di capirne bene il meccanismo. Inoltre,")} 
                {("è sempre possibile fare pratica alle migliori slot online gratis sul sito di Casinò Squad, così da migliorare ulteriormente l’esperienza. ")} 
                </p>

                <h3><strong>{t("L’importanza del gioco consapevole")}</strong></h3>
                <p>
                {t("È importante ricordare sempre di giocare in maniera responsabile, consapevole e moderata,")} 
                {t("in quanto bisogna sempre capire quando è il momento di fermarsi. Giocare online è un piacevole passatempo e divertimento, ma deve rimanere tale. ")} 
                {t("Non bisogna rincorrere le perdite, e lasciare che il gioco da casino diventi una dipendenza da cui è molto difficile uscire. ")} 
                <br/>
                {t("Gioca responsabilmente. ")}
                </p>
            </Main>

            <GridContainer id="grid-topSlot">
                <div className="layout-container">
                    <GridLayout 
                        gridType={GridType.SLOTS} 
                        content={ topSlotsData.map( (slot: Slot) => 
                        <Fragment>
                            <SlotCard key={slot.name} data={slot}/>
                        </Fragment>
                        )}
                        width={'100%'}
                        xs={12} sm={4} md={2}
                    />
                </div>
            </GridContainer>

            <Main className="layout-container">
                <h2><strong>{t("FAQ - Domande Frequenti")}</strong></h2>
                <h3><strong>{t("Cosa si intende per Bonus di Benvenuto Senza Deposito?")}</strong></h3>
                <p>
                {t("Questa offerta è riservata ai nuovi iscritti di un")} <b>casino online</b>, 
                {t("e può variare in base alla piattaforma considerata. Generalmente consiste in")} <b>{t("Giri Gratuiti")}</b> {t("o in un importo di soldi. ")} 
                {t("Per usufruire di tale")} <b>Bonus</b> {t("non vi è la necessità di effettuare un deposito. ")}  <br/>
                {t("Anzi, questo viene spesso utilizzato come un incentivo per invogliare i giocatori ad effettuare la procedura di registrazione che, una volta completata,")} 
                {t(" ti permette di usufruire dell’offerta considerata. ")}
                </p>

                <h3><strong>{("Dove posso consultare l’elenco dei Migliori Casino Italiani con Bonus Senza Deposito?")}</strong></h3>
                <p>
                {t("L’elenco dei")} <b>{t("migliori casino online")}</b> {t("viene sempre aggiornato, tenendo anche in considerazione le offerte periodiche delle diverse piattaforme. ")} 
                {t("Qui, puoi avere un’idea completa su tutti i migliori casino online, accessibili tramite un semplice link inserito all’interno della guida di ogni singolo sito. ")} 
                </p>

                <h3><strong>{t("Esistono altri tipi di Bonus?")}</strong></h3>
                <p>
                {t("Oltre ai")} <b>{t("Bonus Senza Deposito")}</b>, {t("possiamo trovare i Bonus Con Deposito,")} 
                {t("i quali vengono generalmente distribuiti su più depositi, piuttosto che su uno solo. Anche in questo caso,")} 
                {t("l’offerta può consistere in giri gratuiti o <b>Free Spin</b>, così come in importi che variano a seconda della piattaforma. ")} 
                </p>

                <h3><strong>{t("Si può definire un Bonus di Benvenuto più conveniente?")}</strong></h3>
                <p>
                <b> {t("I Bonus di Benvenuto")}</b> {t("vengono sempre scelti tenendo in considerazione le preferenze del giocatore. Infatti, non è possibile definire un solo Bonus più conveniente. ")}  
                {t("Tuttavia, ciò che li accomuna sono termini e condizioni previsti dalla piattaforma, che devono sempre essere consultati prima di effettuare una determinata scelta. ")} 
                </p>

                <h3><strong>{t("Il Bonus di Benvenuto può essere utilizzato una tantum?")}</strong></h3>
                <p>
                {t("Essendo un’offerta riservata ai nuovi clienti, il Bonus di Benvenuto può essere utilizzato soltanto al momento della registrazione, e quindi una volta sola. ")}
                {t("In realtà però, tutte le piattaforme di")} <b>{t("casinò digitali")}</b> {t("offrono")} <b>{t("promozioni periodiche")}</b> {t("volte a rendere l’esperienza di gioco tutti gli appassionati sempre dinamica. ")} <br/>
                {t("Sui migliori casino online il divertimento è sempre assicurato!")}

                </p>

                <p>
                    {t("Pubblicato: 19 Ott 2021 • Ultimo aggiornamento")} 
                    <span style={{textTransform: 'capitalize'}}> { format(new Date(Date.now()), 'dd MMM yyyy', { locale: italianLocale }).toString() } </span> 
                </p> 

                <br/>          
            </Main>
                
        </Layout>
    ) 
}

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    li {
        margin-bottom: 15px;
        width: 80%;
    }
`

const Thumbnail = styled.div`
    width: 100%;
`
const GridContainer = styled.div`
  display: flex;
  margin: 10px 0px;
  color: ${({theme}) => theme.palette.background};

   &#grid-topSlot {
    color: #fff;
    background-color: ${({theme}) => theme.palette.background};
  }

  &#grid-topSlot { 
    padding: 10px 0px;
   
    @media ${device.tablet} {
        width: 100%;
        overflow-x: scroll;
    }
  }

  &#grid-bonuses {
    flex-direction: column;

    p { 
      text-align: center; 
    }
  }

  .bonus-cards { display: none; }
  .bonus-table { display: contents; }

  @media ${device.mobileL} {
    .bonus-cards { display: contents; }
    .bonus-table { display: none; }
  }

  @media ${device.tablet} {
    &#grid-slots { 
      flex-direction: column;
    }
  }
`

export async function getStaticProps() {

    const PAGE_BONUSES =  [
        "LeoVegas",
        "StarCasinò",
        "Starvegas",
        "WinCasino",
        "NetBet",
        "GoldBet",
        "888 Casino",
        "King Casino",
        "Eurobet",
        "Betway",
        "Gioco Digitale",
        "Snai",
        "Unibet"
    ]

    const pageBonusesRemapping: any = {
        LeoVegas: "https://ads.leovegas.com/redirect.aspx?pid=3708703&bid=14965",
        StarCasinò: "http://record.affiliatelounge.com/_SEA3QA6bJTMP_fzV1idzxmNd7ZgqdRLk/135/",
        Starvegas: "https://www.starvegas.it/gmg/refer/61782b177358340001a18ac7",
        WinCasino: "https://www.vincipromo.it/wincasino/?mp=7f1d8788-3f9e-4111-b205-e49d29661715",
        NetBet: "https://banners.livepartners.com/view.php?z=151484",
        GoldBet: "https://media.goldbetpartners.it/redirect.aspx?pid=5116&bid=1495",
        "888 Casino": "https://ic.aff-handler.com/c/43431?sr=1864253",
        "King Casino": "https://spikeslot.kingcasino.it",
        Eurobet: "https://record.betpartners.it/_E_C7XwxgprAZV93hC2dJ_GNd7ZgqdRLk/113/",
        Betway: "https://betway.it/bwp/welcome-5gratis/it-it/?s=bw210475&a=AFF3009702735911860&utm_source=210475&utm_medium=Affiliate&utm_campaign=AFF3009702735911860",
        "Gioco Digitale": "https://mediaserver.entainpartners.com/renderBanner.do?zoneId=2031706",
        "Snai": "https://informatoriads.snai.it/redirect.aspx?pid=30830&bid=2194",
        "Unibet": "https://b1.trickyrock.com/redirect.aspx?pid=74444446&bid=27508"
    }
      
    return {
        props: {
            topSlotsData: await getSlots({ limit: 18, start: 0, sort: 'updated_at:desc' }),
            pagesBonusesData: (await getBonuses({ names: PAGE_BONUSES, sort: 'rating:desc'})).map((b) => {
                b.link = pageBonusesRemapping[b.name]
                return b
            })
        }, 
    }
}

export default BonusCasinoPage
