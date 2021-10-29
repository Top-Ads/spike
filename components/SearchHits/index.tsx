import React, { FunctionComponent, Fragment, useState, useEffect } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { CDN } from '../../public/environment'
import RatingStars from '../RatingStars'
import { device } from '../../lib/utils/device'
import { useRouter } from 'next/router'
import { AlgoliaSearchData } from '../../lib/schemas'
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined'
import { injectCDN } from '../../lib/utils/injectCDN'

type Props = {
   data: AlgoliaSearchData[]
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

    const handleRedirection = ({link, slug, type}: AlgoliaSearchData) => {

        if (type === 'slot') 
            router.push({ pathname: '/slot/[slug]', query: { slug: slug } })
        else if (type === 'producer') 
            router.push({ pathname: '/software/[slug]', query: { slug: slug } })
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
             <Main className="custom-scroll"> 
                {data.length > 0 &&  
                    data.map((item: AlgoliaSearchData, index: number) => 
                        <Fragment key={index}>
                            
                            { (index === slotTypeIndex ||  index === bonusTypeIndex ||  index === producerTypeIndex)  ?  
                                <SearchType> <b>{item.type}</b> </SearchType> : '' }  

                            <Container hasLink={item.link ? true : false} highlight={searchReviewName === item.name} onClick={() => handleRedirection(item)} onMouseOver={() => mouseOnHit(item)}>
                                <Thumbnail type={item.type}>
                                    <Image
                                        alt={item.name}
                                        src={item.image ? injectCDN(item.image) : `${CDN}/svg/no_img_available.svg`} 
                                        layout="responsive"
                                        sizes={"50vw"}
                                        priority={true}
                                        width={item.type === 'slot' ? 1200 : 150}
                                        height={item.type === 'slot' ? 675 : 150}/>
                                </Thumbnail>

                                <Info>
                                    <Name><b>{item.name}</b></Name>
                                    <Rating><RatingStars rating={item.rating}/></Rating>   
                                </Info>

                                { searchReviewName === item.name && <NavigateNextOutlinedIcon fontSize="small"/> }
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
    background-color: ${({highlight}) => highlight ? 'rgba(0, 0, 0, 0.1)' : 'none' };

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
    margin: auto 15px;
`

const Name = styled.div`
   text-transform: uppercase;
   color: ${({theme}) => theme.text.color.black};
   font-size: 12px;
   width: 75%;
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
