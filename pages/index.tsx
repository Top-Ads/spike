import React, { FunctionComponent } from 'react'
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
import Article from '../components/Article'
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
  allBonusData: Bonus []
  totalSlots: number
  totalBonuses: number
  totalProducers: number
}

const IndexPage: FunctionComponent<PageProps> = (props) => {

  const {slotsData, freeBonusData, topBonusData, allBonusData, totalSlots, totalBonuses, totalProducers} = props

  const router = useRouter()

  const { newest, online } = slotsData
 
  return (
    <Layout title="Home">

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
              <BonusTable data={allBonusData}/>
            </div>

            <div className="bonus-cards">
              <GridLayout
                gridType={GridType.BONUS}
                content={ allBonusData.map( (bonus) => 
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
          <Article data={freeBonusData}/>
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
  return {
    props: {
      slotsData: {
        newest: await getSlots({ countryCode: 'it', limit: 9, start: 0, sort: 'created_at:desc' }),
        online: await getSlots({ countryCode: 'it', limit: 9, start: 0, type_contain: "online", sort: 'updated_at:desc' })
      },
      topBonusData:  await getBonuses({ countryCode: 'it', limit: 3, start: 0, sort: "rating:desc" }),
      freeBonusData: await getBonuses({ countryCode: 'it', limit: 10, start: 0, sort: "updated_at:desc" }),
      allBonusData: await getBonuses({ countryCode: 'it', limit: 15, start: 3 }),
      totalSlots: await getTotalSlots(),
      totalBonuses: await getTotalBonuses(),
      totalProducers: await getTotalProducers()
    }
  }
}

export default IndexPage
