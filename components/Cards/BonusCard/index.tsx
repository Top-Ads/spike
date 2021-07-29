import React, { Fragment, FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Image from 'next/image'
import Divider from '../../Divider'
import { CDN } from '../../../public/environment'
import LazyLoad from 'react-lazyload'
import { Bonus } from '../../../interfaces'
import RatingStars from '../../RatingStars'

type PageProps = {
   data: Bonus 
};

type BonusType = {
    bgColor?: string
}

type ThumbnailProps = {
    borderColor?: string
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
                <BonusHeader bgColor={data.backgroundColor}>
                    <Thumbnail borderColor={data.borderColor}>
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
                    <div style={{textAlign: 'left' }}>
                        <span>{data.name}</span>
                        <RatingStars rating={data.rating}/>
                    </div>
                   
                </BonusHeader>
        
                <BonusInfo>
                    <div className="bonus"> 
                        <Label>BONUS DI BENVENUTO</Label>
                        <Info dangerouslySetInnerHTML={{__html: String(data.description.replace("+", "<br/>"))}}/> 
                    </div>

                    <div className="bonus">
                        <Label>BONUS SENZA DEPOSITO</Label>
                        <Info className="bonus-info" dangerouslySetInnerHTML={{__html: String(data.noDeposit.replace("+", "<br/>"))}}/> 
                    </div>
                </BonusInfo>

                <Divider width="90%"/>

                <LicenceContainer>
                    <div className="licence-icon">
                        <Image
                            alt="licence ADM"
                            src={`${CDN}/svg/adm.svg`}
                            layout="responsive"
                            quality={50}
                            priority={true}
                            width={'1141'}
                            height={'760'}/>
                    </div>

                    <span> Licenza ADM</span>

                </LicenceContainer>
                
                

                <Button bgColor={data.backgroundColor} onClick={linkToBonus}>ACCEDI AL BONUS</Button>

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
    flex-direction: row;
    justify-content: center;
    height: 130px;
    font-size: 12px;
    
    .bonus {
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 50%;
    }
`

const Label = styled.div `
    height: 20px;
    width: fit-content;
    margin-bottom: 20px;
    font-size: 12px;
    color:  ${({theme}) => theme.color.background};
    text-align: left;
`

const BonusHeader = styled.div<BonusType> `
    width: 100%;
    background-color: ${({bgColor}) => bgColor ? bgColor : 'inherit'};
    color: ${({theme}) => theme.text.color.white};
    border-radius: 5px 5px 0px 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    span {
        font-size: 20px;
    }
`

const Button = styled.div<BonusType>`
    background-color: ${({bgColor}) => bgColor ? bgColor : 'inherit'};
    color: ${({theme}) => theme.text.color.white};
    border-radius: ${({theme}) => theme.button.borderRadius};
    font-weight: bold;
    cursor: pointer;
    padding: 10px;
    width: max-content;
    margin: 10px 0px;

    &:hover {
        
    }
`

const LicenceContainer = styled.div`
    display: flex;
    align-items: center;

    .licence-icon {
        width: 25px;
    }

    span {
        font-size: 11px;
        font-weight: normal;
        margin-left: 3px;
    }
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

const Thumbnail = styled.div<ThumbnailProps>`
    width: 90px;
    border-radius: 50%;
    overflow: hidden;
    margin: 10px 20px;
    border: 2px solid ${({borderColor}) => borderColor ? borderColor : 'unset'};
`

const Info = styled.div`
    color: ${({theme}) => theme.text.color.black};
    text-align: left;
    font-size: 14px;
`

export default BonusCard
