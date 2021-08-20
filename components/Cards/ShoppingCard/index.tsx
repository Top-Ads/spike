import React, { FunctionComponent } from 'react'
import { Fragment } from 'react'
import styled from 'styled-components'

type Props = {
   data: any
};

const ShoppingCard: FunctionComponent<Props> = () => {
    return (
        <Fragment>
            <Main> Shopping Card</Main>
        </Fragment>
    )
} 

const Main = styled.div`
   
`
export default ShoppingCard
