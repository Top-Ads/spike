import React, { FunctionComponent, Fragment } from 'react'
import styled from 'styled-components'

type Props = {
   total: number
};

const SlotsCounter: FunctionComponent<Props> = ({total}) => {
    return (
        <Fragment>
            <Main>
                <span> {total} SLOTS</span>
            </Main>
        </Fragment>
    )
} 

const Main = styled.div`
    height: 70px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border: 2px solid ${({theme}) => theme.palette.background};
    color: ${({theme}) => theme.palette.background};
    border-radius: 5px;
    font-weight: bold;
    font-size: 25px;
`
export default SlotsCounter
