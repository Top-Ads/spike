import React, { FunctionComponent } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import GridSlots from '../components/GridSlots'
import Layout from '../components/Layout'
import FreqentlyAsked from '../components/FrequentlyAsked'
import FreeSlots from '../components/FreeSlots/indext'
import { device } from '../utils/device'


const IndexPage: FunctionComponent = () => (
  
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
              layout="fill"
              priority={true}
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
          label="Le migliori Novomatic selezionate per te" 
          row={3} 
          column={4} 
          xs={6} sm={4} md={4}/>
        <GridSlots 
          label="Le slot online del momento." 
          row={3}
          column={4}
          xs={6} sm={4} md={4}/>
      </GridsContainer>

      <GridsContainer>
        <GridSlots
          label="Le slot da bar più famose." 
          row={3} 
          column={4} 
          xs={6} sm={4} md={4}/>
        <GridSlots         
          label="Le slot VLT più divertenti."
          row={3} column={4} xs={6} sm={4} md={4}/>
      </GridsContainer>

      <GridsContainer>
        <GridSlots 
          label="I top bonus dei casinò online in Italia."
          labelAlign={"center"}
          row={3} 
          column={1} 
          xs={12} sm={4} md={4}
          showIndex={true}/>
      </GridsContainer>

      <GridsContainer>
          <p>
            Se ti interessa sapere dove conviene maggiormente giocare alle slot machine online puoi dare
            un'occhiata a questa comparazione dei migliori Bonus disponibili al momento:
          </p>
          <GridSlots 
            row={1} 
            column={6} 
            xs={12} sm={12} md={12}/>
        </GridsContainer>

    </div> 
    
    <FreqentlyAsked/>

    <div className="spaceAround">
      <FreeSlots/>
    </div>

  </Layout>
)

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({theme}) => theme.colors.primary};
`

const IntroContainer = styled.div`
  display: inherit;
  flex-direction: column;

  @media ${device.mobileL} {
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
  width: 400px;
  height: 270px;
  position: relative;
  border: 1px solid ${({theme}) => theme.colors.primary}; 
  background-image: linear-gradient(${({theme}) => theme.colors.primary} , ${({theme}) => theme.colors.gradient} );
  border-radius: 10px;
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

export default IndexPage
