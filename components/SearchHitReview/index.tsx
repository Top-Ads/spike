import React, { FunctionComponent, useEffect, useState } from 'react'
import { Fragment } from 'react'
import styled from 'styled-components'
import { AlgoliaSearchData } from '../../lib/schemas'
import Image from 'next/image'
import { CDN } from '../../public/environment'
import { getSlots } from '../../lib/graphql/queries/slots'
import Markdown from 'markdown-to-jsx'
import { getBonuses } from '../../lib/graphql/queries/bonuses'
import { getProducers } from '../../lib/graphql/queries/producers'
import { animateScroll as scroll } from "react-scroll"
import { device } from '../../lib/utils/device'

type Props = {
   data?: AlgoliaSearchData
};

type ThumbnailProp = {
    type?: string
}

const SearchHitReview: FunctionComponent<Props> = ({data}) => {

    const [description, setDescription] = useState<string>()

    const getHitInfo = async (slug: string, type: string) => {
        if(type === 'slot')
            setDescription((await getSlots({ countryCode: 'it', slug: slug }))[0]?.description)
        else if (type === 'bonus')
            setDescription((await getBonuses({ countryCode: 'it', name: slug }))[0]?.description)
        else if (type === 'producer')
            setDescription((await getProducers({ countryCode: 'it', slug: slug }))[0]?.description)
    }

    useEffect( () => {
        scroll.scrollToTop({containerId: 'review-container', duration:0 })
        
        if (data?.slug)
         getHitInfo(data.slug.toLowerCase(), data.type)

        else 
            setDescription('')
    }, [data])

    return (
        <Fragment>
            <Main id="review-container" className="custom-scroll">
                {
                    data?.type !== 'producer' && 
                    <Header> 
                        <Thumbnail type={data?.type}>
                            <Image
                                alt={data?.name}
                                src={data?.image ? data?.image : `${CDN}/svg/no_img_available.svg`} 
                                layout="responsive"
                                priority={true}
                                width={data?.type === 'slot' ? 1200 : 150}
                                height={data?.type === 'slot' ? 675 : 150}
                            />
                        </Thumbnail>
                        <Title>{data?.name}</Title>
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
    width: ${({type}) => type === 'slot' ? '220px' : '140px;'};
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
