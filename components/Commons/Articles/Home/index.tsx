import React, { FunctionComponent, Fragment} from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'
import Image from 'next/image'
import { Bonus } from '../../../../lib/schemas'
import { device } from '../../../../lib/utils/device'
import { CDN } from '../../../../public/environment'
import FreeBonusList from '../../../Lists/FreeBonusList'
import { useTranslation } from 'react-i18next'


type Props = {
    mainBonuses?: Bonus[]
    freeBonuses?: Bonus[]
}

const HomeArticle: FunctionComponent<Props> = ({mainBonuses, freeBonuses}) => {

    const { t } = useTranslation()
    
    return (
        <Fragment>
            <Main>
                {mainBonuses && freeBonuses && 
                    <FreeBonusSection>
                        <FreeBonusList data={mainBonuses} label="I MIGLIORI CASINÒ"/>
                        <FreeBonusList data={freeBonuses} label="I MIGLIORI CASINÒ CON GIRI GRATIS"/>
                    </FreeBonusSection>
                }

                <section>
                <h3><strong>{t("Giocare gratis alle slot online")}</strong></h3>
                <div>
                    <Thumbnail id={'volcano'} style={{float: 'right', marginLeft: '30px'}}>
                        <LazyLoad  height={85} offset={300}>
                            <Image
                                alt="gold-volcano"
                                src={"https://spike-images.s3.eu-central-1.amazonaws.com/gold-volcano-logo_3aa1e358a3.png"} 
                                layout="responsive"
                                priority={true}
                                sizes="50vw"
                                width={200}
                                height={200}/>
                        </LazyLoad>
                    </Thumbnail>
                    <p>
                    {t("Ti piacciono le slot machine online? Vorresti esplorare tutte le dimensioni di questi giochi, senza rischiare di perderci nulla? Bene: sei nel posto giusto. ")}<br/>
                    {t("Infatti su casinosquad.com hai una vasta scelta di slot online gratis e non solo. Potrai provare tante dimensioni del gioco digitale, sperimentando vari giochi da casinò. ")}<br/>
                    {t("Abbiamo a disposizione centinaia di giochi, forniti dai migliori provider. ")}<br/>
                    {t("Sì, hai capito bene: avrai la possibilità di giocare e basta, allenarti alle slot machine gratis online, in modo da esplorarle e imparare a conoscere le loro caratteristiche peculiari. ")}
                    {t("In effetti, osservare come si comportano, provare i bonus e scoprire come e quanto pagano, è davvero importante prima di scommettere soldi veri. ")}<br/>
                    {t("Su Casino Squad potrai individuare in anteprima, ogni segreto delle nuove slot rilasciate sul mercato,")} 
                    {t("ma anche provarle personalmente e scegliere quali salvare o mettere tra le tue preferite. ")}
                    </p>
                
                </div>
                </section>

                <section>
                    <h3><strong>{t("Quali sono gli altri giochi da casinò disponibili sul nostro sito?")}</strong></h3>
                    <div>
                    <p>
                    {t("Devi sapere che il nostro forte – lo avrai capito – sono le slot machine. ")}<br/>
                    {t("Questo poiché attualmente, le slot rappresentano il gioco da casinò online più diffuso e di successo. ")}<br/>
                    {t("Però sul nostro sito, potrai trovare anche giochi, che sono fra i più classici e conosciuti. ")} <br/>
                    {t("Qualche esempio?")}

                    </p>
                    <ul >
                        <li>{t("Il gioco della Roulette. ")}</li>
                        <li>{t("il celebre Videopoker. ")}</li>
                        <li>{t("Il classico Blackjack. ")}</li>
                        <li>{t("l’elegante Baccarat. ")}</li>
                        <li>{t("il popolare Bingo. ")}</li>
                    </ul>
                    <p>
                    {t("Stai forse cercando degli specifici casinò? Se la risposta è sì, dovrai semplicemente visitare la nostra pagina dedicata:")}
                    {t("qui potrai selezionare il tipo di gioco che desideri provare. ")}
                    {t("Infatti, nella parte dedicata, troverai filtri da impostare e utilizzare per individuare in modo semplice il gioco che cerchi. ")}
                    </p>
               </div>
                </section>

                <section>
                    <h3><strong>{t("Giocare alle Slot senza download e senza registrazione")}</strong></h3>
                    <div
                    ><p>
                    {t("Devi sapere che su Casinosquad.it potrai giocare subito, senza limiti o perdite di tempo. Sì, infatti, non dovrai iscriverti o fare registrazioni. ")} <br/>
                    {t("Tanti casinò, invece, ti obbligano a fare il download dei loro software di gioco. Questo togliendo tempo che potrebbe essere prezioso. ")} <br/>
                    {t("Su Casinosquad.it potrai giocare subito senza alcun obbligo. ")}<br/>
                    {t("Facendo un esempio, se decidi di giocare su Casino Squad, non dovrai riempire complicati moduli con i tuoi dati sensibili, poiché offriamo un’anteprima completamente gratuita. ")} 
                    {t("Infatti, per provare una slot digitale, dovrai semplicemente selezionarla, cliccando sulla sua anteprima. ")} <br/>
                    {t("Insomma, ti basterà accedere del browser per provare a giocare. ")}<br/>
                    {t("Com’è possibile? Dobbiamo ringraziare i passi da gigante fatti dalla tecnologia HTML5 e dei browser negli ultimi anni, sia per desktop che per dispositivo mobile. ")} 
                    {t("Infatti, è grazie al HTML5 che potrai avere a disposizione oltre 1000 slot, con il meglio della qualità audio e video. ")}

                    </p>
                </div>
                </section>

                <section>
                    <h3><strong>{t("Le slot online sono legali in Italia?")}</strong></h3>
                    <div>
                    <Thumbnail id="adm" style={{float: 'left', marginRight: '30px'}}>
                        <LazyLoad height={85} offset={300}>
                            <Image
                                alt="adm"
                                src={`${CDN}/svg/adm.svg`}
                                layout="responsive"
                                priority={true}
                                sizes="50vw"
                                quality={50}
                                width={200}
                                height={200}/>
                        </LazyLoad>
                    </Thumbnail>
                    <p>
                    {t("Stai tranquillo, puoi giocare serenamente perché il gioco da casinò è legale in Italia, ma bisogna fare delle precisazioni. ")}<br/>
                    {t("Anche se il concetto di legalità, include i casinò digitali, bisogna fare attenzione al fatto che la piattaforma di gioco abbia la licenza. ")}<br/>
                    {t("Infatti, i casinò di gioco online possono operare se hanno una licenza rilasciata dalle autorità italiane. ")} <br/>
                    {t("In effetti, dal 3 dicembre 2012 le slot online AAMS-ADM sono disponibili. ")}
                    {t("Ciò significa la possibilità di giocare legalmente e in serenità, alle slot machine online almeno sui siti certificati. ")}<br/>
                    {t("Stiamo parlando dei casinò online autorizzati dall'Agenzia delle Dogane e dei Monopoli. ")}<br/>
                    {t("Questo, affinché gli amanti delle slot digitali, abbiano la possibilità di giocare da desktop, ma anche da mobile, grazie alla varietà dell’offerta dei titoli che sono continuamente aggiornati. ")}
                    {t("Il pubblico appassionato del gioco online, è variegato - dai principianti ai professionisti. ")} <br/>
                    {t("Forse non sai che le slot machine nei casinò online italiani AAMS-ADM hanno una posizione di pregio. Infatti, sono al primo posto al mondo, per qualità, generosità e il livello di intrattenimento. ")} 
                    <br/><br/>
                    {t("Vuoi scoprire i migliori casino legali con slot machine AAMS-ADM? Ecco qui un confronto. ")}

                    </p>
                </div>
                </section>

                <section>
                    <h3><strong>{t("Il valore della tecnologia e l’impegno dietro le quinte nel mondo delle slot digitali e dei giochi da casinò")}</strong></h3>
                    <div><p>
                    {t("Attualmente, siamo abituati ad una determinata raffinatezza visiva e amiamo standard grafici visivi e audio di un certo livello. ")}<br/>
                    {t("Ecco perché in tempi recenti, sia slot che altri prodotti dei casinò online sono sviluppati in HTML5. ")}
                    {t("Infatti, la tecnologia HTML5 è ottimale anche e soprattutto per i dispositivi mobili, quelli più utilizzati per interfacciarsi alla rete. ")}<br/>
                    {t("La tecnologia HTML5 è veloce, e leggera. Ottima per chi ha uno smartphone e quindi può voler giocare ovunque si trovi:")} 
                    {t("un’eventualità di cui i maggiori provider hanno tenuto conto. ")}

                </p></div>
                </section>
                
                <section>
                    <h3><strong>{t("In che modo Casinosquad.it realizza le recensioni delle slot online?")}</strong></h3>
                    <div>
                    <p>
                    {t("Abbiamo a disposizione un team di esperti che valuta ogni slot online, facendo un capillare percorso di verifica, rigoroso ed efficace. ")}<br/>
                    {t("L’obiettivo è una missione del nostro team, ovvero la garanzia di un’esperienza di gioco avvincente e divertente. ")} <br/>
                    {t("casinosquad.com è qui per svelarti ogni dettaglio e per offrirti le recensioni dei migliori giochi di slot online. ")}<br/>
                    {t("Si tratta di recensioni preparate con serietà e professionalità, in considerazione di 5 requisiti di base, vediamoli assieme:")}
                    </p>

                    <ul>
                        <li>
                            <p>
                            {t("In primis, l’esperienza di gioco. Su Casino Squad non desideriamo proporre giochi di slot noiosi. ")} 
                            {t("Il nostro team di giocatori cerca principalmente l’intrattenimento e il coinvolgimento. Per questi motivi")}, 
                            {t("una slot machine deve avere una buona qualità grafica, un bel tema originale e garantire un’esperienza di gioco divertente. ")} 
                            </p>
                        </li>

                        <li>
                            <p>
                            {t("Il gioco online è ottimizzato per mobile? Un posto di rilievo nella valutazione è ricoperto anche dalla valutazione di quanto i giochi di slot siano mobile-friendly. ")} 
                            {t("I nostri giocatori valutano infatti – nell’introdurre un nuovo gioco nella libreria del sito – se sia o meno ottimizzato per il gioco mobile, in modo da non sacrificare l’esperienza ludica. ")}
                            </p>
                        </li>

                        <li>
                            <p>
                            {t("Il gioco online è ottimizzato per mobile? Un posto di rilievo nella valutazione è ricoperto anche dalla valutazione di quanto i giochi di slot siano mobile-friendly. ")} 
                            {t("I nostri giocatori valutano infatti – nell’introdurre un nuovo gioco nella libreria del sito – se sia o meno ottimizzato per il gioco mobile, in modo da non sacrificare l’esperienza ludica. ")}
                            </p>
                        </li>

                        <li>
                            <p>
                            {t("Nello scegliere un gioco di slot, è essenziale conoscere sia i valori di RTP che di Varianza. Come forse sai,")} 
                            {t("la stessa vincita stessa, è definita in parte dall'RTP, ma anche dalla varianza di un gioco di slot. ")} 
                            {t("Il nostro team si impegna a trovare i giochi con gli RTP più alti, testando il livello di varianza, in modo da facilitare tutti i giocatori. ")}
                            </p>
                        </li>

                        <li>
                            <p>
                            {t("E infine, nel testare una slot online, è anche importante considerate il valore del Jackpot. ")} 
                            {t("In effetti, è il sogno di un giocatore, quello di vincere un Jackpot cospicuo. Anche scoprire il valore massimo che puoi sognare di vincere ad una slot machine, assume rilevanza. ")} <br/>
                            {t("Offriamo perciò ai nostri lettori, i dati sulle vincite potenziali di una slot machine e come ottenerle. ")} 
                            </p>
                        </li>
                        
                    </ul>

                </div>
                </section>
                
                <section>
                    <h3><strong>{t("Esistono differenze fra slot online dei casinò digitali e i giochi di slots dei casinò tradizionali?")}</strong></h3>
                    <div>
                    <p>
                    {t("Bisogna sottolineare che – almeno in apparenza - le slot che puoi trovare nei casinò di Las Vegas, vantano alcune somiglianze con i giochi online. ")}
                    {t("Infatti, la versione online, è molto simile alla controparte meccanica che puoi facilmente trovare all’interno dei casinò fisici tradizionali. ")}
                    {t("Le slot machine classiche, hanno una serie di tre o più rulli, che girano dopo aver azionato una leva. ")} <br/>
                    {t("Così, mentre i rulli girano, puoi vincere o perdere in base alle combinazioni ed alla validità dei simboli che appaiono sui rulli stessi. ")}
                    <br/><br/>
                    {t("Ma è la stessa cosa anche con le slot online?")} 
                    {t("Intanto, ti ricordiamo che anziché tirare una leva, nelle slot digitali, dovrai premere un pulsante per azionare i rulli. ")}

                    </p>
                </div>
                </section>

                <section>
                    <h3><strong>{t("I vantaggi di provare le slot online")}</strong></h3>
                    <div>
                    <ol type="1">
                        <li>
                            <p>
                            <b>{t("Random Number Generator")}</b><br/>
                            {t("I livelli meccanici presenti nelle slot machine dei casinò tradizionali, sono sostituiti nelle slot online, da un meccanismo davvero sofisticato, chiamato Random Number Generator (RNG). ")}<br/>
                            {t("Si tratta di un software che fungendo da generatore di combinazioni, porta il risultato di ogni giro ad essere davvero casuale. ")} <br/>
                            {t("Si tratta di un software certificato per il fairplay: in questo modo RNG ti garantisce la trasparenza del gioco. ")}

                            </p>
                        </li>
                        <li>
                            <p>
                            <b>{t("Return to Player (RTP)")}</b><br/>
                            {t("Le slot online assicurano un maggior Ritorno al Giocatore (RTP), ovvero un payback più elevato. ")}<br/>
                            {t("In effetti - gli esperti di casinò - sostengono che l’RTP in medio, nelle slot online è molto più elevato. ")} <br/>
                            {t("Facciamo un esempio: se ho una slot digitale con un RTP DEL 97%, e faccio 1 x 100 scommesse, posso aspettarmi all’incirca 97 euro di vincita. ")}
                            {t("Bisogna sottolineare che la maggior parte delle slot online ha valori di RTP pari al 92% o più. ")}
                            {t("Inoltre, in tantissimi casi, diversi casinò online possono rimborsare fino al 95% e più. ")}
                            {t("Si tratta di un’enorme differenza, se consideri che nei casinò fisici, il rimborso massimo arriva al 90%. ")}
                            </p>
                        </li>
                        <li>
                            <p><b>{t("Il Bonus deposito e il Bonus Ricarica")}</b><br/>
                            {t("La stragrande maggioranza dei casinò digitali, proponeB onus sul primo deposito e sulla ricarica. ")} <br/>
                            {t("Attraverso il Bonus, il rendimento aggiunto sul primo deposito è circa il 5%. ")}
                            </p>
                        </li>
                        <li>
                            <p><b>{t("Ampia varietà nella selezione dei giochi")}</b><br/>
                            {t("La grande varietà dei giochi disponibili, è un altro dei vantaggi di scegliere le slot online. ")}<br/>
                            {t("Solitamente, le migliori piattaforme di gioco, propongo oltre 300 fra le migliori slot online. ")}<br/>
                            {t("Marchi come Microgaming, NetEnt, Real Time Gaming, Playtech, sono una garanzia di affidabilità e successo. ")}
                            </p>
                        </li>
                    </ol> 
               </div>
                </section>

                <section>
                    <h3><strong>{t("Chi sono provider delle slot machine?")}</strong></h3>
                    <div>
                    <p>
                    {t("Come potrai immaginare, i giochi dei casinò online, sono sviluppati da aziende specifiche. ")}
                    {t("Esistono infatti dei provider - fornitori ufficiali dei giochi - che troverai sulle piattaforme di gioco. ")}
                    {t("Devi sapere che i provider sono molto diversi fra loro, per stile, particolarità e caratteristiche. ")}
                    {t("I giocatori abituali, con il passare del tempo, sanno distinguere le differenze e persino riconoscere ad una prima occhiata, quale fornitore abbia realizzato una determinata slot. ")}<br/>
                    {t("Forse non lo sai, ma sul nostro sito, avrai anche l’opzione di usare un filtro per visualizzare solo i giochi di un determinato provider. ")} <br/>
                    {t("In più, potrai usare i filtri anche per trovare i prodotti con le caratteristiche che ami di più, come i giri gratis o un particolare tema. ")}<br/>
                    {t("Possiamo già dirti, che alcuni fra i migliori fornitori di giochi, sono IGT, Pragmatic Play, NetEnt e Novomatic: sono tutti davvero celebri in Italia. ")}

                    </p>
                </div>
                </section>

                <section>
                    <h3><strong>{t("Provare le slot online con soldi veri")}</strong></h3>
                    <div>
                    <p>
                    {t("Come hai capito, su Casino Squad puoi provare tutte le slot che vuoi senza rischiare nulla. ")}
                    {t("Tuttavia, se avessi voglia di provare le slot puntando soldi veri, hai diverse opportunità. ")}
                    <br/><br/>
                    {t("Nel momento in cui provi la versione demo di una slot sul nostro sito, troverai appena al di sotto, una finestra di gioco con l’indicazione di alcuni casinò in cui potrai provarla con soldi veri. ")} 
                    {t(" Ricapitolando:")}
                    </p>

                    <ol type="1">
                        <li>{t("Scegli una slot machine che t’ispira su Casinosquad.com. ")}</li>
                        <li>{t("Fai clic sull’anteprima della slot digitale. ")}</li>
                        <li>{t("Controlla la finestra di gioco sotto la slot online: qui troverai l’elenco dei casinò per giocare con soldi veri. ")}</li>
                    </ol>
                    <p>
                    {t("Concediti però del tempo per fare la tua scelta. Considera che ogni casinò ha le sue particolarità e può garantirti diverse promozioni in termini di bonus, marchi, etc. ")}<br/>
                    {t("Sai quale sarà la cosa più importante? Scegliere un casinò italiano che soddisfi i requisiti di sicurezza, legalità e affidabilità. ")}<br/>
                    {t("Su casinosquad.com troverai una selezione dei migliori casinò del panorama italiano che vantano popolarità e affidabilità grazie ad una licenza ADM. ")} <br/>
                    {t("Se ti preoccupa il fatto di non avere mai provato un casinò online, puoi sempre consultare la nostra sezione Casinò. ")}<br/>
                    {t("Qui potrai trovare tutte le informazioni e utili consigli per fare la tua scelta migliore. ")}<br/>
                    {t("Importante: se stai consultando il nostro sito da smartphone o pc, ricorda che se non hai Flash Player installato, per giocare con soldi veri, dovrai utilizzare il filtro “Dispositivi Mobile Supportati”. ")}

                    </p>
                </div>
                </section>

                <section>
                    <h3><strong>{t("I Bonus delle slot digitali e le promozioni delle piattaforme di gioco")}</strong></h3>
                    <div>
                    <p>
                    {t("Ovviamente, tra i vari casinò online, c’è concorrenza e per questo, ci possono essere tante differenze in merito alle promozioni. ")}<br/>
                    {t("Principalmente, le promozioni proposte dai casinò sono di 3 tipologie:")}

                    </p>

                    <ul>
                        <li>
                            <p>
                            <b>{t("Bonus con deposito:")}</b> <br/>
                            {t("Si tratta di un Bonus ottenibile al primo deposito effettuato, derivante dal deposito stesso. ")} <br/>
                            {t("Quindi, se il casinò digitale offre un bonus del 100%, significa che se depositi 50 euro, riceverai un bonus di 50 euro) che potrai usare giocando (quindi ben 100 euro). ")}<br/>
                            {t("I requisiti di scommessa, sono espressi con il simbolo “X”. ")} <br/>
                            {t("Per esempio la dicitura 10X significa che per prevelare una vincita in soldi veri, l'importo bonus dovrà essere giocato per 10 volte. ")}
                            </p>
                        </li>
                        <li>
                            <p>
                            <b>{t("Bonus senza deposito:")}</b> <br/>
                            {t("Si tratta di bonus che non hanno il vincolo del deposito. ")}
                            </p>
                        </li>
                        <li>
                            <p>
                            <b>{t("Giri gratis:")}</b><br/>
                            <b>{t("I giri gratis")}</b> {t("(free spins), rappresentano la possibilità di fare sessioni di gioco usufruendo")} 
                            {t("di credito gratuito. Variano a seconda delle slot. ")}<br/><br/>
                            {t("Se vuoi, puoi consultare la pagina bonus dedicata per scoprire tutte le promozioni e le regole per l’incasso. ")}<br/>
                            </p>
                        </li>
                    </ul>
                </div>
                </section>

                <section>
                    <h3><strong><b>{t("Vuoi giocare alle slot come un professionista? Prova queste strategie")}</b></strong></h3>
                    <div>
                    <p>
                    {t("Le slot machine sono una delle forme di intrattenimento più popolari dei giochi da casinò. ")}
                    {t("Se sei appassionato di gioco digitale, forse ami l’idea d’imparare a giocare in modo consapevole e professionale. ")}<br/>
                    {t("Le nuove slot machine, vantano differenti quantità di rulli e di paylines; molto diverse dalle classiche slot degli anni Settanta e Ottanta. ")}<br/>
                    {t("Il primo step da fare, è esercitarsi con le versioni free dei giochi, dato che l’opportunità proviene dalle stesse piattaforme di gioco. ")}<br/>
                    {t("Ti consigliamo di provare slot machine con percentuale di pagamento RTP elevata. ")}<br/>
                    {t("Sui siti dei vari casinò, troverai indicato chiaramente l’RTP (valuta quelle dal 95% in su). ")}<br/>
                    {t("Sulla maggior parte delle slot machine, ti sarà necessario investire un importo minimo di puntata, in modo da poterti avvantaggiare di Bonus o Jackpot. ")} <br/>
                    {t("Ricorda che scommettere su numerose linee di pagamento, aumenta le tue probabilità di vincita e ciò vale anche se hai un budget davvero limitato. ")}<br/>
                    {t("Devi semplicemente impostare l'importo della scommessa, aumentando il numero di linee di pagamento. Una volta fatto questo, puoi utilizzare anche la funzione Autoplay e tentare la fortuna. ")}

                    </p>
                </div>
                </section>

                <section>
                    <h3><strong>{t("Massimizzare le vincite delle slot")}</strong></h3>
                    <div>
                    <p>
                    {t("Come abbiamo ricordato, un modo per sfruttare al massimo un gioco di slot, è accaparrarsi offerte speciali - Bonus di Benvenuto e Promo Ricarica. ")}<br/>
                    {t("Poi, è fondamentale mantenere la tua attività di gioco, nell’intervallo del tuo bankroll (ovvero il budget per le scommesse). ")} <br/>
                    {t("Se sfori il tuo bankroll, forse dovresti evitare il gioco per un po’. ")} 
                    </p>
                </div>
                </section>

                <section>
                    <h3><strong><b>{t("False credenze e luoghi comuni sui giochi di slot")}</b></strong></h3>
                    <div>
                    <p>
                    {t("Il gioco declinato nelle slot machine - sia dei casinò online che dei casinò tradizionali – è il più popolare al mondo. ")}
                    {t("I motivi sono vari, ma il primo è sicuramente facilità e accessibilità. ")}
                    {t("In più le slot online si possono provare scommettendo importi molto bassi. ")} 
                    {t("Ciò diventa attraente per la nicchia di giocatori più giovani, spesso con un budget limitato. ")}
                    {("Tuttavia, attorno al mondo delle slot machine, aleggiano false credenze e luoghi comuni. ")}

                    </p>

                    <ol type="1">
                        <li>
                            <p>
                            {t("Slot che fanno vincere e che fanno perdere. Come abbiamo detto, alcune slot machine pagano più facilmente di altre. Se è vero che da neofiti la differenza è incomprensibile, per i professionisti diventa facile riconoscere le due varietà di slot. ")}
                            </p>
                        </li>
                        <li>
                            <p>
                            {t("Più giochi ad una slot, più avrai possibilità di vincere. Falso. La probabilità non rispecchia le leggi della memoria. I risultati saranno indipendenti ad ogni spin e non conta se stai giocando da ore o meno. ")}
                            </p>
                        </li>
                        <li>
                            <p>
                            {t("Aprire una slot machine per vincere. Molti credono che aprire un dispositivo slot machine in continuazione, garantirà vincite. Si tratta di un grande malinteso. In effetti, le slot machine dovrebbero essere aperte solo quando le monete vengono ricaricate. ")} 
                            </p>
                        </li>
                        <li>
                            <p>
                            {t("Differenze fra slot machine di valore superiore e inferiore. Le slot machine sono in ogni caso programmate con pagamenti fissi. Ovviamente, se si scommette un importo elevato, la vincita pagata sarà maggiore. Per questo ci sono differenze fra quelle di valore superiore e inferiore. ")}
                            </p>
                        </li>
                        <li>
                            <p>
                            {t("Imbottire la slot di soldi farà vincere. Non è vero ed è uno sbaglio che crea molta frustrazione nei giocatori. Anche se scommetti importi elevati, non sta scritto da nessuna parte che vincerai il Jackpot. Infatti, il Jackpot si vince per pura fortuna. Come abbiamo spesso detto, le slot machine funzionano in modo indipendente e non hanno memoria delle precedenti vincite. ")}
                            </p>
                        </li>
                        <li>
                            <p>
                            {t("Se fai parte di uno slot club, vincerai di più. Ancora un pensiero inesatto, una vera e propria bugia non corrispondente alla realtà. I benefici del far parte o meno di uno slot club sono altri e non sono collegati a vincite o pagamenti superiori. Anche perché le slot non sono “abbastanza intelligenti” da comprendere se tu sia un membro o meno di un club di gioco. Le slot, semplicemente, seguono la percentuale di pagamento programmato. ")}
                            </p>
                        </li>
                        <li>
                            <p>
                            {t("Vincere più di un Jackpot contemporaneamente. Molti pensano non sia possibile. Questo è un altro oggetto della confusione legata al mondo delle slot machine. In alcune occasioni, infatti, è capitato che i giocatori abbiamo vinto un Jackpot elevato e continuando a giocare, ne abbiano conquistato un altro. ")}
                            </p>
                        </li>
                    </ol>
                </div>
                </section>

                <section>
                    <h3><strong>{t("E se il gioco diventa un problema? Usa la testa e fermati")}</strong></h3>
                    <div>
                    <p>
                    {t("Oltre ad essere una felice forma di intrattenimento e divertimento, per alcune persone, il gioco da casinò può portare dipendenza. ")} 
                    {t("La ludopatia e le forme di gioco patologico, sono problemi che hanno riflessi concreti nella vita e per questo non devono essere sottovalutati. ")}
                    {t("In periodo critici della vita, attraversando difficoltà, può capitare a tutti di voler tentare la fortuna e magari liberarsi dei problemi economici o debiti. ")}
                    {t("Tuttavia, è fondamentale usare la testa e giocare con consapevolezza. Perciò, se tu o qualcuno che hai vicino ti sembra in difficoltà, fermati e chiedi aiuto. ")}
                    {t("Rifletti su quanto tempo passi giocando online e sui casinò digitali e sappi che ci sono strutture, iniziative e anche delle app che possono aiutarti a riequilibrarti. ")}
                    {t("Perciò, noi di Casinò Squad invitiamo i nostri lettori a giocare soltanto per divertirsi ed emozionarsi. ")}
                    {t("Non considerare mai il gioco da casinò come una soluzione ai problemi e non accanirti continuando a scommettere se hai perso soldi che vuoi recuperare. ")}
                    {t("Gioca soltanto l’importo che puoi permetterti e non soldi che dovresti usare per cose fondamentali della tua vita. ")}
                    {t("Se pensi di esserti avvicinato al gioco in un modo sereno, ma di non sentirti più così e pensi che la faccenda stia diventando problematica, fermati e chiedi aiuto. ")}
                    <br/><br/>
                    {t("Ti indichiamo qui il numero di aiuto per il gioco da casinò 800558822. ")}
                    <br/><br/>
                    {t("Si tratta di un numero verde che potrai chiamare gratis, dove professionisti preparati potranno ascoltarti e indirizzarti al meglio. ")} 
                    {t("Non sottovalutare eventuali problemi, che siano tuoi o dei tuoi familiari, parenti o amici. ")} 
                    {t("Speriamo di esserti stati di aiuto!")}

                    </p>
                </div>
                </section>
            </Main>
        </Fragment>
    )
} 

const Main = styled.div`
    padding: 5px 10px;

    section { 
        margin: 30px 0px; 
      
        li {
            margin-bottom: 15px;
            width: 80%;
        }
    }

    @media ${device.mobileL} { padding: 5px; }

    li { 
        text-align: left; 
    }
`

const Thumbnail = styled.div` 
    &#adm {
        width: 180px;
        shape-outside: circle(96px at 42.8% 66.5%);

        @media ${device.mobileL} {
            width: 145px;
            clip-path: circle(73px at 50.15% 50.15%);
            shape-outside: circle(73px at 50.1% 50.15%);
        }
    }

    &#volcano {
        width: 200px;
        clip-path: circle(85px at 50.05% 51.95%);
        shape-outside: circle(89px at 56.55% 51.95%);

        @media ${device.mobileL} {
            width: 145px;
            clip-path: circle(73px at 50.15% 50.15%);
            shape-outside: circle(73px at 50.1% 50.15%);
        }
    }
`

const FreeBonusSection = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: min-content;
    float: right;
    width: 400px;
    margin-left: 20px;

    @media ${device.tablet} {
        float: unset;
        width: 100%;
        margin-left: 0;
    }
`

export default React.memo(HomeArticle)
