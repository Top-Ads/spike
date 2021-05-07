import React, { FunctionComponent, useState } from 'react'
import { Fragment } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { Producer } from '../../../pages/api/graphql/schemas/producer'
import LazyLoad from 'react-lazyload'
import { CDN } from '../../../public/environment'
import FilterListIcon from '@material-ui/icons/FilterList'

type PageProps = {
    data: Producer,
    selected: Function 
};

const ProducerCard: FunctionComponent<PageProps> = ({data, selected}) => {
   
    const [show, setShow] = useState<boolean>(false)

    return (
        <Fragment>
            <Main 
            onClick={() => selected(data.name)}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}>
                <Thumbnail>
                    <LazyLoad key={data.id} height={60} offset={200}>
                        <Image
                            alt={data.name}
                            src={data.image[0] ? data.image[0].url : `${CDN}/svg/no_img_available.svg`}
                            layout="responsive"
                            priority={true}
                            width={195}
                            height={109}/>
                    </LazyLoad>
                </Thumbnail>

                <Container>
                    <div><strong>{data.name}</strong></div>
                    { show ? <FilterListIcon fontSize={'small'} className={'filter-icon'}/> : '' }
                </Container>

            </Main>
        </Fragment>
    )
} 

const Main = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 12px;
    border: 1px solid ${({theme}) => theme.colors.gradient};
    border-left-width: thick;
    padding: 0px 5px;
    cursor: pointer;
    align-items: center;

    &:hover {
        background-color: #f2f2f2;
    }
`

const Thumbnail = styled.div`
    width: 60px;
    border-radius: ${({theme}) => theme.button.borderRadius};
    overflow: hidden;
`

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
    align-items: center;
    flex-grow: 2;
    width: min-content;
    padding: 0px 5px;
`

export default ProducerCard
