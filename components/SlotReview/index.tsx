import React, { FunctionComponent } from 'react'
import { Fragment } from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'
import { Slot } from '../../lib/schemas'
import Image from 'next/image'
import { CDN } from '../../public/environment'
import Divider from '../Divider'
import { device } from '../../lib/utils/device'
import Markdown from 'markdown-to-jsx'

type Props = {
   data: Slot
};

const SlotReview: FunctionComponent<Props> = ({data}) => {
    return (
        <Fragment>

            <Title>RECENSIONE SLOT</Title>
            
            <Divider/>
            
            <br/>

            <Main> 
                <Container>
                    <Thumbnail>
                        <LazyLoad key={data.id} height={85} offset={200}>
                            <Image
                                alt={data.name}
                                src={data.image && data.image.url ? data.image.url : `${CDN}/svg/no_img_available.svg`} 
                                layout="responsive"
                                priority={true}
                                width={1295}
                                height={728}
                                quality={80}
                            />
                        </LazyLoad>
                    </Thumbnail>

                    <Info>
                        <div className="row">
                            <label>RTP</label>
                            <span>{data.rtp}%</span>
                        </div>
                        <Divider width={'99%'}/>
                        <div className="row">
                            <label>Volatilità</label>
                            <span>{data.volatility}</span>
                        </div>
                    </Info>
                </Container>

                <Article>
                    <h2>{data.name}</h2>
                    <MarkDownContainer>
                        <Markdown>{String(data?.description)}</Markdown>
                        <h2>Tips:</h2> <Markdown>{String(data?.tips)}</Markdown>
                    </MarkDownContainer>
                </Article>
            </Main>
        </Fragment>
    )
} 

const Title = styled.h2`
    margin-bottom: 0px;
`

const Main = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    h2 { font-weight: bold; }
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    @media ${device.mobileL} {
        width: 100%;
    }
`

const Thumbnail = styled.div`
    border-radius: 5px;
    overflow: hidden;
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    padding: 2px;
    font-size: 0.9rem;

    .row label {
        font-weight: bold;
        margin-right: 10px;    
    }

    .row span {
        text-transform: uppercase;
    }
`

const Article = styled.article`
    margin-bottom: 0px;
    flex-grow: 2;
    padding: 10px 25px;
    width: min-content;

    @media ${device.mobileL} {
        padding: 0px;
        width: fill-available;
    }
`

const MarkDownContainer = styled.div`

`

export default SlotReview
