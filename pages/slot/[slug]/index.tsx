import React, { FunctionComponent, useState, Fragment, useRef, useEffect, useContext } from 'react'
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
import { longDate } from '../../../utils/date'
import { device } from '../../../utils/device'
import AquaClient from '../../api/graphql/aquaClient'
import { SLOTS } from '../../api/graphql/queries/slots'
import { Slot } from '../../../interfaces'
import LikeIcon from '../../../components/LikeIcon'
import CloseIcon from '@material-ui/icons/HighlightOff'
import { Category } from '../../../utils/constants'
import { removeLikeSlotContext } from '../../../contexts'

type PageProps = {
    data: Slot
}

type ThumbnailProps = {
    isFullscreen?: boolean
}

const SlotPage: FunctionComponent<PageProps> = ({data}) => {

    const [showIframe, setShowIframe] = useState<boolean>(false)
    const [isFullscreen, setFullscreen] = useState<boolean>(false)
    const [likedSlot, setLikedSlot] = useState<boolean>(false)

    const iframeRef = useRef<HTMLIFrameElement>(null)
    const thumbnailRef = useRef<HTMLDivElement>(null)

    const {removeLikeSlotId, setRemoveLikeSlotId}  = useContext(removeLikeSlotContext)

    const handleOnPlay = () => setShowIframe(true)

    const goFullScreen = () => {
        setFullscreen(true)

        const elem = thumbnailRef.current as HTMLDivElement & {
            mozRequestFullScreen(): Promise<void>;
            webkitRequestFullscreen(): Promise<void>;
            msRequestFullscreen(): Promise<void>;
        };
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    }

    const exitFullScreen = (event: React.SyntheticEvent) => {
        event.stopPropagation()

        const elem = document as Document & {
            mozCancelFullScreen(): Promise<void>;
            webkitExitFullscreen(): Promise<void>;
            msExitFullscreen(): Promise<void>;
        };
        if (elem.exitFullscreen && elem.fullscreen) {
            elem.exitFullscreen();
        } else if (elem.mozCancelFullScreen && elem.fullscreen) { /* Firefox */
            elem.mozCancelFullScreen();
        } else if (elem.webkitExitFullscreen && elem.fullscreen) { /* Chrome, Safari and Opera */
            elem.webkitExitFullscreen();
        } else if (elem.msExitFullscreen && elem.fullscreen) { /* IE/Edge */
            elem.msExitFullscreen();
        }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.code === "Escape") 
            document.exitFullscreen()
    }

    const handleScreenChange = () => document.fullscreenElement ? setFullscreen(true) : setFullscreen(false)
    
    useEffect( () => {
        const currentItem: string | null = localStorage.getItem(Category.FAVORITES)

        if (currentItem && JSON.parse(currentItem).some( (slot: Slot) => slot.id === data.id )) 
            setLikedSlot(true)

        document.addEventListener("keydown", handleKeyDown, false)
        document.addEventListener("fullscreenchange", handleScreenChange, false)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            document.removeEventListener("fullscreenchange", handleScreenChange)
        }
    }, [])

    useEffect( () => {
        if (removeLikeSlotId === data.id) {
            setLikedSlot(false)
            setRemoveLikeSlotId('')
        }        
    }, [removeLikeSlotId])

    useEffect( () => {
        const currentItem: string | null = localStorage.getItem(Category.FAVORITES)

        if (currentItem) {
            if (likedSlot) {
                const currFavorites: Slot[] = JSON.parse(currentItem)

                currFavorites?.push(data)

                localStorage.setItem(Category.FAVORITES, JSON.stringify(currFavorites))
           
            } else {
                const newItems: any[] = JSON.parse(currentItem).filter( (card: Slot) => card.id !== data.id )

                localStorage.setItem(Category.FAVORITES, JSON.stringify(newItems))
            }
        }  

    }, [likedSlot])
    
    return (
        <Layout title={data.name}> 
            <Fragment>
                <div className="space-around">

                    <Divider/>

                    <Main>

                        <SlotContainer>

                            <Thumbnail onClick={handleOnPlay} ref={thumbnailRef} isFullscreen={isFullscreen}>

                                <div className={isFullscreen ? 'fullscreen' : ''}>
                                    <Image
                                        alt={data?.name}
                                        src={data?.image.url ? data.image.url : `${CDN}/svg/no_img_available.svg`} 
                                        layout="responsive"
                                        priority={true}
                                        width={1200}
                                        height={675}/> 
                                </div>                              

                                { showIframe ? 
                                <IframeContainer
                                    ref={iframeRef}
                                    name={data?.slug}
                                    src={data?.playLink}
                                    allow={'fullscreen'}
                                    sandbox={'allow-orientation-lock allow-scripts allow-same-origin'}
                                    scrolling={'no'}/>
                                : ''}

                                <PlayCircleOutlineIcon className='playGame-icon'/>
                                {isFullscreen ? <CloseIcon fontSize={'large'} className='closeGame-icon' onClick={exitFullScreen}/> : ''}
                            </Thumbnail>

                            <Actions className={'slot-actions'}>
                                <LikeIcon setActive={() => setLikedSlot(!likedSlot)} active={likedSlot}/>
                                <FullscreenIcon className="fullscreen-icon" onClick={goFullScreen}/>    
                            </Actions> 

                        </SlotContainer>

                        <Section>

                            <Title>
                                <h2>{data?.name}</h2>

                                <div className="likes"> {data?.likes}
                                    {data?.likes && data.likes > 0 && <span>Likes: {data.likes}</span> }
                                </div>

                                <div className="rating">
                                    {data?.rating && <RatingStars rating={data.rating}/> }
                                </div>
                            </Title>

                            <Info>
                                <div className="rtp"><b>RTP: </b>{data?.rtp}%</div>
                                    <div className="volatility">
                                        {data?.volatility && <span><b>Volatilità: </b> {data.volatility}</span> }
                                    </div>

                                <div className="created-at"> 
                                    {data?.created_at && <span><b>Created at:</b> {longDate(data.created_at)}</span> }
                                </div>

                                <div className="producer">
                                    { data?.producer &&
                                    <>
                                        <span><b>Provider: </b></span>
                                        <b>{data?.producer.name}</b>
                                    </> 
                                    }
                                </div>

                                <div className="winningSpinFrequency">
                                    { data?.producer &&
                                    <>
                                        <span><b>winning Spin Frequency: </b></span>
                                        <b>{data?.winningSpinFrequency}</b>
                                    </> 
                                    }
                                </div>
                            </Info>

                            <Actions className="play-actions">  
                                <Button>
                                    <a href={data?.linkYoutube}>
                                        <PlayCircleOutlineIcon className={'video-icon'}/> <span>Play Video</span>
                                    </a>
                                </Button>

                                <Button onClick={handleOnPlay}>
                                    <VideoLabelIcon className={'playGame-icon'}/> <span>Play Game</span>
                                </Button>
                                    
                            </Actions>

                        </Section>
                    
                    </Main>
                    
                    <br/><CustomizedAccordions videoDescription={data?.description} tips={data?.tips}/><br/>
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
            data: slotRequest.data.data.slots[0],
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

    @media ${device.tablet} {
        .closeGame-icon {
            color: white;
            position: fixed;
            top: 1px;
            left: 1px;
            opacity: 0.8;
            z-index: 999;        
        }
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
        background-color: ${({theme}) => theme.color.background};
        color: white;
        display: flex;
        justify-content: flex-end;

        svg {  
            cursor: pointer;
            font-size: 25px;
            margin: 0px 3px;
        }
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
    background-color: ${({theme}) => theme.color.background};
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
            color: ${({theme}) => theme.text.color.black};;
        }
    }

    &:hover {
        color: ${({theme}) => theme.text.color.black};;
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
