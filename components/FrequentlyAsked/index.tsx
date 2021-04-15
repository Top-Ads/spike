import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import QuestionCard from '../Cards/QuestionCard'
import EmailSubcription from '../EmailSubscription'
import GridSlots from '../GridSlots'
import { frequentlyAsked } from './mock'

const FreqentlyAsked = () => { 

    const [collapse, setCollapse] = useState<boolean>(true)

    return (
        <Fragment>
            <MainContainer>

                <QuestionsContainer>
                    <HeaderContainer>DOMANDE FREQUENTI</HeaderContainer>
                    <GridSlots 
                        data={ frequentlyAsked.map( (data: any) => 
                            <QuestionCard 
                                collapse={collapse} 
                                triggerCollpase={(collapse: boolean) => setCollapse(collapse)}
                                data={data}/> )}
                        width={'auto'}
                        xs={12} sm={6} md={6}
                        disableBorderRadius={true}
                        disableBoxShadow={true}/>
                </QuestionsContainer>

                <SubcriptionContainer>
                    <EmailSubcription/>
                </SubcriptionContainer>

            </MainContainer>
        </Fragment>
    )
}

const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0 10%;
    background-image: linear-gradient(180deg, ${({theme}) => theme.colors.primary} 0%, ${({theme}) => theme.colors.gradient} 50%);

`

const HeaderContainer = styled.h2`
    text-align: center;
    color: #fff;
`

const QuestionsContainer = styled.div`
    flex-grow: 2;
    width: 400px;
`

const SubcriptionContainer = styled.div`
    flex-grow: 1;
    justify-content: center;
    align-items: baseline;
    display: flex;
`

export default FreqentlyAsked
