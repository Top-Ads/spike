import React, { FunctionComponent, Fragment} from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'
import Image from 'next/image'
import { device } from '../../utils/device'
import { CDN } from '../../public/environment'

const Article: FunctionComponent = () => {
    return (
        <Fragment>
            <Main>

                <div><strong>Gioca alle slot online – gratis</strong></div>
                <div>
                    <Thumbnail style={{float: 'right', marginLeft: '30px'}}>
                        <LazyLoad  height={85} offset={300}>
                            <Image
                                alt="image not available"
                                src={'https://spike-images.s3.eu-central-1.amazonaws.com/almighty_sparta-min_9caf037e56.jpeg'} 
                                layout="responsive"
                                priority={true}
                                width={200}
                                height={'auto'}/>
                        </LazyLoad>
                    </Thumbnail>
                    <p>
                    Se ti piacciono le slot machine online ma vuoi giocare senza rischiare nulla,
                    allora sei nel posto giusto. Qui su Slotjava.it trovi soltanto slot online gratis,
                    insieme ad altri giochi da casinò a cui potrai giocare per tutto il tempo che vorrai,
                    senza pagare nulla, senza registrarti e senza scaricare alcun software.
                    Potrai semplicemente giocare, e basta. Giocare alle <strong>slot machine gratis</strong> online ti
                    consente di poterle provare e imparare le loro caratteristiche, il loro comportamento,
                    scoprire quanto pagano e se hanno delle fasi bonus. Puoi scoprire in anteprima i segreti
                    delle ultime slot rilasciate, per giudicarle personalmente e metterle tra i preferiti
                    o tra quelle da evitare. Il tutto, senza alcun rischio e senza limiti di tempo.
                </p>
                
               

                </div>


                <div><strong>Altri giochi a cui puoi giocare gratis sul nostro sito</strong></div>
                <div>
                    <p>
                    Noi siamo specializzati soprattutto in slot machine, poiché esse rappresentano
                    il gioco da <strong>casinò online</strong> più popolare del momento. Tuttavia, sul nostro sito sono
                    disponibili anche altre tipologie di gioco, che ben conoscerai e che potrai apprezzare.
                    Eccole qui:
                    </p>
                    <ul>
                        <li>Roulette</li>
                        <li>Blackjack</li>
                        <li>Baccarat</li>
                        <li>Bingo</li>
                        <li>Video Poker</li>
                    </ul>
                    <p>
                    Se stavi cercando uno specifico casinò, allora visita la nostra pagina dedicata
                    dove potrai scegliere la tipologia di gioco che preferisci. Nella pagina, troverai
                    dei filtri che potrai utilizzare per trovare più facilmente il gioco che stai cercando.
                    </p>
               </div>


                <div><strong>Slot – Giocare senza download e senza registrazione</strong></div>
                <div
                    ><p>
                    Su Slotjava.it puoi giocare subito, senza perdere tempo in download
                    e registrazioni. Molti casinò richiedono ancora di scaricare il proprio software
                    di gioco, richiedendo quindi tempo per il download e l’installazione. Sul nostro
                    sito potrai giocare subito senza scaricare nulla. Inoltre, non dovrai registrarti!
                    Ciò significa che per giocare su Slotjava non devi riempire moduli con i tuoi dati,
                    poiché tutti i giochi che ti offriamo sono completamente gratuiti. Per giocare, devi
                    semplicemente selezionare una slot e cliccare sulla sua anteprima. A tutte le slot presenti
                    sul nostro sito si può giocare semplicemente accedendo dal browser. Questo grazie ai progressi
                        della tecnologia HTML5 e dei browser ottenuti sia per desktop che mobile. Grazie al HTML5 puoi goderti
                    più di 1000 slot senza download e con il massimo della qualità audio e video possibile.
                    </p>
                </div>


                <div><strong>È legale giocare alle slot online in Italia?</strong></div>
                <div>
                    <Thumbnail style={{float: 'left', marginRight: '30px'}}>
                        <LazyLoad height={85} offset={300}>
                            <Image
                                alt="image not available"
                                src={`${CDN}/svg/adm.svg`}
                                layout="responsive"
                                priority={true}
                                width={200}
                                height={'auto'}/>
                        </LazyLoad>
                    </Thumbnail>
                    <p>
                    Il gioco d’azzardo in Italia è legale e include l’accesso ai casinò online.
                    Non ci sono scappatoie poiché i casinò di gioco online sono autorizzati
                    a operare purché detengano una licenza dalle autorità italiane. Dal 3 dicembre 2012
                    sono disponibili le slot online AAMS-ADM. Questo permette di giocare legalmente e in modo
                    sicuro alle slot machine online sui siti di casinò certificati dall’Agenzia delle Dogane e dei Monopoli.
                    In questo modo, oggi gli appassionati di slot online, possono giocare sia da desktop che da mobile,
                    grazie ad una vasta offerta di titoli in continuo aggiornamento, che accontenta un pubblico variegato di scommettitori,
                    dai principianti ai professionisti. Le slot machine nei casinò online AAMS-ADM italiani sono
                    al primo posto della classifica mondiale per la qualità, la generosità e l’altissimo livello di intrattenimento. Qui,
                    i migliori casino legali con slot machine AAMS a confronto.
                    </p>
                </div>


                <div><strong>Dietro alle slot e ai giochi da casinò c’è tanta tecnologia. A tua disposizione.</strong></div>
                <div><p>
                    lash è stato molto utile e ai tempi rivoluzionario, ma ora è diventato un po’ datato.
                    Le nuove tecnologie e i nuovi standard grafici e sonori hanno richiesto un cambio di passo.
                    Questo è il motivo per cui oggi le slot e gli altri giochi da casinò online sono sviluppati in HTML5:
                    richiedono il minimo spazio, sono veloci e incredibilmente qualitativi. Soprattutto, c’è da far notare
                    che la tecnologia HTML5 è ottimale anche per i dispositivi mobili, che oggi sono capillarmente diffusi.
                    Tutti hanno uno smartphone e quindi si deve avere la possibilità di poter giocare ovunque ci si trovi.
                    I provider non potevano farsi scappare l’occasione di soddisfare questa crescente esigenza.
                </p></div>


                <div><strong>Come realizziamo le recensioni delle slot online?</strong></div>
                <div>
                    <p>
                    I nostri esperti di Slotjava.it valutano ogni gioco di slot online attraverso un rigoroso processo
                    di verifica per garantire che venga offerta ai giocatori la migliore esperienza di gioco possibile.
                    Scopriamo ogni dettaglio nella nostra ricerca per offrirti i migliori giochi di slot online nelle
                    nostre recensioni. I giocatori possono essere certi che ogni guida alle slot online è recensita in
                    base a 5 requisiti standard:
                    </p>

                    <ul>
                        <li>
                            <p>
                                <b>Presenza di bonus.</b> Valutiamo ogni gioco di slot in base ai suoi bonus e ricompense.
                                Che si tratti di giri gratuiti, moltiplicatori o premi in denaro, i giocatori sapranno
                                come attivare questi bonus e se valgono il loro prezioso bankroll.
                            </p>
                        </li>

                        <li>
                            <p>
                            <b>RTP e Varianza</b> – Le dimensioni delle vincite di un giocatore dipendono dall’RTP e dalla
                            varianza di un gioco di slot. I nostri esperti trovano i giochi con i RTP più alti verificandone
                            il livello di varianza, per non far trovare impreparati i nostri giocatori.
                            </p>
                        </li>

                        <li>
                            <p>
                            <b>Esperienza di gioco</b> – Per conquistare i nostri esperti, una slot machine deve avere un tema
                            originale e una grafica di alta qualità. I nostri giocatori cercano un’esperienza coinvolgente,
                            quindi sul nostro sito Web non c’è spazio per giochi di slot noiosi.
                            </p>
                        </li>

                        <li>
                            <p>
                            <b>Ottimizzazione mobile</b> – I giocatori vogliono divertirsi con i giochi di slot,
                            indipendentemente da dove si trovino. Il nostro team di recensioni verifica che ogni
                            titolo presente nella libreria sia ottimizzato per il gioco mobile, senza sacrificare l’esperienza ludica.
                            </p>
                        </li>

                        <li>
                            <p>
                            <b>Valore del jackpot</b> – Ogni giocatore di slot sogna di vincere un jackpot. Scopriamo il valore massimo
                            che puoi aspettarti di vincere da una slot machine e come vincerlo. Vogliamo offrire ai nostri lettori
                            le migliori potenzialità di vittoria sempre!.
                            </p>
                        </li>
                        
                    </ul>

                </div>

                
                <div><strong>Qual è la differenza tra le slot online e le slot live?</strong></div>
                <div>
                    <p>
                    Le slot nei casinò di Las Vegas hanno alcune somiglianze con i giochi online? Apparentemente sì,
                    la versione online infatti, è molto simile alla sua controparte meccanica che trovi nei casinò terrestri.
                    Le tipiche slot machine dispongono di una serie di tre o più bobine che ruotano alla spinta di una leva.
                    Una volta che i rulli smettono di girare, vinci o perdi in base alla combinazione di simboli sui rulli.
                    È così semplice ma anche divertente e potenzialmente redditizio. Cosa succede quando giochi alle slot online?
                    Invece di dover tirare una leva, tutto ciò che fai nelle slot online è premere un pulsante per mettere in moto i rulli.
                    </p>
                </div>


                <div><strong>Quali sono i vantaggi di giocare alle slot online?</strong></div>
                <div>
                    <ul>
                        <li>
                            <p>
                            Grazie all’innovativo software Random Number Generator (RNG) che sostituisce
                            le leve meccaniche presenti nelle slot machine nei casinò tradizionali a terra,
                            il risultato per ogni giro risulta davvero casuale. Il software RNG è certificato per il fair play,
                            quindi ti viene garantito un gioco trasparente.
                            </p>
                        </li>
                        <li>
                            <p>
                            Maggiore payback / RTP ( Ritorno al Giocatore) – Secondo gli esperti di casinò, la percentuale
                            di rimborso o RTP nelle slot online è molto più alta. Ad esempio, se una slot ha un RTP del 95%
                            e fai 1 x 100 scommesse, puoi aspettarti di ottenere circa 95,00€ in vincite. Questo è esattamente
                            l’opposto del vantaggio della casa, che nel caso di questo esempio è del 5%. La maggior parte delle
                            slot online ha un RTP del 92% o più, con molti casinò che rimborsano fino al 95% e oltre,
                            a differenza delle slot terrestri che di solito rimborsano un massimo del 90%.
                            </p>
                        </li>
                        <li>
                            <p>
                            Praticamente tutti i casinò online offrono bonus sul primo deposito e sulla ricarica.
                            Questi bonus tendono ad applicarsi solo alle slot. Il rendimento aggiunto attraverso il bonus
                            sul primo deposito è di circa il 5%. Ciò significa che le slot online possono avere un margine
                            di casa minimo o nullo quando si gioca con un bonus.
                            </p>
                        </li>
                        <li>
                            <p>
                            Varietà di gioco – La selezione del gioco è un’altra area in cui le slot online ottengono buoni punteggi
                            rispetto alle loro controparti terrestri. Molti casinò online offrono da 200 a 350 o più delle migliori
                            slot online di una vasta gamma di fornitori di software come Microgaming, Net Entertainment, Real Time Gaming,
                            Playtech e molti altri.Mentre hai l’imbarazzo della scelta, puoi anche giocare istantaneamente sul tuo desktop
                            o dispositivo mobile senza dover aspettare il tuo turno.
                            </p>
                        </li>
                    </ul> 
               </div>


                <div><strong>Fornitori di software: i Provider di Slot</strong></div>
                <div>
                    <p>
                    I giochi dei casinò non vengono creati dagli stessi casinò ma vengono loro forniti da dei provider,
                    che sono per l’appunto dei fornitori di giochi. I provider non sono tutti uguali. Ciascuno di loro
                    ha il proprio stile che si vede nella produzione degli stessi giochi, che mostrano delle particolarità
                    e caratteristiche differenti. Dopo un po’ di tempo, chi gioca impara a riconoscere le differenze
                    e persino riconoscere di quale provider sia una slot. A tal proposito, è bene notare che se ti piace
                    un provider in particolare, potrai usare i filtri sul nostro sito per visualizzare solo i suoi giochi.
                    Allo stesso modo, potrai ad esempio individuare una caratteristica che ti piace (es. free spin) e usare
                    un filtro che ti consentirà di visualizzare solo slot che presentino quella specifica caratteristica.
                    Alcuni dei migliori provider che imparerai subito a riconoscere sono NetEnt (con una grafica strepitosa),
                    Novomatic (il provider di <strong>Book of Ra</strong>), Pragmatic Play (il provider di <strong>Wolf Gold</strong>) e IGT.
                    Tutti questi provider sono molto popolari in Italia.
                    </p>
                </div>


                <div><strong>Come si gioca alle slot e agli altri giochi da casinò con soldi veri</strong></div>
                <div>
                    <p>
                    Sul nostro sito trovi slot gratuite e ci puoi giocare quanto vuoi per divertimento.
                    Se c’è qualche slot che ti piace in modo particolare e vorresti giocarci con soldi veri,
                    puoi farlo in modo molto facile. Quando scegli una slot sul nostro sito,
                    cliccaci su per avviarla: sotto la finestra di gioco ci troverai alcuni casinò in cui puoi giocarci con soldi veri.
                    Ripetiamo: vuoi giocare per soldi veri a una slot?
                    </p>

                    <ul>
                        <li>Trova la slot che ti piace sul nostro sito.</li>
                        <li>Clicca sull’anteprima per aprirla.</li>
                        <li>Sotto la finestra di gioco, <strong>trovi la lista dei casinò in cui giocarci con soldi veri.</strong></li>
                    </ul>
                    <p>
                    Ad ogni modo, non avere troppa fretta nello scegliere un casinò, perché ogni casinò è diverso
                    dall’altro e può offrirti delle promozioni diverse. Ad esempio, potrebbe interessarti un casinò
                    che offra un determinato tipo di promozione anziché un’altra. Oppure, potresti preferire uno che offre
                    free spin invece di un bonus senza deposito. Ancora, potresti voler comparare i bonus di benvenuto sul primo deposito.
                    L’importante è che tu scelga un <strong>casinò italiano</strong> legale, sicuro e affidabile. Sul nostro sito,
                    trovi soltanto i <strong>migliori casinò affidabili</strong>, conosciuti e con licenza AAMS.
                    Se non hai mai giocato ai casinò online, dai un’occhiata alla <strong>nostra sezione casinò</strong> dove troverai
                    tanti consigli utili per scegliere il casinò che fa al caso tuo. Se stai accedendo al sito di Slotjava.it
                    con uno smartphone o un computer su cui non sia installato Flash Player,
                    potresti utilizzare il filtro “Dispositivi Mobile Supportati”, per giocare alle slot con soldi veri senza la richiesta di Flash Player.
                    </p>
                </div>
                

                <div><strong>Slot bonus e promozioni.</strong></div>
                <div>
                    <p>
                    Tra i casinò c’è molta concorrenza riguardo alle promozioni. E’ normale:
                    vogliono attirare i nuovi clienti e soddisfare quanto possibile quelli già iscritti.
                    Ma quali promozioni offrono i casinò online? Queste sono le tre principali promo che ti offrono:
                    </p>

                    <ul>
                        <li>
                            <p>
                            <b>Bonus sul deposito:</b> è un bonus che si riceve al primo deposito e dipende dall’entità dello stesso. Ad esempio,
                            un bonus del 100% sul primo deposito vuol dire che si riceve un bonus pari al 100% del deposito stesso
                            (es. depositi 100€ e ricevi altri 100€ in bonus per giocare con complessivi 200€). Presenta dei requisiti
                            di scommessa che dovrai valutare e che sono espressi con la X
                            (es. 10X vuol dire che devi giocare l’importo del bonus per 10 volte per poterlo trasformare in denaro reale e prelevare).
                            </p>
                        </li>
                        <li>
                            <p>
                            <b>Bonus senza deposito:</b> si tratta di un bonus che invece non richiede deposito.
                            </p>
                        </li>
                        <li>
                            <p>
                            <b>Free Spin:</b> letteralmente <strong>“giri gratis”</strong>. Questi generalmente sono associati ad una
                            determinata slot, sulla quale si possono per l’appunto fare dei giri con del credito gratuito.
                            Anche in questo caso, generalmente occorre soddisfare dei termini e delle condizioni.
                            </p>
                        </li>
                    </ul>

                    <p>
                    Oltre a quelli appena elencati, sulla <b>nostra pagina bonus dedicata</b> troverai anche altre tipologie
                    di promozioni e ulteriori informazioni su come incassarli.
                    </p>
                </div>


                <div><strong>Gioca alle slot come un Prof – Suggerimenti?</strong></div>
                <div>
                    <p>
                    Le slot online sono un gioco d’azzardo, ma ciò non significa che non puoi
                    imparare a giocare in modo intelligente e migliorare fino a diventare un vero professionista! Inoltre,\
                    su questo tipo di slot machine, ci sono più rulli e linee di pagamento per giocare,
                    una ragione in più per conoscere ulteriori strategie di gioco. Ti confermiamo,
                    che le ultime slot non assomigliano alle macchinose slot degli anni Settanta,
                    oggi sono presenti giri gratuiti, bonus e jackpot da non perdere. Esercitarti gratuitamente è possibile con le slot online,
                    poiché la maggior parte dei casinò offre versioni demo in cui è possibile apprendere le regole
                    di una determinata slot senza sborsare un centesimo! Inoltre, potresti essere in grado di ottenere
                    un bonus di giri gratuiti. Scegli gli slot con una percentuale di pagamento o RTP più alta.
                    Molti casinò elencati sul tuo sito preferito pubblicano la percentuale di pagamento,
                    quindi presta particolare attenzione e scegli quelli con un RTP dal 95% in su. Ti consigliamo
                    di di leggere sempre il regolamento in modo da sapere quanto può valere la tua scommessa.
                    La maggior parte delle slot richiede un importo minimo di puntata per poter usufruire di bonus o jackpot.
                    Più linee di pagamento scommetti, maggiori sono le possibilità di vincita. Puoi farlo anche con un budget limitato.
                    Basta abbassare l’importo della scommessa e aumentare il numero di linee di pagamento.
                    Una volta capito il gioco, sfrutta la pratica funzione Auto Play e inizia a realizzare le tue combinazioni vincenti!
                    </p>
                </div>


                <div><strong>Come si ottiene il massimo valore dalle slot online?</strong></div>
                <div>
                    <p>
                    La varianza nelle slot online è notevole. I jackpot e i round bonus sono pochi e
                    lontani tra loro. Quando colpiscono, può essere il momento più emozionante per i giocatori
                    di casinò online. È importante giocare all’interno del tuo bankroll e avere abbastanza soldi
                    per attendere i momenti più propizi. Un altro modo per ottenere il massimo valore giocando alle
                    slot online è utilizzare offerte speciali come welcome bonus e promo ricarica erogate dal casinò prescelto.
                    Ciò può ridurre drasticamente il margine della casa. Infine, controlla sempre se è presente un Programma VIP,
                    leggi sempre i Termini e le Condizioni del Programma VIP per assicurarti di poterti qualificare in base a livelli a piramide,
                    che ti faranno ottenere condizioni di gioco privilegiate oltre premi extra lusso!
                    </p>
                </div>


                <div><strong>Miti e luoghi comuni sbagliati sui giochi di slot</strong></div>
                <div>
                    <p>
                    Le slot, sia nei casinò terrestri che nei casinò online, sono tra i giochi più famosi al mondo.
                    Diverse ragioni rendono questi giochi benvoluti, a partire dalla loro facilità. Inoltre,
                    le slot possono essere giocate a basso prezzo, rendendole le opzioni di betting più sicure per
                    gli avventori di casinò online con un budget limitato. Ci sono, tuttavia, molti miti e idee
                    sbagliate che circolano sulle slot. Cercheremo di analizzare alcuni di questi falsi miti e convinzioni
                    errate in modo da offrirti una chiara comprensione delle slot.
                    </p>

                    <ul>
                        <li>
                            <p>
                            Non ci sono slot vincenti e slot perdenti – Questo non è vero, in quanto alcune slot sono state
                            impostate appositamente per ridurre i pagamenti. Ciò implica fondamentalmente che alcune slot sono
                            un po’ tirate di altre a livello di erogazioni di vincite.
                            I giocatori di slot di veterani possono facilmente identificare le due tipologie di slot.
                            </p>
                        </li>
                        <li>
                            <p>
                            La macchina a cui giochi più spesso ti offre maggiori possibilità di colpire in grande
                            – Questo è un grande malinteso perché, indipendentemente dalla macchina utilizzata,
                            i risultati sono indipendenti e applicano le stesse regole e principi fondamentali a
                            ogni singolo giro, senza essere condizionati da precedenti giri o pagamenti.
                            Non importa se hai giocato su una determinata macchina per ore o se ti sei appena seduto.
                            Questo rende le slot ancora più emozionanti e allettanti.
                            </p>
                        </li>
                        <li>
                            <p>
                            Affinché una macchina funzioni costantemente senza interrompere i pagamenti,
                            un operatore deve continuare ad aprirla – Questo è un malinteso perché l’unica volta
                            in cui le slot machine dovrebbero essere aperte è quando le monete vengono ricaricate.
                            Questo non ha nulla a che fare con i termini del gioco. Una volta aggiunte le monete e riavviata la macchina,
                            continua da dove si era fermata.
                            </p>
                        </li>
                        <li>
                            <p>
                            Le slot machine di valore superiore hanno pagamenti migliori di quelle inferiori – Ciò che è vero è che i
                            pagamenti delle slot machine a puntata più elevata si verificano più frequentemente rispetto alle slot
                            machine a scommessa più bassa, e questo potrebbe essere il motivo di questo malinteso.
                            Questi pagamenti sono in realtà inferiori al gioco di denominazione delle monete.
                            Si noti che tutte le slot machine, siano esse di taglio superiore o quarti,
                            sono programmate con pagamenti fissi indipendentemente dalla frequenza con cui raramente colpiscono.
                            Inoltre, dovrebbe essere ovvio, se si effettua una scommessa più grande, si otterrà un pagamento maggiore.
                            </p>
                        </li>
                        <li>
                            <p>
                            Se hai riempito la slot machine con troppi soldi, alla fine vincerai… – Questo è un malinteso
                            che lascia frustrati molti giocatori. Non è garantito che, poiché hai effettuato centinaia di giri,
                            alla fine raggiungerai il jackpot. È per pura fortuna che vinci il jackpot, se mai ci riuscirai.
                            La slot machine, come spiegato sopra, funziona in modo indipendente e non ha memoria di precedenti
                            giri o vittorie, quindi non ha idea se meriti di vincere o meno.
                            </p>
                        </li>
                        <li>
                            <p>
                            Quando diventi un membro di uno slot club, le slot machine ti favoriscono – Questa è una bugia
                            per le ragioni sopra menzionate. Ciò che è vero è che essere membri di un determinato
                            club di slot ha i suoi vantaggi, ma questi benefici non hanno nulla a che fare con pagamenti migliori.
                            Le slot machine non hanno la possibilità di capire se stai usando monete o carte, e quindi essere
                            un membro di un club non influenza in alcun modo i risultati del gioco. Devono seguire la percentuale
                            di pagamento fissa programmata.
                            </p>
                        </li>
                        <li>
                            <p>
                            Non puoi colpire due jackpot consecutivamente – Anche questo è un malinteso perché, come affermato in precedenza,
                            è per pura fortuna che vinci il jackpot. In effetti, ci sono state numerose occasioni in cui i giocatori
                            di slot online hanno raggiunto un jackpot considerevole e hanno continuato a giocare sullo stesso gioco di slot,
                            solo per vincere un altro jackpot grandioso 
                            </p>
                        </li>
                    </ul>
                </div>


                <div><strong>Gioca alle slot come un Prof – Suggerimenti?</strong></div>
                <div>
                    <p>
                    Il problema della dipendenza da gioco d’azzardo è reale e non va sottovalutata.
                    Può succedere a tutti di avere un momento difficile e di volersi rifare o sfogare con il gioco.
                    Tuttavia, il gioco dovrebbe essere considerato sempre e soltanto una forma di divertimento.
                    Il problema della dipendenza dal gioco d’azzardo è una cosa seria e perciò va affrontato seriamente.
                    Questo può valere per te o per chi ti è vicino, in famiglia o tra gli amici. Uno dei sintomi più comuni
                    di chi soffre della dipendenza dal gioco d’azzardo è proprio il passare troppo tempo a giocare
                    (al casinò online o alle slot, ad esempio).
                    Questo è il motivo per cui ci sentiamo di incoraggiare fortemente i nostri lettori di giocare soltanto
                    il denaro che possono permettersi di perdere senza alcun problema. Se iniziate ad avvertire che il vostro
                    gioco sta diventando problematico, o se pensate che già sia un problema, ti consigliamo di chiamare urgentemente
                    <strong> il numero di aiuto per il gioco d’azzardo: 800558822</strong> è un numero verde, completamente gratuito.
                    </p>
                </div>

            </Main>
        </Fragment>
    )
} 

const Main = styled.div`
    padding: 5px 10px;

    @media ${device.mobileL} {
        padding: 5px
    }
    
    p { text-align: justify; }

    li { 
        list-style: square;
        text-align: left; 
        p {text-align: inherit}
    }
`

const Thumbnail = styled.div` 
    width: 200px;
    shape-outside: circle(115px at 49.9% 49.9%);
    clip-path: circle(115px at 49.9% 49.9%);
    
    img { border-radius: 100px; }
`

export default Article
