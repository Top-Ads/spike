import React, { Fragment, ReactNode, useRef } from 'react'
import Head from 'next/head'
import Header from '../Header'
import styled from 'styled-components'
import { device } from '../../utils/device'
import ScrollButton from '../ScrollButton'
import LegalDisclaimer from '../LegalDisclaimer'

type Props = {
  children?: ReactNode
  title?: string,
}

const Layout = ({ children, title}: Props) => { 
  
  const eleRef = useRef<HTMLDivElement>(null)

  return (
    <Fragment>
      
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      
      <div ref={eleRef}/>

      <Header/>

      <Main>
        {children}
      </Main>

      <ScrollButton eleRef={eleRef}/>
    
      <LegalDisclaimer/>

    </Fragment>
  )
}

export default Layout

const Main = styled.div`
  padding-bottom: 70px;

  @media ${device.tablet} {
    padding: 70px 0px;
  }

  .space-around {
    padding: 10px 10%;

    @media ${device.tablet} {
      padding: 10px 2%;
    }
  } 
`