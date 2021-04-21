import React, { FunctionComponent } from 'react'
import styled from 'styled-components';

type PageProps = {
   index: number
};

const RankingCard: FunctionComponent<PageProps> = ({index}) => <Main> {index} </Main>

const Main = styled.div`
    border: 2px solid #ff1313;
    color: #fff;
    background-color: #ff1313;
    border-radius: 69px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`
export default RankingCard
