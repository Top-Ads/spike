import React, { FunctionComponent } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import { CDN } from '../../public/environment'
import GridLayout from '../../components/Commons/GridLayout'
import { GridType, pageBonusesRemapping, PAGE_BONUSES } from '../../lib/utils/constants'
import BonusCard from '../../components/Cards/BonusCard'
import FreqentlyAsked from '../../components/FrequentlyAsked'
import { device } from '../../lib/utils/device'
import HomeArticle from '../../components/Commons/Articles/Home'
import LazyLoad from 'react-lazyload'
import { Bonus } from '../../lib/schemas'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import { getBonuses } from '../../lib/graphql/queries/bonuses'
import Head from 'next/head'
import { useTranslation } from 'react-i18next'

type PageProps = {
    pageBonusesData: Bonus[]
  }
  
const SquadPage: FunctionComponent<PageProps> = ({pageBonusesData}) => {
    
    const { t } = useTranslation()

    const MAIN_BONUSES =  [
        "LeoVegas",
        "StarCasinò",
        "WinCasino",
        "NetBet",
        "GoldBet",
    ]
    
    const TOP_BONUSES =  [
        "StarCasinò",
        "Starvegas",
        "LeoVegas",
    ]

    const FREE_BONUSES =  [
        "LeoVegas",
        "StarCasinò",
        "Starvegas",
        "Betway",
        "Gioco Digitale"]

    const topBonusData = pageBonusesData.filter( bonus => {
        if ( TOP_BONUSES.includes( bonus.name ) ) {
          return bonus
        }
    })

    const mainBonusData = pageBonusesData.filter( bonus => {
    if ( MAIN_BONUSES.includes( bonus.name ) ) {
        return bonus
    }
    })

    const freeBonusData = pageBonusesData.filter( bonus => {
    if ( FREE_BONUSES.includes( bonus.name ) ) {
        return bonus
    }
    })
    
   
    return (
        <Layout title="Casino Squad | Il Team Squad vi da il benvenuto">
            <Head>
                <meta 
                property="og:description" 
                content="Le migliori selezioni di slot machine sclete da: Lucky, Chily, Squad MRJ, Pitbull e Value" 
                key="description"/>
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
                                            alt={'Casino Squad Team | SQUAD LUCKY'}
                                            src={`${CDN}/jpeg/squad/lucky.jpeg`}
                                            layout="responsive"
                                            priority={true}
                                            sizes={"30vw"}
                                            width={550}
                                            height={550}/> 
                                    </LazyLoad>
                                </Thumbnail> 

                                <p>
                                {t("Ciao ragazzi! Io sono Lucky e vi dirò di più: da qualche tempo ho guadagnato il soprannome di Lucky il fortunato - o meglio ancora il fortu-dado!")}
                                <br/> <br/>
                                {t("Nella vita di tutti i giorni sono un autista di bus e lavoro nel settore del turismo. ")}
                                {t("Fra i miei hobby ci sono ballare e il videomaking, del quale mi occupo da più di 10 anni. ")}<br/>
                                {t("Sono un tipo pacifico e vado d’accordo con tutto il resto della Squad - a parte Chily!")}
                                {t("Ovviamente scherzo, siamo un buon team e tutti davvero amici. ")} <br/>
                                {t("Tuttavia, lui è un tipo molto scaramantico, mentre io mi affido totalmente alla fortuna! Come forse avrete capito,")}
                                {t("adoro i dadi e qualunque gioco li comprenda. ")}<br/>
                                {t("Fra i miei giochi da casinò preferiti ci sono i live game Show come")} <strong>{t("Monopoly Live")}</strong> {t("e Crazy Time. ")}
                                {t("Ma sono anche appassionato di slot digitali, infatti ho un feeling particolare con le slot machine a tema egizio. ")}<br/>
                                {t("In effetti, ho realizzato le mie vincite più interessanti alla slot online")} <strong>{t("Sweet Bonanza")}</strong>; 
                                {t("al Monopoly Live ed alla slot machine")} <strong>{t("Lightning Dice")}</strong>. <br/><br/>
                                {t("La mia frase")}: “<strong>{t("Sono veramente egizio")}</strong>” {t("è diventato celebre fra il pubblico di videogiocatori")} 
                                {t("e inserito anche dall’Accademia della Crusca in tutti i dizionari della lingua italiana!")}<br/>
                                {t("Venite a trovarmi sul canale YouTube: troverete tanti video interessanti!")}<br/>
                                {t("Sono un tipo pazzerello e non mi tiro mai indietro davanti alle richieste dei follower: che sia ballare o cantare, io ci sono! Bella raga! ci si vede in live. ")}

                                </p>
                            </div>   
                        </Profile>

                        <SocialNetwork>
                            <a target="_blank" rel="noopener noreferrer" href={'https://www.facebook.com/luckyilfortunato'}>
                                <FacebookIcon fontSize={'large'}/>
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href={'https://www.instagram.com/lucky_ilfortunato/'}>
                                <InstagramIcon fontSize={'large'}/>
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
                                            alt={'Casino Squad Team | SQUAD CHILY'}
                                            src={`${CDN}/jpeg/squad/chily.jpeg`}
                                            layout="responsive"
                                            priority={true}
                                            sizes={"30vw"}
                                            width={550}
                                            height={550}/> 
                                    </LazyLoad>
                                </Thumbnail> 

                                <p>
                                {t("Ciao a tutti! Avete mai sentito parlare di un peperoncino rosso che gioca alle slot machine?")} 
                                {t("No? Esiste eccome e sono io: mi chiamo Chily!")}<br/><br/>
                                {t("Passo le giornate occupando il tempo fra la mia impresa di produzione di marmi e divertentissime lezioni di fisica agli studenti,")} 
                                {t("ma trovo sempre il modo per divertirmi insieme a voi!")}
                                {t("Amo giocare e provare i tanti giochi dei casinò online. ")} <br/>
                                {t("Durante le mie live, mi piace provare le migliori slot in modalità online e giocare alla ")}
                                {t("slot digitale Honey Rush e alla slot online Legacy of Dead. ")} <br/>
                                {t("Dimenticavo: ultimamente ho scoperto di essermi innamorato alla follia della slot online")} 
                                <strong>{t("Pillars of Asgard")}</strong> {t("della SG Gaming con il mitico Odino: chissà perché!")}<br/>
                                {t("Durante le sessioni di gioco alla slot online")} <strong>Pillars of Asgard</strong>{t(" e alla slot digitale")} <strong>Rise of the Mountain King</strong>, 
                                {t("ho ottenuto le vincite più gloriose in assoluto!")}<br/>
                                {t("Purtroppo non ho la fortuna di Lucky, anzi, devo sempre lottare contro la sfortuna e ho un mio metodo personale!")}<br/>
                                {t("Infatti, per incrementare le mie chance di vittoria, mangio sempre qualche peperoncino piccantissimo. ")} <br/><br/>
                                {t("Non ci credete? Ebbene, ci sono clip che lo testimoniano!")}
                                {t("Ogni volta che mi sento dire: “Esci che non paga” risponderò con la mia tenacia, dicendo:")} “<strong>{t("Chi ha detto di uscire da qua")}</strong>”?
                                {t("Ad ogni pagata, tra sedie che volano e signore che sbattono la scopa, sono certo che non potrete fare a meno di me. Vi aspetto!")}

                                </p>
                            </div>

                        </Profile>

                        <SocialNetwork>
                            <a target="_blank" rel="noopener noreferrer" href={'https://www.facebook.com/chilyslot'}>
                                <FacebookIcon fontSize={'large'}/>
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href={'https://www.instagram.com/chilyslot'}>
                                <InstagramIcon fontSize={'large'}/>
                            </a>
                        </SocialNetwork>
                    </Container>

                    <Container>
                        <Profile>
                            <Name>Squad MR J</Name>

                            <div>
                                <Thumbnail>
                                    <LazyLoad height={200} offset={200}>
                                        <Image
                                            alt={'Casino Squad Team | SQUAD MR J'}
                                            src={`${CDN}/jpeg/squad/mrj.jpeg`}
                                            layout="responsive"
                                            priority={true}
                                            sizes={"30vw"}
                                            width={550}
                                            height={550}/> 
                                    </LazyLoad>
                                </Thumbnail>

                                <p>
                                {t("Fra di voi ci sarà sicuramente qualche appassionato de “La casa de Papel”: ebbene, io sono il “Professore” del team Squad. ")}  <br/><br/>

                                {t("Infatti, Mister J sta alla Squad come el Profesor sta a Tokyo, Berlino, Rio, etc. e sono in molti ad accostarmi anche ad Charlie di “2 uomini e 1/2”!")}<br/><br/>

                                {t("Nella vita mi occupo della gestione e della cura degli eventi di qualsiasi tipo: dalle discoteche ai concerti. Ovviamente, questo periodo è stato un po’ complesso a causa della pandemia. ")}
                                {t("Posseggo vari e-commerce e ho lanciato diversi brand: da prodotti per la prima infanzia, a ritratti realistici e stilizzati. ")}<br/><br/>
                                {t("Sinceramente, non ho una slot machine preferita. ")} 
                                {t("Diciamo che se dovessi scegliere,")} 
                                {t("opterei per")} <strong>{t("Vinci la gallina")}</strong>: {t("un gioco online che mi ha fatto ottenere la cospicua vincita di 100.000€!")}
                                {t("In più, sfidare il lupo mi dà una carica di adrenalina pazzesca!")}
                                {t(" Altre vincite da menzionare, le ho realizzate assieme a Pitbull alla slot machine")} <strong>Legacy of Dead</strong>; 
                                {t("ma anche con Lucky e Chily alla slot digitale")} <strong>Sweet Bonanza</strong>.
                                {t("Sono sicuro che presto sbancherò con Mr. Value!")}<br/><br/>
                                {t("Come vi dicevo, sono stato accostato piacevolmente alla figura centrale della serie tv spagnola. ")}
                                {t("In effetti, non è un caso che anche io abbia sempre pronto un piano - in questo caso una telefonata in diretta - per far sbancare il resto della Squad!")}<br/>
                                {t("Quando qualcuno ha da dire sulle mie giocate, io risponderò con un secco: “I am mister J, shhh”. ")} 
                                {t("E non imitatemi… non fatelo a casa!")}

                                </p>
                            </div> 
                        </Profile>

                        <SocialNetwork>
                            <a target="_blank" rel="noopener noreferrer" href={'https://www.instagram.com/mister.j_17/'}>
                                <InstagramIcon fontSize={'large'}/>
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
                                            alt={'Casino Squad Team | SQUAD PITBULL'}
                                            src={`${CDN}/jpeg/squad/pitbull.jpeg`}
                                            layout="responsive"
                                            priority={true}
                                            sizes={"30vw"}
                                            width={550}
                                            height={550}/> 
                                    </LazyLoad>
                                </Thumbnail> 

                                <p>
                                {t("Ciao sono Pitbull! State attenti a non farmi arrabbiare!")} <br/>
                                {t("Perché mi chiamo così? Dovete sapere che ho tutte le caratteristiche di questo meraviglioso cane. ")}
                                {t("Infatti, la forza assieme alla tenacia, mi hanno permesso di ottenere un sacco di soddisfazioni in ambito lavorativo. ")}<br/>
                                {t("Sono occupato su più fronti fra cui il turismo ed il settore dell’abbigliamento, ma uno dei miei sogni più grandi è diventare pilota d’aereo!")}<br/>
                                {t("Mi piace scoprire tutte le novità dei casinò digitali, sono appassionato della slot online Reactoonz e amo particolarmente il Monopoly Live e il Blackjack. ")} <br/>
                                {t("Fra i miei ricordi, ce ne sono di bellissimi che hanno come protagonista la slot machine White Rabbit, così come la")} <strong>Moon Princess</strong> di Play ‘n Go e altre.
                                <br/><br/>
                                {t(" Sono fortunato, ma so gestire scrupolosamente bet e bankroll. ")}<br/>
                                {t("Si narra che le mie numerose vincite siano stato accompagnate dalla “turbochiappa” – una vera e propria candidata a diventare Patrimonio dell’UNESCO. ")} <br/>
                                {t("Ogni volta che sento dire: “E che cos’è?” prontamente rispondo:")} “<strong>{t("LA SCOTECAAA")}</strong>”. 
                                {t("Durante le mie migliori vincite sentirete sempre:")} “<strong>{t("VAMONOOOS")}</strong>”

                                </p>
                            </div>

                        </Profile>

                        <SocialNetwork>
                            <a target="_blank" rel="noopener noreferrer" href={'https://www.facebook.com/pitbullslot'}>
                                <FacebookIcon fontSize={'large'}/>
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href={'https://www.instagram.com/pitbullslot/'}>
                                <InstagramIcon fontSize={'large'}/>
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
                                            alt={'Casino Squad Team | SQUAD VALUE'}
                                            src={`${CDN}/jpeg/squad/value.jpeg`}
                                            layout="responsive"
                                            priority={true}
                                            sizes={"30vw"}
                                            width={550}
                                            height={550}/> 
                                    </LazyLoad>
                                </Thumbnail> 
                                
                                <p>
                                {t("Salve a tutti, mi presento: sono Mr. Value!")}
                                {t("Mi occupo di forniture di arredo scolastico ed urbano in giro per il mondo. ")} 
                                {t("Insieme agli altri ragazzi della Squad, vi farò compagnia quotidianamente, fra una slot digitale ed un gioco di casinò live. ")} 
                                {t("La mia slot machine preferita è la")} <strong>Book of Dead</strong>. {t("Tuttavia, preferisco di gran lunga i giochi live come Blackjack e Roulette. ")} <br/><br/>
                                {t("Personalmente sono ancora alla ricerca della grande sbancata,")} 
                                {t("ma per ora posso ritenermi soddisfatto delle vincite alla slot online")} <strong>Book of Dead</strong> e al <strong>Monopoly Live</strong>.
                                </p>
                            </div> 
                        </Profile>
                        <SocialNetwork>
                            <a target="_blank" rel="noopener noreferrer" href={'https://www.instagram.com/mr_value_bet/'}>
                                <InstagramIcon fontSize={'large'}/>
                            </a>
                        </SocialNetwork>
                    </Container>
                </Main>

            </div>

            <div className="layout-container topBonus">

                <GridContainer id="grid-topBonus">
                    <GridLayout
                        gridType={GridType.TOPBONUS} 
                        content={ topBonusData.map( (bonus) => 
                            <BonusCard key={bonus.id} data={bonus}/>
                        )}
                        label="I top bonus dei casinò online in Italia"
                        AlignItem={"center"}
                        xs={12} sm={4} md={4}
                        showIndex
                        showBoxShadow
                        bgColor="#fff"
                        spacing={4}/>
                </GridContainer>
            </div>
            
            <br/><br/>
            
            <FreqentlyAsked/>

            <div className="layout-container">
                <Section>
                    <HomeArticle mainBonuses={mainBonusData} freeBonuses={freeBonusData}/>
                </Section>
             </div>

        </Layout>
    )
} 

const Main = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 20px 0px;
`

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
`

const Profile = styled.div`
    position: relative;
    display: inherit;
    flex-direction: column;
    flex-grow: 1;
    width: min-content;
`

const Name = styled.span`
    font-weight: bold;
    font-size: 22px;
`

const Thumbnail = styled.div`
    height: fit-content;
    overflow: hidden;
    width: 200px;
    float: right;
    box-shadow: 0px 0px 12px 3px rgba(226,185,109,0.65);
    margin: 20px 20px;
    border-radius: 5px;

    @media ${device.mobileL} {
        float: none;
        width: auto;
    }
`

const SocialNetwork = styled.div`
    position: absolute;
    top: 5px;
    right: 0;

    a { color: ${({theme}) => theme.text.color.black}; }
`

const GridContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const Section = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  padding: 10px;
`

export async function getStaticProps() {

    return {
      props: {
        pageBonusesData: (await getBonuses({ names: PAGE_BONUSES, sort: "rating:desc" })).map((b) => {
            b.link = pageBonusesRemapping[b.name]
            return b
        })
      }
    }
}
  
export default SquadPage
