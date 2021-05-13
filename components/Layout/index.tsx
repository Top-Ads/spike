import React, { Fragment, ReactNode } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { device } from '../../utils/device'
import Header from '../Header'
import Footer from '../Footer'
import ScrollButton from '../ScrollButton'
import LegalDisclaimer from '../LegalDisclaimer'

type Props = {
  children?: ReactNode
  title?: string,
}

const Layout = ({ children, title}: Props) => { 
  
  return (
    <Fragment>
      
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      
      <Header/>

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