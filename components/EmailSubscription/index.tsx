import React, { Fragment } from 'react'
import styled from 'styled-components'
import CustomTextField from '../Inputs/Textfield'
import CustomCheckbox from '../Inputs/Checkbox'
import { device } from '../../utils/device'

const EmailSubcription = () => { 
    
    return (
        <Fragment>
          <Main>
            <p>Ricevi aggiornamenti ed anticipazioni sui nuovi video e su bonus e promozio.</p>

            <CustomTextField onChange={(text: string) => console.log('onchange', text)} placeholder="Email" size='small'/>

            <br/>

            <CustomCheckbox 
              label={`Dichiaro di aver compiuto 18 anni e di dare il mio consenso per
                    ricevere aggiornamenti ed antecipazioni su video ed offerte promozionali
                    via email da Spikeslot.com.`}/>

            <br/>

            <Button>ISCRIVTI</Button>
          </Main>
        </Fragment>
    ) 
}

const Main = styled.div`
    background-color: ${({theme}) => theme.colors.background};
    border: 2px solid #fff;
    border-radius: 10px;
    max-width: 270px;

    @media ${device.mobileS} {
      max-width: 235px;
    }

    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0px;
    padding: 10px;

    p { color: ${({theme}) => theme.text.color.primary}; }
`

const Button = styled.div`
    padding: 10px 20px;
    background-color: #ffcc03;
    border: 1px solid ${({theme}) => theme.text.color.primary};
    border-radius: ${({theme}) => theme.button.borderRadius};
    color: ${({theme}) => theme.text.color.secondary};
    cursor: pointer;

    &:hover {
      box-shadow: 0px 0px 5px 5px rgba(33,37,41,0.4);
  }
`

export default EmailSubcription
