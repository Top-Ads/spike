import React, { FunctionComponent, useState } from 'react'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import RatingStars from '../../RatingStars'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import { CDN } from '../../../public/environment'
import { Slot } from '../../../lib/schemas'
import SpinnerLoader from '../../SpinnerLoader'
import { injectCDN } from '../../../lib/utils/injectCDN'

type Props = {
   data: Slot,
   deleteItem: Function
};

const FavoriteCard: FunctionComponent<Props> = ({data, deleteItem}) => {

    const router = useRouter()
    
    const [loading, setLoading] = useState<boolean>(true)

    const playSlot = () => {
        router.push({
            pathname: '/slot/[slug]',
            query: { slug: data.slug }
        })
    }

    return (
        <Fragment>

            <Main>
                <Container onClick={playSlot}>
                    
                    <Thumbnail>
                        <SpinnerLoader show={loading}/>
                        <Image
                            alt={data.name}
                            src={data.image && data.image.url ? injectCDN(data.image.url) : `${CDN}/svg/no_img_available.svg`} 
                            layout="responsive"
                            priority={true}
                            sizes={"30vw"}
                            width={1200}
                            height={675}
                            onLoad={()=> setLoading(false)}/>
                    </Thumbnail>

                    <Info>
                        <Name><strong>{data.name}</strong></Name>
                        <Rating><RatingStars rating={data.rating}/></Rating>
                        <Producer>
                            { data.producer.name }
                        </Producer>
                    </Info>
                </Container>

                <Button className="button" onClick={ () => deleteItem(data.id) } color="secondary">
                    <CloseIcon/>
                </Button>

            </Main>
            
        </Fragment>
    ) 
} 

const Main = styled.div`
    display: flex;
    flex-direction: row;
    align-items: strech;
    font-size: 12px;
    border-bottom: 1px solid ${({theme}) => theme.palette.gradient};
    padding: 5px 0px;
    cursor: pointer;

    .button {
        display: flex;
    }

    &:hover {
        background-color: rgba(0, 0, 0, 0.04);
    }
`
const Container = styled.div`
    display: inherit;
    flex-direction: row;
    align-items: center;
    flex-grow: 2;
    padding: 5px;
`

const Thumbnail = styled.div`
    position: relative;
    width: 100px;
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
    margin-left: 10px;
`

const Name = styled.div`
   text-transform: uppercase;
`

const Producer = styled.div`
    font-size: 0.67rem;
`

const Rating = styled.div `
    color: ${({theme}) => theme.text.color.black};
`

export default FavoriteCard
