import React, { Fragment } from 'react'
import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { GridType } from '../../utils/constants'
import FreeCard from '../Cards/FreeCard'
import GridSlots from '../GridSlots'
import LazyLoad from 'react-lazyload'
import { Bonus } from '../../pages/api/graphql/schemas/bonus'

type PageProps = {
  data: Bonus []
}

const FreeSlots: FunctionComponent<PageProps> = ({data}) => { 
    return (
        <Fragment>
          <Main>

            <Summary>
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
            </Summary>

            <Grids>
              <GridSlots
                type={GridType.FREE}
                content={ data.map( (bonus, index) =>
                  <LazyLoad offset={100}>
                    <FreeCard key={index} data={bonus}/>
                  </LazyLoad> )}
                label="I migliori casinò con giri gratis."
                xs={12} sm={12} md={12}
                width={"200px"}
                AlignItem="center"
                spacing={0}      
                />
            </Grids>

          </Main>
        </Fragment>
    ) 
}

const Main = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
const Summary = styled.div`
  flex-grow: 2;
  width: 300px;
  color: ${({theme}) => theme.colors.background}; 
  padding: 10px;
`
const Grids = styled.div`
  display: inherit;
  flex-grow: 1;
  color: ${({theme}) => theme.colors.background}; 
`

export default FreeSlots
