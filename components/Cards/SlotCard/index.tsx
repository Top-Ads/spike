import React, { Fragment, FunctionComponent, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styled from 'styled-components'
import { Slot } from '../../../pages/api/interfaces'
import LikeIcon from '../../LikeIcon'
import { device } from '../../../utils/device'

type PageProps = {
   data: Slot
};

const GameCard: FunctionComponent<PageProps> = ({data}) => { 

    const router = useRouter()

    const [showBanner, setShowBanner] = useState<boolean>(false)
    const [activeLike, setActiveLike] = useState<boolean>(false)

    const playSlot = () => {

        router.push({
            pathname: '/slot/[url]',
            query: { playLink: data.playLink, name: data.name}
        }, '/slot')

    }
 
    const handleActiveLike = () => {
        setActiveLike(!activeLike)
    }

    return (
        <Fragment>
            <Main 
                onClick={playSlot}
                onMouseEnter={ () => setShowBanner(true)}
                onMouseLeave={ () => setShowBanner(false)}
                onTouchStart={ () => setShowBanner(!showBanner)}>
                
                { showBanner || activeLike ?
                <Icon>  
                    <LikeIcon setActive={handleActiveLike} active={activeLike}/>
                </Icon> : '' } 
               
                <Thumbnail>
                    <Image
                        alt=""
                        src={data.image && data.image.url ? data.image.url : '/svg/no_img_available.svg'} 
                        layout="responsive"
                        priority={true}
                        width={241}
                        height={151}/>
                </Thumbnail>
                
                { showBanner ? 
                    <Banner>
                        <Button> 
                            <span>PLAY FREE</span>
                        </Button>
                        <Button> 
                            <span>REAL MONEY</span>
                        </Button>
                    </Banner> : '' } 

            </Main>

            <Title>
                    {data.name}
            </Title>       
        </Fragment>
    ) 
}

const Main = styled.div`
    position: relative;
    list-style-type: none;
    cursor: pointer;
    border-radius: 8px 8px 0px 0px;
    overflow: hidden;
`

const Title = styled.div` 
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;   
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
  img { border-radius: 8px 8px 0px 0px; }
`

const Button = styled.div`
    background-color: ${({theme}) => theme.colors.backGround};
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

export default GameCard
