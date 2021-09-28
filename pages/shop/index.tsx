import React from 'react'
import styled from 'styled-components'
import Layout from '../../components/Layout'

const ShopPage = () => { 
    
    return (
        <Layout title="Shop">
            <Main>
                <Iframe 
                    loading="lazy" 
                    src="https://casino-squad.com/shop/"
                    width="1290"
                    height="2600"
                    allow="fullscreen"
                />
            </Main>
        </Layout>
    ) 
}

const Main = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: #2B2B2B;
`

const Iframe = styled.iframe`
    border: 0;
    margin: 0;
    padding: 0;
`

export default ShopPage
