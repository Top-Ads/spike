import React, { Fragment, FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Image from 'next/image'
import Divider from '../../Commons/Divider'
import { CDN } from '../../../public/environment'
import LazyLoad from 'react-lazyload'
import { Bonus } from '../../../lib/schemas'
import RatingStars from '../../RatingStars'
import { device } from '../../../lib/utils/device'
import { injectCDN } from '../../../lib/utils/injectCDN'

type Props = {
   data: Bonus 
};

type BonusType = {
    bgColor?: string
}

type ThumbnailProps = {
    borderColor?: string
}

const BonusCard: FunctionComponent<Props> = ({data}) => { 
    
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
                                src={injectCDN(data.circular_image.url)}
                                layout="responsive"
                                priority={true}
                                width={150}
                                height={150}
                                sizes={"30vw"}/>
                        </LazyLoad>
                    </Thumbnail>
                    <div style={{textAlign: 'left' }}>
                        <h2 className="name">{data.name}</h2>
                        <RatingStars rating={data.rating}/>
                    </div>
                   
                </BonusHeader>
        
                <BonusBody>
                    <div className="bonus"> 
                        <div className="label">BONUS CON DEPOSITO</div>
                        <div className="info" dangerouslySetInnerHTML={{__html: String(data.withDeposit.replace("+", "<br/>"))}}/> 
                    </div>

                    <div className="bonus">
                        <div className="label">BONUS SENZA DEPOSITO</div>
                        <div className="info" dangerouslySetInnerHTML={{__html: String(data.noDeposit.replace("+", "<br/>"))}}/> 
                    </div>
                </BonusBody>

                <Divider width="90%"/>

                <LicenceContainer>
                    <div className="licence-icon">
                        <Image
                            alt="licence ADM"
                            src={`${CDN}/svg/adm.svg`}
                            layout="responsive"
                            quality={50}
                            priority={true}
                            sizes={"30vw"}
                            width={1141}
                            height={760}/>
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
                                    sizes={"30vw"}
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

const BonusBody = styled.div `
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 130px;
    width: 100%;

    .bonus {
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 50%;
        font-size: 12px;
    }
    .info {
        color: ${({theme}) => theme.text.color.black};
        text-align: left;
        font-size: 13px;
        font-weight: 600;
    }
    .label {
        height: 20px;
        width: fit-content;
        margin-bottom: 20px;
        font-size: 12px;
        color:  ${({theme}) => theme.palette.background};
        text-align: left;
    }
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

    h2.name {
        margin: 0 auto;

        @media ${device.tablet} {
            font-size: 1.3rem;
        }

        @media ${device.mobileL} {
            font-size: 1.7rem;
        }
    }
`

const Button = styled.div<BonusType>`
    background-color: ${({bgColor}) => bgColor ? bgColor : 'inherit'};
    color: ${({theme}) => theme.text.color.white};
    border-radius: ${({theme}) => theme.button.borderRadius};
    font-weight: bold;
    cursor: pointer;
    padding: 10px;
    width: fill-available;
    margin: 10px 20px;
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
    width: 80px;
    border-radius: 50%;
    overflow: hidden;
    margin: 10px;
    border: 2px solid ${({borderColor}) => borderColor ? borderColor : 'unset'};
`

export default BonusCard
