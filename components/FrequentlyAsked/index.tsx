import React, { Fragment } from 'react'
import styled from 'styled-components'
import QuestionCard from '../Cards/QuestionCard'
import EmailSubcription from '../EmailSubscription'
import GridSlots from '../GridSlots'
import { mockQuestions } from './mock'

const FreqentlyAsked = () => 
    <Fragment>
        <MainContainer>

            <QuestionsContainer>
                <HeaderContainer>DOMANDE FREQUENTI</HeaderContainer>
                <GridSlots 
                    data={ mockQuestions.map( (question) => <QuestionCard data={question}/> )}
                    width={'auto'}
                    height={'40px'}
                    xs={12} sm={6} md={6}
                    disableBorderRadius={true}
                    disableBoxShadow={true}
                    textAlign={"false"}
                    padding={true}/>
            </QuestionsContainer>

            <SubcriptionContainer>
                <EmailSubcription/>
            </SubcriptionContainer>

        </MainContainer>
    </Fragment>

const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0 10%;
    background-color: ${({theme}) => theme.colors.gradient};
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
    align-items: center;
    display: flex;
`

export default FreqentlyAsked
