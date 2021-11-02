import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import Layout from '../../components/Layout'

const ShopPage = () => { 
    
    return (
        <Layout title="Casino Squad | Shop Online">
             <Head>
                <meta 
                property="og:description" 
                content="Scegli tra gli sfiziosi gadget di Casino Squad shop online" 
                key="description"/>
            </Head>
            <Main>
                <Iframe 
                    loading="lazy" 
                    src="https://casino-squad.com/shop/"
                    width="100%"
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
