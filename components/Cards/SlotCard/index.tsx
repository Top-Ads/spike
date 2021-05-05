import React, { Fragment, FunctionComponent, useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styled from 'styled-components'
import LikeIcon from '../../LikeIcon'
import { Category } from '../../../utils/constants'
import { DislikedSlotContext } from '../../../contexts'
import { CDN } from '../../../public/environment'
import LazyLoad, { forceCheck } from 'react-lazyload'
import { Slot } from '../../../pages/api/graphql/schemas/slot'

type PageProps = {
   data: Slot
};

const SlotCard: FunctionComponent<PageProps> = ({data}) => { 

    const router = useRouter()

    const ref = useRef<HTMLDivElement>(null);

    const [triggerOnClick, setTriggerOnClick] = useState<boolean>(false)
    const [showBanner, setShowBanner] = useState<boolean>(false)
    const [isFavorite, setIsFavorite] = useState<boolean>(false)

    const  {slotDislikedId, setSlotDislikedId}  = useContext(DislikedSlotContext)

    const handleTouchOutside = (event: TouchEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setShowBanner(false)
        }
    };

    useEffect(() => {
        document.addEventListener('touchstart', handleTouchOutside, true);
        return () => {
            document.removeEventListener('touchstart', handleTouchOutside, true);
        };
    }, [ref]);

    const playSlot = () => {
        router.push({
            pathname: '/slot/[url]',
            query: { playLink: data.playLink, name: data.name}
        }, '/slot')
    }
 
    const handleActiveLike = () => {
        setTriggerOnClick(true)
        setIsFavorite(!isFavorite)
    }

    const handleOnTouch = () => {
        setShowBanner(!showBanner)
    }

    useEffect( () => {

        forceCheck()

        const currentItem: string | null = localStorage.getItem(Category.FAVORITES)

        if (currentItem && JSON.parse(currentItem).some( (slot: Slot) => slot.id === data.id )) 
            setIsFavorite(true)

    }, [])

    useEffect( () => {
        const currentItem: string | null = localStorage.getItem(Category.FAVORITES)

        if (currentItem && triggerOnClick) {
            if (isFavorite) {
                const currFavorites: Slot[] = JSON.parse(currentItem)

                currFavorites?.push(data)

                localStorage.setItem(Category.FAVORITES, JSON.stringify(currFavorites))
           
            } else {
                const newItems: any[] = JSON.parse(currentItem).filter( (card: Slot) => {
                    return card.id !== data.id
                })

                localStorage.setItem(Category.FAVORITES, JSON.stringify(newItems))
            }

            setTriggerOnClick(false)
        }  

    }, [isFavorite, triggerOnClick])

    useEffect( () => {

        if (slotDislikedId === data.id) {
            setIsFavorite(false)
            setSlotDislikedId('')
        }        
    }, [slotDislikedId])

    return (
        <Fragment>
            <Main  
                ref={ref}
                onClick={playSlot}
                onMouseEnter={ () => setShowBanner(true)}
                onMouseLeave={ () => setShowBanner(false)}
                onTouchStart={handleOnTouch}>
                
                { showBanner || isFavorite ?
                <Icon>  
                    <LikeIcon setActive={handleActiveLike} active={isFavorite}/>
                </Icon> : '' } 
               
                <Thumbnail>
                    <LazyLoad key={data.id} height={85} offset={200}>
                        <Image
                            alt="image not available"
                            src={data.image && data.image.url ? data.image.url : `${CDN}/svg/no_img_available.svg`} 
                            layout="responsive"
                            priority={true}
                            width={540}
                            height={304}/>
                    </LazyLoad>
                </Thumbnail>
                
                { showBanner ? 
                    <Banner>
                        <Button> 
                            <span>PLAY FREE</span>
                        </Button>
                        <Button> 
                            <span>REAL MONEY</span>
                        </Button>
                    </Banner>
                : '' } 

            </Main>

            <Title>{data.name}</Title>
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

const Title = styled.div` 
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 30px;   
    font-weight: bolder;
    font-size: 11px;
`

const Banner = styled.div`
    display: flex;
    align-items: flex-end;
    width: 100%;
    height: 100%;
    color: ${({theme}) => theme.text.color.primary};
    position: absolute;
    top: 0;
    background-color: rgba(0,0,0,0.5);

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
    z-index: 2;
`

const Thumbnail = styled.div` 
  z-index: 1;
  img { border-radius: 5px; }
`

const Button = styled.div`
    background-color: ${({theme}) => theme.colors.background};
    border: 2px solid #fff;
    color: ${({theme}) => theme.text.color.primary};
    border-radius: ${({theme}) => theme.button.borderRadius};
    cursor: pointer;
    width: 50%;
    height: 25px;
    margin: 5px;
    font-size: 9px;
    font-weight: bold;
    align-items: center;
    display: inherit;
    justify-content: center;

    &:hover {
        box-shadow: ${({theme}) => theme.button.boxShadowY};
    }
`

export default SlotCard
