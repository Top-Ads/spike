import React, { FunctionComponent } from 'react'
import { Fragment } from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'
import { Producer } from '../../pages/api/graphql/schemas/producer'
import { GridType } from '../../utils/constants'
import { device } from '../../utils/device'
import ProducerCard from '../Cards/ProducerCard'
import GridSlots from '../GridSlots'

type PageProps = {
   data: Producer []
   setSelected: Function
};

const ProvidersList: FunctionComponent<PageProps> = ({data, setSelected}) => {

    return (
        <Fragment>
           <Grids>
                <GridSlots
                    type={GridType.SLOTS}
                    content={ 
                        data.map( (producer, index) =>
                        <LazyLoad offset={100}>
                            <ProducerCard selected={setSelected} key={index} data={producer}/>
                            { index === data.length-1 ? 
                            <Button>
                                <span>MORE PROVIDER +</span>   
                            </Button> : '' }

                        </LazyLoad>     
                    )}
                    label="PROVIDER FAMOSI"
                    xs={12} sm={12} md={12}
                    width={"200px"}
                    AlignItem="center"
                    spacing={0}
                    bgColor={'#fff'}   
                />
              
            </Grids>
        </Fragment>
    )
} 

const Grids = styled.div`
    width: inherit;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    color: ${({theme}) => theme.colors.background};
    margin-top: 20px;

    @media ${device.tablet} {
        align-self: center;
    }
`
const Button = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: 12px;
    border: 1px solid ${({theme}) => theme.colors.gradient};
    border-left-width: thick;
    padding: 10px;
    cursor: pointer;
    align-items: center;
    margin: 0 auto;

    span {
        color: ${({theme}) => theme.colors.background};
    }
    &:hover {
        background-color: #f2f2f2;
    }
`



export default ProvidersList
