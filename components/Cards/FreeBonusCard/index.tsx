import React, { Fragment, FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styled from 'styled-components'
import LazyLoad from 'react-lazyload'
import { Bonus } from '../../../lib/schemas'
import { replaceAll } from '../../../lib/utils/replaceAll'

type Props = {
    data: Bonus 
 };

 type BonusType = {
    bgColor?: string
}

const FreeBonusCard: FunctionComponent<Props> = ({data}) => { 
    const router = useRouter()

    const linkToBonus = () => {
        router.push(data.link)
    }

    return (
        <Fragment>
            <Main>
                <Thumbnail>
                    <LazyLoad key={data.id} height={60} offset={200}>
                        <Image
                            alt={data.name}
                            src={data.circular_image.url}
                            layout="responsive"
                            priority={true}
                            width={150}
                            height={150}/>
                    </LazyLoad>
                </Thumbnail>

                <Container>
                    <Name><strong>{data.name}</strong></Name>
                    <Info dangerouslySetInnerHTML={{__html: String(replaceAll(data.description, "+", "<br/>"))}}/> 
                </Container>

                <Button bgColor={data.backgroundColor} onClick={linkToBonus}>SITO WEB</Button>
            </Main>
        </Fragment>
    ) 
}

const Main = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 11px;
    border-bottom: 1px solid ${({theme}) => theme.palette.gradient};
    padding: 10px 0px;

    &:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }
`

const Thumbnail = styled.div`
    width: 60px;
    border-radius: ${({theme}) => theme.button.borderRadius};
    overflow: hidden;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    text-align: left;
    flex-grow: 2;
    width: min-content;
    padding: 0px 5px;
`

const Name = styled.div`
   text-transform: uppercase;
`

const Info = styled.div `
    color: inherit;
    padding: 5px 5px;
    font-size: 12px;
    font-weight: normal;
`

const Button = styled.div<BonusType>`
    color: ${({theme}) => theme.text.color.white};
    background-color: ${({bgColor}) => bgColor ? bgColor : 'inherit'};
    border-radius: ${({theme}) => theme.button.borderRadius};
    font-weight: bold;
    cursor: pointer;
    padding: 10px;
    width: min-content;
`

export default FreeBonusCard
