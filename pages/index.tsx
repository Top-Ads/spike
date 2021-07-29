import React, { FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { device } from '../utils/device'
import GridCards from '../components/GridCards'
import Layout from '../components/Layout'
import FreqentlyAsked from '../components/FrequentlyAsked'
import SlotCard from '../components/Cards/SlotCard'
import BonusCard from '../components/Cards/BonusCard'
import BonusTable from '../components/Tables/BonusTable'
import AquaClient from './api/graphql/aquaClient'
import { BONUSES } from './api/graphql/queries/bonuses'
import { SLOTS } from './api/graphql/queries/slots'
import { GridType } from '../utils/constants'
import Article from '../components/Article'
import { Bonus, Slot } from '../interfaces'

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

      <HeaderContainer>
          <div className="welcome">
            <h1>BENVENUTO SU CASINÓ SQUAD!</h1>

              <p>Siamo felici di accoglierti e di darti il benvenuto su CASINÓ SQUAD:<br/> 
              regolato da regolare licenza e’uno dei migliori siti di casino’ online:</p>
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
      </HeaderContainer>

      <div className="space-around">

        <Intro>
          <p>
          Siamo lieti di accoglierti su CASINÓ SQUAD. Siamo un sito in cui troverai consigli e dritte su ogni tipo di slot esistente.
          Puoi scegliere la tua <b>slot online</b> preferita, ma anche apprendere i consigli degli esperti ed avere aggiornamenti sulle leggi e norme del settore.
          Non hai bisogno di fare alcuna registrazione, né fare download: ti basta consultare il sito e ottenere tantissime info sul <b>gioco d’azzardo</b>, basta
          consultare le nostre <b>guide video bonus</b>.
          Ti invitiamo a guardare i video di SPIKE per familiarizzare con il meraviglio mondo dell’intrattenimento del <b>gioco online</b>: 
          troverai infatti confronti approfonditi fra <b>siti di casinò e piattaforme di scommesse</b>.
          In più, se stai cercando informazioni su quale sia il sito più conveniente per giocare alle <b>slot machine online</b>, ti invitiamo a consultare la tabella seguente. 
          Così tu stesso, potrai fare valutazioni ed essere sempre aggiornato su i <b>migliori bonus disponibili.</b>
          </p>

        </Intro>

        <Grids id="grid-slots">
          <GridCards
            type={GridType.SLOTS} 
            content={ slotsData.slice(0, 6).map( (slot) => <SlotCard key={slot.name} data={slot}/> )}
            label="Le migliori Novomatic per te."
            xs={6} sm={4} md={4}
            breadcrumbIndex={0}
            />
          <GridCards
            type={GridType.SLOTS}
            content={ slotsData.slice(6, 12).map( (slot) => <SlotCard key={slot.id} data={slot}/> )}
            label="Le slot online del momento."
            xs={6} sm={4} md={4}
            breadcrumbIndex={1}
            />
          <GridCards
            type={GridType.SLOTS}
            content={ slotsData.slice(12, 18).map( (slot) => <SlotCard key={slot.id} data={slot}/> )}
            label="Le slot da bar più famose."
            xs={6} sm={4} md={4}
            breadcrumbIndex={2}
            />
          <GridCards
            type={GridType.SLOTS} 
            content={ slotsData.slice(18, 24).map( (slot) => <SlotCard key={slot.id} data={slot}/> )}
            label="Le slot VLT più divertenti."
            xs={6} sm={4} md={4}
            breadcrumbIndex={3}
            />
        </Grids>

        <Grids>
          <GridCards
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

            <div className="bonus-cards">
              <GridCards
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
    h1 { text-align: center; }
    align-items: center;
    flex-grow: 1;
  } 
`

const Button = styled.div`
    background-color: #f2f2f2;
    color: ${({theme}) => theme.color.background};
    border-radius: ${({theme}) => theme.button.borderRadius};
    font-weight: bold;
    cursor: pointer;
    padding: 20px;
    width: fit-content;
    text-transform: uppercase;

    @media ${device.mobileL} { 
      margin: auto;
    }

    &:hover {
      
    }
`

const Grids = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px 0px;

  @media ${device.tablet} {
    &#grid-slots {
      flex-wrap: nowrap;
      overflow-x: scroll;
      overflow-y: hidden;
    }
  }

  color: ${({theme}) => theme.color.background};

  .bonus-cards { display: none; }
  .bonus-table { display: contents; }

  @media ${device.mobileL} {
    .bonus-cards { display: contents; }
    .bonus-table { display: none; }
  }
`

const Section = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  padding: 10px;
`

export async function getStaticProps() {
 
  const aquaClient = new AquaClient()

  const slotsRequest =  await aquaClient.query({ 
    query: SLOTS, 
    variables: { countryCode: 'it', limit: 24, start: 0 } })

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
