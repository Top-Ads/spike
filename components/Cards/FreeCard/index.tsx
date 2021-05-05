import React, { Fragment, FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styled from 'styled-components'
import LazyLoad from 'react-lazyload'
import { Bonus } from '../../../pages/api/graphql/schemas/bonus'

type PageProps = {
    data: Bonus 
 };

 type BonusType = {
    bgColor?: string
}

const FreeCard: FunctionComponent<PageProps> = ({data}) => { 
    
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
                            width={60}
                            height={'auto'}/>
                    </LazyLoad>
                </Thumbnail>

                <Container>
                    <Name><strong>{data.name}</strong></Name>
                    <Info>{data.description}</Info>
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
    font-size: 12px;
    border-bottom: 1px solid ${({theme}) => theme.colors.gradient};
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
    color: ${({theme}) => theme.text.color.secondary};
    padding: 5px 0px;
`

const Button = styled.div<BonusType>`
    color: ${({theme}) => theme.text.color.primary};
    background-color: ${({bgColor}) => bgColor ? bgColor : 'inherit'};
    border-radius: ${({theme}) => theme.button.borderRadius};
    font-weight: bold;
    cursor: pointer;
    padding: 10px;
    width: min-content;

    &:hover {
        box-shadow: ${({theme}) => theme.button.boxShadowX};
    }
`

export default FreeCard
