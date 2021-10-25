import Head from 'next/head'
import React, { Fragment, FunctionComponent } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import { getBonuses } from '../../lib/graphql/queries/bonuses'
import { getSlots } from '../../lib/graphql/queries/slots'
import { Slot, Bonus } from '../../lib/schemas'
import BonusCard from '../../components/Cards/BonusCard'
import GridLayout from '../../components/GridLayout'
import { GridType } from '../../lib/utils/constants'
import { device } from '../../lib/utils/device'
import BonusTable from '../../components/Tables/BonusTable'
import SlotCard from '../../components/Cards/SlotCard'
import { format } from 'date-fns'
import italianLocale  from 'date-fns/locale/it'
import LazyLoad from 'react-lazyload'
import { CDN } from '../../public/environment'

type PageProps = {
    topSlotsData: Slot []
    tableBonusData: Bonus []
    topBonusData: Bonus []
}

const ComparatorPage: FunctionComponent<PageProps>= ({topSlotsData, tableBonusData, topBonusData}) => { 
    
    return (
        <Layout title="I migliori Casinò e Slot Machine Online con le nuove offerte Casino Bonus">
            <Head>
                <meta 
                property="og:description" 
                content="Scegli tra i migliori giochi online, confronta Bonus di Benvenuto Senza Deposito, 
                promozioni e altre funzionalità utili per vincere. Bonus per i Nuovi Giocatori." 
                key="description"/>
            </Head>
            
            <Main className="layout-container">
                <h2><strong>Migliori Bonus Senza Deposito Casino Online Italiani</strong></h2>

                <Thumbnail>
                    <Image
                        alt="Casino Squad Bonus"
                        src={`${CDN}/jpeg/casinosquad_poster_bonus.jpg`}
                        layout="responsive"
                        priority={true}
                        width={1920}
                        height={600}/>
                </Thumbnail>

                <p>
                In tutta la rete si possono trovare tantissime Offerte di Benvenuto, 
                di bonus casino legali ed illegali che puntano tutti ad essere i primi sul mercato. 
                Ma come si fa a scegliere tra questa marea di Bonus di Benvenuto, solo quelli dei migliori Casinò Online Italiani e siti Scommesse?
                </p>

                <h3><strong>I migliori Casino Online in Italia secondo SPIKE</strong></h3>
                
                <p>
                I casino che andrò a consigliarvi sono innanzitutto tutti legali e certificati, e questo è un primo step. 
                Poi le mie valutazioni sono basate su questi criteri:
                </p>

                <ul>
                    <li>velocità nei pagamenti</li>
                    <li>quantità di giochi slot disponibili</li>
                    <li>promozioni offerte periodicamente sia per nuovi giocatori che già iscritti</li>
                    <li>affidabilità e qualità dell'assistenza</li>
                </ul>

                <p>
                Nella seguente lista di casinò, potrete scegliere il più congeniale ai vostri gusti, 
                ricordando che i TOP in alto sono quelli dove gioco alle slot con soldi veri personalmente più spesso, 
                e che hanno a mio parere i migliori Bonus Senza Deposito Immediato:
            </p>

            </Main>
               
            <div className="layout-container topBonus">
                <GridContainer id="grid-topBonus">
                    <GridLayout
                        gridType={GridType.TOPBONUS} 
                        content={ topBonusData.map( (bonus) => 
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
                    <BonusTable data={tableBonusData}/>
                    </div>

                    <div className="bonus-cards">
                        <GridLayout
                            gridType={GridType.BONUS}
                            content={ tableBonusData.map( (bonus) => 
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

                <p>
                Questi sono secondo me i migliori Bonus attualmente offerti.
                <br/> <br/>
                I bonus casinò servono a giocare con soldi veri nei siti slot online con maggiore credito rispetto a quello depositato. 
                I bonus deposito, infatti forniscono una percentuale aggiuntiva di credito, 
                in base alla tabella che avete visto su. Questo credito aggiuntivo fornisce maggiori possibilità di vincita al giocatore.
                <br/><br/>
                Possono prevedere un importo da giocare senza deposito, una percentuale extra del primo deposito, 
                oppure Giri gratis e giochi bonus a slot machine in particolare.
                </p>

                <h3><strong>Come ottenere i bonus casino?</strong></h3>
                <p>
                È il sogno di molti poter avere Soldi gratis per poter giocare ai casinò online con soldi reali. 
                I Bonus di benvenuto, chiamati anche Welcome Bonus, fanno proprio questo, nei limiti del possibile sui siti slot online.<br/>
                I Casinò online infatti premiano i nuovi utenti con dei Bonus senza deposito immediato, che servono a provare i giochi slot e casino gratuitamente, 
                per poi decidere se è il casino di provare altri giochi con soldi veri.
                <br/><br/>

                Ottenere i Bonus è molto semplice! Basta scegliere uno dei Bonus Casino Italiani che trovi nella lista in alto, 
                aiutandoti anche leggendo le recensioni e guardando i video di SPIKE che spiegano il funzionamento dei Bonus Casino senza deposito. 
                Una volta trovato il più congeniale ti basta registrarti al Casinò scelto, 
                semplicemente cliccando il link che trovi nella pagina, senza scaricare nulla.
                <br/><br/>

                Una volta raggiunta la pagina di registrazione del miglior casinò selezionato, dovrai compilare un modulo anagrafico, 
                inserendo generalità, in primis data di nascita e codice fiscale, per verificare la tua maggiore età. 
                È un controllo di prassi e che viene effettuato da qualsiasi casinò affidabile e certificato.

                <br/><br/>
                Una volta aperto un conto gioco, si dovrà effettuare un deposito, 
                è possibile anche giocare con soldi veri su alcuni casino senza deposito immediato, 
                ma come leggerete dalle guide i migliori, sono i Bonus sul primo deposito.
                <br/><br/>

                I migliori metodi di pagamento più utilizzati sono Postepay, Carta di credito, 
                Paypal e Skrill che permettono un rapido deposito senza attese.
                <br/><br/>

                È possibile effettuare depositi e prelievi anche tramite altri metodi, ad esempio il Bonifico Bancario ma richiede 1 giorno 
                lavorativo in più e non è molto utilizzata come scelta, almeno per i depositi. 
                Per i prelievi invece mi sento di consigliarla per diversi motivi.
                <br/><br/>

                Quindi riepilogando, se ti piacerebbe provare il brivido di una giocata d'azzardo con soldi reali, 
                ma su piattaforme legali, la procedura da seguire è questa:

                </p>

                <ul>
                    <li>scegli il casinò AAMS col bonus deposito che ti ispira di più;</li>
                    <li>scegli il casinò AAMS col bonus deposito che ti ispira di più;</li>
                    <li>effettua un primo deposito;</li>
                    <li>una volta effettuato il versamento, riceverai il casinò bonus direttamente sul conto di gioco.</li>
                </ul>

                <Thumbnail>
                    <LazyLoad  height={400} offset={300}>
                        <Image
                            alt="Casino Squad"
                            src={`${CDN}/jpeg/casinosquad_poster_bigwin.jpg`}
                            layout="responsive"
                            priority={false}
                            width={1920}
                            height={600}/>
                    </LazyLoad>
                </Thumbnail>

                <h3><strong>Codici Bonus per Casino online?</strong></h3>
                <p>Per ottenere questi Bonus non è necessario inserire un codice, alcuni siti di gioco hanno questa possibilità, 
                    ma in genere sono voucher che sono diretti ad alcuni giocatori in particolare che hanno aderito a promo separate 
                    dal bonus di benvenuto.
                </p>

                <h3><strong>Non solo Slot Machine, altri giochi di Casinò disponibili</strong></h3>
                <p>
                Le Slot Machine sono un gioco molto divertente che si può trovare nei casinò, ma non l'unico. 
                Ricordiamo che nei Casinò Online è possibile giocare anche ai classici del Casino, come Roulette, 
                Blackjack, Baccarat, videopoker, e giochi Live che ultimamente stanno riscuotendo molto successo tra i giocatori, anche Italiani!
                <br/><br/>
                Sarà inoltre possibile giocare anche Live, ossia con croupier dal vivo (che vedrete attraverso lo schermo ovviamente). 
                Sarà possibile anche interagire con gli stessi dealer, a cui potrete chiedere consigli in chat, 
                o parlare del più e del meno durante le vostre giocate. Praticamente come se foste in un casinò reale a tutti gli effetti. 
                Non dimentichiamo che il gioco è anche un momento di socialità per cui interagire con altri giocatori e addetti della casa da gioco, 
                non potrà che essere un Plus.
                <br/><br/>
                Ma non per forza bisogna utilizzare le versioni Live dei giochi, ci sono anche Roulette e Blackjack computerizzati, 
                ossia simultati al computer da un gioco. Le regole di vincita e le probabilità sono le medesime di un casino fisico. 
                Le regole del gioco Roulette Europea per esempio, e le probabilità sono praticamente identiche. 
                Alcune versioni come la Roulette Americana è più svantaggiosa per il giocatore a causa di un RTP ossia ritorno al giocatore, 
                nettamente inferiore alla variante Europea senza il doppio zero 00.
                </p>

                <h3><strong>Maggior attenzione alla privacy del giocatore</strong></h3>
                <p>
                Può sembrare strano dato che per iscriversi a un casino online bisogna inviare anche 
                il proprio documento per la verifica della maggiore età. 
                Ma vi assicuro che c'è molta più privacy e riservatezza online, dove il nostro documento va vagliato da un ignaro addetto 
                al controllo dell'identità di una società esterna, che non nelle sale giochi vlt e i bar delle città, dove tutti si 
                conoscono e vengono avvistati al gioco delle slot machine.
                <br/><br/>
                Questa situazione può essere incresciosa per molti. 
                Per come vedo io il gioco non mi sono mai vergognato di praticarlo e i video che ho caricato su internet lo dimostrano. 
                Ma per molti può essere fastidioso farsi osservare mentre dediti a inseguire la Dea Bendata.
                <br/><br/>
                Online non ci saranno di questi problemi, poichè saremo soli o al massimo in compagnia di qualche buon amico, cosa che raccomando. 
                Anche il gioco in società mi sento di consigliare, in quanto con 2 cervelli diversi è più difficile perdere il controllo.
                </p>

                <h3><strong>Versamenti e riscossioni sicure</strong></h3>
                <p>
                Il molti che mi chiedono informazioni sui casinò online, sono dubbiosi al riguardo della sicurezza dei nostri 
                trasferimenti di denaro verso le piattaforme di gioco.
                <br/><br/>
                Mai paura fu più infondata. Vi ricordo che tra i requisiti di gioco online 
                ci sono anche le crittografie dei pagamenti, ossia tutte le transazioni effettuate saranno protette 
                da procedure di controllo della privacy. Vuol dire che i vostri dati, quelli delle vostre carte di credito, 
                non saranno mai condivise nemmeno con il casino stesso, ma transiteranno unicamente presso società di pagamenti accreditate.
                <br/><br/>
                Un altro dei vantaggi da ricordare è che tutti i ticket delle vincite, sia al casino che alle scommesse, 
                saranno immagazzinati nell'archivio del casino e saranno sempre consultabili. 
                Non ci sarà bisogno di conservare il voucher o la bolletta cartacea, con il rischio di perderlo.
                </p>

                <h3><strong>Impostare i Limiti di versamento</strong></h3>
                <p>
                Un'altra caratteristica ottima dei casino e del gioco online in generale, è la possibilità, 
                anzi l'obbligo di dover impostare i propri limiti di versamento. Questi potranno essere limiti settimanali, mensili, 
                sia di versamento che di giocato effettuato. Tutti i Bookmakers legali hanno l'imposizione di dover far inserire al 
                proprio cliente il suo limite giocabile, che va ponderato in base alle proprie possibilità.
                <br/><br/>
                Io consiglio di impostare come limite 1/10 del proprio introito mensile. Ossia in caso di stipendio netto di 1.500€, 
                il budget da dedicare al gioco nel mese, non dovrebbe eccedere 150€.
                <br/><br/>
                Questa è una cifra che permette di divertirsi mirando a vincite che potrebbero anche in casi fortunati 
                equiparare lo stipendio mensile, 
                ma senza rovinarsi nel caso, ovviamente più probabile, di non avere successo.
                <br/><br/>
                Oltre ai limiti di versamento, un'altra caratteristica utile che l'aams ha implementato, 
                è di predisporre l'autoesclusione del giocatore che si ritenga problematico. 
                Vi spiego meglio: nel caso il giocatore ritenga di aver esagerato e di aver giocato più soldi di quanti 
                preventivamente messi in ballo, può decidere di auto escludersi dai casinò online aams. 
                Ossia una volta impostata la data di esclusione (1 mese, 1 anno, per sempre) sarà impossibilitato 
                sia a giocare sulla piattaforma dalla quale si è escluso, ma il suo codice fiscale sarà bloccato 
                presso tutti i Casinò Legali AAMS ADM, impedendo al giocatore di continuare a giocare.
                <br/><br/>
                Questa è stata una delle poche mosse davvero astute da parte dell'agenzia dogane e monopoli di Stato, 
                che ha trovato una maniera davvero efficace di bloccare dalla rovina i ludopatici, ma permettendo 
                comunque al rimanente 95% dei giocatori di potersi divertire in tranquillità.
                <br/><br/>
                Una soluzione del genere non è invece ancora stata prevista, 
                per le ben più pericolose VLT ossia le videolottery, 
                slot machine terrestri molto pericolose e dove è possibile perdere molto denaro in poco tempo, 
                a causa del pericoloso modo con cui sono concepite, bet massimo 10€ con limite di vincita massima a 5.000€, 
                limiti che nel caso specifico non funzionano, perchè non impediscono di spostarsi da una macchina all'altra, 
                o da una sala vlt all'altra, e totale anonimato in caso di perdita.
                <br/><br/>
                In caso di vincita ovviamente sarà richiesto il controllo antiriciclaggio, 
                altra situazione che spaventa molto i giocatori inducendoli a rigiocare gli importi 
                fino ad evitare la soglia del pagamento tracciato.
                </p>

                <h3><strong>Anche scommesse sportive</strong></h3>
                <p>
                Ma non solo giochi bonus di slot e casinò, sui Bookmakers legali AAMS, si trovano anche le scommesse sportive. 
                Se ti interessa maggiormente il campo del Betting sportivo, e del Betting exchange, puoi consultare 
                i Migliori Bonus Scommesse che si possono trovare nel territorio Italiano. Potrete trovare Bonus multiple, 
                Quote maggiorate, e del credito iniziale per giocare Gratis. Essendo un argomento diverso, tuttavia ci 
                ho dedicato una pagina apposita, perchè comprendendo Bonus su quote minime o massime è meglio un approfondimento separato.
                </p>

                <h3><strong>Migliore offerta per Slot Online Italia Bonus</strong></h3>
                <p>
                Se sei interessato a conoscere quale casino dispone di una particolare slot machine online, 
                puoi cercare la tua slot preferita all'interno di questo sito, nella sezione Ricerca in alto. 
                Nella pagina corrispondente potrai non solo provarla Gratis con soldi finti, ma scoprirai le migliori 
                offerte specifiche dei Casino Online che la hanno tra i propri giochi. 
                Vi ricordo che trovate fino a 100 slot gratis quindi non avrete che l'imbarazzo della scelta.
                </p>

                <h3><strong>Giocate Responsabilmente</strong></h3>
                <p>
                Vi ricordo che il gioco d'azzardo, i casinò, il poker, o le scommesse che sia il vostro passatempo preferito, 
                deve rimanere appunto un gioco. Non bisogna prenderlo troppo seriamente, o prenderlo come un modo per arricchirsi. 
                Spesso chi non interpreta in questo modo il gioco, può avere problemi di dipendenza, 
                e trasformare quello che dovrebbe essere un divertimento, 
                in un incubo. Raccomando sempre di approcciarsi al gioco in una maniera responsabile, dato che abbiamo tutti gli strumenti per farlo.
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
                        xs={12} sm={4} md={3}
                    />
                </div>
            </GridContainer>

            <Main className="layout-container">
                <h2><strong>FAQ - Domande Frequenti</strong></h2>
                <h3><strong>Cosa è un Bonus senza deposito immediato</strong></h3>
                <p>
                Alcuni operatori legali mettono in palio somme in denaro o FreeSpin per i nuovi utenti che si registrano 
                ai loro siti senza richiedere alcun versamento nel conto di gioco. È un modo per attrarre i giocatori e 
                invogliarli a provare il portale differenziandosi da altri concorrenti.<br/>
                Tipicamente basterà verificare l'identità dell'utente con le procedure di routine per potere godere dei beneifici dei Bonus senza deposito.
                </p>

                <h3><strong>Dove trovo i migliori Bonus senza deposito dei Casinò in Italia</strong></h3>
                <p>
                Abbiamo una sezione dedicata sul nostro sito proprio per fornire maggiori informazioni sui migliori bonus senza 
                deposito immediati presenti nei Casinò in Italia.<br/>
                Potete trovare anche Bonus Esclusivi con maggiorazione nella lista che viene periodicamente aggiornata. 
                Puoi dare un'occhiata per controllare i bonus più convenienti accessibili solo tramite il nostro sito.
                </p>

                <h3><strong>Quali altri tipi di Bonus Benvenuto Casino esistono</strong></h3>
                <p>
                L'altra tipologia predominante di Bonus è quello sul deposito fatto nel conto gioco.<br/>
                Al giocatore possono essere assegnate somme in denaro e giri gratis in base all'importo del versamento. <br/>
                È frequente che l'offerta sia distribuita sui primi depositi, diventando così quello che viene chiamato un pacchetto di benvenuto.
                </p>

                <h3><strong>Quali sono i Bonus di Benvenuto più convenienti</strong></h3>
                <p>
                Il panorama dei Bonus è molto vasto e per questo consigliamo di controllare i dettagli delle offerte 
                che si possono trovare nelle nostre guide ai bonus. In base ai vostri gusti potete trovare il migliore Bonus più adatto a voi.<br/>
                Si deve sempre tenere a mente che i Bonus sono erogati secondo i termini e condizioni, requisiti di gioco e altre 
                informazioni che sono tutte visibili nella pagina dedicata del Casinò.
                </p>

                <h3><strong>È possibile ricevere più volte un Bonus Benvenuto Casino?</strong></h3>
                <p>
                Il Bonus di benvenuto è un'offerta speciale valida solo per chi si iscrive per la prima volta in un Casinò Online. <br/>
                Si può sfruttare perciò solo una volta.<br/>
                La maggior parte degli operatori mette comunque a disposizione promozioni periodiche per fidelizzare i giocatori, 
                perciò la possibilità di utilizzare dei Bonus si ripresenterà nel tempo, ma saranno diversi dai Bonus di Benvenuto.
                </p>

                <p>
                    Pubblicato: 19 Ott 2021 • Ultimo aggiornamento 
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
        "Betfair",
        "Betflag",
        "Gioco Digitale",
        "Bwin",
        "Slot Yes",
        "PokerStars Casino",
        "Snai",
        "Unibet"
    ]


    const tableBonusRemapping: any = {
        LeoVegas: "https://ads.leovegas.com/redirect.aspx?pid=3704489&bid=14965",
        StarCasinò: "https://record.starcasino.it/_SEA3QA6bJTNXl890vMAfUGNd7ZgqdRLk/131/",
        Starvegas: "https://www.starvegas.it/nrgs/it/landing?refererId=89182&lang=it",
        WinCasino: "https://vincipromo.it/wincasino/?mp=42794b32-7604-49d2-92d0-8adf67a6b173",
        NetBet: "https://banners.livepartners.com/view.php?z=139080",
        GoldBet: "https://media.goldbetpartners.it/redirect.aspx?pid=3185&bid=1495",
        "888 Casino": "https://ic.aff-handler.com/c/43431?sr=1868828",
        "King Casino": "https://spikeslot.kingcasino.it",
        Eurobet: "https://record.betpartners.it/_E_C7XwxgprAZV93hC2dJ_GNd7ZgqdRLk/108/",
        Betway: "https://betway.it/bwp/welcome-5gratis/it-it/?s=bw210475&a=AFF3009702735911860&utm_source=210475&utm_medium=Affiliate&utm_campaign=AFF3009702735911860",
        Betfair: "",
        Betflag: "",
        "Gioco Digitale": "",
        Bwin: "https://mediaserver.entainpartners.com/renderBanner.do?zoneId=2000655",
        "Slot Yes": "http://wladmiralinteractive.adsrv.eacdn.com/wl/clk/?btag=a_999b_177&aid=",
        "PokerStars Casino": "",
        "Snai": "",
        "Unibet": ""
    }

    const TOP_BONUSES =  [
        "888 Casino",
        "StarCasinò",
        "LeoVegas",
        "WinCasino"
    ]

    const topBonusRemapping: any = {
        "888 Casino": "https://ic.aff-handler.com/c/43431?sr=1868828",
        StarCasinò: "https://record.starcasino.it/_SEA3QA6bJTNXl890vMAfUGNd7ZgqdRLk/131/",
        LeoVegas: "https://ads.leovegas.com/redirect.aspx?pid=3704489&bid=14965",
        WinCasino: "https://vincipromo.it/wincasino/?mp=42794b32-7604-49d2-92d0-8adf67a6b173"
    }

      
    return {
        props: {
            topSlotsData: await getSlots({ limit: 8, start: 0, sort: 'updated_at:desc' }),
            tableBonusData: (await getBonuses({ names: PAGE_BONUSES, sort: 'rating:desc'})).map((b) => {
                b.link = tableBonusRemapping[b.name]
                return b
            }),
            topBonusData: (await getBonuses({ names: TOP_BONUSES, sort: 'rating:desc'})).map((b) => {
                b.link = topBonusRemapping[b.name]
                return b
            }),
        }, 
    }
}

export default ComparatorPage
