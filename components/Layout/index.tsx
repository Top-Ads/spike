import React, { Fragment, ReactNode } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { device } from '../../lib/utils/device'
import Footer from '../Footer'
import ScrollButton from '../ScrollButton'
import StickyBanner from '../StickyBanner'
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
      
      <header>
        <BrowserView>
          <Header isBrowserView={true}/>
        </BrowserView>

        <MobileView>
          <Header isBrowserView={false}/>
        </MobileView>
      </header>
      
      <MarginHeader/>

      <Main>
        {children}
      </Main>

      <Footer/>
      
      <ScrollButton/>

      <StickyBanner/>

    </Fragment>
  )
}

export default Layout

const Main = styled.div`

  .layout-container {
    padding: 0px 7%;

    @media ${device.tablet} {
      padding: 0px 2% 5px;
    }
  }
  
  .topBonus {
    background-image: ${({theme}) => theme.palette.backgroundImage};
    color: #fff;
  }
`

const MarginHeader = styled.div`
  display: none;
  width: min-content;
  
  @media ${device.tablet} {
    display: block;
    height: 75px;
  }
  
  @media ${device.mobileL} {
    display: block;
    height: 65px;
  }
`

const BrowserView = styled.div`
  display: revert;

  @media ${device.tablet} {
    display: none;
  } 
`

const MobileView = styled.div`
  display: none;

  @media ${device.tablet} {
      display: revert;
  } 
`