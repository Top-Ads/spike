import React, { Fragment, FunctionComponent, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styled from 'styled-components'
import LikeIcon from '../../LikeIcon'
import { Category } from '../../../utils/constants'
import { removeLikeSlotContext } from '../../../contexts'
import { CDN } from '../../../public/environment'
import LazyLoad, { forceCheck } from 'react-lazyload'
import { Slot } from '../../../interfaces'
import SpinnerLoader from '../../SpinnerLoader'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

type PageProps = {
   data: Slot
};

const SlotCard: FunctionComponent<PageProps> = ({data}) => { 
    const router = useRouter()

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

    return (
        <Fragment>
            <ClickAwayListener onClickAway={ () =>  setShowBanner(false)} >
            <Main  
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
                            height={675}
                            onLoad={()=> setLoading(false)}/>
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

            </ClickAwayListener>
          
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

const Title = styled.span` 
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 25px;   
    font-weight: bold;
    font-size: 11px;
    padding-top: 2px;
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
