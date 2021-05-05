import React, { FunctionComponent } from 'react'
import { Fragment } from 'react';
import styled from 'styled-components'
import { Producer } from '../../../pages/api/graphql/schemas/producer'

type PageProps = {
    data: Producer 
};

const ProviderList: FunctionComponent<PageProps> = ({data}) => {
    return (
        <Fragment>
            <Main>Provider Card {data.name} </Main>
        </Fragment>
    )
} 

const Main = styled.div`
   
`
export default ProviderList
