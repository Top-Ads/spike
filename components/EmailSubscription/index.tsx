import React, { Fragment } from 'react'
import styled from 'styled-components'
import CustomTextField from '../Commons/Inputs/Textfield'
import CustomCheckbox from '../Commons/Inputs/Checkbox'
import { device } from '../../lib/utils/device'
import { useState } from 'react'
import { subscribeToChannel } from '../../lib/api'
import { useEffect } from 'react'
import { delay } from "lodash"
import { useTranslation } from 'react-i18next'

type MainProps = {
  showLog: boolean
}

const EmailSubcription = () => { 
  
    const { t } = useTranslation()

    const [email, setEmail] = useState<string>('')
    const [showLog, setShowLog] = useState<boolean>(false)
    const [log, setLog] = useState<string>('')
    const [isChecked, setChecked] = useState<boolean>(false)
    
    const onSubmit = () => {

      const body = JSON.stringify({updateEnabled: false, email: email})

      if (!isChecked){ 
        setLog('please tick policy message')
        setShowLog(true)
        return 
      }
      else {
        subscribeToChannel(body)
        .then(() => {
          setLog('Successfully subscribed')
          delay(() => {
            setEmail('')
            setChecked(false)
          }, 1000)
        })
        .catch( (error: any) => {
          if (error.response) setLog(error.response.data.message)
        })
  
        setShowLog(true)
      }
    }

    useEffect( () => {
        if(!email) setShowLog(false)
    }, [email])

    const handleOnCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked)
    }
    return (
        <Fragment>
          <Main showLog={showLog}>
            <p>{t("Ricevi aggiornamenti ed anticipazioni sui nuovi video e su bonus e")} <b>{t("promozio. ")}</b></p>

            <CustomTextField onChange={setEmail} value={email} placeholder="Email" size={'small'}/>        
            <br/>

            <CustomCheckbox 
              isChecked={isChecked}
              handleOnCheck={handleOnCheck}
              label={t("Dichiaro di aver compiuto 18 anni e di dare il mio consenso per") +
                    t("ricevere aggiornamenti ed antecipazioni su video ed offerte promozionali") +
                    t("via email da casinosquad.com. ")}/>

            <br/>

            <Button onClick={onSubmit}>{t("ISCRIVITI")}</Button>

            <div className='log-msg'> {log} </div>

          </Main>
        </Fragment>
    ) 
}

const Main = styled.div<MainProps>`
    background-color: ${({theme}) => theme.palette.background};
    border: 2px solid #fff;
    border-radius: 10px;
    max-width: 270px;
    position: relative;

    @media ${device.mobileS} {
      max-width: 235px;
    }

    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0px;
    padding: 10px;

    p { color: ${({theme}) => theme.text.color.white}; }

    .log-msg {
      opacity: ${({showLog}) => showLog ? 1 : 0 };
      transition: opacity 0.5s ease-in-out;
      color: #4ECA5C;
      font-size: 0.8rem;
      font-weight: 600;
      margin-top: 5px;
    }
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
