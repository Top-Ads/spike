import React, { FunctionComponent, useState, Fragment, useRef, useEffect, useContext } from 'react'
import { NextPageContext } from 'next'
import Image from 'next/image'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import Layout from '../../../components/Layout'
import { CDN } from '../../../public/environment'
import { device } from '../../../lib/utils/device'
import { Bonus, Slot } from '../../../lib/schemas'
import LikeButton from '../../../components/LikeButton'
import CloseIcon from '@material-ui/icons/HighlightOff'
import { Category, GridType } from '../../../lib/utils/constants'
import { removeLikeSlotContext } from '../../../lib/contexts'
import Tooltip from '@material-ui/core/Tooltip'
import { Zoom } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
import MainBonusCard from '../../../components/Cards/MainBonusCard'
import StartGame from '../../../components/StartGame'
import SlotReview from '../../../components/SlotReview'
import { getSlots } from '../../../lib/graphql/queries/slots'
import { getBonuses } from '../../../lib/graphql/queries/bonuses'
import FreeBonusCard from '../../../components/Cards/FreeBonusCard'
import SlotCard from '../../../components/Cards/SlotCard'
import GridLayout from '../../../components/GridLayout'
import Divider from '../../../components/Divider'

type PageProps = {
    data: Slot
}

type ThumbnailProps = {
    isFullscreen?: boolean
}

const useStyles = makeStyles({
    icon: {
        fontSize: '1rem',
        cursor: 'pointer',
        margin: '0px 5px'
    },
    tooltip: {
      maxWidth: '200px',
      padding: '5px'
    }
  })

