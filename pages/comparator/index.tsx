import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import Layout from '../../components/Layout'

const ComparatorPage = () => { 
    
    return (
        <Layout title="I migliori Casinò e Slot Machine Online con le nuove offerte Casino Bonus">
            <Head>
                <meta 
                property="og:description" 
                content="Scegli tra i migliori giochi online, confronta Bonus di Benvenuto Senza Deposito, promozioni e altre funzionalità utili per vincere. Bonus per i Nuovi Giocatori." 
                key="description"/>
            </Head>
            <Main>
                <Iframe 
                    loading="lazy" 
                    src="https://casinosquad.toply.info/compare?options=leovgs-starcsn-goldbt-888-btflg-kingcsn-netbt"
                    width="1200"
                    height="1730"
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

export default ComparatorPage
