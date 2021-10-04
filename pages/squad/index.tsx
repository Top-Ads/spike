import React, { FunctionComponent } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import { CDN } from '../../public/environment'
import GridLayout from '../../components/GridLayout'
import { GridType } from '../../lib/utils/constants'
import BonusCard from '../../components/Cards/BonusCard'
import FreqentlyAsked from '../../components/FrequentlyAsked'
import { device } from '../../lib/utils/device'
import HomeArticle from '../../components/Articles/Home'
import LazyLoad from 'react-lazyload'
import { Bonus } from '../../lib/schemas'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import { getBonuses } from '../../lib/graphql/queries/bonuses'

type PageProps = {
    freeBonusData: Bonus [],
    topBonusData: Bonus [],
  }
  
const SquadPage: FunctionComponent<PageProps> = ({freeBonusData, topBonusData}) => {
        
    return (
        <Layout title="Team Squad">
            <div className="layout-container">
                <Main>
                    <Container>
                        <Profile>
                            <Name>LUCKY</Name>

                            <div>
                                <Thumbnail>
                                    <LazyLoad height={200} offset={200}>
                                        <Image
                                            alt={'SQUAD LUCKY'}
                                            src={`${CDN}/jpeg/squad/lucky.jpeg`}
                                            layout="responsive"
                                            priority={true}
                                            width={550}
                                            height={550}/> 
                                    </LazyLoad>
                                </Thumbnail> 

                                <p>
                                    Ciao ragazzi, io sono Lucky e da qualche tempo ho guadagnato il soprannome di Lucky il fortunato,
                                    o meglio ancora il fortu-dado. Nella vita sono un autista di bus e lavoro nel settore del turismo,
                                    come hobby sono un ballerino da più di 10 anni e m occupo anche di videomaking. Vado d’accordo con tutto
                                    il resto della Squad, tranne che con Chily… scherzi a parte, siamo molto amici, solo che lui è un tipo
                                    molto scaramantico mentre io mi affido totalmente alla fortuna. Adoro i dadi e qualunque gioco li comprenda;
                                    mi piace il <strong>Monopoly Live</strong>ed il Crazy Time, ho un feeling particolare con le slots a tema egizio.
                                    Le mie vincite più interessanti sono state alla <strong>Sweet Bonanza</strong>, al <strong>Monopoly Live</strong>e alla
                                    <strong>Lightning Dice</strong>;
                                    sul canale YouTube trovate il resto.
                                    <br/><br/>
                                    Il mio: “<strong>Sono veramente egizio</strong>” è diventato un detto conosciuto ai più, ed inserito anche dalla
                                    Crusca in tutti i dizionari della lingua italiana.
                                    <br/><br/>
                                    Sono un tipo pazzerello e non mi tiro mai indietro se mi viene chiesto dai followers di cantare o ballare.
                                    Bella raga, ci si vede in live.
                                </p>
                            </div>   
                        </Profile>

                    </Container>

                    <Container>
                        <Profile>
                            <Name>CHILY</Name>

                            <div>
                                <Thumbnail>
                                    <LazyLoad height={200} offset={200}>
                                        <Image
                                            alt={'SQUAD CHILY'}
                                            src={`${CDN}/jpeg/squad/chily.jpeg`}
                                            layout="responsive"
                                            priority={true}
                                            width={550}
                                            height={550}/> 
                                    </LazyLoad>
                                </Thumbnail> 

                                <p>
                                    Avete mai sentito parlare di un peperoncino rosso che gioca alle slots? Ebbene sì,
                                    esiste e si chiama Chily. Le mie giornate sono in parte occupate dalla mia impresa di produzione
                                    di marmi e da divertentissime lezioni di fisica agli studenti, ma trovo del tempo per divertirvi 
                                    insieme a voi col casinò online. Quando sono live, faccio sempre un salto alla Honey Rush, Legacy of Dead, 
                                    ed ultimamente ho scoperto di essermi innamorato alla follia della Pillars of Asgard… chissà perché!
                                    <br/><br/>
                                    Le vincite più belle in assoluto sono state durante le sessioni alla <strong><strong>Rise of the Mountain King</strong></strong>e alla
                                    <strong>Pillars of Asgard</strong>. Non avendo la fortuna di Lucky, posso dire di lottare sempre contro la sfortuna.
                                    <br/><br/>
                                    Per alimentare le mie chance di vittoria, mangio sempre qualche peperoncino piccantissimo (ci sono clip che lo testimoniano). 
                                    Ogni volta che sento dire: “Esci che non paga” risponderò con un amplificato: “<strong>Chi ha detto di uscire da qua?</strong>”.
                                    <br/><br/>
                                    Ad ogni pagata, tra sedie che volano e signore che sbattono la scopa sono certo che non potrete fare a meno di me. Vi aspetto!
                                </p>
                            </div>

                        </Profile>

                        <SocialNetwork>
                            <a target="_blank" rel="noopener noreferrer" href={'https://www.facebook.com/chilyslotinstagram'}>
                                <FacebookIcon fontSize={'large'}/>
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href={'https://www.instagram.com/chilyslot'}>
                                <InstagramIcon fontSize={'large'}/>
                            </a>
                        </SocialNetwork>
                    </Container>

                    <Container>
                        <Profile>
                            <Name>MR J</Name>

                            <div>
                                <Thumbnail>
                                    <LazyLoad height={200} offset={200}>
                                        <Image
                                            alt={'SQUAD MR J'}
                                            src={`${CDN}/jpeg/squad/mrj.jpeg`}
                                            layout="responsive"
                                            priority={true}
                                            width={550}
                                            height={550}/> 
                                    </LazyLoad>
                                </Thumbnail>

                                <p>
                                    Fra di voi ci sarà sicuramente qualche appassionato de “La casa de Papel”… ecco Mister J
                                    è un punto di riferimento per Chily & co. così come El Profesor lo è per i vari Tokyo, Rio, ecc.
                                    <br/><br/>
                                    Molti lo accostano anche ad Alan di “2 uomini e 1/2”
                                    <br/><br/>
                                    Mi occupo della gestione e cura degli eventi, di qualsiasi tipo (discoteche, concerti… quando si poteva fare). 
                                    Posseggo vari e-commerce e ho lanciato vari brand da prodotti per la prima infanzia a ritratti realistici e stilizzati.
                                    <br/><br/>
                                    Non ho una slot preferita, ma se dovessi scegliere, vi direi Vinci la Gallina, sfidare il lupo mi dà una carica
                                    di adrenalina pazzesca. Fra le mie sessioni di gioco, ricordo con piacere i 100.000€ PRESI a <strong>Vinci la gallina</strong>, 
                                    altre vincite con Pitbull alla <strong>Legacy of Dead</strong>, con Lucky alla <strong>Sweet Bonanza</strong> ed insieme a Chily… sono sicuro che presto sbancherò con Mr. Value.
                                    <br/><br/>
                                    Sono stato accostato alla figura centrale della serie tv spagnola, non è un caso che anche io abbia sempre pronto un piano, 
                                    in questo caso una telefonata in diretta, per far sbancare il resto della Squad. Quando qualcuno ha da dire sulle mie giocate, 
                                    io risponderò con un secco: “<strong>I’m mister J, shhh</strong>”. E non imitatemi… non fatelo a casa!
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
                                            alt={'SQUAD PITBULL'}
                                            src={`${CDN}/jpeg/squad/pitbull.jpeg`}
                                            layout="responsive"
                                            priority={true}
                                            width={550}
                                            height={550}/> 
                                    </LazyLoad>
                                </Thumbnail> 

                                <p>
                                    Attenti a non farmi arrabbiare perché … io sono Pitbull! Il mio nome deriva dal fatto che possiedo le
                                    dell’omonimo cane. La forza, insieme alla tenacia mi hanno permesso di ottenere un sacco di
                                    soddisfazioni in ambito lavorativo, infatti, sono occupato su più fronti fra cui il turismo,
                                    il settore dell’abbigliamento e… vorrei coronare il sogno di diventare pilota d’aereo. Gioco spesso a
                                    qualsiasi tipo di Book, alla Reactoonz ed al Monopoly Live e al Blackjack. Ho dei bellissimi ricordi anche
                                    con la <strong>White Rabbit</strong>, la <strong>Moon Princess</strong> ecc… fortunato sì, ma so gestire maniacalmente il bet.
                                    <br/><br/>
                                    Si narra che le mie numerose vincite siano stato accompagnate dalla turbochiappa, che è candidata
                                    a diventare patrimonio dell’UNESCO. Ogni volta che sento dire: “E che cos’è….” prontamente rispondo: “<strong>LA SCOTECAAA</strong>”.
                                    Durante le mie migliori vincite sentirete sempre: “<strong>VAMONOOOS</strong>”
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
                                            alt={'SQUAD VALUE'}
                                            src={`${CDN}/jpeg/squad/value.jpeg`}
                                            layout="responsive"
                                            priority={true}
                                            width={550}
                                            height={550}/> 
                                    </LazyLoad>
                                </Thumbnail> 
                                
                                <p>
                                    Salve a tutti, mi presento, sono Mr. Value e mi occupo di forniture di arredo scolastico ed
                                    urbano in giro per il Mondo. Insieme agli altri ragazzi della Squad, vi farò compagnia quotidianamente
                                    fra una slot ed un gioco di casinò live. La mia slot preferita è la Book of Dead, anche se preferisco
                                    di gran lunga i giochi live come Blackjack e Roulette. Personalmente sono ancora alla ricerca della grande
                                    sbancata, per ora posso ritenermi soddisfatto delle vincite alla <strong>Book of Dead</strong> e al <strong>Monopoly Live</strong>.
                                    <br/><br/>
                                    Ogni volta che decido di entrare al Monopoly Live becco sempre il momento in cui sono appena usciti i 4 rolls,
                                    infatti, è celebre la frase :”Dovevo entrare 2 minuti prima!”
                                    <br/><br/>
                                    <strong>Sono un abitante della Papuasia </strong>e gioco al BJ come scusa per cimentare le dealer… ops di più non posso dirvi,
                                    vi aspetto in live!
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
                        spacing={2}/>
                </GridContainer>
            </div>
            
            <br/><br/>
            
            <FreqentlyAsked/>

            <div className="layout-container">
                <Section>
                    <HomeArticle data={freeBonusData}/>
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
        freeBonusData: await getBonuses({ limit: 10, start: 0, sort: "updated_at:desc" }),
        topBonusData: await getBonuses({ limit: 3, start: 0, sort: "rating:desc" })
      }
    }
}
  
export default SquadPage
