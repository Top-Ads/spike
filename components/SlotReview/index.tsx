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
import { injectCDN } from '../../lib/utils/injectCDN'

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
                <Section>
                    <div style={{position: "sticky", top: "20px"}}>
                        <Thumbnail>
                            <LazyLoad key={data.id} height={85} offset={200}>
                                <Image
                                    alt={data.name}
                                    src={data.image && data.image.url ? injectCDN(data.image.url) : `${CDN}/svg/no_img_available.svg`} 
                                    layout="responsive"
                                    priority={true}
                                    sizes={"50vw"}
                                    width={1295}
                                    height={728}
                                    quality={80}
                                />
                            </LazyLoad>
                        </Thumbnail>

                        <Info>
                            <div className="row">
                                <div className="label">Tema</div>
                                <span>{data.theme}</span>
                            </div>
                            <Divider width={'99%'}/>
                            <div className="row">
                                <div className="label">RTP</div>
                                <span>{data.rtp}%</span>
                            </div>
                            <Divider width={'99%'}/>
                            <div className="row">
                                <div className="label">Volatilità</div>
                                <span>
                                    {data.volatility === 'high' && 'ALTA'}
                                    {data.volatility === 'mediumHigh' && 'MEDIO-ALTA'}
                                    {data.volatility === 'medium' && 'MEDIA'}
                                    {data.volatility === 'mediumLow' && 'MEDIO-BASSO'}
                                    {data.volatility === 'low' && 'BASSO'}
                                </span>
                            </div>
                            
                            <Divider width={'99%'}/>
                            <div className="row">
                                <div className="label">Typo</div>
                                <span>{data.type}</span>
                            </div>
                        </Info>
                    </div>
                </Section>

                <Article>
                    <h2>{data.name}</h2>
                    <MarkDownContainer>
                        <Markdown>{String(data?.description)}</Markdown>
                        <h2>Tips</h2> <Markdown>{String(data?.tips)}</Markdown>
                    </MarkDownContainer>

                   {/*  { data?.linkYoutube && 
                        <Fragment>
                            <h2>Video</h2>
                            <iframe 
                                width="100%" 
                                height="515" 
                                src={"https://www.youtube.com/embed/" + youtubeGetId(data.linkYoutube)}
                                title={data?.name}
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen>
                            </iframe>
                        </Fragment>
                    } */}
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

const Section = styled.div`
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
    
    .row {
        display: flex;

        div.label {
            font-weight: bold;
            width: 30%; 
        }
        span {
            text-transform: uppercase;
            opacity: 0.5;
        }
    }
`

const Article = styled.article`
    margin-bottom: 0px;
    flex-grow: 2;
    padding: 10px 25px;
    width: min-content;
    overflow: hidden;

    iframe {
        display: flex;
        margin: auto;
    }
    @media ${device.mobileL} {
        padding: 0px 2px;
        width: fill-available;
    }
`

const MarkDownContainer = styled.div`
    display: none;
`

export default SlotReview