const SlotPage: FunctionComponent<PageProps> = ({data}) => {

    const classes = useStyles()

    const [showIframe, setShowIframe] = useState<boolean>(false)
    const [isFullscreen, setFullscreen] = useState<boolean>(false)
    const [likedSlot, setLikedSlot] = useState<boolean>(false)
    const [mainBonus, setMainBonus] = useState<Bonus>()
    
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
    
    const getMainBonus = async (id: string) => setMainBonus((await getBonuses({ id: id }))[0]) 
   
    useEffect( () => {

        getMainBonus(data.mainBonus.id)

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
                <Main>
                    <GameContainer>

                        <IframeContainer onClick={handleOnPlay} ref={thumbnailRef} isFullscreen={isFullscreen}>
                            { showIframe && 
                                <Iframe
                                    ref={iframeRef}
                                    name={data?.slug}
                                    src={data?.playLink}
                                    allow={'fullscreen'}
                                    sandbox={'allow-orientation-lock allow-scripts allow-same-origin'}
                                    scrolling={'no'}/>
                            }

                            <div className='playGame-icon'>
                                <StartGame data={data} triggerGame={handleOnPlay}/>
                            </div>

                            {isFullscreen && <CloseIcon fontSize={'large'} className='closeGame-icon' onClick={exitFullScreen}/>}

                            <Actions className={'slot-actions'}>
                                <FullscreenIcon className="fullscreen-icon" onClick={goFullScreen}/>
                                <LikeButton setActive={() => setLikedSlot(!likedSlot)} active={likedSlot}/>
                            </Actions> 

                        </IframeContainer>

                        <Section>

                            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                                <InfoTable>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div>
                                                <span className="label">
                                                    RTP  
                                                    <Tooltip 
                                                        title={"L'RTP indica il ritorno al giocatore in percentuale che il gioco eroga sottoforma di pagamenti.'"} 
                                                        classes={{ tooltip: classes.tooltip }} 
                                                        TransitionComponent={Zoom}
                                                        children={<InfoIcon className={classes.icon}/> }/>
                                                </span>
                                                <span className="value">{data?.rtp}%</span>
                                            </div>
                                        </td>

                                        <td>
                                            { data?.volatility && 
                                                <div>
                                                    <span className="label">Volatilità
                                                        <Tooltip 
                                                            title={'La volatilità indica la frequenza con cui un gioco eroga vincita. Bassa = vincite frequenti ma basse. Alta = vincite rare ma di moltiplicatore elevato.'} 
                                                            classes={{ tooltip: classes.tooltip }} 
                                                            TransitionComponent={Zoom}
                                                            children={<InfoIcon className={classes.icon}/> }/>
                                                    </span>
                                                    <span className="value">{data.volatility}</span> 
                                                </div>
                                            }
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            { data?.winningSpinFrequency && 
                                                <div>
                                                    <span className="label">WSF
                                                        <Tooltip 
                                                            title={'Questo numero da 1 a 5 indica la frequenza di spin in cui si ottengono vincite. Più è basso e più è probabile che molti spin vadano a vuoto.'} 
                                                            classes={{ tooltip: classes.tooltip }} 
                                                            TransitionComponent={Zoom}
                                                            children={<InfoIcon className={classes.icon}/> }/>
                                                    </span>
                                                    <span className="value">{data.winningSpinFrequency}</span> 
                                                </div>
                                            }
                                        </td>

                                        <td>
                                            { data?.maxLines && 
                                                <div>
                                                    <span className="label">MAXLINES
                                                        <Tooltip 
                                                            title={'Il numero massimo di linee di pagamento utilizzabili nel gioco.'} 
                                                            classes={{ tooltip: classes.tooltip }} 
                                                            TransitionComponent={Zoom}
                                                            children={<InfoIcon className={classes.icon}/> }/>
                                                    </span>
                                                    <span className="value">{data.maxLines}</span> 
                                                </div>
                                            }
                                        </td>
                                    </tr> 

                                </tbody>  
                                </InfoTable>

                                <Thumbnail>
                                    <Image
                                        alt="Casino Squad"
                                        src={`${CDN}/png/logo_white.png`}
                                        layout="intrinsic"
                                        priority={true}
                                        width={200}
                                        height={200}/>
                                </Thumbnail>
                            </div>

                            <div style={{width: '90%', margin: 'auto'}}>
                                { mainBonus && <MainBonusCard data={mainBonus}/> }
                            
                                <RelatedBonuses>
                                    { data.bonuses && (data.bonuses.slice(0,2)).map( (bonus: Bonus, index: number) => <FreeBonusCard key={index} data={bonus}/> ) }
                                </RelatedBonuses>
                            </div>

                        </Section>

                    </GameContainer>  
                </Main>

                <div className="layout-container">
                    <h2 style={{textTransform: 'uppercase'}}> GIOCHI SIMILI A QUESTO - {data.producer.name}</h2>
                    <Divider/>

                    <GridContainer>
                        <GridLayout 
                            gridType={GridType.SLOTS} 
                            content={ data.relatedSlots.map( (slot: Slot) => 
                            <Fragment>
                                <SlotCard key={slot.name} data={slot}/>
                            </Fragment>
                            )}
                            width={'100%'}
                            xs={12} sm={4} md={3}
                        />
                    </GridContainer>
                  
                    <SlotReview data={data}/>   
                    <br/>
                </div>
        
            </Fragment>
        </Layout>       
    )
}
 
export async function getServerSideProps(context : NextPageContext) {
    
    const slug = context.query.slug as string

    return {
        props: {
            data: (await getSlots({ slug: slug }))[0]
        }
    }
}

const Main = styled.div`
   display: flex;
   flex-direction: column;
   background-color: rgb(205, 166, 95);
   padding: 40px 7%;

   @media ${device.mobileL} {
        padding: 0px;
    }
`

const GameContainer = styled.div`
    display: flex;
    flex-direction: row;  
    position: relative;
    
    @media ${device.mobileL} {
        flex-wrap: wrap-reverse;
        width: 100%;
    }
`

const IframeContainer = styled.div<ThumbnailProps>`
    display: flex;
    flex-direction: column;
    position: relative;
    cursor: pointer;
    background-color: #000;
    width: 100%;
    height: 540px;
    
    .fullscreen {
        position: relative;
        top: ${({isFullscreen}) => isFullscreen ? '50%' : 'unset'};
        left: ${({isFullscreen}) => isFullscreen ? '50%' : 'unset'};
        transform:  ${({isFullscreen}) => isFullscreen ? 'translate(-50%, -50%)' : 'unset'};
    }
    
    .playGame-icon {
        margin: auto;
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

    @media ${device.mobileL} {        
        height: auto;
    }    
`

const Iframe = styled.iframe`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 95%;
    position: absolute;
    top: 0px;
    left: 0px;
    margin: 0;
    border: 0;
    z-index: 99;
    background-color: #000;
`

const Section = styled.div`
    font-size: 1rem;
    background-color: ${({theme}) => theme.text.color.black};
    color: #fff;

    @media ${device.tablet} {  
        flex-grow: 1;
    }
`

const Thumbnail = styled.div`
    width: 150px;
    
    @media ${device.mobileL} {
        width: auto;
    } 
`

const InfoTable = styled.table`
    width: max-content;
    align-self: flex-start;
    
    td > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px;

        span.label {
             display: flex;
             align-items: center;
             color: rgb(112,112,112);
             font-weight: bold;
             margin-bottom: 3px;
        }

        span.value {
            font-weight: bold;
            text-transform: uppercase;
        }
    }
` 

const Actions = styled.div`
    background-color: ${({theme}) => theme.text.color.black};
    z-index: 99;
    border-top: 1px solid;
    border-right: 0px;
    border-left: 0px;
    z-index: 99;
    
    &.slot-actions {
        color: white;
        display: flex;
        justify-content: flex-start;

        svg {  
            cursor: pointer;
            font-size: 25px;
            margin: 0px 3px;
        }
    }

    @media ${device.mobileL} {
        border-bottom: 1px solid;
    }
`

const RelatedBonuses = styled.div`
    overflow-y: auto;
`

const GridContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    color: ${({theme}) => theme.palette.background};
    width: 95%;
`

export default SlotPage
