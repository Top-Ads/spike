import React, { Fragment, FunctionComponent, useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styled from 'styled-components'
import { Category, SlotType } from '../../../lib/utils/constants'
import { removeLikeSlotContext } from '../../../lib/contexts'
import { CDN } from '../../../public/environment'
import LazyLoad, { forceCheck } from 'react-lazyload'
import { Slot } from '../../../lib/schemas'
import SpinnerLoader from '../../SpinnerLoader'
import LikeButton from '../../LikeButton'
import { formatDistance } from 'date-fns'
import italianLocale  from 'date-fns/locale/it'
import { injectCDN } from '../../../lib/utils/injectCDN'

type Props = {
   data: Slot,
   type?: SlotType
};

const SlotCard: FunctionComponent<Props> = ({data, type}) => { 
    const router = useRouter()

    const ref = useRef<HTMLDivElement>(null);

    const [showBanner, setShowBanner] = useState<boolean>(false)
    const [showNewSlot, setShowNewSlot] = useState<boolean>(false)
    
    const [likedSlot, setLikedSlot] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    const {removeLikeSlotId, setRemoveLikeSlotId}  = useContext(removeLikeSlotContext)

    const playSlot = () => {
        router.push({
            pathname: '/slot/[slug]',
            query: { slug: data.slug }
        })
    }

    const handleTouchOutside = (event: TouchEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setShowBanner(false)
        }
    };

    useEffect( () => {
        forceCheck()

        const currentItem: string | null = localStorage.getItem(Category.FAVORITES)

        if (currentItem && JSON.parse(currentItem).some( (slot: Slot) => slot.id === data.id )) 
            setLikedSlot(true)


        const dayDiff = (Date.now() - new Date(data.created_at).getTime()) / 86400000
    
        if (dayDiff <= 5)
            setShowNewSlot(true)

    }, [])

    useEffect( () => {
        const currentItem: string | null = localStorage.getItem(Category.FAVORITES)

        if (currentItem) {
            if (likedSlot) {
                const currFavorites: Slot[] = JSON.parse(currentItem)

                currFavorites?.push(data)

                localStorage.setItem(Category.FAVORITES, JSON.stringify(currFavorites))
           
            } else {
                const newItems: any[] = JSON.parse(currentItem).filter( (card: Slot) => {
                    return card.id !== data.id
                })

                localStorage.setItem(Category.FAVORITES, JSON.stringify(newItems))
            }
        }  

    }, [likedSlot])

    useEffect( () => {
        if (removeLikeSlotId === data.id) {
            setLikedSlot(false)
            setRemoveLikeSlotId('')
        }        
    }, [removeLikeSlotId])

    useEffect(() => {
        document.addEventListener('touchstart', handleTouchOutside, true);
        return () => {
            document.removeEventListener('touchstart', handleTouchOutside, true);
        };
    }, [ref]);

    return (
        <Fragment>
            
            <Main 
                ref={ref} 
                onClick={playSlot}
                onMouseEnter={ () => setShowBanner(true)}
                onMouseLeave={ () => setShowBanner(false)}
                onTouchStart={ () => setShowBanner(!showBanner)}>
                
                { showBanner || likedSlot ?
                <Icon>  
                    <LikeButton setActive={() => setLikedSlot(!likedSlot)} active={likedSlot}/>
                </Icon> : '' } 
               
                <Thumbnail>
                    <SpinnerLoader show={loading}/>
                    <LazyLoad key={data.id} height={85} offset={200}>
                        <Image
                            alt={data.name}
                            src={data.image && data.image.url ? injectCDN(data.image.url) : `${CDN}/svg/no_img_available.svg`} 
                            layout="responsive"
                            priority={true}
                            width={1295}
                            height={728}
                            quality={80}
                            sizes={"50vw"}
                            onLoad={()=> setLoading(false)}/>
                    </LazyLoad>
                </Thumbnail>
                { showBanner &&  
                    <Banner>
                        <Button> 
                            <span>PROVA GRATIS</span>
                        </Button>
                        <Button> 
                            <span>SOLDI REALI</span>
                        </Button>
                    </Banner>
                } 

                { showNewSlot && <NewSlot>NUOVA</NewSlot> }

            </Main>
          
            <Description>
                <span className="card-name" >{data.name.toLowerCase()}</span> 
                <div className="card-info">
                    { data.producer && data.producer.name && <span className="card-producer"> {data.producer.name} </span> }
                    { type === SlotType.NEW  && 
                        <span className="card-date" > • { formatDistance(new Date(data.created_at), new Date(), { addSuffix: true, locale: italianLocale })} </span>
                    }
                </div>
            </Description>

        </Fragment>
    ) 
}

const Main = styled.div`
    position: relative;
    list-style-type: none;
    cursor: pointer;
    border-radius: 5px;
    overflow: hidden;
`

const Description = styled.span` 
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: baseline;
    height: 35px;   
    font-size: 0.7rem;
    padding-top: 2px;
    
    .card-info {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-weight: normal;
        font-size: 0.6rem;
    }

    span {
        margin: 0 2px;
        text-align: left;
    }

    span.card-name {
        font-weight: bold;
        text-transform: capitalize;
    }
`

const Banner = styled.div`
    position: absolute;
    top: 0;
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
    width: 100%;
    height: 100%;
    color: ${({theme}) => theme.text.color.white};
    background-color: rgba(0,0,0,0.5);
    z-index: 2;

    span {
        opacity:1;
        font-weight: bold;
    }
`

const Icon = styled.div` 
    width: 30px;
    position: absolute;
    right: 4px;
    top: 4px;
    z-index: 3;
`

const Thumbnail = styled.div` 
    position: relative;
    z-index: 1;

    img { border-radius: 5px; }
`

const Button = styled.div`
    background-color: ${({theme}) => theme.palette.background};
    border: 2px solid #fff;
    color: ${({theme}) => theme.text.color.white};
    border-radius: ${({theme}) => theme.button.borderRadius};
    cursor: pointer;
    width: 50%;
    height: 25px;
    margin: 5px;
    font-size: 9px;
    font-weight: bold;
    align-items: center;
    display: flex;
    justify-content: center;

`

const NewSlot = styled.div`
    border: 1px solid red;
    position: absolute;
    top: 5px;
    left: 5px;
    background-color: red;
    color: white;
    z-index: 3;
    border-radius: 20px;
    font-size: 0.5rem;
    padding: 2px 5px;
`

export default SlotCard
