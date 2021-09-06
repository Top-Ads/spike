import React, { Fragment, FunctionComponent } from 'react'
import styled from 'styled-components'
import { Slot } from '../../lib/schemas'
import { device } from '../../lib/utils/device'

type Props = {
   data: Slot
   triggerGame: Function
}

const StartGame: FunctionComponent<Props> = ({data, triggerGame}) => {

    return (
        <Fragment>
        <Main>
            <Title>{data.name}</Title>

            <h3>by {data.producer.name}</h3>

            <LegalText>
                By clicking on Start the Game, you confirm that you are at least 18 years old.
            </LegalText>

            <Button onClick={ () => triggerGame()}>
                <span>START THE GAME</span>
            </Button>

        </Main>
    </Fragment>

)}

const Main = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
`

const Title = styled.h2` 
    margin-bottom: 0px;
    text-align: center;
`

const LegalText = styled.div`
    border: 1px solid white;
    border-radius: 10px;
    font-size: 0.7rem;
    padding: 3px;
    text-align: center;

    @media ${device.mobileL} {
        width: 90%;
    }
`

const Button = styled.div`
    background-color: #cda65f;
    color: #fff;
    border-radius: ${({theme}) => theme.button.borderRadius};
    font-weight: bold;
    cursor: pointer;
    padding: 20px;
    width: fit-content;
    text-transform: uppercase;
    margin: 10px 0px;
`
  
export default StartGame
