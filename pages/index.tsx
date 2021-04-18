import React, { FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styled from 'styled-components'
import GridSlots from '../components/GridSlots'
import Layout from '../components/Layout'
import FreqentlyAsked from '../components/FrequentlyAsked'
import FreeSlots from '../components/FreeSlots/indext'
import { device } from '../utils/device'
import { Bonus, Slot } from './api/interfaces'
import SlotCard from '../components/Cards/SlotCard'
import BonusCard from '../components/Cards/BonusCard'
import { getSlotsCard } from './api/slots'
import AquaClient from './api/graphql/aquaClient'
import { BONUSES } from './api/graphql/queries/bonus'
import BonusTable from '../components/BonusTable'

type PageProps = {
  slotsData: Slot [],
  topBonusData: Bonus [],
  allBonusData: Bonus []
}

const IndexPage: FunctionComponent<PageProps> = ({slotsData, topBonusData, allBonusData}) => {

  const router = useRouter()

  return (
    <Layout title="Home">

      <div className="space-around">

        <WelcomeContainer>

          <HeaderContainer>

            <IntroContainer>
              <h1>BENVENUTO SU SPIKE SLOT!</h1>

              <div>
                <p><span><strong>Benvenuto</strong>sono Spike e sul mio sito puoi:</span></p>
                <ul>
                  <li>Trovare i migliori casino online.</li>
                  <li>Ricivere offerte bonus esclusive.</li>
                  <li>Giocare gratis alle slot machine famose.</li>
                </ul>
              </div>

              <ButtonContainer onClick={ () => router.push('/slots')}>
                    <span>lista completa delle slot</span>
              </ButtonContainer>
              
            </IntroContainer>

            <ImageContainer>
              <Image
                alt="Spike poster"
                src="/png/spike-poster.png"
                layout="responsive"
                priority={true}
                width={624}
                height={484}/>
            </ImageContainer>
          
          </HeaderContainer>
    
          <p>
              Ti diamo il benvenuto su <strong>SPIKE SLOT</strong> dove potrai trovare consigli per tutte le Slot Machine esistenti.
              Cerca la tua slot preferita e leggi i consigli per giocare, provala in modalità SLOT GRATIS direttamente qui senza registrazione,
              senza scaricare app e senza limiti di tempo. Puoi ottenere informazioni guardando le Video Guide ai Bonus.  <br/>
              Ancora indeciso? Guarda i video di SPIKE per farti un' idea. Offriamo le migliori comparazioni di siti di Casinò e siti Scommesse.
          </p>

        </WelcomeContainer>

        <GridsContainer>
          <GridSlots 
            data={ slotsData.slice(0, 12).map( (slot) => <SlotCard key={slot.gameName} data={slot}/> )}
            label="Le migliori Novomatic selezionate per te."
            xs={6} sm={4} md={4}/>
          <GridSlots
            data={ slotsData.slice(12, 24).map( (slot) => <SlotCard key={slot.gameName} data={slot}/> )}
            label="Le slot online del momento."
            xs={6} sm={4} md={4}/>
        </GridsContainer>

        <GridsContainer>
          <GridSlots
            data={ slotsData.slice(24, 36).map( (slot) => <SlotCard key={slot.gameName} data={slot}/> )}
            label="Le slot da bar più famose."
            xs={6} sm={4} md={4}/>
          <GridSlots 
            data={ slotsData.slice(36, 48).map( (slot) => <SlotCard key={slot.gameName} data={slot}/> )}
            label="Le slot VLT più divertenti."
            xs={6} sm={4} md={4}/>
        </GridsContainer>

        <GridsContainer>
          <GridSlots 
            data={ topBonusData.map( (bonus) => <BonusCard key={bonus.name} data={bonus}/> )}
            label="I top bonus dei casinò online in Italia."
            AlignItem={"center"}
            xs={12} sm={4} md={4}
            showIndex={true}/>
        </GridsContainer>

        <GridsContainer>
            <p>Se ti interessa sapere dove conviene maggiormente giocare alle slot machine online puoi dare
              un'occhiata a questa comparazione dei migliori Bonus disponibili al momento:</p>

            <div className="bonus-table">
              <BonusTable data={allBonusData}/>
            </div>

            <div className="bonus-list">
              <GridSlots
                data={ allBonusData.map( (bonus) => <BonusCard key={bonus.name} data={bonus}/> )}
                AlignItem={"center"}
                xs={12} sm={12} md={12}
                showIndex={false}/>
            </div>

        </GridsContainer>

      </div> 
      
      <FreqentlyAsked/>

      <div className="space-around">
        <FreeSlots/>
      </div>

    </Layout>
  )
}
  

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({theme}) => theme.colors.primary};
`

const IntroContainer = styled.div`
  display: inherit;
  flex-direction: column;

  ul { color: ${({theme}) => theme.text.color.secondary};; }

  @media ${device.mobileL} {
    h1 { text-align: center; }
    align-items: center;
  } 
`

const ButtonContainer = styled.div`
    background-color: #ff1313;
    border: 2px solid ${({theme}) => theme.colors.primary};
    color: #fff;
    border-radius: 5px;
    font-weight: normal;
    cursor: pointer;
    padding: 20px;
    width: fit-content;
    text-transform: uppercase;
    margin: auto 0;

    &:hover {
      box-shadow: 0px 0px 5px 5px rgba(33,37,41,0.4);
      -webkit-box-shadow: 0px 0px 5px 5px rgba(33,37,41,0.4);
      -moz-box-shadow: 0px 0px 5px 5px rgba(33,37,41,0.4);
  }
`

const HeaderContainer = styled.div`
  display: inherit;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`

const ImageContainer = styled.div`
  width: 470px;
  margin: 20px auto;

  @media ${device.laptop} {
    max-width: 335px;
  }

`

const GridsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color: ${({theme}) => theme.colors.primary};

  .bonus-list {
    display: none;
  }

  .bonus-table {
    display: contents;
  }

  @media ${device.mobileL} {
    .bonus-list {
      display: contents;
    }

    .bonus-table {
      display: none;
    }
  }
`

export async function getStaticProps() {
 
  const aquaClient = new AquaClient()

  const slotsRequest = await getSlotsCard()

  const topBonusRequest = await aquaClient.query({ 
    query: BONUSES, 
    variables: { code: 'it', limit: 3, start: 0 } })

  const allBonusRequest = await aquaClient.query({ 
    query: BONUSES, 
    variables: { code: 'it', limit: 15, start: 3 } })
  return {
    props: {
      slotsData: slotsRequest,
      topBonusData: topBonusRequest.data.data.bonuses,
      allBonusData: allBonusRequest.data.data.bonuses
    }
  }
}

export default IndexPage
