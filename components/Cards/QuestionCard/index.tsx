import React, { Fragment, FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import styled from 'styled-components'

type Props = {
   data: any,
   triggerCollpase: Function,
   collapse: boolean
};

type AnswerType = { 
    show: boolean
}
const QuestionCard: FunctionComponent<Props> = ({data, triggerCollpase, collapse}) => { 
    
    const { t } = useTranslation()
    
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
            <Main onClick={handleClick}>

                <Question>{t(data.question)}</Question>

                <Answer show={show}><p>{t(data.answer)}</p></Answer>

            </Main>
        </Fragment>
    ) 
}

const Main = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    cursor: pointer;
    justify-content: center;
    color: #fff;
`

const Question = styled.div`
    display: inherit;
    align-items: center;
    justify-content: center;
    height: 60px;
    padding: 10px;
`

const Answer = styled.div<AnswerType>`
    max-height: ${({show}) => show ? '500px' : '0px'};
    overflow: hidden;
    transition: max-height 0.2s ease-in-out;
    text-align: left;
    
    p {
        margin: 12px;
        color: inherit;
        font-style: italic;
        font-weight: lighter;
    }
`

export default QuestionCard
