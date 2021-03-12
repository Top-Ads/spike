import React, { FunctionComponent } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import GridSlots from '../components/GridSlots'
import Layout from '../components/Layout'


const IndexPage: FunctionComponent = () => (
  
  <Layout title="Home">

    <WelcomeContainer>

      <HeaderContainer>
        <IntroContainer>
          <h1>BENVENUTO SU SPIKE SLOT!</h1>

          <span><strong>Benvenuto</strong> sono Spike e sul mio sito puoi:</span>
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
            className="spike-poster"
          />
        </ImageContainer>
      </HeaderContainer>
 
      <p>
          Ti diamo il bienvenuto su <strong>SPIKE SLOT</strong> dove potrai trovare consigli per tutte le Slot Machine esistenti.
          Cerca  la tua slot preferita e leggi consigli per giocare, provala in modalita SLOT GRATIS direttamente qui 
          senza registrazione, senza scarica app e senza limiti di tempo. Puoi  ottere infomazioni guardanto le Video
          Guide ai Bonus. <br/>
          Anchora decisio ? Guarda i videao di spike per fart an idea. Offramio le migliori comparazioni di siti di Casino
          e siti Scommesse.
      </p>

    </WelcomeContainer>

    <GridsContainer>
      <GridSlots label="La migliori novomatic." 
        row={3} 
        column={4} 
        xs={6} sm={4} md={4}/>
      <GridSlots label="La slot online del momento." row={3} column={4} xs={6} sm={4} md={4}/>
    </GridsContainer>

    <GridsContainer>
      <GridSlots label="La slot da bar pui framuso." 
        row={3} 
        column={4} 
        xs={6} sm={4} md={4}/>
      <GridSlots label="La slot VLT pui divertanti." row={3} column={4} xs={6} sm={4} md={4}/>
    </GridsContainer>

    <GridsContainer>
      <GridSlots label="I top Bonus dei casino inline in italia."
        labelAlign={"center"}
        row={3} 
        column={1} 
        xs={12} sm={4} md={4}
        showIndex={true}/>
    </GridsContainer>

    <GridsContainer>
      <p style={{fontWeight: "normal"}}>
        Se ti interessa sapere dove conviene maggiormente giocare alle slot machine puoi dare un ochiatta a questa 
        comparazione dei migliori bonus disponibili al momento:
      </p>
      <GridSlots 
        row={1} 
        column={6} 
        xs={12} sm={12} md={12}/>
    </GridsContainer>

  </Layout>
)

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.primary};
  margin-top: 50px;
`

const IntroContainer = styled.div`
  display: inherit;
  flex-direction: column;
`

const HeaderContainer = styled.div`
  display: inherit;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`

const ImageContainer = styled.div`
  width: 400px;
  height: 250px;
  position: relative;
  border: 1px solid ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 10px;

  .spike-poster {
    height: 250px;
  }
`

const ButtonContainer = styled.div`
  width: 280px;
  height: 50px;
  display: inherit;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border-radius: 5px;
  font-weight: normal;
  cursor: pointer;
  margin: 10px 0px;
`

const GridsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color: ${(props) => props.theme.colors.primary};
  font-weight: bold;
`

export default IndexPage
