import React, { FunctionComponent } from 'react'
import { Fragment } from 'react'
import styled from 'styled-components'

type PageProps = {
   data: any
};

const DiceRollTable: FunctionComponent<PageProps> = () => {
    return (
        <Fragment>
            <Main> DiceRollTable</Main>
        </Fragment>
    )
} 

const Main = styled.div`
   
`
export default DiceRollTable
