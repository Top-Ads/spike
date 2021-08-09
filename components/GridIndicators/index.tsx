import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { device } from '../../lib/utils/device'

type PageProps = {
   size?: number,
   currentIndex: number
};

const GridIndicators: FunctionComponent<PageProps> = ({size=2, currentIndex}) => 
    <Main>
        { [...Array(size)].map( (_value, index) =>
       <Bullet key={index} className={ index === currentIndex ? 'active' : '' }></Bullet>) }
    </Main> 

const Main = styled.div`
    display: none;

    @media ${device.tablet} {
        width: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
`

const Bullet = styled.div`
    background-color: unset;
    border: 1px solid ${({theme}) => theme.palette.background};
    width: 8px;
    height: 8px;
    margin-right: 5px;
    border-radius: 8px;

    &.active{
        background-color: ${({theme}) => theme.palette.background};

    }
`

export default GridIndicators
