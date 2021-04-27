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
                src="/png/spike-poster.png"
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

        <Grids>
          <GridSlots 
            width={'400px'}
            content={ slotsData.slice(0, 12).map( (slot) => <SlotCard key={slot.name} data={slot}/> )}
            label="Le migliori Novomatic selezionate per te."
            xs={6} sm={4} md={4}/>
          <GridSlots
            width={'400px'}
            content={ slotsData.slice(12, 24).map( (slot) => <SlotCard key={slot.name} data={slot}/> )}
            label="Le slot online del momento."
            xs={6} sm={4} md={4}/>
        </Grids>

        <Grids>
          <GridSlots
            width={'400px'}
            content={ slotsData.slice(24, 36).map( (slot) => <SlotCard key={slot.id} data={slot}/> )}
            label="Le slot da bar più famose."
            xs={6} sm={4} md={4}/>
          <GridSlots
            width={'400px'} 
            content={ slotsData.slice(36, 48).map( (slot) => <SlotCard key={slot.id} data={slot}/> )}
            label="Le slot VLT più divertenti."
            xs={6} sm={4} md={4}/>
        </Grids>

        <Grids>
          <GridSlots 
            content={ topBonusData.map( (bonus) => <BonusCard key={bonus.id} data={bonus}/> )}
            label="I top bonus dei casinò online in Italia."
            AlignItem={"center"}
            xs={12} sm={4} md={4}
            showIndex={true}/>
        </Grids>

        <Grids>
            <p>Se ti interessa sapere dove conviene maggiormente giocare alle slot machine online puoi dare
              un'occhiata a questa comparazione dei migliori Bonus disponibili al momento:</p>

            <div className="bonus-table">
              <BonusTable data={allBonusData}/>
            </div>

            <div className="bonus-list">
              <GridSlots
                content={ allBonusData.reverse().map( (bonus) => <BonusCard key={bonus.id} data={bonus}/> )}
                AlignItem={"center"}
                xs={12} sm={12} md={12}
                showIndex={true}
                reversed={true}
                noWrap={true}
                spacing={3}/>
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
  color: ${({theme}) => theme.colors.backGround};
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
    border: 2px solid ${({theme}) => theme.colors.backGround};
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
  color: ${({theme}) => theme.colors.backGround};

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
