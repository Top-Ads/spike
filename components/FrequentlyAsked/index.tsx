import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { GridType } from '../../lib/utils/constants'
import QuestionCard from '../Cards/QuestionCard'
import EmailSubcription from '../EmailSubscription'
import GridCards from '../GridCards'
import { frequentlyAsked } from '../../assets/mockFrequentlyAsked'

const FreqentlyAsked = () => { 

    const [collapse, setCollapse] = useState<boolean>(true)

    return (
        <Fragment>
            <Main>

                <Questions>
                    <Header>DOMANDE FREQUENTI</Header>
                    <GridCards 
                        type={GridType.QUESTIONS}
                        content={ frequentlyAsked.map( (data: any) => 
                            <QuestionCard 
                                collapse={collapse} 
                                triggerCollpase={(collapse: boolean) => setCollapse(collapse)}
                                data={data}/> )}
                        xs={12} sm={6} md={6}
                        disableBorderRadius
                        bgColor={'#e2b96d'}
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
    padding: 0 10% 5px;
    background-image: linear-gradient(180deg, rgba(226,185,109,0.8)  0%, rgb(224 198 133) 50%);
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
