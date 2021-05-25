import React, { FunctionComponent } from 'react'
import { Fragment } from 'react'
import styled from 'styled-components'

type PageProps = {
   data: any
};

const StatsCard: FunctionComponent<PageProps> = () => {
    return (
        <Fragment>
            <Main> Stats Card</Main>
        </Fragment>
    )
} 

const Main = styled.div`
   
`
export default StatsCard
