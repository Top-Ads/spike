import React, { Fragment } from 'react'
import styled from 'styled-components'
import GameCard from '../Cards/GameCard'
import GridSlots from '../GridSlots'

const FreeSlots = () => { 
    
    return (
        <Fragment>
          <MainContainer>

            <SummaryContainer>
              <div><strong>GIOCA ALLE SLOT ONLINE – GRATIS</strong></div>

              <div><p>Se ti piacciono le slot machine online ma vuoi giocare senza rischiare nulla,
              allora sei nel posto giusto. Qui su Slotjava.it trovi soltanto slot online gratis, 
              insieme ad altri giochi da casinò a cui potrai giocare per tutto il tempo che vorrai, 
              senza pagare nulla, senza registrarti e senza scaricare alcun software. Potrai 
              semplicemente giocare, e basta. Giocare alle slot machine gratis online ti consente 
              di poterle provare e imparare le loro caratteristiche, il loro comportamento, scoprire
              quanto pagano e se hanno delle fasi bonus. Puoi scoprire in anteprima i segreti delle ultime
              slot rilasciate, per giudicarle personalmente e metterle tra i preferiti o tra quelle da evitare.
              Il tutto, senza alcun rischio e senza limiti di tempo.</p></div>

              <div><strong>ALTRI GIOCHI A CUI PUOI GIOCARE GRATIS SUL NOSTRO SITO</strong></div>

              <div><p>Noi siamo specializzati soprattutto in slot machine, poiché esse rappresentano il gioco da 
              casinò online più popolare del momento. Tuttavia, sul nostro sito sono disponibili anche altre
              tipologie di gioco, che ben conoscerai e che potrai apprezzare.</p></div>
            </SummaryContainer>

            <GridsContainer>
              <GridSlots
                data={ [...Array(5)].map( () => <GameCard/> )}
                width={"150px"} 
                xs={12} sm={12} md={12}/>
            </GridsContainer>

          </MainContainer>
        </Fragment>
    ) 
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
const SummaryContainer = styled.div`
  flex-grow: 2;
  width: 300px;
  color: ${({theme}) => theme.colors.primary}; 
  padding: 10px;
  font-size: 14px;   
`
const GridsContainer = styled.div`
  display: inherit;
  flex-grow: 1;
  color: ${({theme}) => theme.colors.primary}; 
`

export default FreeSlots
