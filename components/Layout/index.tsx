import React, { Fragment, ReactNode, useRef } from 'react'
import Head from 'next/head'
import Header from '../Header'
import styled from 'styled-components'
import { device } from '../../utils/device'
import ScrollButton from '../ScrollButton'

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

      <MainContainer>
        {children}
      </MainContainer>

      <ScrollButton eleRef={eleRef}/>
      
    </Fragment>
  )
}

export default Layout

const MainContainer = styled.div`
  .space-around {
    padding: 10px 10%;

    @media ${device.tablet} {
      padding: 10px 5%;
    }
  } 
`