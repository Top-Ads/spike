import React, { FunctionComponent } from "react";
import Image from "next/image";
import styled from "styled-components";
import Layout from "../../components/Layout";
import { CDN } from "../../public/environment";
import GridLayout from "../../components/Commons/GridLayout";
import {
  GridType,
  PAGE_BONUSES,
  pageBonusesRemapping,
} from "../../lib/utils/constants";
import BonusCard from "../../components/Cards/BonusCard";
import FreqentlyAsked from "../../components/FrequentlyAsked";
import { device } from "../../lib/utils/device";
import HomeArticle from "../../components/Commons/Articles/Home";
import LazyLoad from "react-lazyload";
import { Bonus } from "../../lib/schemas";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import { getBonuses } from "../../lib/graphql/queries/bonuses";
import Head from "next/head";
import { useTranslation } from "react-i18next";

type PageProps = {
  pageBonusesData: Bonus[];
};

const SquadPage: FunctionComponent<PageProps> = ({ pageBonusesData }) => {
  const { t } = useTranslation();

  const MAIN_BONUSES = [
    "LeoVegas",
    "StarCasinò",
    "WinCasino",
    "NetBet",
    "GoldBet",
  ];

  const TOP_BONUSES = ["StarCasinò", "Starvegas", "LeoVegas"];

  const FREE_BONUSES = [
    "LeoVegas",
    "StarCasinò",
    "Starvegas",
    "Betway",
    "Gioco Digitale",
  ];

  const topBonusData = pageBonusesData.filter((bonus) => {
    if (TOP_BONUSES.includes(bonus.name)) {
      return bonus;
    }
  });

  const mainBonusData = pageBonusesData.filter((bonus) => {
    if (MAIN_BONUSES.includes(bonus.name)) {
      return bonus;
    }
  });

  const freeBonusData = pageBonusesData.filter((bonus) => {
    if (FREE_BONUSES.includes(bonus.name)) {
      return bonus;
    }
  });

  return (
    <Layout title="Casino Squad | Il Team Squad vi da il benvenuto">
      <Head>
        <meta
          property="og:description"
          content="Le migliori selezioni di slot machine sclete da: Lucky, Chily, Squad MRJ, Pitbull e Value"
          key="description"
        />
      </Head>

      <div className="layout-container">
        <Main>
          <Container>
            <Profile>
              <Name>LUCKY</Name>

              <div>
                <Thumbnail>
                  <LazyLoad height={200} offset={200}>
                    <Image
                      alt={"Casino Squad Team | SQUAD LUCKY"}
                      src={`${CDN}/jpeg/squad/lucky.jpeg`}
                      layout="responsive"
                      priority={true}
                      sizes={"30vw"}
                      width={550}
                      height={550}
                    />
                  </LazyLoad>
                </Thumbnail>

                <p>
                  {t(
                    "Ciao ragazzi! Io sono Lucky e vi dirò di più: da qualche tempo ho guadagnato il soprannome di Lucky il fortunato - o meglio ancora il fortu-dado!"
                  )}
                  <br /> <br />
                  {t(
                    "Nella vita di tutti i giorni sono un autista di bus e lavoro nel settore del turismo. "
                  )}
                  {t(
                    "Fra i miei hobby ci sono ballare e il videomaking, del quale mi occupo da più di 10 anni. "
                  )}
                  <br />
                  {t(
                    "Sono un tipo pacifico e vado d’accordo con tutto il resto della Squad - a parte Chily!"
                  )}
                  {t(
                    "Ovviamente scherzo, siamo un buon team e tutti davvero amici. "
                  )}{" "}
                  <br />
                  {t(
                    "Tuttavia, lui è un tipo molto scaramantico, mentre io mi affido totalmente alla fortuna! Come forse avrete capito,"
                  )}
                  {t("adoro i dadi e qualunque gioco li comprenda. ")}
                  <br />
                  {t(
                    "Fra i miei giochi da casinò preferiti ci sono i live game Show come"
                  )}{" "}
                  <strong>{t("Monopoly Live")}</strong> {t("e Crazy Time. ")}
                  {t(
                    "Ma sono anche appassionato di slot digitali, infatti ho un feeling particolare con le slot machine a tema egizio. "
                  )}
                  <br />
                  {t(
                    "In effetti, ho realizzato le mie vincite più interessanti alla slot online"
                  )}{" "}
                  <strong>{t("Sweet Bonanza")}</strong>;
                  {t("al Monopoly Live ed alla slot machine")}{" "}
                  <strong>{t("Lightning Dice")}</strong>. <br />
                  <br />
                  {t("La mia frase")}: “
                  <strong>{t("Sono veramente egizio")}</strong>”{" "}
                  {t("è diventato celebre fra il pubblico di videogiocatori")}
                  {t(
                    "e inserito anche dall’Accademia della Crusca in tutti i dizionari della lingua italiana!"
                  )}
                  <br />
                  {t(
                    "Venite a trovarmi sul canale YouTube: troverete tanti video interessanti!"
                  )}
                  <br />
                  {t(
                    "Sono un tipo pazzerello e non mi tiro mai indietro davanti alle richieste dei follower: che sia ballare o cantare, io ci sono! Bella raga! ci si vede in live. "
                  )}
                </p>
              </div>
            </Profile>

            <SocialNetwork>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={"https://www.facebook.com/luckyilfortunato"}
              >
                <FacebookIcon fontSize={"large"} />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={"https://www.instagram.com/lucky_ilfortunato/"}
              >
                <InstagramIcon fontSize={"large"} />
              </a>
            </SocialNetwork>
          </Container>

          <Container>
            <Profile>
              <Name>CHILY</Name>

              <div>
                <Thumbnail>
                  <LazyLoad height={200} offset={200}>
                    <Image
                      alt={"Casino Squad Team | SQUAD CHILY"}
                      src={`${CDN}/jpeg/squad/chily.jpeg`}
                      layout="responsive"
                      priority={true}
                      sizes={"30vw"}
                      width={550}
                      height={550}
                    />
                  </LazyLoad>
                </Thumbnail>

                <p>
                  {t(
                    "Ciao a tutti! Avete mai sentito parlare di un peperoncino rosso che gioca alle slot machine?"
                  )}
                  {t("No? Esiste eccome e sono io: mi chiamo Chily!")}
                  <br />
                  <br />
                  {t(
                    "Passo le giornate occupando il tempo fra la mia impresa di produzione di marmi e divertentissime lezioni di fisica agli studenti,"
                  )}
                  {t("ma trovo sempre il modo per divertirmi insieme a voi!")}
                  {t(
                    "Amo giocare e provare i tanti giochi dei casinò online. "
                  )}{" "}
                  <br />
                  {t(
                    "Durante le mie live, mi piace provare le migliori slot in modalità online e giocare alla "
                  )}
                  {t(
                    "slot digitale Honey Rush e alla slot online Legacy of Dead. "
                  )}{" "}
                  <br />
                  {t(
                    "Dimenticavo: ultimamente ho scoperto di essermi innamorato alla follia della slot online"
                  )}
                  <strong>{t("Pillars of Asgard")}</strong>{" "}
                  {t("della SG Gaming con il mitico Odino: chissà perché!")}
                  <br />
                  {t("Durante le sessioni di gioco alla slot online")}{" "}
                  <strong>Pillars of Asgard</strong>
                  {t(" e alla slot digitale")}{" "}
                  <strong>Rise of the Mountain King</strong>,
                  {t("ho ottenuto le vincite più gloriose in assoluto!")}
                  <br />
                  {t(
                    "Purtroppo non ho la fortuna di Lucky, anzi, devo sempre lottare contro la sfortuna e ho un mio metodo personale!"
                  )}
                  <br />
                  {t(
                    "Infatti, per incrementare le mie chance di vittoria, mangio sempre qualche peperoncino piccantissimo. "
                  )}{" "}
                  <br />
                  <br />
                  {t(
                    "Non ci credete? Ebbene, ci sono clip che lo testimoniano!"
                  )}
                  {t(
                    "Ogni volta che mi sento dire: “Esci che non paga” risponderò con la mia tenacia, dicendo:"
                  )}{" "}
                  “<strong>{t("Chi ha detto di uscire da qua")}</strong>
                  ”?
                  {t(
                    "Ad ogni pagata, tra sedie che volano e signore che sbattono la scopa, sono certo che non potrete fare a meno di me. Vi aspetto!"
                  )}
                </p>
              </div>
            </Profile>

            <SocialNetwork>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={"https://www.facebook.com/chilyslot"}
              >
                <FacebookIcon fontSize={"large"} />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={"https://www.instagram.com/chilyslot"}
              >
                <InstagramIcon fontSize={"large"} />
              </a>
            </SocialNetwork>
          </Container>

          <Container>
            <Profile>
              <Name>MISTER J</Name>

              <div>
                <Thumbnail>
                  <LazyLoad height={200} offset={200}>
                    <Image
                      alt={"Casino Squad Team | SQUAD MR J"}
                      src={`${CDN}/jpeg/squad/mrj.jpeg`}
                      layout="responsive"
                      priority={true}
                      sizes={"30vw"}
                      width={550}
                      height={550}
                    />
                  </LazyLoad>
                </Thumbnail>

                <p>
                  Tra tutti voi ci saranno sicuramente dei fan di “La Casa di
                  Carta": beh, io sono il "Professor" della Squad.
                  <br />
                  In effetti, Mister J è importante per la Squad, così come il
                  Professore è importante per Tokyo, Berlino, Rio etc,
                  <br /> <br />
                  e ci sono molte persone che mi considerano Charlie di "2
                  uomini e mezzo"!
                  <br />
                  <br />
                  Nella mia vita mi occupo della gestione e della cura di ogni
                  tipo di evento: dalle discoteche ai concerti. <br />
                  Tuttavia, ovviamente, questo periodo è stato un po' complicato
                  a causa della pandemia.
                  <br />
                  Possiedo vari e-commerce e ho lanciato diversi brand: dai
                  prodotti per l'infanzia, ai ritratti realistici e stilizzati.
                  <br />
                  <br />
                  Ogni tanto faccio live streaming e tornei di poker con i miei
                  amici del canale inglese; <br />
                  Mi piace passare del tempo con loro, così come con Pitbull e
                  compagni, e adorano quando mi vesto da Capitan Canada o Batman
                  perché è pura e sana "follia", <br />
                  ed è ancora meglio se quei momenti sono accompagnati da temi
                  televisivi e molte belle canzoni!
                  <br />
                  Direi che non ho proprio un gioco preferito, ma ricordo con
                  piacere le mie vincite alla Big Bass Bonanza e al Crazy
                  Time... <br />
                  Di solito cerco di regalare un po' di divertimento ai nostri
                  followers e a Chily il gufo durante i nostri Bonus Hunt!
                  <br />
                  <br />
                  Anche se qualcuno ha qualcosa da dire sulle mie giocate, io
                  risponderò con: "I’m Mister J, shhh". E non imitarmi, non
                  farlo a casa!
                </p>
              </div>
            </Profile>

            <SocialNetwork>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={"https://www.instagram.com/mister.j_17/"}
              >
                <InstagramIcon fontSize={"large"} />
              </a>
            </SocialNetwork>
          </Container>

          <Container>
            <Profile>
              <Name>PITBULL</Name>

              <div>
                <Thumbnail>
                  <LazyLoad height={200} offset={200}>
                    <Image
                      alt={"Casino Squad Team | SQUAD PITBULL"}
                      src={`${CDN}/jpeg/squad/pitbull.jpeg`}
                      layout="responsive"
                      priority={true}
                      sizes={"30vw"}
                      width={550}
                      height={550}
                    />
                  </LazyLoad>
                </Thumbnail>

                <p>
                  {t(
                    "Ciao sono Pitbull! State attenti a non farmi arrabbiare!"
                  )}{" "}
                  <br />
                  {t(
                    "Perché mi chiamo così? Dovete sapere che ho tutte le caratteristiche di questo meraviglioso cane. "
                  )}
                  {t(
                    "Infatti, la forza assieme alla tenacia, mi hanno permesso di ottenere un sacco di soddisfazioni in ambito lavorativo. "
                  )}
                  <br />
                  {t(
                    "Sono occupato su più fronti fra cui il turismo ed il settore dell’abbigliamento, ma uno dei miei sogni più grandi è diventare pilota d’aereo!"
                  )}
                  <br />
                  {t(
                    "Mi piace scoprire tutte le novità dei casinò digitali, sono appassionato della slot online Reactoonz e amo particolarmente il Monopoly Live e il Blackjack. "
                  )}{" "}
                  <br />
                  {t(
                    "Fra i miei ricordi, ce ne sono di bellissimi che hanno come protagonista la slot machine White Rabbit, così come la"
                  )}{" "}
                  <strong>Moon Princess</strong> di Play ‘n Go e altre.
                  <br />
                  <br />
                  {t(
                    " Sono fortunato, ma so gestire scrupolosamente bet e bankroll. "
                  )}
                  <br />
                  {t(
                    "Si narra che le mie numerose vincite siano stato accompagnate dalla “turbochiappa” – una vera e propria candidata a diventare Patrimonio dell’UNESCO. "
                  )}{" "}
                  <br />
                  {t(
                    "Ogni volta che sento dire: “E che cos’è?” prontamente rispondo:"
                  )}{" "}
                  “<strong>{t("LA SCOTECAAA")}</strong>”.
                  {t("Durante le mie migliori vincite sentirete sempre:")} “
                  <strong>{t("VAMONOOOS")}</strong>”
                </p>
              </div>
            </Profile>

            <SocialNetwork>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={"https://www.facebook.com/pitbullslot"}
              >
                <FacebookIcon fontSize={"large"} />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={"https://www.instagram.com/pitbullslot/"}
              >
                <InstagramIcon fontSize={"large"} />
              </a>
            </SocialNetwork>
          </Container>

          <Container>
            <Profile>
              <Name>VALUE</Name>

              <div>
                <Thumbnail>
                  <LazyLoad height={200} offset={200}>
                    <Image
                      alt={"Casino Squad Team | SQUAD VALUE"}
                      src={`${CDN}/jpeg/squad/value.jpeg`}
                      layout="responsive"
                      priority={true}
                      sizes={"30vw"}
                      width={550}
                      height={550}
                    />
                  </LazyLoad>
                </Thumbnail>

                <p>
                  {t("Salve a tutti, mi presento: sono Mr. Value!")}
                  {t(
                    "Mi occupo di forniture di arredo scolastico ed urbano in giro per il mondo. "
                  )}
                  {t(
                    "Insieme agli altri ragazzi della Squad, vi farò compagnia quotidianamente, fra una slot digitale ed un gioco di casinò live. "
                  )}
                  {t("La mia slot machine preferita è la")}{" "}
                  <strong>Book of Dead</strong>.{" "}
                  {t(
                    "Tuttavia, preferisco di gran lunga i giochi live come Blackjack e Roulette. "
                  )}{" "}
                  <br />
                  <br />
                  {t(
                    "Personalmente sono ancora alla ricerca della grande sbancata,"
                  )}
                  {t(
                    "ma per ora posso ritenermi soddisfatto delle vincite alla slot online"
                  )}{" "}
                  <strong>Book of Dead</strong> e al{" "}
                  <strong>Monopoly Live</strong>.
                </p>
              </div>
            </Profile>
            <SocialNetwork>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={"https://www.instagram.com/mr_value_bet/"}
              >
                <InstagramIcon fontSize={"large"} />
              </a>
            </SocialNetwork>
          </Container>

          <Container>
            <Profile>
              <Name>Hammer</Name>

              <div>
                <Thumbnail>
                  <LazyLoad height={200} offset={200}>
                    <Image
                      alt={"Casino Squad Team | SQUAD MR J"}
                      src={`https://casino-squad.b-cdn.net/jpeg/squad/Foto_Profilo_SITO_Hammer-2.jpg`}
                      layout="responsive"
                      priority={true}
                      sizes={"30vw"}
                      width={318}
                      height={324}
                    />
                  </LazyLoad>
                </Thumbnail>

                <p>
                  Ehi zozzoni maledetti mi presento io sono HAMMER il martello
                  distruttore delle slot machine sia quelle da bar che quelle
                  online, ma iniziamo un passo alla volta. Nella vita quotidiana
                  lavoro presso la mia azienda di marketing dove offro servizi
                  pubblicitari e servizi di vendita, I miei hobby non sono molti
                  ma per me valgono tanto, infatti sono un amante della pesca in
                  mare dove appunto ho anche svolto diverse gare e competizioni
                  a livello nazionale e internazionale.
                  <br />
                  <br />
                  Cosa rappresenta per me la squad?? Beh che dire, la squad
                  oltre ad essere un gruppo di amici che condivide la stessa
                  passione è una famiglia, ognuno di noi ha un ottimo rapporto
                  l’uno con l’ altro e questa cosa pensò che sia la più bella di
                  tutte.. Ma adesso parliamo un po’ di slot. Come vi ho già
                  anticipato ad inizio BIO sono un amante delle slot da bar e
                  online, ricordo ancora la vecchia e cara haunted house o la
                  fantastica power station blue senza scordarsi delle altre slot
                  che hanno segnato la storia dei giocatori delle slot da bar
                  come il fantasma dell opera, la criss cross la fowl play e
                  così tante altre.. Purtroppo queste slot sono solamente un
                  ricordo visto che quelle 75% si sono trasformate aimè in delle
                  65% oltre al fatto che alcune di esse non esistono piu.
                  <br />
                  <br />
                  Parliamo adesso di slot online, nel momento in cui le slot da
                  bar iniziarono a cambiare mi appassionai al mondo delle slot
                  online dove ho avuto grandissime soddisfazioni, ricordo ancora
                  la prima sbancata che feci alla WANTED DEAD OR ALIVE della
                  NETENT dove a bet 0.60€ presi una vincita di 40.000€!! Furono
                  tante le sbancate e soddisfazioni ricevute dalle slot online,
                  infatti ad oggi posso vantare un bel po di sbancate come ad
                  esempio 4 MAX WIN alla MADAME DESTINY MEGAWAYS della PRAGMATIC
                  PLAY o la MAX WIN presa alla 5 LION MEGAWAYS o la più recente
                  la PAGINATA DI WILD alla WANTED DEAD OR A WILD della HACKSAW..
                  che dire ci sono state tante gioie e dolori ma sinceramente
                  quello che mi importa e divertirmi con la mia seconda famiglia
                  ovvero la CASINÒ SQUAD! Come avete capito sono un amante delle
                  slot ad altissima volatilità!!!
                  <br />
                  <br />
                  Beh ragazzi questo è tutto avete conosciuto un po’ di più
                  questo martello delle slot.. signori che dire?! SIAMO PRONTI
                  PER UN PO DI HAMMER TIME ?!?
                </p>
              </div>
            </Profile>

            <SocialNetwork>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={"https://www.instagram.com/casino.squad.team/"}
              >
                <InstagramIcon fontSize={"large"} />
              </a>
            </SocialNetwork>
          </Container>
          {/*
          <Container>
            <Profile>
              <Name>GARGAKEV</Name>

              <div>
                <Thumbnail>
                  <LazyLoad height={200} offset={200}>
                    <Image
                      alt={
                        'Casino Squad Team | SQUAD GARGAKEV'
                      }
                      src={`${CDN}/jpeg/squad/gargakev_.jpg`}
                      layout='intrinsic'
                      priority={true}
                      sizes={'30vw'}
                      width={585}
                      height={648}
                    />
                  </LazyLoad>
                </Thumbnail>

                <p>
                  {t('Ciao a tutti!')}
                  <br />
                  <br />
                  {t(
                    'Molti di voi mi conoscono come GargaKev, Reactoonz è sempre stato una slot che mi è stata a cuore..'
                  )}{' '}
                  <br />
                  {t(
                    'Mi ha dato molti buoni successi negli ultimi 4 anni'
                  )}
                  <br />
                  {t(
                    'Non è stato in grado di fornirmi le vincite del Garga che mi aspettavo, quindi sono stato in agguato ad aspettare e ora arriva Gigantoons (Reactoonz 3!)'
                  )}{' '}
                  <br />
                  {t(
                    'Il nuovo garga e torneremo a sbancare di nuovo a Gargaland! Non ho giocato molto a Reactoonz'
                  )}
                  <br />
                  {t(
                    'come volevo anche io perché è stato deludente.'
                  )}
                  <br />
                  <br />
                  {t(
                    'In questo momento sto concentrando la maggior parte della mia attenzione sullo streaming, ma faccio una varietà di cose sul lato dello streaming.'
                  )}{' '}
                  <br />
                  {t(
                    'La mia prima volta che mi unisco alla Squad è arrivata tramite Tropix che è un amico e siamo andati al Casinò alcune volte e mi ha raccontato tutto ed è stato incredibile finora,'
                  )}
                  {t(
                    'la migliore community, emozioni positive. Ho incontrato il resto della Squad poco dopo alla settimana di Casino Malta, è stato molto divertente. '
                  )}{' '}
                  <br />
                  {t(
                    'Chily è un bravo Chef in cucina fa la miglior carbonara che abbia mai mangiato.'
                  )}{' '}
                  <br />
                  {t(
                    " Noi abbiamo la “turbo-sedia” in ufficio (Non c'è da stupirsi che abbiamo avuto la nostra più grande vittoria da novembre,"
                  )}
                  {t(
                    'quando Pitbull si è seduto sulla sedia. Fortunati con le fantastiche canzoni della Squad & Value con i migliori consigli sportivi.'
                  )}
                  <br />
                  <br />
                  {t(
                    'Ho avuto molti pazzi Bonus Hunt con Mister J, è eccitante e rischioso, e di sicuro sono stato vicino a un attacco di cuore diverse volte.'
                  )}
                  <br />
                  {t(
                    'Ricompensa ad alto rischio, non puoi fare la storia se non osi.'
                  )}
                  <br />
                  <br />
                  {t(
                    'Alcuni dei miei più grandi successi 16020x in Mental e 100k Crazytime vinti con Mister J.'
                  )}
                  <br />
                  <br />
                  {t(
                    'Gioco alle slot da molto tempo e non ci sono molte persone là fuori che sanno tanto di slot quanto me.'
                  )}
                  <br />
                  {t(
                    'Alcuni dei miei punti di forza sono scommettere bonus poiché sono molto bravo a sapere come battere una scommessa al meglio e quali sono le slot su cui giocare in quel momento.'
                  )}{' '}
                  <br />
                  <br />
                  {t(
                    'Il mio provider preferito è No Limit City, anche se è molto rischioso.'
                  )}
                  {t(
                    'Ma dal momento che ho giocato così tante slot sono molto entusiasta di provare le nuove versioni e ho alcuni giochi a cui torno ma mi piace'
                  )}
                  {t(
                    "cambiare il mio provider di settimana in settimana per provare diverse slot, ma cambio sempre con un po' di giochi dal vivo qua e là."
                  )}
                  <br />
                  {t('Unisciti a me nello stream :)')}
                </p>
              </div>
            </Profile>

            <SocialNetwork>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href={
                  'https://instagram.com/gargakev?utm_medium=copy_link'
                }
              >
                <InstagramIcon fontSize={'large'} />
              </a>
            </SocialNetwork>
          </Container> */}

          <Container>
            <Profile>
              <Name>GARGAKEV</Name>

              <div>
                <Thumbnail>
                  <LazyLoad height={200} offset={200}>
                    <Image
                      alt={"Casino Squad Team | GargaKev"}
                      src={`${CDN}/jpeg/squad/gargakev_.jpg`}
                      layout="intrinsic"
                      priority={true}
                      sizes={"30vw"}
                      width={585}
                      height={648}
                    />
                  </LazyLoad>
                </Thumbnail>

                <p>
                  Ciao a tutti, sono GargaKev e sono un appassionato di slot
                  online. Tra le mie preferite c'è Reactoonz, una slot che mi ha
                  regalato tante soddisfazioni negli ultimi quattro anni.
                  Purtroppo, però, non sono riuscito a ottenere le grandi
                  vincite che speravo con il famoso Garga, il mostro viola che
                  compare quando si riempie il contatore di energia. Per questo
                  motivo, sono in attesa della nuova versione di Reactoonz,
                  chiamata Gigantoons (Reactoonz 3!), che promette di portare
                  ancora più divertimento e possibilità di vincita. Sono sicuro
                  che con il nuovo Garga riuscirò a tornare a sbancare a
                  Gargaland!
                  <br />
                  <br />
                  Oltre a giocare alle slot, mi dedico anche allo streaming,
                  dove condivido le mie emozioni e le mie esperienze con gli
                  altri appassionati. Inoltre, faccio parte della Squad, una
                  fantastica community di giocatori e scommettitori che si
                  aiutano e si sostengono a vicenda. La mia entrata nella Squad
                  è stata grazie a Tropix, un amico con cui ho frequentato il
                  Casinò diverse volte e che mi ha fatto conoscere questo
                  bellissimo gruppo. Da allora ho avuto l'opportunità di
                  incontrare gli altri membri della Squad, come Chily, Mister J
                  e Pitbull. Con loro ho vissuto momenti indimenticabili, sia
                  online che offline.
                  <br />
                  <br />
                  Chily è un ottimo cuoco e mi ha preparato la miglior carbonara
                  che abbia mai assaggiato. Pitbull ha portato fortuna alla
                  Squad con la sua "turbo-sedia" in ufficio, grazie alla quale
                  abbiamo ottenuto la nostra più grande vittoria da novembre.
                  Mister J è il mio compagno di Bonus Hunt, con cui mi diverto a
                  rischiare e a sfidare la sorte. Con lui ho ottenuto alcuni dei
                  miei più grandi successi: 16020x in Mental e 100k Crazytime.
                  Inoltre, nella Squad ci sono anche dei bravissimi esperti di
                  scommesse sportive che danno i migliori consigli e pronostici.
                  E non dimentichiamo le fantastiche canzoni della Squad che ci
                  fanno ballare e cantare!
                  <br />
                  <br />
                  Ho una lunga esperienza nel mondo delle slot e posso dire di
                  conoscere bene le caratteristiche e le strategie di ogni
                  gioco. So come sfruttare al meglio i bonus e quali sono le
                  slot più convenienti da giocare in ogni momento. Il mio
                  provider preferito è No Limit City, anche se è molto
                  rischioso. Mi piace provare le nuove uscite e variare spesso i
                  miei giochi, ma non rinuncio mai a qualche partita ai giochi
                  dal vivo, quindi passa a farmi un saluto durante le live !
                  <br />
                  <br />
                </p>
              </div>
            </Profile>

            <SocialNetwork>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={"https://instagram.com/gargakev?utm_medium=copy_link"}
              >
                <InstagramIcon fontSize={"large"} />
              </a>
            </SocialNetwork>
          </Container>
        </Main>
      </div>

      <div className="layout-container topBonus">
        <GridContainer id="grid-topBonus">
          <GridLayout
            gridType={GridType.TOPBONUS}
            content={topBonusData.map((bonus) => (
              <BonusCard key={bonus.id} data={bonus} />
            ))}
            label="I top bonus dei casinò online in Italia"
            AlignItem={"center"}
            xs={12}
            sm={4}
            md={4}
            showIndex
            showBoxShadow
            bgColor="#fff"
            spacing={4}
          />
        </GridContainer>
      </div>

      <br />
      <br />

      <FreqentlyAsked />

      <div className="layout-container">
        <Section>
          <HomeArticle
            mainBonuses={mainBonusData}
            freeBonuses={freeBonusData}
          />
        </Section>
      </div>
    </Layout>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 20px 0px;
`;

const Container = styled.div`
  position: relative;
  display: inherit;
  flex-direction: row;
  flex-wrap: wrap;
  width: 40%;
  flex-grow: 1;
  padding: 10px;
  margin: 5px;
  background-color: white;
  border-radius: 5px;

  @media ${device.tablet} {
    width: 100%;
  }
`;

const Profile = styled.div`
  position: relative;
  display: inherit;
  flex-direction: column;
  flex-grow: 1;
  width: min-content;
`;

const Name = styled.span`
  font-weight: bold;
  font-size: 22px;
`;

const Thumbnail = styled.div`
  height: fit-content;
  overflow: hidden;
  width: 200px;
  float: right;
  box-shadow: 0px 0px 12px 3px rgba(226, 185, 109, 0.65);
  margin: 20px 20px;
  border-radius: 5px;

  @media ${device.mobileL} {
    float: none;
    width: auto;
  }
`;

const SocialNetwork = styled.div`
  position: absolute;
  top: 5px;
  right: 0;

  a {
    color: ${({ theme }) => theme.text.color.black};
  }
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  padding: 10px;
`;

export async function getStaticProps() {
  return {
    props: {
      pageBonusesData: (
        await getBonuses({ names: PAGE_BONUSES, sort: "rating:desc" })
      ).map((b) => {
        b.link = pageBonusesRemapping[b.name];
        return b;
      }),
    },
  };
}

export default SquadPage;
