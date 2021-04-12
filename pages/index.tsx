import React, { FunctionComponent } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import GridSlots from '../components/GridSlots'
import Layout from '../components/Layout'
import FreqentlyAsked from '../components/FrequentlyAsked'
import FreeSlots from '../components/FreeSlots/indext'
import { device } from '../utils/device'
import { Slot } from '../interfaces'
import GameCard from '../components/Cards/GameCard'
import BonusCard from '../components/Cards/BonusCard'
import { getSlotsCard } from './api/slots'

type PageProps = {
  slotsCard: Slot []
}

const IndexPage: FunctionComponent<PageProps> = ({slotsCard}) => {

  return (
    <Layout title="Home">

      <div className="spaceAround">

        <WelcomeContainer>

          <HeaderContainer>
            <IntroContainer>
              <h1>BENVENUTO SU SPIKE SLOT!</h1>

              <div>
                <p><span><strong>Benvenuto</strong>  sono Spike e sul mio sito puoi:</span></p>
                <ul>
                  <li>Trovare i migliori casino online</li>
                  <li>Ricivere offerte bonus esclusive</li>
                  <li>Giocare gratis alle slot machine famose.</li>
                </ul>
              </div>

              <ButtonContainer>
                    <span>Via alla lista completa delle slot</span>
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
            data={ slotsCard.slice(0, 12).map( (game) => <GameCard data={game}/> )}
            label="Le migliori Novomatic selezionate per te."
            xs={6} sm={4} md={4}/>
          <GridSlots
            data={ slotsCard.slice(12, 24).map( (game) => <GameCard data={game}/> )}
            label="Le slot online del momento."
            xs={6} sm={4} md={4}/>
        </GridsContainer>

        <GridsContainer>
          <GridSlots
            data={ slotsCard.slice(24, 36).map( (game) => <GameCard data={game}/> )}
            label="Le slot da bar più famose."
            xs={6} sm={4} md={4}/>
          <GridSlots 
            data={ slotsCard.slice(36, 48).map( (game) => <GameCard data={game}/> )}
            label="Le slot VLT più divertenti."
            xs={6} sm={4} md={4}/>
        </GridsContainer>

        <GridsContainer>
          <GridSlots 
            data={ [...Array(3)].map( () => <BonusCard/> )}
            label="I top bonus dei casinò online in Italia."
            padding={true} 
            AlignItem={"center"}
            xs={12} sm={4} md={4}
            showIndex={true}/>
        </GridsContainer>

        <GridsContainer>
            <p>
              Se ti interessa sapere dove conviene maggiormente giocare alle slot machine online puoi dare
              un'occhiata a questa comparazione dei migliori Bonus disponibili al momento:
            </p>
            <GridSlots 
              data={ [...Array(6)].map( () =>  <BonusCard/> )}
              padding={true} 
              xs={12} sm={12} md={12}/>
          </GridsContainer>

      </div> 
      
      <FreqentlyAsked/>

      <div className="spaceAround">
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

  ul { color: #000; }

  @media ${device.tablet} {
    h1 { font-size: 23px; }
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
    padding: 10px;
    width: fit-content;
`

const HeaderContainer = styled.div`
  display: inherit;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`

const ImageContainer = styled.div`
  width: 550px;
  margin: 10px 0px;

  @media ${device.laptop} {
    width: 340px;
  }
`

const GridsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color: ${({theme}) => theme.colors.primary};
`

export async function getStaticProps() {
 
  const slotsCard = await getSlotsCard()

  if (!slotsCard) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      slotsCard
    }
  }
}

export default IndexPage
