import React, { FunctionComponent } from 'react'
import { Fragment } from 'react'
import styled from 'styled-components'

type PageProps = {
   data: any
};

const NotificationCard: FunctionComponent<PageProps> = () => {
    return (
        <Fragment>
            <Main> Notification Card</Main>
        </Fragment>
    )
} 

const Main = styled.div`
   
`
export default NotificationCard
