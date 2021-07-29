import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { device } from '../../utils/device'

type PageProps = {
   size?: number,
   currentIndex: number
};

const Breadcrumbs: FunctionComponent<PageProps> = ({size=4, currentIndex}) => 
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
    border: 1px solid ${({theme}) => theme.color.background};
    width: 8px;
    height: 8px;
    margin-right: 5px;
    border-radius: 8px;

    &.active{
        background-color: ${({theme}) => theme.color.background};

    }
`

export default Breadcrumbs
