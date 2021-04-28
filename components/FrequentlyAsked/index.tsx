import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { GridType } from '../../utils/constants'
import QuestionCard from '../Cards/QuestionCard'
import EmailSubcription from '../EmailSubscription'
import GridSlots from '../GridSlots'
import { frequentlyAsked } from './mock'

const FreqentlyAsked = () => { 

    const [collapse, setCollapse] = useState<boolean>(true)

    return (
        <Fragment>
            <Main>

                <Questions>
                    <Header>DOMANDE FREQUENTI</Header>
                    <GridSlots 
                        type={GridType.QUESTIONS}
                        content={ frequentlyAsked.map( (data: any) => 
                            <QuestionCard 
                                collapse={collapse} 
                                triggerCollpase={(collapse: boolean) => setCollapse(collapse)}
                                data={data}/> )}
                        xs={12} sm={6} md={6}
                        width={'auto'}
                        disableBorderRadius={true}
                        disableBoxShadow={true}
                    />
                </Questions>

                <Subcription>
                    <EmailSubcription/>
                </Subcription>

            </Main>
        </Fragment>
    )
}

const Main = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0 10%;
    background-image: linear-gradient(180deg, ${({theme}) => theme.colors.backGround} 0%, ${({theme}) => theme.colors.gradient} 50%);

`

const Header = styled.h2`
    text-align: center;
    color: #fff;
`

const Questions = styled.div`
    flex-grow: 2;
    width: 400px;
`

const Subcription = styled.div`
    flex-grow: 1;
    justify-content: center;
    align-items: baseline;
    display: flex;
`

export default FreqentlyAsked
