import React, { Fragment, ReactNode } from 'react'
import Head from 'next/head'
import Header from '../Header'
import styled from 'styled-components'
import { device } from '../../utils/device'

type Props = {
  children?: ReactNode
  title?: string,
}

const Layout = ({ children, title}: Props) => (
  <Fragment>
    
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
      
    <Header/>

    <MainContainer>
      {children}
    </MainContainer>

  </Fragment>
)

export default Layout

const MainContainer = styled.div`
  .spaceAround {
    padding: 10px 10%;

    @media ${device.mobileL} {
      padding: 10px 5%;
    }
  } 
`