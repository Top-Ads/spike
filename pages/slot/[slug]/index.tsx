import React, { FunctionComponent, useState, Fragment } from 'react'
import LazyLoad from 'react-lazyload'
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
import { useRef } from 'react'
/* import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import OpenWithIcon from '@material-ui/icons/OpenWith'; */

type PageProps = {
    slotData: Slot
}
const SlotPage: FunctionComponent<PageProps> = ({slotData}) => {

    const [showIframe, setShowIframe] = useState<boolean>(false)
    const ele = useRef(null)

    const handleOnPlay = () => {
        setShowIframe(true)
    }

    return (
        <Layout title={slotData.name}> 
            <Fragment>
                <div className="space-around">

                    <Divider/><br/>

                    <Main>

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

                            <Actions className="slot-actions">  
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
        
                { showIframe ? 
                    <IframeContainer>
                       <IframeGame ref={ele}
                        width="560" 
                        height="315" 
                        src="https://www.youtube.com/embed/3uvbcI-7uDQ?controls=0" 
                        slot="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen/> 

                     {/*    <IframeGame
                        name={slotData?.slug}
                        src={slotData?.playLink}
                        allow={'fullscreen'}
                        sandbox={'allow-orientation-lock allow-scripts allow-same-origin'}/> */}

                        <Actions className={'iframe-actions'}>
                           {/*  <OpenWithIcon/>    */} 
                        </Actions> 
                    </IframeContainer>
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

const Main = styled.div`
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
`

const Thumbnail = styled.div`
    width: 50vw;
    cursor: pointer;

    @media ${device.tablet} {
        width: 100%;
    }
`

const Section = styled.div`
    display: inherit;
    flex-direction: column;
    padding: 0px 10px;
    margin-bottom: 10px;

    font-size: 13px;
    flex-grow: 1;


    .videoDescription {
        display: none;
    }

    .tips {
        display: none;
    }
`

const Title = styled.div`
    margin-bottom: 10px;

    h2 { margin-bottom: 0; }
` 

const Info = styled.div`
    div { margin-bottom: 2px; }
` 


const Actions = styled.div`

    &.iframe-actions {

    }

    &.slot-actions {
        display: flex;
        flex-direction: column;

        @media ${device.mobileL} {
            flex-direction: row;
            justify-content: space-evenly;
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

const IframeContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const IframeGame = styled.iframe`
    margin: 0;
    border: 0;
    z-index: 999;
    transform: rotate(-90deg);
    transform-origin: left top;
    position: fixed;
    top: 100%;
    left: 0px;
    width: 50vw;
    height: auto;

   /*  @media all and (orientation:landscape) {
        transform: rotate(0deg);
        top: 0;
        width: 100vw;
        height: 100vh;
    } */
`

export default SlotPage
