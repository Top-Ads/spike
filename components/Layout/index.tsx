import React, { Fragment, ReactNode } from 'react'
import Head from 'next/head'
import Header from '../Header'
import styled from 'styled-components'

type Props = {
  children?: ReactNode
  title?: string
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
const MainContainer = styled. div`
  margin: 0 ${(props) => props.theme.sideSpace};
`