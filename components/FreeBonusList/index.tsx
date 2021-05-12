import React, { Fragment } from 'react'
import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { GridType } from '../../utils/constants'
import FreeBonusCard from '../Cards/FreeBonusCard'
import GridSlots from '../GridSlots'
import LazyLoad from 'react-lazyload'
import { Bonus } from '../../pages/api/graphql/schemas/bonus'

type PageProps = {
  data: Bonus [],
  label: string
}

const FreeBonusList: FunctionComponent<PageProps> = ({data, label}) => { 
    return (
        <Fragment>
      
            <Grids>
              <GridSlots
                type={GridType.FREE}
                content={ data.map( (bonus, index) =>
                  <LazyLoad offset={100}>
                    <FreeBonusCard key={index} data={bonus}/>
                  </LazyLoad> )}
                label={label}
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
  margin: 10px 0px;
`

export default FreeBonusList
