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
            <h1>BENVENUTO SU CASINÓ SQUAD!</h1>

              <p>Siamo felici di accoglierti e di darti il benvenuto su CASINÓ SQUAD:<br/> 
              regolato da regolare licenza è uno dei migliori siti di casinò online:</p>
              <ul>
                <li>Esplora migliori <b>piattaforme di gioco online</b>.</li>
                <li>Avere la possibilità di ricevere ogni offerta e i <b>bonus esclusivi</b>.</li>
                <li>Provare gratis ogni tipo di <b>slot machine.</b></li>
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
          Siamo lieti di accoglierti su CASINÓ SQUAD. Siamo un sito in cui troverai consigli e dritte su ogni tipo di slot esistente.<br/>
          Puoi scegliere la tua <b>slot online</b> preferita, ma anche apprendere i consigli degli esperti ed avere aggiornamenti sulle leggi e norme del settore.<br/>
          Non hai bisogno di fare alcuna registrazione, né fare download: ti basta consultare il sito e ottenere tantissime info sul <b>gioco d’azzardo</b>, basta
          consultare le nostre <b>guide video bonus</b>.
          Ti invitiamo a guardare i video di CASINÓ SQUAD per familiarizzare con il meraviglio mondo dell’intrattenimento del <b>gioco online</b>: 
          troverai infatti confronti approfonditi fra <b>siti di casinò e piattaforme di scommesse</b>.<br/>
          In più, se stai cercando informazioni su quale sia il sito più conveniente per giocare alle <b>slot machine online</b>, ti invitiamo a consultare la tabella seguente. 
          Così tu stesso, potrai fare valutazioni ed essere sempre aggiornato su i <b>migliori bonus disponibili.</b>
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
            spacing={2}
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
  padding: 25px 7%;
  background-image: linear-gradient(0deg,#e2b96d 0%,#e0c685 50%);
  
  h1 { 
    color: #fff;
    margin-top: 0;
  }

  ul, p { color: white }

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
    "Gioco Digitale",
    "Bwin",
    "Slot Yes"]

    const FREE_BONUSES =  [
      "LeoVegas",
      "StarCasinò",
      "Starvegas",
      "Betway",
      "Slot Yes",
      "Gioco Digitale"]

    const mainBonusRemapping: any = {
      LeoVegas: "https://ads.leovegas.com/redirect.aspx?pid=3704489&bid=14965",
      StarCasinò: "https://record.starcasino.it/_SEA3QA6bJTNXl890vMAfUGNd7ZgqdRLk/131/",
      GoldBet: "https://media.goldbetpartners.it/redirect.aspx?pid=3185&bid=1495",
      WinCasino: "https://vincipromo.it/wincasino/?mp=42794b32-7604-49d2-92d0-8adf67a6b173",
      NetBet: "https://banners.livepartners.com/view.php?z=139080",
      "888 Casino": "https://ic.aff-handler.com/c/43431?sr=1868828",
      "King Casino": "https://spikeslot.kingcasino.it",
      Eurobet: "https://record.betpartners.it/_E_C7XwxgprAZV93hC2dJ_GNd7ZgqdRLk/108/",
      Betway: "https://betway.it/bwp/welcome-5gratis/it-it/?s=bw210475&a=AFF3009702735911860&utm_source=210475&utm_medium=Affiliate&utm_campaign=AFF3009702735911860",
      "Gioco Digitale": "",
      Bwin: "https://mediaserver.entainpartners.com/renderBanner.do?zoneId=2000655",
      "Slot Yes": "http://wladmiralinteractive.adsrv.eacdn.com/wl/clk/?btag=a_999b_177&aid="
    }

  return {
    props: {
      slotsData: {
        newest: await getSlots({ limit: 9, start: 0, sort: 'created_at:desc' }),
        online: await getSlots({ limit: 9, start: 0, type_contain: "online", sort: 'updated_at:desc' })
      },
      topBonusData:  await getBonuses({ limit: 3, start: 0, sort: "rating:desc" }),
      mainBonusData: (await getBonuses({ names: MAIN_BONUSES, sort: "rating:desc" })).map((b) => {
        /* TODO Fix rammaping*/
        b.link = mainBonusRemapping[b.name]
        return b
        /* END TODO*/
      }),
      freeBonusData: await getBonuses({ names: FREE_BONUSES, sort: "rating:desc" }),
      totalSlots: await getTotalSlots(),
      totalBonuses: await getTotalBonuses(),
      totalProducers: await getTotalProducers()
    }
  }
}

export default IndexPage
