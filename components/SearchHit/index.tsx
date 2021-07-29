import React, { FunctionComponent, Fragment, useState, useEffect } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { CDN } from '../../public/environment'
import RatingStars from '../RatingStars'
import { device } from '../../utils/device'
import { useRouter } from 'next/router'
import { AlgoliaSearchData } from '../../interfaces'

type PageProps = {
   data: AlgoliaSearchData[]
};

type ThumbnailProp = {
    type?: string
}

const SearchHit: FunctionComponent<PageProps> = ({data}) => {
    
    const router = useRouter()
        
    const [slotTypeIndex, setSlotTypeIndex] = useState<number>(-1)
    const [bonusTypeIndex, setBonusTypeIndex] = useState<number>(-1)
    const [producerTypeIndex, setProducerTypeIndex] = useState<number>(-1)

    const handleRedirection = ({link, slug, type}: AlgoliaSearchData) => {

        if (type === 'slot') 
            router.push({ pathname: '/slot/[slug]', query: { slug: slug } })
        else 
            link && router.push(link)
    }
    
    useEffect(() => {
        setSlotTypeIndex(data.findIndex( (item) => item.type === 'slot'))
        setBonusTypeIndex(data.findIndex( (item) => item.type === 'bonus'))
        setProducerTypeIndex(data.findIndex( (item) => item.type === 'producer'))
    }, [data])

    return (
        <Fragment>
             <Main> 
                {data.length ? 
                    data.map((item: AlgoliaSearchData, index: number) => 
                        <Fragment key={index}>
                            
                            { index === slotTypeIndex ||  index === bonusTypeIndex ||  index === producerTypeIndex  ?  
                                <SearchType> <b>{item.type}</b> </SearchType> : '' }  

                            <Container onClick={() => handleRedirection(item)}>
                                <Thumbnail type={item.type}>
                                    <Image
                                        alt={item.name}
                                        src={item.image ? item.image : `${CDN}/svg/no_img_available.svg`} 
                                        layout="responsive"
                                        priority={true}
                                        width={item.type === 'slot' ? 1200 : 150}
                                        height={item.type === 'slot' ? 675 : 150}/>
                                </Thumbnail>

                                <Info>
                                    <Name><b>{item.name}</b></Name>
                                    <Rating><RatingStars rating={item.rating}/></Rating>   
                                </Info>
                            </Container>
                        
                        </Fragment>
                    ) 
                : '' }
            </Main>               
        </Fragment>
    )
} 

const Main = styled.div`
    position: absolute;
    margin-top: 6px;
    display: flex;
    flex-direction: column;
    width: 45ch;
    height: auto;
    background-color: #f2f2f2;
    color: ${({theme}) => theme.text.color.black};
    z-index: 999;
    overflow: hidden;
    border-radius: 5px;
    
    @media ${device.tablet} {
        position: fixed;
        max-height: 80vh;
        overflow: scroll;
    } 

    @media ${device.mobileL} {
        position: fixed;
        width: 90%;
        max-height: 75vh;
        overflow: scroll;
    } 
`

const Container = styled.div`
    display: inherit;
    flex-direction: row;
    align-items: center;
    padding: 10px 5px;
    border-top: 1px solid ${({theme}) => theme.color.background};
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
    
`

const Thumbnail = styled.div<ThumbnailProp>`
    width: ${({type}) => type === 'slot' ? '90px' : '60px;'};
    border-radius: ${({theme}) => theme.button.borderRadius};
    overflow: hidden;
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    flex-grow: 2;
    width: min-content;
    margin: auto 15px
`

const Name = styled.div`
   text-transform: uppercase;
   color: ${({theme}) => theme.text.color.black};
   font-size: 12px;
`

const Rating = styled.div `
    color: ${({theme}) => theme.text.color.black};
    padding: 5px 0px;
`


const SearchType = styled.div `
    font-size: 12px;
    padding: 5px;
    background-color: ${({theme}) => theme.color.background};
    text-transform: uppercase;
    color: #fff;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
`

export default SearchHit
