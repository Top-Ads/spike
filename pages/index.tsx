import React, { FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styled from 'styled-components'
import { device } from '../utils/device'
import GridSlots from '../components/GridSlots'
import Layout from '../components/Layout'
import FreqentlyAsked from '../components/FrequentlyAsked'
import FreeBonusList from '../components/FreeBonusList'
import SlotCard from '../components/Cards/SlotCard'
import BonusCard from '../components/Cards/BonusCard'
import BonusTable from '../components/BonusTable'
import AquaClient from './api/graphql/aquaClient'
import { BONUSES } from './api/graphql/queries/bonuses'
import { SLOTS } from './api/graphql/queries/slots'
import { GridType } from '../utils/constants'
import { CDN } from '../public/environment'
import { Slot } from './api/graphql/schemas/slot'
import { Bonus } from './api/graphql/schemas/bonus'
import Article from '../components/Article'

type PageProps = {
  slotsData: Slot [],
  freeBonusData: Bonus [],
  topBonusData: Bonus [],
  allBonusData: Bonus []
}

const IndexPage: FunctionComponent<PageProps> = ({slotsData, freeBonusData, topBonusData, allBonusData}) => {

  const router = useRouter()

  return (
    <Layout title="Home">

      <div className="space-around">

      <Header>

        <Intro>
            <h1>BENVENUTO SU CASINÓ SQUAD!</h1>

            <div>
              <p><span><strong>Benvenuto</strong> sul nostro sito puoi:</span></p>
              <ul>
                <li>Trovare i migliori casino online.</li>
                <li>Ricivere offerte bonus esclusive.</li>
                <li>Giocare gratis alle slot machine famose.</li>
              </ul>
            </div>

            <Button onClick={ () => router.push('/giochi')}>
                  <span>lista completa delle slot</span>
            </Button>
        </Intro>

        <Thumbnail>
            <Image
              alt="Casino Squad"
              src={`${CDN}/png/logo_3d.png`}
              layout="responsive"
              priority={true}
              width={622}
              height={622 }/>
        </Thumbnail>

        <p>
        Ti diamo il benvenuto su <strong>CASINÓ SQUAD</strong> dove potrai trovare consigli per tutte le Slot Machine esistenti.
        Cerca la tua slot preferita e leggi i consigli per giocare, provala in modalità SLOT GRATIS direttamente qui senza registrazione,
        senza scaricare app e senza limiti di tempo. Puoi ottenere informazioni guardando le Video Guide ai Bonus.  <br/>
        Ancora indeciso? Guarda i video di SPIKE per farti un' idea. Offriamo le migliori comparazioni di siti di Casinò e siti Scommesse.
      </p>

      </Header>

        <Grids id="grid-slots">
          <GridSlots
            type={GridType.SLOTS} 
            content={ slotsData.slice(0, 12).map( (slot) => <SlotCard key={slot.name} data={slot}/> )}
            label="Le migliori Novomatic per te."
            xs={6} sm={4} md={4}
            breadcrumbIndex={0}
            />
          <GridSlots
            type={GridType.SLOTS}
            content={ slotsData.slice(12, 24).map( (slot) => <SlotCard key={slot.id} data={slot}/> )}
            label="Le slot online del momento."
            xs={6} sm={4} md={4}
            breadcrumbIndex={1}
            />
          <GridSlots
            type={GridType.SLOTS}
            content={ slotsData.slice(24, 36).map( (slot) => <SlotCard key={slot.id} data={slot}/> )}
            label="Le slot da bar più famose."
            xs={6} sm={4} md={4}
            breadcrumbIndex={2}
            />
          <GridSlots
            type={GridType.SLOTS} 
            content={ slotsData.slice(36, 48).map( (slot) => <SlotCard key={slot.id} data={slot}/> )}
            label="Le slot VLT più divertenti."
            xs={6} sm={4} md={4}
            breadcrumbIndex={3}
            />
        </Grids>

        <Grids>
          <GridSlots
            type={GridType.TOPBONUS} 
            content={ topBonusData.map( (bonus) => 
                <BonusCard key={bonus.id} data={bonus}/>
              )}
            label="I top bonus dei casinò online in Italia."
            AlignItem={"center"}
            xs={12} sm={4} md={4}
            showIndex
            showBoxShadow
            bgColor="#fff"
            spacing={2}
          />
        </Grids>

        <Grids>
            <p>Se ti interessa sapere dove conviene maggiormente giocare alle slot machine online puoi dare
              un'occhiata a questa comparazione dei migliori Bonus disponibili al momento:</p>

            <div className="bonus-table">
              <BonusTable data={allBonusData}/>
            </div>

            <div className="bonus-list">
              <GridSlots
                type={GridType.BONUS}
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
        </Grids>

      </div> 
      
      <FreqentlyAsked/>

      <div className="space-around">
        <Section>
          <div className="article">
                <Article/>
          </div>

          <div className="free-bonus-list">
            <FreeBonusList data={freeBonusData.slice(0, 5)} label="I MIGLIORI CASINÒ"/>
            <FreeBonusList data={freeBonusData.slice(5, 10)} label="I MIGLIORI CASINÒ CON GIRI GRATIS"/>
          </div>
         
        </Section>
      </div>

    </Layout>
  )
}
  

const Header = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const Intro = styled.div`
  display: inherit;
  flex-direction: column;

  ul { color: ${({theme}) => theme.text.color.secondary}; }

  @media ${device.mobileL} {
    h1 { text-align: center; }
    align-items: center;
  } 
`

const Button = styled.div`
    background-color: ${({theme}) => theme.colors.background};
    color: #fff;
    border-radius: ${({theme}) => theme.button.borderRadius};
    font-weight: normal;
    cursor: pointer;
    padding: 20px;
    width: fit-content;
    text-transform: uppercase;
    margin: auto 0;

    &:hover {
      box-shadow: ${({theme}) => theme.button.boxShadowX};
  }
`


const Thumbnail = styled.div`
  width: 25%;
  margin: auto;

  @media ${device.mobileL} {
    width: 90%;
    margin-top: 15px;
  }
`

const Grids = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @media ${device.tablet} {
    &#grid-slots {
      flex-wrap: nowrap;
      overflow-x: scroll;
    }
  }

  color: ${({theme}) => theme.colors.background};

  .bonus-list { display: none; }
  .bonus-table { display: contents; }

  @media ${device.mobileL} {
    .bonus-list { display: contents; }
    .bonus-table { display: none; }
  }
`

const Section = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @media ${device.mobileL} {
    flex-wrap: wrap-reverse;
  }

  .article {
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    width: 300px;
    padding: 10px;
  }

  .free-bonus-list {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: min-content;
  }
`

export async function getStaticProps() {
 
  const aquaClient = new AquaClient()

  const slotsRequest =  await aquaClient.query({ 
    query: SLOTS, 
    variables: { countryCode: 'it', limit: 48, start: 0 } })

  const freeBonusRequest =  await aquaClient.query({ 
    query: BONUSES, 
    variables: { countryCode: 'it', limit: 15, start: 0 } })
    
  const topBonusRequest = await aquaClient.query({ 
    query: BONUSES, 
    variables: { countryCode: 'it', limit: 3, start: 0 } })

  const allBonusRequest = await aquaClient.query({ 
    query: BONUSES, 
    variables: { countryCode: 'it', limit: 15, start: 3 } })

  return {
    props: {
      slotsData: slotsRequest.data.data.slots,
      freeBonusData: freeBonusRequest.data.data.bonuses,
      topBonusData: topBonusRequest.data.data.bonuses,
      allBonusData: allBonusRequest.data.data.bonuses
    }
  }
}

export default IndexPage
