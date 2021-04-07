import React, { Fragment, FunctionComponent, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styled from 'styled-components'
import { Game } from '../../../interfaces'
import Button from '../../Button'
import LikeIcon from '../../LikeIcon'

type PageProps = {
   data: Game
};

const GameCard: FunctionComponent<PageProps> = ({data}) => { 

    const router = useRouter()

    const [showBanner, setShowBanner] = useState<boolean>(false)
    const [likeClick, setLikeClick] = useState<boolean>(false)

    const playSlot = () => {
        router.push(data.gamePreviewUrl)
    }
 
    const handleLikeClick = () => {
        setLikeClick(!likeClick)
    }

    return (
        <Fragment>
            <SlotContainer 
                key={data.gameName}
                onClick={playSlot}
                onMouseEnter={ () => setShowBanner(true)}
                onMouseLeave={ () => setShowBanner(false)}>
                
                { showBanner ?
                <IconContainer>  
                    <LikeIcon setActive={handleLikeClick} fillColor="#ff1313" strokeColor="#ff1313" active={likeClick}/>
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
                
                { showBanner ? <Banner>< Button label="PLAY !"/> </Banner> : '' } 

            </SlotContainer>

            <TitleContainer>
                    {data.gameName}
            </TitleContainer>       
        </Fragment>
    ) 
}

const SlotContainer = styled.li`
    position: relative;
    list-style-type: none;
    cursor: pointer;
`

const TitleContainer = styled.div` 
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;   
    font-size: 12px;
    font-weight: bolder;
`

const Banner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: white;
    background-color: rgba(0,0,0,0.5);
    border-radius: 10px 10px 0px 0px;
    position: absolute;
    top: 0;

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
export default GameCard
