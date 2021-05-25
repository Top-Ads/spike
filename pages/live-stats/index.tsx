import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import Layout from '../../components/Layout'

type PageProps = {
   data: any
};

const LiveStatsPage: FunctionComponent<PageProps> = () => {
    return (
        <Layout title="Live Stats">
            <Main>
                LiveStatsPage (still in development)
            </Main>
        </Layout>
    )
} 

const Main = styled.div`
   
`
export default LiveStatsPage
