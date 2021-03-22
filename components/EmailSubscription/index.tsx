import React, { Fragment } from 'react'
import styled from 'styled-components'
import TextInput from '../Inputs/Textfield'
import CheckboxInput from '../Inputs/Checkbox'

const EmailSubcription = () => { 
    
    return (
        <Fragment>
          <MainContainer>
            <div><p>Ricevi aggiornamenti ed anticipazioni sui nuovi video e su bonus e promozio.</p></div>

            <TextInput placeholder="Email" sm={true}/>
            <br/>
            <CheckboxInput 
              label={`Dichiaro di aver compiuto 18 anni e di dare il mio consenso per
                    ricevere aggiornamenti ed antecipazioni su video ed offerte promozionali
                    via email da Spikeslot.com.`}/>
            <br/>
            <ButtonContainer>ISCRIVTI</ButtonContainer>
          </MainContainer>
        </Fragment>
    ) 
}

const MainContainer = styled.div`
    background-color: ${({theme}) => theme.colors.primary};
    border: 2px solid #fff;
    border-radius: 10px;
    width: 270px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0px;
    color: #fff;
    padding: 10px;
`

const ButtonContainer = styled.div`
    padding: 10px 20px;
    background-color: #ffcc03;
    border: 1px solid #fff;
    border-radius: 4px;
    color: #000;
    cursor: pointer;

    &: active {
      color: #fff;
      background-color: ${({theme}) => theme.colors.primary};
    }
`

export default EmailSubcription
