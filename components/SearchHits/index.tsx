import React, { FunctionComponent, Fragment, useState, useEffect } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { CDN } from '../../public/environment'
import RatingStars from '../RatingStars'
import { device } from '../../lib/utils/device'
import { useRouter } from 'next/router'
import { AlgoliaBlogType, AlgoliaSpikeType } from '../../lib/schemas'
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined'
import { injectCDN } from '../../lib/utils/injectCDN'

type Props = {
   data: (AlgoliaBlogType & AlgoliaSpikeType)[]
   mouseOnHit: Function
   searchReviewName?: string
};

type ThumbnailProp = {
    type?: string
}

type ContainerProp = {
    highlight: boolean
    hasLink: boolean
}

const SearchHits: FunctionComponent<Props> = ({data, mouseOnHit, searchReviewName}) => {
    
    const router = useRouter()
        
    const [slotTypeIndex, setSlotTypeIndex] = useState<number>(-1)
    const [bonusTypeIndex, setBonusTypeIndex] = useState<number>(-1)
    const [producerTypeIndex, setProducerTypeIndex] = useState<number>(-1)
    const [articleTypeIndex, setBlogTypeIndex] = useState<number>(-1)
    
    const handleRedirection = ({link, slug, type}: AlgoliaSpikeType) => {

        if (type === 'slot') 
            router.push({ pathname: '/slot/[slug]', query: { slug: slug } })
        else if (type === 'producer') 
            router.push({ pathname: '/software/[slug]', query: { slug: slug } })
        else if (type === 'blog') 
            router.push({ pathname: `/blog/${link}` })
        else 
            link && router.push(link)
    }

    const getImgWidth = (type: 'slot' | 'bonus' | 'producer' | 'blog'): number => {
        if(type === 'slot')
            return 1200
        else if(type === 'blog')
            return 1079
        else  return 150
    }

    const getImgHeight = (type: 'slot' | 'bonus' | 'producer' | 'blog'): number => {
        if(type === 'slot')
            return 675
        else if(type === 'blog')
            return 607
        else  return 150
    }
    
    useEffect(() => {
        setSlotTypeIndex(data.findIndex( (item) => item.type === 'slot'))
        setBonusTypeIndex(data.findIndex( (item) => item.type === 'bonus'))
        setProducerTypeIndex(data.findIndex( (item) => item.type === 'producer'))
        setBlogTypeIndex(data.findIndex( (item) => item.type === 'blog'))
    }, [data])

    return (
        <Fragment>
             <Main className="custom-scroll"> 
                {data.length > 0 &&  
                    data.map((item: AlgoliaSpikeType & AlgoliaBlogType, index: number) => 
                        <Fragment key={index}>
                            
                            { (index === slotTypeIndex ||  index === bonusTypeIndex ||  index === producerTypeIndex  || index === articleTypeIndex)  ?  
                                <SearchType> <b>{item.type}</b> </SearchType> : '' }  

                            <Container hasLink={item.link ? true : false} highlight={searchReviewName === item.name} onClick={() => handleRedirection(item)} onMouseOver={() => mouseOnHit(item)}>
                                <Thumbnail type={item.type}>
                                    <Image
                                        alt={item.name || item.title}
                                        src={item.image ? injectCDN(item.image) :  (item.imageUrl ?
                                                 `https://wincasinoblogassets.b-cdn.net${item.imageUrl}` : `${CDN}/svg/no_img_available.svg`) } 
                                        layout="responsive"
                                        sizes={"30vw"}
                                        priority={true}
                                        width={getImgWidth(item.type)}
                                        height={getImgHeight(item.type)}/>
                                </Thumbnail>

                                <Info>
                                    <Name><b>{item.name || item.title}</b></Name>
                                    { item.rating && <Rating><RatingStars rating={item.rating}/></Rating> }
                                </Info>

                                {(searchReviewName === item.name || searchReviewName === item.title) && <NavigateNextOutlinedIcon fontSize="small"/> }
                            </Container>
                        
                        </Fragment>
                    ) 
                }
            </Main>               
        </Fragment>
    )
} 

const Main = styled.div`
    display: flex;
    flex-direction: column;
    width: 45%;
    height: inherit;
    background-color: #f2f2f2;
    color: ${({theme}) => theme.text.color.black};
    z-index: 999;
    overflow-y: scroll;
    
    @media ${device.tablet} {
        position: fixed;
        max-height: 80vh;
        overflow: scroll;
    } 

    @media ${device.mobileL} {
        position: fixed;
        width: 100%;
        overflow: scroll;
    } 
`

const Container = styled.div<ContainerProp>`
    display: inherit;
    flex-direction: row;
    align-items: center;
    padding: 10px 5px;
    border-top: 1px solid ${({theme}) => theme.palette.background};
    cursor: pointer;
    

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`

const Thumbnail = styled.div<ThumbnailProp>`
    width: ${({type}) => type === 'slot' ? '90px' : type === 'blog' ? '100px' : '60px;'};
    border-radius: ${({theme}) => theme.button.borderRadius};
    overflow: hidden;
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    flex-grow: 2;
    width: min-content;
    margin: auto 15px;
`

const Name = styled.div`
   text-transform: uppercase;
   color: ${({theme}) => theme.text.color.black};
   font-size: 12px;
   width: 230px;
`

const Rating = styled.div `
    color: ${({theme}) => theme.text.color.black};
    padding: 5px 0px;
`


const SearchType = styled.div `
    font-size: 12px;
    padding: 5px;
    background-color: ${({theme}) => theme.palette.background};
    text-transform: uppercase;
    color: #fff;
`

export default SearchHits
