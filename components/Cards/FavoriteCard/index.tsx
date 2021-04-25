import React, { FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import styled from 'styled-components'
import { Slot } from '../../../interfaces'
import Image from 'next/image'
import RatingStars from '../../RatingStars'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'

type PageProps = {
   data: Slot,
   deleteItem: Function
};

const FavoriteCard: FunctionComponent<PageProps> = ({data, deleteItem}) => {

    const router = useRouter()
    
    const playSlot = () => {
        router.push({
            pathname: '/slot/[url]',
            query: { playLink: data.playLink, name: data.name}
        }, '/slot')
    }

    return (
        <Fragment>

            <Main>

                <Container onClick={playSlot}>
                    <Thumbnail>
                        <Image
                            alt={data.name}
                            src={data.image && data.image.url ? data.image.url : '/svg/no_img_available.svg'} 
                            layout="responsive"
                            priority={true}
                            width={75}
                            height={'auto'}/>
                    </Thumbnail>

                    <Info>
                        <Name><strong>{data.name}</strong></Name>
                        <Rating><RatingStars rating={data.rating}/></Rating>
                    
                    </Info>
                </Container>

                <Button className="button" onClick={ () =>deleteItem(data.id) } color="secondary">
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
    border-bottom: 1px solid ${({theme}) => theme.colors.gradient};
    padding: 10px 0px;
    cursor: pointer;

    .button {
        display: flex;3
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
    width: 60px;
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
`

const Rating = styled.div `
    color: ${({theme}) => theme.text.color.secondary};
    padding: 5px 0px;
`


export default FavoriteCard
