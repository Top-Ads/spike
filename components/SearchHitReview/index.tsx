import React, { FunctionComponent, useEffect, useState } from 'react'
import { Fragment } from 'react'
import styled from 'styled-components'
import { AlgoliaBlogType, AlgoliaSpikeType } from '../../lib/schemas'
import Image from 'next/image'
import { CDN } from '../../public/environment'
import { getSlots } from '../../lib/graphql/queries/slots'
import Markdown from 'markdown-to-jsx'
import { getBonuses } from '../../lib/graphql/queries/bonuses'
import { getProducers } from '../../lib/graphql/queries/producers'
import { animateScroll as scroll } from "react-scroll"
import { device } from '../../lib/utils/device'
import { injectCDN } from '../../lib/utils/injectCDN'

type Props = {
   data: AlgoliaBlogType & AlgoliaSpikeType
};

type ThumbnailProp = {
    type?: string
}

const SearchHitReview: FunctionComponent<Props> = ({data}) => {

    const [description, setDescription] = useState<string>()

    const getHitInfo = async (slug: string, type: string) => {
        if(type === 'slot')
            setDescription((await getSlots({ slug: slug }))[0]?.description)
        else if (type === 'bonus')
            setDescription((await getBonuses({ name: slug }))[0]?.description)
        else if (type === 'producer')
            setDescription((await getProducers({ slug: slug }))[0]?.description)
    }

    useEffect( () => {
        scroll.scrollToTop({containerId: 'review-container', duration:0 })
        
        if (data?.slug)
         getHitInfo(data.slug.toLowerCase(), data.type)

        else 
            setDescription('')
    }, [data])

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

    return (
        <Fragment>
            <Main id="review-container" className="custom-scroll">
                {
                    data && data?.type !== 'producer' && 
                    <Header> 
                        <Thumbnail type={data.type}>
                            <Image
                                alt={data.name || data.title}
                                src={data.image ? injectCDN(data.image) :  (data.imageUrl ?
                                    `https://wincasinoblogassets.b-cdn.net${data.imageUrl}` : `${CDN}/svg/no_img_available.svg`)} 
                                layout="responsive"
                                priority={true}
                                sizes={"30vw"}
                                width={getImgWidth(data.type)}
                                height={getImgHeight(data.type)}
                            />
                        </Thumbnail>
                        <Title>{data.name || data.title}</Title>
                    </Header>
                }
                <Article>
                    <MarkDownContainer>
                        <Markdown>{String(description)}</Markdown>
                    </MarkDownContainer>
                </Article>
            </Main>

        </Fragment>
    )
} 

const Main = styled.div`
    padding: 10px;
    width: 55%;
    overflow-y: scroll;

    @media ${device.mobileL} {
        display: none;
    }
`

const Header = styled.div`
   display: flex;
   height: min-content;
`

const Thumbnail = styled.div<ThumbnailProp>`
    width: ${({type}) => {
        if(type === 'slot')
            return '220px'
        else if(type === 'blog')
            return '220px'
        else  return '140px'
    }};
    height: min-content;
    border-radius: ${({theme}) => theme.button.borderRadius};
    overflow: hidden;
`

const Title = styled.h2`
    display: flex;
    font-size: 1.5rem; 
    margin: 0px 0px 0px 15px;
    width: 50%;
`
    
const Article = styled.article`
    display: none;
    font-size: 0.85rem;
    margin-top: 20px;
`

const MarkDownContainer = styled.div`
    img {     
        width: 60%;
        display: flex;
        margin: auto;
        margin-bottom: 20px; 
    }
`

export default SearchHitReview
