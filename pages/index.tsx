import React, { FunctionComponent } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import GridSlots from '../components/GridSlots'
import Layout from '../components/Layout'
import FreqentlyAsked from '../components/FrequentlyAsked'
import FreeSlots from '../components/FreeSlots/indext'
import { device } from '../utils/device'
import { Game } from '../interfaces'
import GameCard from '../components/Cards/GameCard'
import BonusCard from '../components/Cards/BonusCard'

type PageProps = {
  data: Game []
}

const IndexPage: FunctionComponent<PageProps> = () => {

  return (
    <Layout title="Home">

    <div className="spaceAround">

      <WelcomeContainer>

        <HeaderContainer>
          <IntroContainer>
            <h1>BENVENUTO SU SPIKE SLOT!</h1>

            <span><strong>Benvenuto</strong>  sono Spike e sul mio sito puoi:</span>
            <ul>
              <li>Trovare i migliori casino online</li>
              <li>Ricivere offerte bonus esclusive</li>
              <li>Giocare gratis alle slot machine famose.</li>
            </ul>

            <ButtonContainer>Via alla lista completa delle slot</ButtonContainer>
          </IntroContainer>

          <ImageContainer>
            <Image
              alt="Spike poster"
              src="/png/spike-poster.png"
              layout="responsive"
              priority={true}
              width={624}
              height={484}
            />
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
          data={ [...Array(12)].map( () => <GameCard/> )}
          label="Le migliori Novomatic selezionate per te." 
          xs={6} sm={4} md={4}/>
        <GridSlots
          data={ [...Array(12)].map( () => <GameCard/> )}
          label="Le slot online del momento." 
          xs={6} sm={4} md={4}/>
      </GridsContainer>

      <GridsContainer>
        <GridSlots
          data={ [...Array(12)].map( () => <GameCard/> )}
          label="Le slot da bar più famose." 
          xs={6} sm={4} md={4}/>
        <GridSlots 
          data={ [...Array(12)].map( () => <GameCard/> )}
          label="Le slot VLT più divertenti."
          xs={6} sm={4} md={4}/>
      </GridsContainer>

      <GridsContainer>
        <GridSlots 
          data={ [...Array(3)].map( () => <BonusCard/> )}
          label="I top bonus dei casinò online in Italia."
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
            data={ [...Array(3)].map( () =>  <BonusCard/> )}
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

  @media ${device.tablet} {
    h1 { font-size: 23px; }
    align-items: center;
  } 
`

const HeaderContainer = styled.div`
  display: inherit;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`

const ImageContainer = styled.div`
  width: 550px;
`

const ButtonContainer = styled.div`
  width: 280px;
  height: 50px;
  display: inherit;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.primary}; 
  color: white;
  border-radius: 5px;
  font-weight: normal;
  cursor: pointer;
  margin: 20px 0px;
  border: 1px solid ${({theme}) => theme.colors.primary};

  &: active {
    color: ${({theme}) => theme.colors.primary};
    background-color: #fff;
    border: 1px solid ${({theme}) => theme.colors.primary};
  }
`

const GridsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color: ${({theme}) => theme.colors.primary};
`

export async function getStaticProps() {
  const res = await fetch(`https://www.mocky.io/v2/5da99f9f31000036004e0a4e`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data
    }
  }
}

export default IndexPage
