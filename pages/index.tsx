import React, { FunctionComponent } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { device } from '../lib/utils/device'
import GridLayout from '../components/Commons/GridLayout'
import Layout from '../components/Layout'
import FreqentlyAsked from '../components/FrequentlyAsked'
import SlotCard from '../components/Cards/SlotCard'
import BonusCard from '../components/Cards/BonusCard'
import BonusTable from '../components/Commons/Tables/BonusTable'
import { GridType, pageBonusesRemapping, PAGE_BONUSES, SlotType } from '../lib/utils/constants'
import HomeArticle from '../components/Commons/Articles/Home'
import { Bonus, ThemeSlot, Slot } from '../lib/schemas'
import { getBonuses } from '../lib/graphql/queries/bonuses'
import { getSlots } from '../lib/graphql/queries/slots'
import { CDN } from '../public/environment'
import CasinoCounter from '../components/CasinoCounter'
import { getTotalSlots, getTotalBonuses, getTotalProducers } from '../lib/api'
import { useTranslation } from 'react-i18next'

type PageProps = {
  slotsData: ThemeSlot
  pageBonusesData: Bonus []
  totalSlots: number
  totalBonuses: number
  totalProducers: number
}

const IndexPage: FunctionComponent<PageProps> = (props) => {

  const {slotsData, pageBonusesData, totalSlots, totalBonuses, totalProducers} = props

  const TOP_BONUSES =  [
    "LeoVegas",
    "StarCasinò",
    "Starvegas"]

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

  const FREE_BONUSES =  [
      "LeoVegas",
      "StarCasinò",
      "Starvegas",
      "Betway",
      "Gioco Digitale"]


  const topBonusesData = pageBonusesData.filter( bonus => {
    if ( TOP_BONUSES.includes( bonus.name ) ) {
      return bonus
    }
  })

  const mainBonusesData = pageBonusesData.filter( bonus => {
    if ( MAIN_BONUSES.includes( bonus.name ) ) {
      return bonus
    }
  })

  const freeBonusesData = pageBonusesData.filter( bonus => {
    if ( FREE_BONUSES.includes( bonus.name ) ) {
      return bonus
    }
  })

  const router = useRouter()

  const { newest, online } = slotsData
 
  const { t } = useTranslation()
  
  return (
    <Layout title="Casino Squad | Gioca ora con le Slot Machine Online in Italiano">

      <Head>
        <meta 
        property="og:description" 
        content="Gioca con tutte le slot machine piu’ popolari senza registarzione e senza deposito: video slot online,slot VTL, slot da bar con bonus senza deposito" 
        key="description"/>
      </Head>

      <HeaderContainer>
          <div className="welcome">
            <h1>{t("Ti diamo il benvenuto su Casino Squad!")}</h1>

              <p>{t("Esplora il nostro sito per scoprire:")}</p>
              <ul>
                <li>{t("Le migliori piattaforme di gioco online.")}</li>
                <li>{t("La possibilità di ricevere ogni offerta e i bonus esclusivi.")}</li>
                <li>{t("Provare gratis ogni tipo di slot machine.")}</li>
              </ul>
            <br/>
            <Button onClick={ () => router.push('/giochi')}>
                  <span>{t("lista completa delle slot")}</span>
            </Button>
          </div>

          <CasinoInfo>
              <div className="poster">
                <Image
                  alt="Slots - Bonuses - Casino"
                  src={`${CDN}/png/casino_poster.png`}
                  layout="responsive"
                  sizes={"30vw"}
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
          {t("Siamo lieti di accoglierti su Casino Squad, ")}
          {t("un casino digitale sul quale troverai consigli e dritte su un’ampia gamma di slot machine e giochi da casinò.")}
          {t("Qui potrai esplorare e scegliere la tua slot online preferita, ")}
          {t("ma anche apprendere consigli e avere aggiornamenti sulle leggi e norme del settore.")}
          <br/> <br/>
          {t("Non avrai bisogno di registrarti o di fare download.")} 
          {t("Puoi consultare Casino Squad per familiarizzare con il meraviglioso mondo dell’intrattenimento del gioco digitale.")}
          {t("Infatti, qui troverai confronti approfonditi fra i diversi casinò online e le migliori piattaforme di scommesse.")} 
          {t("Ti offriamo la possibilità di essere informato sulle migliori comparazioni fra i diversi casinò digitali.")} 
          {t("In più, se sei appassionato di Live Casinò e degli ormai celebri Game Show, ")} 
          {t("puoi anche consultare il nostro servizio esclusivo.")}
          <br/> <br/>
          {t("Infatti, su Casino Squad hai la possibilità di avere informazioni in tempo reale delle Statistiche Crazy Time Live, ")} 
          {t("delle Monopoly Statistiche Live, ma anche delle LiveStats di Dream Catcher.")}
          <br/> <br/>
          {t("Inoltre, potrai fare valutazioni ed essere sempre aggiornato su i migliori bonus disponibili.")}
          {t("Ti consigliamo inoltre di dare un'occhiata alle offerte di Benvenuto sulle slot online che trovi sul sito.")} 
          {t("Se stai cercando informazioni su quale sia il sito più conveniente per giocare alle slot digitali, ti invitiamo a consultare la tabella seguente.")}
          </p>

        </Intro>

        <GridContainer id="grid-slots">
          <GridLayout
            gridType={GridType.SLOTS} 
            content={ newest.map( (slot: Slot) => <SlotCard key={slot.name} data={slot} type={SlotType.NEW}/> )}
            label="NUOVE SLOT"
            xs={12} sm={4} md={4}
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
            content={ topBonusesData.map( (bonus) => 
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
            <p>{t("Se ti interessa sapere dove conviene maggiormente giocare alle slot machine online puoi dare")}
              {t("un'occhiata a questa comparazione dei migliori Bonus disponibili al momento:")}</p>

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
      </div> 
      
      <br/>
      
      <FreqentlyAsked/>

      <div className="layout-container">
        <Section>
          <HomeArticle mainBonuses={mainBonusesData.slice(0,5)} freeBonuses={freeBonusesData}/>
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

  return {
    props: {
      slotsData: {
        newest: await getSlots({ limit: 9, start: 0, sort: 'created_at:desc' }),
        online: await getSlots({ limit: 9, start: 0, type_contain: "online", sort: "rating:desc" })
      },
      pageBonusesData:  (await getBonuses({ names: PAGE_BONUSES, sort: "rating:desc" })).map((b) => {
        b.link = pageBonusesRemapping[b.name]
        return b
      }),
      totalSlots: await getTotalSlots(),
      totalBonuses: await getTotalBonuses(),
      totalProducers: await getTotalProducers()
    }
  }
}

export default IndexPage
