import React, { Fragment, FunctionComponent, useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styled from 'styled-components'
import LikeIcon from '../../LikeIcon'
import { Category, SlotType } from '../../../utils/constants'
import { removeLikeSlotContext } from '../../../contexts'
import { CDN } from '../../../public/environment'
import LazyLoad, { forceCheck } from 'react-lazyload'
import { Slot } from '../../../interfaces'
import SpinnerLoader from '../../SpinnerLoader'
import { dateDiff } from '../../../utils/date'

type PageProps = {
   data: Slot,
   type?: SlotType
};

const SlotCard: FunctionComponent<PageProps> = ({data, type}) => { 
    const router = useRouter()

    const ref = useRef<HTMLDivElement>(null);

    const [showBanner, setShowBanner] = useState<boolean>(false)
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
                    <LikeIcon setActive={() => setLikedSlot(!likedSlot)} active={likedSlot}/>
                </Icon> : '' } 
               
                <Thumbnail>
                    <SpinnerLoader show={loading}/>
                    <LazyLoad key={data.id} height={85} offset={200}>
                        <Image
                            alt="image not available"
                            src={data.image && data.image.url ? data.image.url : `${CDN}/svg/no_img_available.svg`} 
                            layout="responsive"
                            priority={true}
                            width={1200}
                            height={840}
                            quality={80}
                            onLoad={()=> setLoading(false)}/>
                    </LazyLoad>
                </Thumbnail>
                { showBanner &&  
                    <Banner>
                        <Button> 
                            <span>PLAY FREE</span>
                        </Button>
                        <Button> 
                            <span>REAL MONEY</span>
                        </Button>
                    </Banner>
                } 

            </Main>
          
            <Description>
                <span className="card-name" >{data.name.toLowerCase()}</span> 
                <div className="card-info">
                    { data.producer && data.producer.name && <span className="card-producer"> {data.producer.name} </span> }
                    { type === SlotType.NEW  && 
                        <span className="card-date" > • { dateDiff(data.created_at) >  0 ? dateDiff(data.created_at) + ' days ago' : 'today'} </span>
                    }
                    { type === SlotType.ONLINE  && 
                        <span className="card-likes" > { data.likes > 0 &&  ` • ${data.likes} likes` } </span>
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

    &:hover {
      
    }
`

export default SlotCard
