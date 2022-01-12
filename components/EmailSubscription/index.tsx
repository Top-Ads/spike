import React, { Fragment } from 'react'
import styled from 'styled-components'
import CustomTextField from '../Commons/Inputs/Textfield'
import CustomCheckbox from '../Commons/Inputs/Checkbox'
import { device } from '../../lib/utils/device'
import { useState } from 'react'
import { SMTP_APIKEY } from '../../public/environment'
import axios from "axios"

const EmailSubcription = () => { 
  
  const [email, setEmail] = useState<string>()

  const onSubmit = async () => {

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': SMTP_APIKEY
      },
      body: JSON.stringify({updateEnabled: false, email: email})
    };
    
    const response = await axios.post('https://api.sendinblue.com/v3/contacts', options)

    console.log(response)
 
  }

    return (
        <Fragment>
          <Main>
            <p>Ricevi aggiornamenti ed anticipazioni sui nuovi video e su bonus e <b>promozio.</b></p>

            <CustomTextField  onChange={setEmail}  placeholder="Email" size={'small'}/>        
            <br/>

            <CustomCheckbox 
              label={`Dichiaro di aver compiuto 18 anni e di dare il mio consenso per
                    ricevere aggiornamenti ed antecipazioni su video ed offerte promozionali
                    via email da casinosquad.com.`}/>

            <br/>

            <Button onClick={onSubmit}>ISCRIVITI</Button>
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
    background-color: wheat;
    border: 2px solid #fff;
    border-radius: ${({theme}) => theme.button.borderRadius};
    color: #4ECA5C;
    cursor: pointer;
    font-weight: bold;
`

export default EmailSubcription
