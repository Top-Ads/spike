import React, { FunctionComponent, Fragment, useState, useEffect } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { AlgoliaSearchData } from '../../pages/api/graphql/schemas/algoliaSearchData'
import Divider from '../Divider'
import { CDN } from '../../public/environment'
import RatingStars from '../RatingStars'
import { device } from '../../utils/device'

type PageProps = {
   data: AlgoliaSearchData[]
};

const SearchHit: FunctionComponent<PageProps> = ({data}) => {
    
    const [slotTypeIndex, setSlotTypeIndex] = useState<number>(-1)
    const [bonusTypeIndex, setBonusTypeIndex] = useState<number>(-1)
    const [producerTypeIndex, setProducerTypeIndex] = useState<number>(-1)

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
                                <SearchType> {item.type} </SearchType> : '' }  

                            <Divider/>

                            <Container>
                                <Thumbnail>
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
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    width: 30ch;
    background-color: #f2f2f2;
    color: ${({theme}) => theme.text.color.secondary};
    z-index: 100;
    
    @media ${device.mobileL} {
        overflow-y: scroll;
        overflow-x: hidden;
        max-height: 80vh;
        width: 80%;
    } 
`

const Container = styled.div`
    display: inherit;
    flex-direction: row;
    align-items: center;
    padding: 5px;
    
`

const Thumbnail = styled.div`
    width: 80px;
    border-radius: ${({theme}) => theme.button.borderRadius};
    overflow: hidden;
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    text-align: left;
    flex-grow: 2;
    width: min-content;
    padding: 0px 5px;
`

const Name = styled.div`
   text-transform: uppercase;
   color: ${({theme}) => theme.text.color.secondary};
   font-size: 12px;
`

const Rating = styled.div `
    color: ${({theme}) => theme.text.color.secondary};
    padding: 5px 0px;
`


const SearchType = styled.div `
    font-size: 12px;
    padding: 5px;
    background-color: ${({theme}) => theme.colors.background};
    text-transform: uppercase;
`

export default SearchHit
