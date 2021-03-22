import React, { Fragment } from 'react'
import styled from 'styled-components'
import GridSlots from '../GridSlots'

const FreeSlots = () => { 
    
    return (
        <Fragment>
          <MainContainer>
     
            <div>GIOCA ALLE SLOT ONLINE – GRATIS</div>

            <div><p>Se ti piacciono le slot machine online ma vuoi giocare senza rischiare nulla,
            allora sei nel posto giusto. Qui su Slotjava.it trovi soltanto slot online gratis, 
            insieme ad altri giochi da casinò a cui potrai giocare per tutto il tempo che vorrai, 
            senza pagare nulla, senza registrarti e senza scaricare alcun software. Potrai 
            semplicemente giocare, e basta. Giocare alle slot machine gratis online ti consente 
            di poterle provare e imparare le loro caratteristiche, il loro comportamento, scoprire
            quanto pagano e se hanno delle fasi bonus. Puoi scoprire in anteprima i segreti delle ultime
            slot rilasciate, per giudicarle personalmente e metterle tra i preferiti o tra quelle da evitare.
            Il tutto, senza alcun rischio e senza limiti di tempo.</p></div>

            <div>ALTRI GIOCHI A CUI PUOI GIOCARE GRATIS SUL NOSTRO SITO</div>

            <div><p>Noi siamo specializzati soprattutto in slot machine, poiché esse rappresentano il gioco da 
            casinò online più popolare del momento. Tuttavia, sul nostro sito sono disponibili anche altre
            tipologie di gioco, che ben conoscerai e che potrai apprezzare.</p></div>
            
            <GridsContainer>
              <GridSlots 
                row={5} 
                column={1} 
                xs={12} sm={12} md={12}/>
            </GridsContainer>


          </MainContainer>
        </Fragment>
    ) 
}

const MainContainer = styled.div`
   
`

const GridsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color: ${({theme}) => theme.colors.primary}; 
  font-weight: bold;
`

export default FreeSlots
