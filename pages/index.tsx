import React, { FunctionComponent } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { device } from '../lib/utils/device'
import GridLayout from '../components/GridLayout'
import Layout from '../components/Layout'
import FreqentlyAsked from '../components/FrequentlyAsked'
import SlotCard from '../components/Cards/SlotCard'
import BonusCard from '../components/Cards/BonusCard'
import BonusTable from '../components/Tables/BonusTable'
import { GridType, SlotType } from '../lib/utils/constants'
import HomeArticle from '../components/Articles/Home'
import { Bonus, ThemeSlot, Slot } from '../lib/schemas'
import { getBonuses } from '../lib/graphql/queries/bonuses'
import { getSlots } from '../lib/graphql/queries/slots'
import { CDN } from '../public/environment'
import CasinoCounter from '../components/CasinoCounter'
import { getTotalSlots, getTotalBonuses, getTotalProducers } from '../lib/api'

type PageProps = {
  slotsData: ThemeSlot
  freeBonusData: Bonus []
  topBonusData: Bonus []
  mainBonusData: Bonus []
  totalSlots: number
  totalBonuses: number
  totalProducers: number
}

const IndexPage: FunctionComponent<PageProps> = (props) => {

  const {slotsData, freeBonusData, topBonusData, mainBonusData, totalSlots, totalBonuses, totalProducers} = props

  const router = useRouter()

  const { newest, online } = slotsData
 
  return (
    <Layout title="Gioca alle Slot Machine Online, Casino con Bonus di Benvenuto">

      <Head>
        <meta 
        property="og:description" 
        content="Su Casino Squad puoi scommettere ai migliori giochi di Casinò Online sfruttando le nostre promozioni e i Bonus di Benvenuto Esclusive. Prova Ora Gratis" 
        key="description"/>
      </Head>

      <HeaderContainer>
          <div className="welcome">
            <h1>Ti diamo il benvenuto su Casino Squad!</h1>

              <p>Esplora il nostro sito per scoprire:</p>
              <ul>
                <li>Le migliori piattaforme di gioco online.</li>
                <li>La possibilità di ricevere ogni offerta e i bonus esclusivi.</li>
                <li>Provare gratis ogni tipo di slot machine.</li>
              </ul>
            <br/>
            <Button onClick={ () => router.push('/giochi')}>
                  <span>lista completa delle slot</span>
            </Button>
          </div>

          <CasinoInfo>
              <div className="poster">
                <Image
                  alt="Slots - Bonuses - Casino"
                  src={`${CDN}/png/casino_poster.png`}
                  layout="responsive"
                  priority={true}
                  width={1500}
                  height={780}
                />
              </div>

              <div className={"casino-counter"}>
                <CasinoCounter totalSlots={totalSlots} totalBonuses={totalBonuses} totalProducers={totalProducers}/>
              </div>
          </CasinoInfo>

      </HeaderContainer>

      <div className="layout-container">

        <Intro>
          <p>
          Siamo lieti di accoglierti su Casino Squad, un casino digitale sul quale troverai consigli e dritte su un’ampia gamma di slot machine e giochi da casinò.
          Qui potrai esplorare e scegliere la tua slot online preferita, ma anche apprendere consigli e avere aggiornamenti sulle leggi e norme del settore.
          <br/> <br/>
          Non avrai bisogno di registrarti o di fare download. Puoi consultare Casino Squad per familiarizzare con il meraviglioso mondo dell’intrattenimento del gioco digitale.
          Infatti, qui troverai confronti approfonditi fra i diversi casinò online e le migliori piattaforme di scommesse.
          Ti offriamo la possibilità di essere informato sulle migliori comparazioni fra i diversi casinò digitali. In più, se sei appassionato di Live Casinò e degli ormai celebri Game Show, puoi anche consultare il nostro servizio esclusivo.
          <br/> <br/>
          Infatti, su Casino Squad hai la possibilità di avere informazioni in tempo reale delle Statistiche Crazy Time Live, delle Monopoly Statistiche Live, ma anche delle LiveStats di Dream Catcher.
          <br/> <br/>
          Inoltre, potrai fare valutazioni ed essere sempre aggiornato su i migliori bonus disponibili. 
          Ti consigliamo inoltre di dare un'occhiata alle offerte di Benvenuto sulle slot online che trovi sul sito. 
          Se stai cercando informazioni su quale sia il sito più conveniente per giocare alle slot digitali, ti invitiamo a consultare la tabella seguente.
          </p>

        </Intro>

        <GridContainer id="grid-slots">
          <GridLayout
            gridType={GridType.SLOTS} 
            content={ newest.map( (slot: Slot) => <SlotCard key={slot.name} data={slot} type={SlotType.NEW}/> )}
            label="NUOVE SLOT"
            xs={12} sm={12} md={4}
          />
          <GridLayout
            gridType={GridType.SLOTS}
            content={ online.map( (slot: Slot) => <SlotCard key={slot.id} data={slot} type={SlotType.ONLINE}/> )}
            label="LE SLOT ONLINE PIÙ POPOLARI"
            xs={12} sm={4} md={4}
          />
        </GridContainer>
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
            spacing={4}
          />
        </GridContainer>
      </div>

      <div className="layout-container">
        <GridContainer id="grid-bonuses">
            <p>Se ti interessa sapere dove conviene maggiormente giocare alle slot machine online puoi dare
              un'occhiata a questa comparazione dei migliori Bonus disponibili al momento:</p>

            <div className="bonus-table">
              <BonusTable data={mainBonusData}/>
            </div>

            <div className="bonus-cards">
              <GridLayout
                gridType={GridType.BONUS}
                content={ mainBonusData.map( (bonus) => 
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
      </div> 
      
      <br/>
      
      <FreqentlyAsked/>

      <div className="layout-container">
        <Section>
          <HomeArticle mainBonuses={mainBonusData.slice(0,5)} freeBonuses={freeBonusData}/>
        </Section>
      </div>

    </Layout>
  )
}
  
const Intro = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px 0px;
  font-family: 'Montserrat-Medium';
`

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 25px 10%;
  background-image: linear-gradient(0deg,#e2b96d 0%,#e0c685 50%);
  
  h1 { 
    color: #fff;
    margin-top: 0;
  }

  ul, p { color: white }

  li {
    margin-bottom: 5px;
  }
  
  @media ${device.mobileL} {
    flex-direction: column;
    align-items: center;
    flex-grow: 1;

    h1 { text-align: center; }
   
  } 
`

const Button = styled.div`
    background-color: #f2f2f2;
    color: ${({theme}) => theme.palette.background};
    border-radius: ${({theme}) => theme.button.borderRadius};
    font-weight: bold;
    cursor: pointer;
    padding: 20px;
    width: fit-content;
    text-transform: uppercase;

    @media ${device.mobileL} { margin: auto; }
`

const GridContainer = styled.div`
  display: flex;
  margin: 10px 0px;
  color: ${({theme}) => theme.palette.background};

  &#grid-topBonus {
    color: #fff;
  }

  &#grid-bonuses {
    flex-direction: column;

    p{ 
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

const Section = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
`

const CasinoInfo = styled.div`
  width: 45%;
  height: min-content;
  margin: auto;
  position: relative;

  @media ${device.mobileL} {
    width: 80%;
    margin-top: 30px;
    overflow: hidden;
  } 

  .poster {
    @media ${device.mobileL} {
      width: 500px;
    } 
  }

  .casino-counter {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display:flex;
    align-items:center;
    justify-content:center;

    @media ${device.mobileL} {
      height: 100%;
     } 
  }
`

export async function getStaticProps() {

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

    const TOP_BONUSES =  [
      "LeoVegas",
      "StarCasinò",
      "Starvegas"]

    const FREE_BONUSES =  [
      "LeoVegas",
      "StarCasinò",
      "Starvegas",
      "Betway",
      "Gioco Digitale"]


    const topBonusRemapping: any = {
      LeoVegas: "https://ads.leovegas.com/redirect.aspx?pid=3708703&bid=14965",
      StarCasinò: "http://record.affiliatelounge.com/_SEA3QA6bJTMP_fzV1idzxmNd7ZgqdRLk/135/",
      Starvegas: "https://www.starvegas.it/gmg/refer/61782b177358340001a18ac7",
    }

    const mainBonusRemapping: any = {
      LeoVegas: "https://ads.leovegas.com/redirect.aspx?pid=3708703&bid=14965",
      StarCasinò: "http://record.affiliatelounge.com/_SEA3QA6bJTMP_fzV1idzxmNd7ZgqdRLk/135/",
      GoldBet: "https://media.goldbetpartners.it/redirect.aspx?pid=5116&bid=1495",
      WinCasino: "https://vincipromo.it/wincasino/?mp=42794b32-7604-49d2-92d0-8adf67a6b173",
      NetBet: "https://banners.livepartners.com/view.php?z=357155",
      "888 Casino": "https://ic.aff-handler.com/c/43431?sr=1864253",
      "King Casino": "http://cs.kingcasino.it/",
      Eurobet: "https://record.betpartners.it/_E_C7XwxgprAZV93hC2dJ_GNd7ZgqdRLk/113/",
      Betway: "https://betway.it/bwp/welcome-5gratis/it-it/?s=bw210475&a=AFF3379473685189866&utm_source=210475&utm_medium=Affiliate&utm_campaign=AFF3379473685189866",
      "Gioco Digitale": "https://mediaserver.entainpartners.com/renderBanner.do?zoneId=2031706",
    }

    const freeBonusRemapping: any = {
      LeoVegas: "https://ads.leovegas.com/redirect.aspx?pid=3708703&bid=14965",
      StarCasinò: "http://record.affiliatelounge.com/_SEA3QA6bJTMP_fzV1idzxmNd7ZgqdRLk/135/",
      Starvegas: "https://www.starvegas.it/gmg/refer/61782b177358340001a18ac7",
      Betway: "https://betway.it/bwp/welcome-5gratis/it-it/?s=bw210475&a=AFF3379473685189866&utm_source=210475&utm_medium=Affiliate&utm_campaign=AFF3379473685189866",
      "Gioco Digitale": "https://mediaserver.entainpartners.com/renderBanner.do?zoneId=2031706",
    }

  return {
    props: {
      slotsData: {
        newest: await getSlots({ limit: 9, start: 0, sort: 'created_at:desc' }),
        online: await getSlots({ limit: 9, start: 0, type_contain: "online", sort: "rating:desc" })
      },
      topBonusData:  (await getBonuses({ names: TOP_BONUSES, sort: "rating:desc" })).map((b) => {
        b.link = topBonusRemapping[b.name]
        return b
      }),
      mainBonusData: (await getBonuses({ names: MAIN_BONUSES, sort: "rating:desc" })).map((b) => {
        b.link = mainBonusRemapping[b.name]
        return b
      }),
      freeBonusData: (await getBonuses({ names: FREE_BONUSES, sort: "rating:desc" })).map((b) => {
        b.link = freeBonusRemapping[b.name]
        return b
      }),
      totalSlots: await getTotalSlots(),
      totalBonuses: await getTotalBonuses(),
      totalProducers: await getTotalProducers()
    }
  }
}

export default IndexPage
