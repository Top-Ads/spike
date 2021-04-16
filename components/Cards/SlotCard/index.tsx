import React, { Fragment, FunctionComponent, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styled from 'styled-components'
import { Slot } from '../../../pages/api/interfaces'
import LikeIcon from '../../LikeIcon'

type PageProps = {
   data: Slot
};

const GameCard: FunctionComponent<PageProps> = ({data}) => { 

    const router = useRouter()

    const [showBanner, setShowBanner] = useState<boolean>(false)
    const [likeOnClick, setLikeOnClick] = useState<boolean>(false)

    const playSlot = () => {

        router.push({
            pathname: '/slot/[url]',
            query: { gamePreviewUrl: data.gamePreviewUrl, gameName: data.gameName}
        }, '/slot')

    }
 
    const handleLikeClick = () => {
        setLikeOnClick(!likeOnClick)
    }

    return (
        <Fragment>
            <SlotContainer 
                onClick={playSlot}
                onMouseEnter={ () => setShowBanner(true)}
                onMouseLeave={ () => setShowBanner(false)}
                onTouchStart={ () => setShowBanner(!showBanner)}>
                
                { showBanner || likeOnClick ?
                <IconContainer>  
                    <LikeIcon setActive={handleLikeClick} fillColor="#ff1313" strokeColor="#ff1313" active={likeOnClick}/>
                </IconContainer> : '' } 
               
                <ThumbnailContainer>
                    <Image
                        alt=""
                        src={'http://' + data.gameThumbnail} 
                        layout="responsive"
                        priority={true}
                        width={624}
                        height={484}/>
                </ThumbnailContainer>
                
                { showBanner ? 
                    <Banner>
                        <ButtonContainer> 
                            <span>PLAY FREE</span>
                        </ButtonContainer>
                        <ButtonContainer> 
                            <span>REAL MONEY</span>
                        </ButtonContainer>
                    </Banner> : '' } 

            </SlotContainer>

            <TitleContainer>
                    {data.gameName}
            </TitleContainer>       
        </Fragment>
    ) 
}

const SlotContainer = styled.div`
    position: relative;
    list-style-type: none;
    cursor: pointer;
    border-radius: 10px 10px 0px 0px;
    overflow: hidden;
`

const TitleContainer = styled.div` 
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;   
    font-size: 13px;
    font-weight: bolder;
`

const Banner = styled.div`
    display: flex;
    align-items: flex-end;
    width: 100%;
    height: 100%;
    color: ${({theme}) => theme.text.color.primary};;
    position: absolute;
    top: 0;
    background-color: rgba(0,0,0,0.5);

    span {
        opacity:1;
        font-weight: bold;
    }
`

const IconContainer = styled.div` 
    width: 30px;
    position: absolute;
    right: 4px;
    top: 4px;
    z-index:2;
`

const ThumbnailContainer = styled.div` 
  z-index: 1;
  img { border-radius: 10px 10px 0px 0px; }
`

const ButtonContainer = styled.div`
    background-color: ${({theme}) => theme.colors.primary};
    border: 2px solid #fff;
    color: ${({theme}) => theme.text.color.primary};;
    border-radius: 5px;
    cursor: pointer;
    width: 50%;
    height: 25px;
    margin: 5px;
    font-size: 9px;
    font-weight: bold;
    align-items: center;
    display: inherit;
    justify-content: center;

    &: hover {
        box-shadow: 0px 0px 5px 5px rgba(255,255,255,0.4);
        -webkit-box-shadow: 0px 0px 5px 5px rgba(255,255,255,0.4);
        -moz-box-shadow: 0px 0px 5px 5px rgba(255,255,255,0.4);
    }
`

export default GameCard
