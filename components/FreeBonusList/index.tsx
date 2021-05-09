import React, { Fragment } from 'react'
import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { GridType } from '../../utils/constants'
import FreeCard from '../Cards/FreeCard'
import GridSlots from '../GridSlots'
import LazyLoad from 'react-lazyload'
import { Bonus } from '../../pages/api/graphql/schemas/bonus'

type PageProps = {
  data: Bonus [],
}

const FreeBonusList: FunctionComponent<PageProps> = ({data}) => { 
    return (
        <Fragment>
      
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

        </Fragment>
    ) 
}

const Grids = styled.div`
  display: inherit;
  flex-grow: 1;
  color: ${({theme}) => theme.colors.background}; 
`

export default FreeBonusList
