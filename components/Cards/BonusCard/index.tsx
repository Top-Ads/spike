import React, { Fragment, FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Bonus } from '../../../pages/api/interfaces'
import Image from 'next/image'
import Divider from '../../Divider'

type PageProps = {
   data: Bonus 
};

type BonusContainerType = {
    bgColor?: string
}

const BonusCard: FunctionComponent<PageProps> = ({data}) => { 
    
    const router = useRouter()

    const linkToBonus = () => {
        router.push(data.link)
    }

    const paymentProviders = ['visa', 'mastercard', 'paypal', 'postepay']

    return (
        <Fragment>
            <BonusContainer>
            
                <NameContainer bgColor={data.backgroundColor}>
                    <BonusImgContainer>
                        <Image
                            alt={data.name}
                            src={data.circular_image.url}
                            layout="responsive"
                            priority={true}
                            width={100}
                            height={'auto'}/>
                    </BonusImgContainer>
                </NameContainer>
        
                <MainContainer>
                    <div className="space-around"> 
                        <LabelContainer>BONUS DI BENVENUTO</LabelContainer>
                        <BonusInfo>{data.description}</BonusInfo>
                    </div>

                    <div className="space-around">
                        <LabelContainer>BONUS SENZA DEPOSITO</LabelContainer>
                        <BonusInfo className="bonus-info">{data.withDeposit}</BonusInfo>
                    </div>
                </MainContainer>

                <Divider color="#fff" width="90%"/>

                <ButtonContainer bgColor={data.backgroundColor} onClick={linkToBonus}>
                            ACEDI AL BONUS
                </ButtonContainer>

                <PaymentProviders>
                    {paymentProviders. map( (provider, index) => 
                        <PaymentImgContainer key={index}>
                            <Image
                                alt={provider}
                                src={'https://img.slotjava.it/wp-content/plugins/strove-casino/static/images/payment-providers/svg/' + provider + '.svg'} 
                                layout="responsive"
                                priority={true}
                                width={30}
                                height={30}/>
                      </PaymentImgContainer>
                    )}
                </PaymentProviders>       
            
            </BonusContainer>
        </Fragment>
    ) 
}

const BonusContainer = styled.div<BonusContainerType>`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
`

const MainContainer = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 200px;
      
    .space-around {
        padding: 10px 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`

const LabelContainer = styled.div `
    height: 20px;
    width: fit-content;
    border-bottom: 1px dashed;
    margin-bottom: 10px;
    font-size: 12px;
`

const NameContainer = styled.div<BonusContainerType> `
    width: 100%;
    background-color: ${({bgColor}) => bgColor ? bgColor : 'inherit'};
    color: ${({theme}) => theme.text.color.primary};
    border-radius: 10px 10px 0px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ButtonContainer = styled.div<BonusContainerType>`
    background-color: ${({bgColor}) => bgColor ? bgColor : 'inherit'};
    border: 1px solid #fff;
    color: ${({theme}) => theme.text.color.primary};
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    padding: 10px;
    width: max-content;
    margin: 10px 0px;

    &: hover {
        box-shadow: 0px 0px 5px 5px rgba(33,37,41,0.4);
        -webkit-box-shadow: 0px 0px 5px 5px rgba(33,37,41,0.4);
        -moz-box-shadow: 0px 0px 5px 5px rgba(33,37,41,0.4);
    }
`

const PaymentProviders = styled.div `
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
`

const PaymentImgContainer = styled.div `
    height: 30px;
    width: 30px;
    margin: 0 5px;
`

const BonusImgContainer = styled.div`
    width: 80px;
    margin: 10px 0px;
`

const BonusInfo = styled.div`
    color: ${({theme}) => theme.text.color.secondary};;
`

export default BonusCard
