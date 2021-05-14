import React, { FunctionComponent } from 'react'
import styled from 'styled-components';

type PageProps = {
   index: number
};

const RankingCard: FunctionComponent<PageProps> = ({index}) => <Main> {index} </Main>

const Main = styled.div`
    color: #fff;
    background-color: ${({theme}) => theme.colors.background};
    border-radius: 69px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`
export default RankingCard
