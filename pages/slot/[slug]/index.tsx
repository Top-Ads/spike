import React, { FunctionComponent, useState, Fragment } from 'react'
import LazyLoad from 'react-lazyload'
import { animateScroll as scroll } from "react-scroll"
import { NextPageContext } from 'next'
import Image from 'next/image'
import styled from 'styled-components'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import VideoLabelIcon from '@material-ui/icons/VideoLabel'
import Layout from '../../../components/Layout'
import { CDN } from '../../../public/environment'
import Divider from '../../../components/Divider'
import RatingStars from '../../../components/RatingStars'
import CustomizedAccordions from '../../../components/CustomizedAccordions'
import { shortDate } from '../../../utils/shortDate'
import { device } from '../../../utils/device'
import AquaClient from '../../api/graphql/aquaClient'
import { SLOTS } from '../../api/graphql/queries/slots'
import { Slot } from '../../../interfaces'

type PageProps = {
    slotData: Slot
}
const SlotPage: FunctionComponent<PageProps> = ({slotData}) => {

    const [showIframe, setShowIframe] = useState<boolean>(false)

    const handleOnPlay = () => {
        setShowIframe(true)
        scroll.scrollTo(500)
    }

    return (
        <Layout title="Slot"> 
            <Fragment>
                <div className="space-around">

                    <Divider/><br/>

                    <Container>
                        <Thumbnail onClick={handleOnPlay}>
                            <LazyLoad key={slotData?.id} height={85} offset={300}>
                                <Image
                                    alt={slotData?.name}
                                    src={slotData?.image.url ? slotData.image.url : `${CDN}/svg/no_img_available.svg`} 
                                    layout="responsive"
                                    priority={true}
                                    width={1200}
                                    height={675}/>
                            </LazyLoad>
                        </Thumbnail>

                        <Description>
                            <h2 className="name">{slotData?.name}</h2>

                            <div className="title likes"> {slotData?.likes}
                                {slotData?.likes &&  slotData.likes > 0 ? <span>Likes: {slotData.likes}</span> : ''}
                            </div>

                            <div className="title rating">
                                {slotData?.rating ? <RatingStars rating={slotData.rating}/> : ''}
                            </div>

                            <div className="title rtp"><b>RTP: </b>{slotData?.rtp}%</div>
                                <div className="volatility">
                                    {slotData?.volatility ? <span><b>Volatilità: </b> {slotData.volatility}</span> : ''}
                                </div>

                            <div className="title created-at"> 
                                {slotData?.created_at ? <span><b>Created at:</b> {shortDate(slotData.created_at)}</span> : ''}
                            </div>

                            <div className="title producer">
                                { slotData?.producer ? 
                                <>
                                    <span><b>Provider: </b></span>
                                    <b>{slotData?.producer.name}</b>
                                </> 
                                : '' }
                            </div>

                            <div className="title actions">  
                                <Button>
                                    <a href={slotData?.linkYoutube}>
                                        <PlayCircleOutlineIcon className={'video-icon'}/> <span>Play Video</span>
                                    </a>
                                </Button>

                                <Button onClick={handleOnPlay}>
                                    <VideoLabelIcon className={'playGame-icon'}/> <span>Play Game</span>
                                </Button>
                                 
                            </div>

                        </Description>
                    </Container>
                    
                    <br/>

                    <CustomizedAccordions videoDescription={slotData?.description} tips={slotData?.tips}/>
                </div>
        
                { showIframe ? 
                    <IframeContainers
                        name={slotData?.slug}
                        scrolling={'auto'} 
                        src={slotData?.playLink}
                        allow={'fullscreen'}
                        sandbox={'allow-orientation-lock allow-scripts allow-same-origin'}/> 
                : ''}
            </Fragment>
        </Layout>       
    )
}
 
export async function getServerSideProps(context : NextPageContext) {
    
    const slug = context.query.slug as string

    const aquaClient = new AquaClient()

    const slotRequest =  await aquaClient.query({ 
        query: SLOTS, 
        variables: { countryCode: 'it', slug: slug } })

    return {
        props: {
            slotData: slotRequest.data.data.slots[0],
        }
    }

}

const IframeContainers = styled.iframe`
    display: flex;
    margin: 10px auto;
    width: 80vw;
    height: 45vw;
    border: 0;

    @media ${device.tablet} {
        width: 90vw;
        height: 60vw;
    }

    @media ${device.laptopL} and (orientation : landscape) {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        z-index: 999;
        margin: 0;
    }
`

const Container = styled.div`
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
`

const Thumbnail = styled.div`
    width: 350px;
    cursor: pointer;
`

const Description = styled.div`
    display: inherit;
    flex-direction: column;
    padding: 5px 10px;
    font-size: 13px;
    flex-grow: 1;

    .title {
        margin-bottom: 2px;
    }

    .actions {
        display: flex;
        flex-direction: row;

        @media ${device.mobileL} {
            justify-content: center;
        }
    }

    .videoDescription {
        display: none;
    }

    .tips {
        display: none;
    }
`

const Button = styled.div`
    background-color: ${({theme}) => theme.colors.background};
    color: #fff;
    border-radius: ${({theme}) => theme.button.borderRadius};
    font-weight: bold;
    width: fit-content;
    text-transform: uppercase;
    cursor: pointer;
    margin: 5px 5px;
    padding: 7px;

    display: flex;
    flex-direction: row;
    align-items: center;

    a {
        display: inherit;
        align-items: inherit;
        color: #fff;

        &:hover {
            color: ${({theme}) => theme.text.color.secondary};;
        }
    }

    &:hover {
        color: ${({theme}) => theme.text.color.secondary};;
    }
   
    .video-icon, .playGame-icon {
        margin-right: 10px;
    }

`
export default SlotPage
