import React, { Fragment, FunctionComponent, useEffect, useState } from 'react'
import styled from 'styled-components';

type PageProps = {
   data: any,
   triggerCollpase: Function,
   collapse: boolean
};

type AnswerContainerType = { 
    show: boolean
}
const QuestionCard: FunctionComponent<PageProps> = ({data, triggerCollpase, collapse}) => { 
    
    const [ show, setShow] = useState<boolean>(false)
    const [ clicked, setClicked] = useState<boolean>(false)

    const handleClick = () => {
        triggerCollpase(true)
        setClicked(!clicked)
    }

    useEffect(() => {
        if (collapse) {
            setShow(false)
        }   
    }, [collapse])

    useEffect(() => {
        if(clicked) {
            setShow(!show)
            setClicked(false)
            triggerCollpase(false)
        }
    }, [clicked])

    return (
        <Fragment>
            <MainContainer onClick={handleClick}>

                <QuestionContainer>{data.question}</QuestionContainer>

                <AnswerContainer show={show}><p>{data.answer}</p></AnswerContainer>

            </MainContainer>

        </Fragment>
    ) 
}

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    cursor: pointer;
    justify-content: center;
`

const QuestionContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    padding: 10px;
`

const AnswerContainer = styled.div<AnswerContainerType>`
    max-height: ${({show}) => show ? '310px' : '0px'};
    overflow: hidden;
    transition: max-height 0.2s linear;
    text-align: left;
    
    p {
        margin: 12px;
        color: inherit;
        font-style: italic;
        font-weight: lighter;
    }
`

export default QuestionCard
