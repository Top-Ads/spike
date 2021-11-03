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
                    src="https://casinosquad.myspreadshop.it/"
                    width="100%"
                    height="3000"
                    allow="fullscreen"
                />
            </Main>
        </Layout>
    ) 
}

const Main = styled.div`
    display: flex;
    justify-content: center;
    background-color: #2B2B2B;
    padding: 0 10%;
`

const Iframe = styled.iframe`
    border: 0;
    margin: 0;
    padding: 0;
`

export default ShopPage
