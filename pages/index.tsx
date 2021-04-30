import React, { FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styled from 'styled-components'
import { device } from '../utils/device'
import GridSlots from '../components/GridSlots'
import Layout from '../components/Layout'
import FreqentlyAsked from '../components/FrequentlyAsked'
import FreeSlots from '../components/FreeSlots/indext'
import SlotCard from '../components/Cards/SlotCard'
import BonusCard from '../components/Cards/BonusCard'
import BonusTable from '../components/BonusTable'
import AquaClient from './api/graphql/aquaClient'
import { Bonus, Slot } from '../interfaces'
import { BONUSES } from './api/graphql/queries/bonuses'
import { SLOTS } from './api/graphql/queries/slots'
import { GridType } from '../utils/constants'
import { CDN } from '../public/environment'
import LazyLoad from 'react-lazyload'

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

        <Welcome>

          <Header>

            <Intro>
              <h1>BENVENUTO SU SPIKE SLOT!</h1>

              <div>
                <p><span><strong>Benvenuto</strong> sono Spike e sul mio sito puoi:</span></p>
                <ul>
                  <li>Trovare i migliori casino online.</li>
                  <li>Ricivere offerte bonus esclusive.</li>
                  <li>Giocare gratis alle slot machine famose.</li>
                </ul>
              </div>

              <Button onClick={ () => router.push('/slots')}>
                    <span>lista completa delle slot</span>
              </Button>
              
            </Intro>

            <Thumbnail>
              <Image
                alt="Spike poster"
                src={`${CDN}/png/spike-poster.png`}
                layout="responsive"
                priority={true}
                width={624}
                height={484}/>
            </Thumbnail>
          
          </Header>
    
          <p>
              Ti diamo il benvenuto su <strong>SPIKE SLOT</strong> dove potrai trovare consigli per tutte le Slot Machine esistenti.
              Cerca la tua slot preferita e leggi i consigli per giocare, provala in modalità SLOT GRATIS direttamente qui senza registrazione,
              senza scaricare app e senza limiti di tempo. Puoi ottenere informazioni guardando le Video Guide ai Bonus.  <br/>
              Ancora indeciso? Guarda i video di SPIKE per farti un' idea. Offriamo le migliori comparazioni di siti di Casinò e siti Scommesse.
          </p>

        </Welcome>

        <Grids id="grid-slots">
          <GridSlots
            type={GridType.SLOTS} 
            content={ slotsData.slice(0, 12).map( (slot) => 
              <LazyLoad key={slot.id} height={400}>
                <SlotCard key={slot.name} data={slot}/>
              </LazyLoad> )}
            label="Le migliori Novomatic per te."
            xs={6} sm={4} md={4}
            currentIndex={0}
            />
          <GridSlots
            type={GridType.SLOTS}
            content={ slotsData.slice(12, 24).map( (slot) =>  
              <LazyLoad once offset={200} overflow throttle={100}>
                <SlotCard key={slot.id} data={slot}/>
              </LazyLoad> )}
            label="Le slot online del momento."
            xs={6} sm={4} md={4}
            currentIndex={1}
            />
          <GridSlots
            type={GridType.SLOTS}
            content={ slotsData.slice(24, 36).map( (slot) => 
              <LazyLoad once offset={200} overflow throttle={100}>
                <SlotCard key={slot.id} data={slot}/>
              </LazyLoad> )}
            label="Le slot da bar più famose."
            xs={6} sm={4} md={4}
            currentIndex={2}
            />
          <GridSlots
            type={GridType.SLOTS} 
            content={ slotsData.slice(36, 48).map( (slot) => 
              <LazyLoad once offset={200} overflow throttle={100}>
                <SlotCard key={slot.id} data={slot}/>
              </LazyLoad> )}
            label="Le slot VLT più divertenti."
            xs={6} sm={4} md={4}
            currentIndex={3}
          />
        </Grids>

        <Grids>
          <GridSlots
            type={GridType.TOPBONUS} 
            content={ topBonusData.map( (bonus) => 
              <LazyLoad offset={200}>
                <BonusCard key={bonus.id} data={bonus}/>
              </LazyLoad> )}
            label="I top bonus dei casinò online in Italia."
            AlignItem={"center"}
            xs={12} sm={4} md={4}
            showIndex
          />
        </Grids>

        <Grids>
            <p>Se ti interessa sapere dove conviene maggiormente giocare alle slot machine online puoi dare
              un'occhiata a questa comparazione dei migliori Bonus disponibili al momento:</p>

            <div className="bonus-table">
            <LazyLoad offset={200}>
              <BonusTable data={allBonusData}/>
            </LazyLoad>
            </div>

            <div className="bonus-list">
              <GridSlots
                type={GridType.BONUS}
                content={ allBonusData.reverse().map( (bonus) => 
                  <LazyLoad once overflow={true} throttle={100} offset={200}>
                    <BonusCard key={bonus.id} data={bonus}/>
                  </LazyLoad> )}
                AlignItem={"center"}
                xs={12} sm={12} md={12}
                showIndex
                reversedList
              />
            </div>
        </Grids>

      </div> 
      
      <FreqentlyAsked/>

      <div className="space-around">
        <FreeSlots data={freeBonusData}/>
      </div>

    </Layout>
  )
}
  
const Welcome = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({theme}) => theme.colors.background};
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
    background-color: #ff1313;
    border: 2px solid ${({theme}) => theme.colors.background};
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

const Header = styled.div`
  display: inherit;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`

const Thumbnail = styled.div`
  width: 470px;
  margin: 20px auto;

  @media ${device.laptop} {
    max-width: 335px;
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

export async function getStaticProps() {
 
  const aquaClient = new AquaClient()

  const slotsRequest =  await aquaClient.query({ 
    query: SLOTS, 
    variables: { code: 'it', limit: 48, start: 0 } })

  const freeBonusRequest =  await aquaClient.query({ 
    query: BONUSES, 
    variables: { code: 'it', limit: 5, start: 0 } })
    
  const topBonusRequest = await aquaClient.query({ 
    query: BONUSES, 
    variables: { code: 'it', limit: 3, start: 0 } })

  const allBonusRequest = await aquaClient.query({ 
    query: BONUSES, 
    variables: { code: 'it', limit: 15, start: 3 } })

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
