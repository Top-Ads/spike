import React, { Fragment, FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Image from 'next/image'
import Divider from '../../Divider'
import { CDN } from '../../../public/environment'
import LazyLoad from 'react-lazyload'
import { Bonus } from '../../../interfaces'

type PageProps = {
   data: Bonus 
};

type BonusType = {
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
            <Main>
                <Name bgColor={data.backgroundColor}>
                    <Thumbnail>
                        <LazyLoad key={data.id} height={100} offset={200}>
                            <Image
                                alt={data.name}
                                src={data.circular_image.url}
                                layout="responsive"
                                priority={true}
                                width={150}
                                height={150}/>
                        </LazyLoad>
                    </Thumbnail>
                </Name>
        
                <BonusInfo>
                    <div className="bonus"> 
                        <Label>BONUS DI BENVENUTO</Label>
                        <Info>{data.description}</Info>
                    </div>

                    <div className="bonus">
                        <Label>BONUS SENZA DEPOSITO</Label>
                        <Info className="bonus-info">{data.withDeposit}</Info>
                    </div>
                </BonusInfo>

                <Divider width="90%"/>

                <Button bgColor={data.backgroundColor} onClick={linkToBonus}>ACEDI AL BONUS</Button>

                <PaymentProviders>
                    {paymentProviders. map( (provider, index) => 
                        <Provider key={index}>
                                <Image
                                    alt={provider}
                                    src={`${CDN}/svg/${provider}.svg`} 
                                    layout="responsive"
                                    quality={50}
                                    width={30}
                                    height={30}/>
                      </Provider>
                    )}
                </PaymentProviders>       
            
            </Main>
            
        </Fragment>
    ) 
}

const Main = styled.div<BonusType>`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
`

const BonusInfo = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 160px;
    font-size: 15px;

    .bonus {
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        max-height: 60px;
    }
`

const Label = styled.div `
    height: 20px;
    width: fit-content;
    border-bottom: 1px dashed;
    margin-bottom: 10px;
    font-size: 12px;
`

const Name = styled.div<BonusType> `
    width: 100%;
    background-color: ${({bgColor}) => bgColor ? bgColor : 'inherit'};
    color: ${({theme}) => theme.text.color.primary};
    border-radius: 5px 5px 0px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Button = styled.div<BonusType>`
    background-color: ${({bgColor}) => bgColor ? bgColor : 'inherit'};
    color: ${({theme}) => theme.text.color.primary};
    border-radius: ${({theme}) => theme.button.borderRadius};
    font-weight: bold;
    cursor: pointer;
    padding: 10px;
    width: max-content;
    margin: 10px 0px;

    &:hover {
        box-shadow: ${({theme}) => theme.button.boxShadowX};
    }
`

const PaymentProviders = styled.div `
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
`

const Provider = styled.div `
    height: 30px;
    width: 30px;
    margin: 0 5px;
`

const Thumbnail = styled.div`
    width: 100px;
`

const Info = styled.div`
    color: ${({theme}) => theme.text.color.secondary};
`

export default BonusCard
