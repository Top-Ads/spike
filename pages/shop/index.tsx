import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import Layout from '../../components/Layout'

const ShopPage = () => { 
    
    return (
        <Layout title="Acquista nello shop online i gadget di Casino Squad">
             <Head>
                <meta 
                property="og:description" 
                content="Compra gli autentici gadget di Casino Squad nello shop dedicato in tutta sicurezza al miglior prezzo. Magliette, borse, felpe, porta chiavi: tutto griffato CASINO SQUAD! Consegna a domicilio garantita!" 
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
