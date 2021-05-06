import React, { FunctionComponent } from 'react'
import { Fragment } from 'react';
import Image from 'next/image'
import styled from 'styled-components'
import { Producer } from '../../../pages/api/graphql/schemas/producer'
import LazyLoad from 'react-lazyload';
import { CDN } from '../../../public/environment';

type PageProps = {
    data: Producer 
};

const ProducerCard: FunctionComponent<PageProps> = ({data}) => {
   
    return (
        <Fragment>
            <Main>
                <Thumbnail>
                    <LazyLoad key={data.id} height={60} offset={200}>
                        <Image
                            alt={data.name}
                            src={data.image[0] ? data.image[0].url : `${CDN}/svg/no_img_available.svg`}
                            layout="responsive"
                            priority={true}
                            width={195}
                            height={109}/>
                    </LazyLoad>
                </Thumbnail>

                <Container>
                    <Name><strong>{data.name}</strong></Name>
                </Container>

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
    align-self: center;
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


export default ProducerCard
