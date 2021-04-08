import React, { Fragment, FunctionComponent, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styled from 'styled-components'
import { Game } from '../../../interfaces'
import LikeIcon from '../../LikeIcon'

type PageProps = {
   data: Game
};

const GameCard: FunctionComponent<PageProps> = ({data}) => { 

    const router = useRouter()

    const [showBanner, setShowBanner] = useState<boolean>(false)
    const [likeOnClick, setLikeOnClick] = useState<boolean>(false)

    const playSlot = () => {
        router.push(data.gamePreviewUrl)
    }
 
    const handleLikeClick = () => {
        setLikeOnClick(!likeOnClick)
    }

    return (
        <Fragment>
            <SlotContainer 
                key={data.gameName}
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
                            <span>PLAY FREE !</span>
                        </ButtonContainer>
                        <ButtonContainer> 
                            <span>PLAY MONEY !</span>
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
    color: white;
    position: absolute;
    top: 0;
    background-color: rgba(0,0,0,0.5);

    span {
        opacity:1;
        font-weight: bold;
    }
`

const IconContainer = styled.div` 
    width: 20px;
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
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    width: 50%;
    height: 25px;
    margin: 5px;
    font-size: 10px;
    align-items: center;
    display: inherit;
    justify-content: center;

    &: hover, &: active {
        background-color: #fff;
        border: 2px solid ${({theme}) => theme.colors.primary};
        color: ${({theme}) => theme.colors.primary};
    }
`

export default GameCard
