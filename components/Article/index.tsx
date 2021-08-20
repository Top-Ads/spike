import React, { FunctionComponent, Fragment} from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'
import Image from 'next/image'
import { device } from '../../lib/utils/device'
import { CDN } from '../../public/environment'
import FreeBonusList from '../FreeBonusList'
import { Bonus } from '../../lib/schemas'

type Props = {
    data?: Bonus[]
}

const Article: FunctionComponent<Props> = ({data}) => {
    return (
        <Fragment>
            <Main>
                {data && 
                    <FreeBonusSection>
                        <FreeBonusList data={data.slice(0,5)} label="I MIGLIORI CASINÒ"/>
                        <FreeBonusList data={data.slice(5,10)} label="I MIGLIORI CASINÒ CON GIRI GRATIS"/>
                    </FreeBonusSection>
                }

                <section>
                <h3><strong>Giocare gratis alle slot online</strong></h3>
                <div>
                    <Thumbnail id={'volcano'} style={{float: 'right', marginLeft: '30px'}}>
                        <LazyLoad  height={85} offset={300}>
                            <Image
                                alt="gold-volcano"
                                src={"https://spike-images.s3.eu-central-1.amazonaws.com/gold-volcano-logo_3aa1e358a3.png"} 
                                layout="responsive"
                                priority={true}
                                width={200}
                                height={'auto'}/>
                        </LazyLoad>
                    </Thumbnail>
                    <p>
                    Ti piacciono le slot machine online? Vorresti esplorare tutte le dimensioni di questi giochi, senza rischiare di perderci nulla? 
                    Bene: sei nel posto giusto.<br/>
                    Infatti su casinosquad.it hai una vasta scelta di <b>slot online gratis</b> e non solo. Potrai provare tante dimensioni del <b>gioco d’azzardo</b>, 
                    sperimentando altri <b>giochi da casinò</b>.<br/>
                    Potrai giocarci quanto vuoi, senza limiti di tempo e senza pagare niente. Non dovrai registrarti al sito, né scaricare software.<br/>
                    Sì, hai capito bene: avrai la possibilità di giocare e basta, allenarti alle <b>slot machine gratis online</b>, in modo da esplorarle e 
                    imparare a conoscere le loro caratteristiche peculiari.<br/>
                    In effetti, osservare come si comportano, provare i bonus e scoprire come e quanto pagano, è davvero importante prima di scommettere soldi veri.<br/>
                    Su casinosquad.it potrai individuare in anteprima, ogni segreto delle nuove slot rilasciate sul mercato, ma anche provarle personalmente e scegliere 
                    quali salvare o mettere tra le tue preferite
                    </p>
                
                </div>
                </section>

                <section>
                    <h3><strong>Quali sono gli altri giochi da casinò disponibili sul nostro sito?</strong></h3>
                    <div>
                    <p>
                    Devi sapere che il nostro forte – lo avrai capito – sono le <b>slot machine.</b><br/>
                    Questo poiché attualmente, le slot rappresentano il gioco da <b>casinò online</b> più diffuso e di successo.<br/>
                    Però sul nostro sito, potrai trovare anche giochi, che sono fra i più classici e conosciuti.<br/>
                    Qualche esempio?
                    </p>
                    <ul>
                        <li>Il gioco della Roulette</li>
                        <li>il celebre Videopoker</li>
                        <li>Il classico Blackjack</li>
                        <li>l’elegante Baccarat</li>
                        <li>il popolare Bingo</li>
                    </ul>
                    <p>
                    Stai forse cercando degli specifici casinò? Se la risposta è sì, dovrai semplicemente visitare la nostra pagina dedicata: 
                    qui potrai selezionare il tipo di gioco che desideri provare.<br/>
                    Infatti, nella parte dedicata, troverai filtri da impostare e utilizzare per individuare in modo semplice il gioco che cerchi.
                    </p>
               </div>
                </section>

                <section>
                    <h3><strong>Giocare alle Slot senza download e senza registrazione</strong></h3>
                    <div
                    ><p>
                    Devi sapere che su casinosquad.it potrai giocare subito, senza limiti o perdite di tempo. Sì, infatti, non dovrai iscriverti o fare registrazioni. 
                    Tanti casinò, invece, ti obbligano a fare il download dei loro software di gioco. Questo togliendo tempo che potrebbe essere prezioso per te, fra download e installazione. 
                    Su casinosquad.it potrai giocare subito senza alcun obbligo.<br/>
                    Facendo un esempio, se decidi di giocare su Slotjava, non dovrai riempire complicati moduli con i tuoi dati sensibili, poiché offriamo un’anteprima completamente gratuita. 
                    Infatti, per provare una slot, dovrai semplicemente selezionarla, cliccando sulla sua anteprima.<br/>
                    Insomma, ti basterà accedere del browser per provare a giocare.<br/>
                    Com’è possibile? Dobbiamo ringraziare i passi da gigante fatti dalla tecnologia HTML5 e dei browser negli ultimi anni, sia per desktop che per dispositivo mobile.<br/>
                    Infatti, è grazie al HTML5 che potrai avere a disposizione oltre 1000 slot, con il meglio della qualità audio e video.
                    </p>
                </div>
                </section>

                <section>
                    <h3><strong>Le slot online sono legali in Italia?</strong></h3>
                    <div>
                    <Thumbnail id="adm" style={{float: 'left', marginRight: '30px'}}>
                        <LazyLoad height={85} offset={300}>
                            <Image
                                alt="image not available"
                                src={`${CDN}/svg/adm.svg`}
                                layout="responsive"
                                priority={true}
                                quality={50}
                                width={200}
                                height={'auto'}/>
                        </LazyLoad>
                    </Thumbnail>
                    <p>
                    Stai tranquillo, puoi giocare serenamente perché il gioco d'azzardo è legale in Italia, ma bisogna fare delle precisazioni.<br/>
                    Anche se il concetto di legalità, include i <b>casinò online</b>, bisogna fare attenzione al fatto che la piattaforma di gioco abbia la licenza.<br/>
                    Infatti, i <b>casinò di gioco online</b> possono operare se hanno una licenza rilasciata dalle autorità italiane. <br/>
                    In effetti, dal 3 dicembre 2012 le slot online AAMS-ADM sono disponibili.<br/>
                    Ciò significa la possibilità di giocare legalmente e in serenità, alle <b>slot machine online</b> almeno sui siti certificati.<br/>
                    Stiamo parlando dei <b>casinò online</b>autorizzati dall'Agenzia delle Dogane e dei Monopoli.<br/>
                    Questo, affinché gli amanti delle <b>slot online</b>, abbiano la possibilità di giocare da desktop, ma anche da mobile, grazie alla varietà dell’offerta 
                    dei titoli che sono continuamente aggiornati.<br/>
                    Il pubblico appassionato del gioco online, è variegato - dai principianti ai professionisti. 
                    Forse non sai che le slot machine nei <b>casinò online</b> italiani AAMS-ADM hanno una posizione di pregio. Infatti, sono al primo posto al mondo, per qualità, 
                    generosità e il livello di intrattenimento. <br/>
                    Vuoi scoprire i migliori casino legali con slot machine AAMS? Ecco qui un confronto.
                    </p>
                </div>
                </section>

                <section>
                    <h3><strong>Il valore della tecnologia e l’impegno dietro le quinte nel mondo delle slot e dei giochi da casinò.</strong></h3>
                    <div><p>
                Attualmente, siamo abituati ad una determinata raffinatezza visiva e amiamo standard grafici visivi e audio di un certo livello.<br/>
                Ecco perché in tempi recenti, sia slot che altri prodotti dei <b>casinò online</b> sono sviluppati in HTML5.<br/>
                Infatti, la tecnologia HTML5 è ottimale anche e soprattutto per i dispositivi mobili, sono quelli più utilizzati per interfacciarsi alla rete.<br/>
                La tecnologia HTML5 è veloce, e leggera. Ottima per chi ha uno smartphone e quindi può voler giocare ovunque si trovi: un’eventualità di cui i maggiori 
                provider hanno tenuto conto.
                </p></div>
                </section>
                
                <section>
                    <h3><strong>In che modo casinosquad.it realizza le recensioni delle slot online?</strong></h3>
                    <div>
                    <p>
                    Abbiamo a disposizione un team di esperti che valuta ogni <b>slot online</b>, facendo un capillare percorso di verifica, rigoroso ed efficace.<br/>
                    L’obiettivo è una missione del nostro team, ovvero la garanzia di un’esperienza di gioco avvincente e divertente.<br/>
                    <b>casinosquad.it</b> è qui per svelarti ogni dettaglio e per offrirti le recensioni dei migliori giochi di slot online.<br/>
                    Si tratta di recensioni preparate con serietà e professionalità, in considerazione di 5 requisiti di base, vediamoli assieme:

                    </p>

                    <ul>
                        <li>
                            <p>
                            Abbiamo a disposizione un team di esperti che valuta ogni slot online, facendo un capillare percorso di verifica, rigoroso ed efficace.
                            L’obiettivo è una missione del nostro team, ovvero la garanzia di un’esperienza di gioco avvincente e divertente. 
                            casinosquad.it è qui per svelarti ogni dettaglio e per offrirti le recensioni dei migliori giochi di slot online.
                            Si tratta di recensioni preparate con serietà e professionalità, in considerazione di 5 requisiti di base, vediamoli assieme:
                            </p>
                        </li>

                        <li>
                            <p>
                            Il gioco online è ottimizzato per mobile? Un posto di rilievo nella valutazione è ricoperto anche dalla valutazione di quanto i giochi di slot 
                            siano mobile friendly. I nostri giocatori valutano infatti – nell’introdurre un nuovo gioco nella libreria del sito – se sia o meno ottimizzato per 
                            il gioco mobile, in modo da non sacrificare l’esperienza ludica.
                            </p>
                        </li>

                        <li>
                            <p>
                            Il gioco recensito propone bonus? Il nostro team di professionisti valuta ogni gioco di slot, tenendo conto del sistema di bonus e ricompense. 
                            Che si tratti di free spin, moltiplicatori o premi in denaro, gli utenti avranno la possibilità di conoscere le modalità di attivazione dei bonus.
                            </p>
                        </li>

                        <li>
                            <p>
                            Nello scegliere un gioco di slot, è essenziale conoscere sia i valori di RTP che di Varianza. Come forse sai, la stessa vincita stessa, 
                            è definita in parte dall'RTP, ma anche dalla varianza di un gioco di slot. Il nostro team si impegna a trovare i giochi con gli RTP più alti, 
                            testando il livello di varianza, in modo da facilitare tutti i giocatori.
                            </p>
                        </li>

                        <li>
                            <p>
                            E infine, nel testare una slot online, è anche importante considerate il valore del Jackpot. In effetti, è il sogno di un giocatore, quello di 
                            vincere un jackpot cospicuo. Anche scoprire il valore massimo che puoi sognare di vincere ad una slot machine, assume rilevanza. Offriamo perciò ai nostri lettori, 
                            i dati sulle vincite potenziali di una una slot machine e come ottenerle. 
                            </p>
                        </li>
                        
                    </ul>

                </div>
                </section>
                
                <section>
                    <h3><strong>Esistono differenze fra slot online e le slot dei casinò terrestri?</strong></h3>
                    <div>
                    <p>
                    Bisogna sottolineare che – almeno in apparenza - le slot che puoi trovare nei casinò di Las Vegas, vantano alcune somiglianze con i giochi online.<br/>
                    Infatti, la versione online, è molto simile alla controparte meccanica che puoi facilmente trovare all’interno dei <b>casinò terrestri</b>. <br/>
                    Le slot machine classiche, hanno una serie di tre o più rulli, che girano dopo aver azionato una leva. <br/>
                    Così, mentre i rulli girano, puoi vincere o perdere in base alle combinazioni ed alla validità dei simboli che appaiono sui rulli stessi.<br/>
                    Ma è la stessa cosa anche con le slot online? <br/>
                    Intanto, ti ricordiamo che anziché tirare una leva, nelle slot online dovrai premere un pulsante per azionare i rulli.<br/>
                    </p>
                </div>
                </section>

                <section>
                    <h3><strong>I vantaggi di provare le slot online</strong></h3>
                    <div>
                    <ol type="1">
                        <li>
                            <p>
                            <b>Random Number Generator</b><br/>
                            I livelli meccanici presenti nelle slot machine dei casinò tradizionali, sono sostituiti nelle slot online, da un meccanismo davvero sofisticato, 
                            chiamato Random Number Generator (RNG).<br/>
                            Si tratta di un software che fungendo da generatore di combinazioni, porta il risultato di ogni giro ad essere davvero casuale. 
                            Si tratta di un software certificato per il fairplay: in questo modo RNG ti garantisce la trasparenza del gioco.
                            </p>
                        </li>
                        <li>
                            <p>
                            <b>Return to Player (RTP)</b><br/>
                            Le slot online assicurano un maggior Ritorno al Giocatore (RTP), ovvero un payback più elevato.<br/>
                            In effetti - gli esperti di casinò - sostengono che l’RTP in media, nelle slot online è molto più elevata. <br/>
                            Facciamo un esempio: se ho una slot online con un RTP DEL 97%, e farai 1 x 100 scommesse, potrai aspettarti all’incirca 97 euro di vincita.<br/>
                            Bisogna sottolineare che la maggior parte delle slot online ha valori di RTP pari al 92% o più.<br/>
                            Inoltre, in tantissimi casi, diversi casinò possono rimborsare fino al 95% e più.<br/>
                            Si tratta di un’enorme differenza, se consideri che nei casinò terrestri, il rimborso massimo arriva al 90%.

                            </p>
                        </li>
                        <li>
                            <p><b>Il Bonus deposito e il Bonus Ricarica</b><br/>
                            La stragrande maggioranza dei casinò online, propongono bonus sul primo deposito e sulla ricarica.<br/>
                            Attraverso il bonus, il rendimento aggiunto sul primo deposito è circa il 5%. 
                            </p>
                        </li>
                        <li>
                            <p><b>Ampia varietà nella selezione dei giochi</b><br/>
                            La grande varietà dei giochi disponibili, è un altro dei vantaggi di scegliere le slot online.<br/>
                            Solitamente, le migliori piattaforme di gioco, propongo oltre 300 fra le migliori slot online.<br/>
                            Marchi come Microgaming, NetEnt, Real Time Gaming, Playtech, sono una garanzia di affidabilità e successo.
                            </p>
                        </li>
                    </ol> 
               </div>
                </section>

                <section>
                    <h3><strong>Chi sono provider delle slot machine</strong></h3>
                    <div>
                    <p>
                    Come potrai immaginare, i giochi dei <b>casinò online</b>, sono sviluppati da altri.<br/>
                    Esistono infatti dei provider, che sono fornitori dei giochi che troverai sulle <b>piattaforme di gioco</b>.
                    Devi sapere che i provider sono molto diversi fra loro, per stile, particolarità e caratteristiche.<br/>
                    I giocatori abituali, con il passare del tempo, sanno distinguere le differenze e persino riconoscere ad una prima occhiata, quale fornitore 
                    abbia realizzato una determinata slot.<br/>
                    Forse non lo sai, ma sul nostro sito, avrai anche l’opzione di usare un filtro per visualizzare solo i giochi di un determinato provider. 
                    In più, potrai usare i filtri anche per trovare i prodotti con le caratteristiche che ami di più, come i giri gratis o un particolare tema.<br/>
                    Possiamo già dirti, che alcuni fra i migliori fornitori di giochi, sono IGT, Pragmatic Play, NetEnt e Novomatic: sono tutti davvero celebri in Italia.
                    </p>
                </div>
                </section>

                <section>
                    <h3><strong>Provare le slot online con soldi veri</strong></h3>
                    <div>
                    <p>
                    Come hai capito, sul sito casinosquad.it puoi provare tutte le slot che vuoi senza rischiare nulla.
                    Tuttavia, se avessi voglia di provare le slot soldi veri, hai diverse opportunità.<br/>
                    Nel momento in cui provi la versione demo di una slot sul nostro sito, troverai appena al di sotto, una finestra di gioco con l’indicazione di alcuni casinò in cui potrai provarla con soldi veri. 
                    Ricapitolando:
                    </p>

                    <ol type="1">
                        <li>Scegli una slot che t’ispira su casinosquad.it.</li>
                        <li>Fai clic sull’anteprima della slot.</li>
                        <li>Controlla la finestra di gioco sotto la slot: qui troverai l’elenco dei <b>casinò per giocare con soldi veri.</b></li>
                    </ol>
                    <p>
                    Concediti però del tempo per fare la tua scelta. Considera che ogni casinò ha le sue particolarità e può garantirti diverse promozioni in termini di bonus, marchi, etc.<br/>
                    Sai quale sarà la cosa più importante? Scegliere un <b>casinò italiano</b> che soddisfi i requisiti di sicurezza, legalità e affidabilità.<br/>
                    Su casinosquad.it troverai una selezione dei <b>migliori casinò</b> del panorama italiano che vantano popolarità e affidabilità grazie ad una licenza AAMS. <br/>
                    Se ti preoccupa il fatto di non avere mai provato un casinò online, puoi sempre consultare la <b>nostra sezione casinò</b>.<br/>
                    Qui potrai trovare tutte le informazioni e utili consigli per fare la tua scelta migliore.
                    Importante: se stai consultando il nostro sito da smartphone o pc, ricorda che se non hai Flash Player installato, per giocare con soldi veri, dovrai 
                    utilizzare il filtro “Dispositivi Mobile Supportati”.
                    </p>
                </div>
                </section>

                <section>
                    <h3><strong>I Bonus delle slot e le promozioni delle piattaforme di gioco.</strong></h3>
                    <div>
                    <p>
                    Ovviamente, tra i vari <b>casinò online</b>, c’è concorrenza e ci possono essere tante differenze in merito alle promozioni. Principalmente, 
                    le promozioni proposte dai casinò sono di 3 tipologie:
                    </p>

                    <ul>
                        <li>
                            <p>
                            <b>Bonus con deposito:</b> <br/>
                            Si tratta di un bonus ottenibile al primo deposito effettuato, derivante dal deposito stesso. 
                                Quindi, se la piattaforma di gioco offre un bonus del 100%, vorrà dire che se depositi 50 euro,  riceverai un bonus di 50 euro) 
                                che potrai usare giocando (quindi ben 100 euro).<br/>
                                I requisiti di scommessa, sono espressi con il simbolo “X”. <br/>
                                Per esempio la dicitura 10X significa che per prevelare una vincita in soldi veri, l'importo bonus dovrà essere giocato per 10 volte.
                            </p>
                        </li>
                        <li>
                            <p>
                            <b>Bonus senza deposito:</b> <br/>
                            Si tratta di bonus che non hanno il vincolo del deposito.
                            </p>
                        </li>
                        <li>
                            <p>
                            <b>Giri gratis</b><br/>
                            I giri gratis (free spins), rappresentano la possibilità di fare sessioni di gioco usufruendo 
                            di credito gratuito. Variano a seconda delle slot.<br/><br/>
                            Se vuoi, puoi consultare la pagina bonus dedicata per scoprire tutte le promozioni e le regole per l’incasso.<br/>
                            </p>
                        </li>
                    </ul>
                </div>
                </section>

                <section>
                    <h3><strong><b>Vuoi giocare alle slot come un professionista? Prova queste strategie</b></strong></h3>
                    <div>
                    <p>
                    Il mondo delle <b>slot online</b> fa parte del gioco d'azzardo.<br/>
                    Se sei veramente interessato, potresti volere imparare a giocare in modo consapevole e professionale.<br/>
                    Le nuove slot machine, vantano differenti quantità di rulli e di paylines; molto diverse dalle classiche slot degli anni Settanta e Ottanta.<br/>
                    Il primo step da fare, è esercitarsi con le versioni free dei giochi, dato che l’opportunità proviene dalle stesse piattaforme di gioco.<br/>
                    Ti consigliamo di provare slot con percentuale di pagamento RTP elevata.<br/>
                    Sui siti dei vari casinò, troverete indicate chiaramente, le di pagamento (valuta quelle dal 95% in su).<br/>
                    Sulla maggior parte delle slot, ti sarà necessario investire un importo minimo nella puntata, in modo da poterti avvantaggiare di bonus o jackpot. <br/>
                    Ricorda che scommettere su numerose linee di pagamento, aumenta le tue probabilità di vincita e ciò vale anche se hai un budget davvero limitato.<br/>
                    Devi semplicemente impostare l'importo della scommessa, aumentando il numero di linee di pagamento. Una volta fatto questo, puoi utilizzare anche 
                    la funzione Autoplay e tentare la fortuna.
                    </p>
                </div>
                </section>

                <section>
                    <h3><strong>Massimizzare le vincite delle slot</strong></h3>
                    <div>
                    <p>
                    Come abbiamo ricordato, un modo per prendere il massimo valore dalle slot online
                    è sfruttare sia le offerte speciali - bonus di benvenuto e promo ricarica.<br/>
                    Poi, è fondamentale mantenere la tua attività di gioco online, nell’intervallo del tuo bankroll (ovvero il budget per le scommesse). <br/>
                    Se sfori il tuo bankroll, forse dovresti evitare il gioco per un po’. <br/>
                    Inoltre, anche la varianza delle è molto ampia: colpire round bonus e jackpot può essere un evento raro, quanto emozionante.
                    </p>
                </div>
                </section>

                <section>
                    <h3><strong><b>False credenze e luoghi comuni sui giochi di slot</b></strong></h3>
                    <div>
                    <p>
                    Il gioco declinato nelle slot, che si parli dei casinò online, che di quelli tradizionali, è il gioco d’azzardo più popolare al mondo.<br/>
                    I motivi sono vari, ma in primis mettiamo la facilità e l’accessibilità.<br/>
                    In più le slot online si possono provare scommettendo importi molto bassi. Ciò diventa attraente per la nicchia di giocatori con un budget limitato o che 
                    giocano per diverstirsi dallo smartphone.<br/>
                    Tuttavia per chi non ha mai giocato, attorno al mondo delle slot, aleggiano false credenze e luoghi comuni.
                    </p>

                    <ol type="1">
                        <li>
                            <p>
                            Slot machine online che fanno vincere e che fanno perdere. Come abbiamo detto, alcune slot pagano più facilmente di altre. 
                            Se è vero che da neofiti la differenza è incomprensibile, per i professionisti diventa facile riconoscere le due varietà di slot.
                            </p>
                        </li>
                        <li>
                            <p>
                            Più giochi ad una slot, più avrai possibilità di vincere. Falso. La probabilità non rispecchia le leggi della memoria. 
                            I risultati saranno indipendenti ad ogni spin e non conta se stai giocando da ore o meno.
                            </p>
                        </li>
                        <li>
                            <p>
                            Aprire una slot machine per vincere. Molti credono che aprire un dispositivo slot machine in continuazione, 
                            garantirà vincite. Si tratta di un grande malinteso. In effetti, le slot machine dovrebbero essere aperte solo quando le monete vengono ricaricate. 
                            </p>
                        </li>
                        <li>
                            <p>
                            Differenze fra slot machine di valore superiore e inferiore. Le slot machine sono in ogni caso programmate con pagamenti fissi. 
                            Ovviamente, se si scommette un importo elevato, la vincita pagata sarà maggiore. Per questo ci sono differenze fra quelle di valore superiore e inferiore.
                            </p>
                        </li>
                        <li>
                            <p>
                            Imbottire la slot di soldi farà vincere. Non è vero ed è uno sbaglio che crea molta frustrazione nei giocatori. Anche se scommetti importi elevati, 
                            non sta scritto da nessuna parte che vincerai il jackpot. Infatti, il jackpot si vince per pura fortuna. 
                            Come abbiamo spesso detto, le slot machine funzionano in modo indipendente e non hanno memoria delle precedenti vincite.
                            </p>
                        </li>
                        <li>
                            <p>
                            Se fai parte di uno slot club, vincerai di più. Ancora un pensiero inesatto, una vera e propria bugia non corrispondente alla realtà. 
                            I benefici del far parte o meno di uno slot club sono altri e non sono collegati a vincite o pagamenti superiori. 
                            Anche perché le slot non sono “abbastanza intelligenti” da comprendere se tu sia un membro o meno di un club.
                            </p>
                        </li>
                        <li>
                            <p>
                            Vincere più di un jackpot contemporaneamente. Molti pensano non sia possibile. Questo è un altro oggetto della confusione legata al mondo delle slot virtuali. 
                            In alcune occasioni, infatti, è capitato che i giocatori abbiamo vinto un jackpot elevato e continuando a giocare, ne abbiano conquistato un altro.
                            </p>
                        </li>
                    </ol>
                </div>
                </section>

                <section>
                    <h3><strong>E se il gioco diventa un problema? Usa la testa e fermati</strong></h3>
                    <div>
                    <p>
                    Oltre ad essere una felice forma di intrattenimento e divertimento, per alcune persone, il gioco d’azzardo può portare dipendenza. 
                    La ludopatia è un problema che ha riflessi nella vita concreta e per questo non deve essere sottovalutato.<br/>
                    In periodo critici della vita, attraversando difficoltà, può capitare a tutti di voler tentare la fortuna e magari liberarsi dei problemi economici o debiti.<br/>
                    Tuttavia, è fondamentale usare la testa e giocare con consapevolezza e se tu o qualcuno che hai vicino ti sembra in difficoltà, fermati e chiedi aiuto.<br/>
                    Rifletti su quanto tempo passi giocando online e sulle piattaforme di gioco e sappi che ci sono strutture, iniziative e anche delle app che possono aiutarti a riequilibrarti.<br/>
                    Perciò, noi di Casinò Squad invitiamo i nostri lettori a giocare soltanto per divertirti ed emozionarti.<br/>
                    Non considerare mai il gioco d’azzardo come una soluzione ai tuoi problemi e non accanirti continuando a scommettere se hai perso soldi che vuoi recuperare.<br/>
                    Gioca soltanto l’importo che puoi permetterti e non soldi che dovresti usare per cose fondamentali della tua vita.<br/>
                    Se pensi di esserti avvicinato al gioco in un modo sereno, ma di non sentirti più così e pensi che la faccenda stia diventando problematica, fermati e chiedi aiuto.<br/>
                    Ti indichiamo qui <b>il numero di aiuto per il gioco d'azzardo 800558822</b>.<br/>
                    Si tratta di un numero verde che potrai chiamare gratis, dove professionisti preparati potranno ascoltarti e indirizzarti al meglio. Non sottovalutare eventuali problemi, 
                    che siano tuoi o dei tuoi familiari, parenti o amici. Speriamo di esserti stati di aiuto.
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
        p {
            font-family: 'Montserrat-Medium';
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

export default React.memo(Article)
