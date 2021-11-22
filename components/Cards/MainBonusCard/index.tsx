import React, { Fragment, FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Image from 'next/image'
import Divider from '../../Divider'
import LazyLoad from 'react-lazyload'
import { Bonus } from '../../../lib/schemas'
import { replaceAll } from '../../../lib/utils/replaceAll'
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

const MainBonusCard: FunctionComponent<Props> = ({data}) => { 
    
    const router = useRouter()

    const linkToBonus = () => {
        router.push(data.link)
    }

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
                                sizes={"30vw"}
                                width={150}
                                height={150}/>
                        </LazyLoad>
                    </Thumbnail>
                    <span>{data.name}</span>
                </BonusHeader>
        
                <BonusInfo bgColor={data.backgroundColor} onClick={linkToBonus}>
                    <div dangerouslySetInnerHTML={{__html: String(replaceAll(data.description, "+", "<br/>"))}}/> 
                   
                    <div className="table-bonus">
                        { data.noDeposit !== '- - -' &&
                            <div className="row">
                            <div className="deposito">Senza Deposito</div>
                            <div className="value">{data.noDeposit}</div>
                        </div> }
                        { data.withDeposit !== '- - -' &&
                        <div className="row">
                            <div className="deposito">Con Deposito</div>
                            <div className="value">{data.withDeposit}</div>
                        </div> }
                    </div>
                    
                    <Button bgColor={data.backgroundColor}>SITO WEB</Button>

                </BonusInfo>

                <Divider/>


            </Main>
            
        </Fragment>
    ) 
}

const Main = styled.div<BonusType>`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
`

const BonusInfo = styled.div<BonusType>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    color: #fff;
    font-size: 0.75rem;
    
    div { 
        padding: 5px 0px;
    }

    .table-bonus {
        display: flex;
        justify-content: space-between;
        
        .row {
            width: 49%;
        }

        .deposito {
            color: #fff;
            background-color: ${({bgColor}) => bgColor ? bgColor : 'inherit'};
            text-align: center;
        }
    }
`

const BonusHeader = styled.div<BonusType> `
    width: 100%;
    background-color: ${({bgColor}) => bgColor ? bgColor : 'inherit'};
    color: ${({theme}) => theme.text.color.white};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    span {
        font-size: 1.8rem;
        font-weight: bold;
    }
`

const Button = styled.div<BonusType>`
    background-color: ${({bgColor}) => bgColor ? bgColor : 'inherit'};
    color: ${({theme}) => theme.text.color.white};
    border-radius: ${({theme}) => theme.button.borderRadius};
    font-weight: bold;
    cursor: pointer;
    width: 100%;
    padding: 10px;
    text-align: center;
`

const Thumbnail = styled.div<ThumbnailProps>`
    width: 80px;
    border-radius: 50%;
    overflow: hidden;
    margin: 5px 20px;
    border: 2px solid ${({borderColor}) => borderColor ? borderColor : 'unset'};
`


export default MainBonusCard
