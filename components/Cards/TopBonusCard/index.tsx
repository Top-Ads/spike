import React, { Fragment, FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Bonus } from '../../../pages/api/interfaces';
import StarOutlineIcon from '@material-ui/icons/StarOutline'
import StarIcon from '@material-ui/icons/Star'
import Image from 'next/image'
import Divider from '../../Divider';

type PageProps = {
   data: Bonus 
};

type BonusContainerType = {
    bgColor?: string,
    borderColor?: string
}
const TopBonusCard: FunctionComponent<PageProps> = ({data}) => { 
    
    const router = useRouter()

    const linkToBonus = () => {
        router.push(data.link)
    }

    const paymentProviders = ['visa', 'mastercard', 'paypal', 'postepay']

    return (
        <Fragment>
            <BonusContainer borderColor={data.borderColor}>
                
                <RatingContainer>
                    { [...Array(5)].map( (_value, index) =>
                    data.rating > index ? 
                    <StarIcon key={index} className="star-icon"/> : <StarOutlineIcon key={index} className="star-icon"/>)}
                </RatingContainer>

                <NameContainer bgColor={data.backgroundColor}> <h2>{data.name}</h2> </NameContainer>

                <MainContainer>  
                    <div className="space-around"> 
                        <LabelContainer>BONUS DI BENVENUTO</LabelContainer>
                        <div>{data.description}</div>
                    </div>

                    <div className="space-around">
                        <LabelContainer>BONUS SENZA DEPOSITO</LabelContainer>
                        <div>{data.withDeposit}</div>
                    </div>
                </MainContainer>

                <Divider color="#fff" width="90%"/> 

                <ButtonContainer bgColor={data.backgroundColor} borderColor={data.borderColor} onClick={linkToBonus}>
                            ACEDI AL BONUS
                </ButtonContainer>

                <PaymentProviders>
                    {paymentProviders. map( (provider, index) => 
                        <ThumbnailContainer key={index}>
                            <Image
                                alt={provider}
                                src={'https://img.slotjava.it/wp-content/plugins/strove-casino/static/images/payment-providers/svg/' + provider + '.svg'} 
                                layout="responsive"
                                priority={true}
                                width={30}
                                height={30}/>
                      </ThumbnailContainer>
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
    height: 70%;
    
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
    color: white;
    border-radius: 10px 10px 0px 0px;
`

const RatingContainer = styled.div `
    position: absolute;
    top: 7px;
    left: 7px;

    .star-icon {
        font-size: 17px;
        color: ${({theme}) => theme.colors.primary};
    }
`

const ButtonContainer = styled.div<BonusContainerType>`
    background-color: ${({bgColor}) => bgColor ? bgColor : 'inherit'};
    border-color: ${({borderColor}) => borderColor ? borderColor : 'unset'};
    border-width: ${({borderColor}) => borderColor ? '2px' : '0px'};
    border-style: ${({borderColor}) => borderColor ? 'solid' : 'unset'};
    color: #fff;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    padding: 10px;
    width: fit-content;
    margin: 10px 0px;

    &: hover {
        color: #000;
    }
`

const PaymentProviders = styled.div `
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
`

const ThumbnailContainer = styled.div `
    height: 30px;
    width: 30px;
    margin: 0 5px;
`

export default TopBonusCard
