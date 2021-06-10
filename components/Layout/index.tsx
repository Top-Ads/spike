import React, { Fragment, ReactNode } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { device } from '../../utils/device'
import Footer from '../Footer'
import ScrollButton from '../ScrollButton'
import LegalDisclaimer from '../LegalDisclaimer'
import Header from '../Header'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ( {children, title}: Props) => { 
    
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <link rel="manifest" href="/manifest.json"/>
        <meta name="theme-color" content="#e2b96d"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="#e2b96d"></meta>
      </Head>
      
      <BrowserView>
        <Header isBrowserView={true}/>
      </BrowserView>

      <MobileView>
        <Header isBrowserView={false}/>
      </MobileView>
     
      <MarginHeader/>

      <Main>
        {children}
      </Main>

      <Footer/>
      
      <ScrollButton/>

      <LegalDisclaimer/>

    </Fragment>
  )
}

export default Layout

const Main = styled.div`

  .space-around {
    padding: 10px 10%;

    @media ${device.tablet} {
      padding: 10px 2%;
    }
  } 
`

const MarginHeader = styled.div`
  display: none;
  width: min-content;
  
  @media ${device.tablet} {
    display: block;
    height: 100px;
  }

  @media ${device.mobileL} {
    display: block;
    height: 70px;
  }
`

const BrowserView = styled.header`
  display: revert;

  @media ${device.tablet} {
    display: none;
  } 
`

const MobileView = styled.header`
  display: none;

  @media ${device.tablet} {
      display: revert;
  } 
`