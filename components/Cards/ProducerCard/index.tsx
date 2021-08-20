import React, { FunctionComponent, useState } from 'react'
import { Fragment } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { Producer } from '../../../lib/schemas'
import { CDN } from '../../../public/environment'
import FilterListIcon from '@material-ui/icons/FilterList'

type Props = {
    data: Producer,
    setSelected: Function
};

const ProducerCard: FunctionComponent<Props> = ({data, setSelected}) => {
   
    const [show, setShow] = useState<boolean>(false)

    return (
        <Fragment>
            <Main 
            onClick={() => setSelected(data.name)}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            onTouchEnd={() => setShow(false)}
            onTouchStart={() => setShow(true)}>
                <Thumbnail>
                    <Image
                        alt={data.name}
                        src={data.image[0] ? data.image[0].url : `${CDN}/svg/no_img_available.svg`}
                        layout="responsive"
                        priority={true}
                        width={195}
                        height={109}/>
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
    border: 1px solid ${({theme}) => theme.palette.gradient};
    padding: 5px;
    cursor: pointer;
    align-items: center;
`

const Thumbnail = styled.div`
    width: 50px;
    padding: 1px;
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
    padding: 0px 10px;

    .filter-icon {
        color: ${({theme}) => theme.palette.background};
    }
`

export default ProducerCard
