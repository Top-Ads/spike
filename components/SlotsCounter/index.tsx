import React, { FunctionComponent, Fragment } from 'react'
import styled from 'styled-components'

type PageProps = {
   total: number
};

const SlotsCounter: FunctionComponent<PageProps> = ({total}) => {
    return (
        <Fragment>
            <Main>
                <span> {total} SLOTS</span>
            </Main>
        </Fragment>
    )
} 

const Main = styled.div`
    width: inherit;
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border: 2px solid ${({theme}) => theme.colors.background};
    color: ${({theme}) => theme.colors.background};
    border-radius: 5px;
    font-weight: bold;
    font-size: 25px;
`
export default SlotsCounter
