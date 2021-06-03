import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Layout from '../../../components/Layout'
import Image from 'next/image'
import LazyLoad from 'react-lazyload'
import { CDN } from '../../../public/environment'
import Divider from '../../../components/Divider'
import RatingStars from '../../../components/RatingStars'
import CustomizedAccordions from '../../../components/CustomizedAccordions'
import { shortDate } from '../../../utils/shortDate'
import { device } from '../../../utils/device'
import { animateScroll as scroll } from "react-scroll"
import { Fragment } from 'react'
import { Slot } from '../../../interfaces'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import VideoLabelIcon from '@material-ui/icons/VideoLabel'

const SlotPage = () => {

    const router = useRouter()

    const [item, setItem] = useState<Slot>()
    const [showIframe, setShowIframe] = useState<boolean>(false)

    const handleOnPlay = () => {
        setShowIframe(true)
        scroll.scrollTo(500)
    }

    useEffect(() => {
        setItem(JSON.parse(String(router.query.slug)))
    }, [router.query])

    return (
        <Layout title="Slot"> 
            <Fragment>
                <div className="space-around">

                    <Divider/><br/>

                    <Container>
                        <Thumbnail onClick={handleOnPlay}>
                            <LazyLoad key={item?.id} height={85} offset={300}>
                                <Image
                                    alt={item?.name}
                                    src={item?.image.url ? item.image.url : `${CDN}/svg/no_img_available.svg`} 
                                    layout="responsive"
                                    priority={true}
                                    width={250}
                                    height={140}/>
                            </LazyLoad>
                        </Thumbnail>

                        <Description>
                            <h2 className="name">{item?.name}</h2>

                            <div className="title likes"> {item?.likes}
                                {item?.likes &&  item.likes > 0 ? <span>Likes: {item.likes}</span> : ''}
                            </div>

                            <div className="title rating">
                                {item?.rating ? <RatingStars rating={item.rating}/> : ''}
                            </div>

                            <div className="title rtp"><b>RTP: </b>{item?.rtp}%</div>
                                <div className="volatility">
                                    {item?.volatility ? <span><b>Volatilità: </b> {item.volatility}</span> : ''}
                                </div>

                            <div className="title created-at"> 
                                {item?.created_at ? <span><b>Created at:</b> {shortDate(item.created_at)}</span> : ''}
                            </div>

                            <div className="title producer">
                                { item?.producer ? 
                                <>
                                    <span><b>Provider: </b></span>
                                    <b>{item?.producer.name}</b>
                                </> 
                                : '' }
                            </div>

                            <div className="title actions">  
                                <Button>
                                    <a href={item?.linkYoutube}>
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

                    <CustomizedAccordions videoDescription={item?.description} tips={item?.tips}/>
                </div>
        
                { showIframe ? 
                    <IframeContainers
                        name={item?.slug}
                        scrolling={'auto'} 
                        src={item?.playLink}
                        allow={'fullscreen'}
                        sandbox={'allow-orientation-lock allow-scripts allow-same-origin'}/> 
                : ''}
            </Fragment>
        </Layout>       
    )
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
