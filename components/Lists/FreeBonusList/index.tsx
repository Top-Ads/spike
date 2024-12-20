import React, { Fragment } from 'react'
import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { GridType } from '../../../lib/utils/constants'
import FreeBonusCard from '../../Cards/FreeBonusCard'
import GridLayout from '../../Commons/GridLayout'
import LazyLoad from 'react-lazyload'
import { Bonus } from '../../../lib/schemas'

type Props = {
  data: Bonus [],
  label: string
}

const FreeBonusList: FunctionComponent<Props> = ({data, label}) => { 
    return (
        <Fragment>
      
            <GridContainer>
              <GridLayout
                gridType={GridType.FREE}
                content={ data.map( (bonus, index) =>
                  <LazyLoad offset={200}>
                    <FreeBonusCard key={index} data={bonus}/>
                  </LazyLoad> )}
                label={label}
                xs={12} sm={12} md={12}
                width={"200px"}
                AlignItem="center"
                spacing={0}      
                />
            </GridContainer>

        </Fragment>
    ) 
}

const GridContainer = styled.div`
  display: inherit;
  flex-grow: 1;
  color: ${({theme}) => theme.palette.background}; 
  margin: 10px 0px;
`

export default FreeBonusList
