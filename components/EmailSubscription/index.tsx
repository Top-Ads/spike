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

            <CustomTextField /* onChange={(text: string) => console.log('onchange', text)} */ placeholder="Email" size={'small'}/>

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
    background-color: ${({theme}) => theme.palette.background};
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

    p { color: ${({theme}) => theme.text.color.white}; }
`

const Button = styled.div`
    padding: 10px 20px;
    background-color: #cda65f;
    border: 1px solid ${({theme}) => theme.text.color.white};
    border-radius: ${({theme}) => theme.button.borderRadius};
    color: ${({theme}) => theme.text.color.white};
    cursor: pointer;
    font-weight: bold;

    &:hover {
     
    }
`

export default EmailSubcription
