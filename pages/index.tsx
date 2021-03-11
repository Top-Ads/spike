import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'


const IndexPage: FunctionComponent = () => (
  
  <Layout title="Home">

    <WelcomeContainer>
      <h1>BENVENUTO SU SPIKE SLOT!</h1>

      <div> 
        <span>Benvenuto sono Spike e sul mio sito puoi:</span>
        <ul>
          <li>Trovare i migliori casino online</li>
          <li>Ricivere offerte bonus esclusive</li>
          <li>Giocare gratis alle slot machine famose.</li>
        </ul>
      </div>

      <ButtonContainer>Via alla lista completa delle slot</ButtonContainer>
    
      <div>
        <p>
          Ti diamo il bienvenuto su SPIKE SLOT dove potrai trovare consigli per tutte le Slot Machine esistenti.
          Cerca  la tua slot preferita e leggi consigli per giocare, provala in modalita SLOT GRATIS direttamente qui 
          senza registrazione, senza scarica app e senza limiti di tempo. Puoi  ottere infomazioni guardanto le Video
          Guide ai Bonus.
        </p>
      </div>
    </WelcomeContainer>

  </Layout>
)

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.primary}});
  font-weight: bold;
  margin: 10px 0px;
`

const ButtonContainer = styled.div`
  width: 280px;
  height: 50px;
  display: inherit;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primary}});
  color: white;
  border-radius: 5px;
  font-weight: normal;
  cursor: pointer;
  margin: 10px 0px;
`

export default IndexPage
