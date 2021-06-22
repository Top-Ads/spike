import React, { FunctionComponent, useState, Fragment, useRef, useEffect } from 'react'
import { NextPageContext } from 'next'
import Image from 'next/image'
import styled from 'styled-components'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import VideoLabelIcon from '@material-ui/icons/VideoLabel'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
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

type ThumbnailProps = {
    isFullscreen?: boolean
}

const SlotPage: FunctionComponent<PageProps> = ({slotData}) => {

    const [showIframe, setShowIframe] = useState<boolean>(false)
    const [isFullscreen, setFullscreen] = useState<boolean>(false)

    const iframeRef = useRef<HTMLIFrameElement>(null)
    const thumbnailRef = useRef<HTMLDivElement>(null)

    const handleOnPlay = () =>  setShowIframe(true)

    const handleFullScreen = () => { 
        setFullscreen(true)
        thumbnailRef.current?.requestFullscreen() 
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.code === "Escape") {
            document.exitFullscreen()
        }
    }

    const handleScreenChange = () => {
        document.fullscreenElement ? setFullscreen(true) : setFullscreen(false)
    }

    useEffect( () => {
        document.addEventListener("keydown", handleKeyDown, false)
        document.addEventListener("fullscreenchange", handleScreenChange, false)
    }, [])

    return (
        <Layout title={slotData.name}> 
            <Fragment>
                <div className="space-around">

                    <Divider/><br/>

                    <Main>

                        <SlotContainer>

                            <Thumbnail onClick={handleOnPlay} ref={thumbnailRef} isFullscreen={isFullscreen}>

                                <div className={isFullscreen ? 'fullscreen' : ''}>
                                    <Image
                                        alt={slotData?.name}
                                        src={slotData?.image.url ? slotData.image.url : `${CDN}/svg/no_img_available.svg`} 
                                        layout="responsive"
                                        priority={true}
                                        width={1200}
                                        height={675}/> 
                                </div>                              

                                { showIframe ? 
                                <IframeContainer
                                    ref={iframeRef}
                                    name={slotData?.slug}
                                    src={slotData?.playLink}
                                    allow={'fullscreen'}
                                    sandbox={'allow-orientation-lock allow-scripts allow-same-origin'}/>
                                : ''}

                                <PlayCircleOutlineIcon className={'playGame-icon'}/>
                            </Thumbnail>

                            <Actions className={'slot-actions'}>
                                <FullscreenIcon className="fullscreen-icon" onClick={handleFullScreen}/>    
                            </Actions> 

                        </SlotContainer>

                        <Section>

                            <Title>
                                <h2>{slotData?.name}</h2>

                                <div className="likes"> {slotData?.likes}
                                    {slotData?.likes &&  slotData.likes > 0 ? <span>Likes: {slotData.likes}</span> : ''}
                                </div>

                                <div className="rating">
                                    {slotData?.rating ? <RatingStars rating={slotData.rating}/> : ''}
                                </div>
                            </Title>

                            <Info>
                                <div className="rtp"><b>RTP: </b>{slotData?.rtp}%</div>
                                    <div className="volatility">
                                        {slotData?.volatility ? <span><b>Volatilità: </b> {slotData.volatility}</span> : ''}
                                    </div>

                                <div className="created-at"> 
                                    {slotData?.created_at ? <span><b>Created at:</b> {shortDate(slotData.created_at)}</span> : ''}
                                </div>

                                <div className="producer">
                                    { slotData?.producer ? 
                                    <>
                                        <span><b>Provider: </b></span>
                                        <b>{slotData?.producer.name}</b>
                                    </> 
                                    : '' }
                                </div>
                            </Info>

                            <Actions className="play-actions">  
                                <Button>
                                    <a href={slotData?.linkYoutube}>
                                        <PlayCircleOutlineIcon className={'video-icon'}/> <span>Play Video</span>
                                    </a>
                                </Button>

                                <Button onClick={handleOnPlay}>
                                    <VideoLabelIcon className={'playGame-icon'}/> <span>Play Game</span>
                                </Button>
                                    
                            </Actions>

                        </Section>
                    
                    </Main>
                    
                    <br/><CustomizedAccordions videoDescription={slotData?.description} tips={slotData?.tips}/><br/>
                </div>
        
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

const Main = styled.div`
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
`

const SlotContainer = styled.div`
    width: 50vw;

    position: relative;

    @media ${device.tablet} {
        width: 100%;
    }
`

const Thumbnail = styled.div<ThumbnailProps>`
    position: relative;
    cursor: pointer;

    .fullscreen {
        position: relative;
        top: ${({isFullscreen}) => isFullscreen ? '50%' : 'unset'};
        left: ${({isFullscreen}) => isFullscreen ? '50%' : 'unset'};
        transform:  ${({isFullscreen}) => isFullscreen ? 'translate(-50%, -50%)' : 'unset'};
    }
    
    .playGame-icon {
        top: 0;
        bottom: 0;
        margin: auto;
        position: absolute;
        left: 0;
        right: 0;
        color: white;
        opacity: 0.6;
        font-size: 100px;
    }
`

const Section = styled.div`
    display: inherit;
    flex-direction: column;
    padding: 0px 10px;
    margin-bottom: 10px;

    font-size: 13px;
    flex-grow: 1;

    .videoDescription { display: none; }

    .tips { display: none; }
`

const Title = styled.div`
    margin-bottom: 10px;

    h2 {
         margin-bottom: 0; 

         @media ${device.mobileL} {
            width: 60%;
         }
    }
` 

const Info = styled.div`
    div { margin-bottom: 2px; }
` 

const Actions = styled.div`

    &.slot-actions {
        background-color: ${({theme}) => theme.colors.background};
        color: white;
        display: flex;
        justify-content: flex-end;

        svg { cursor: pointer; }
    }

    &.play-actions {
        display: flex;
        flex-direction: column;

        @media ${device.tablet} {
            position: absolute;
            right: 10px;
        }
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
    margin: 5px 0px;
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

const IframeContainer = styled.iframe`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    margin: 0;
    border: 0;
    z-index: 99;
    background-color: #000;
`

export default SlotPage
