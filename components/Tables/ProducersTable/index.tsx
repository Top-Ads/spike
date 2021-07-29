import React, { FunctionComponent } from 'react'
import { Fragment } from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'
import { Producer } from '../../../interfaces'
import { GridType } from '../../../utils/constants'
import { device } from '../../../utils/device'
import ProducerCard from '../../Cards/ProducerCard'
import GridCards from '../../GridCards'

type PageProps = {
   data: Producer []
   setSelected: Function,
   setOpenDialog: Function
};

const ProducersTable: FunctionComponent<PageProps> = ({data, setSelected, setOpenDialog}) => {

    return (
        <Fragment>
           <Grids>
                <GridCards
                    type={GridType.SLOTS}
                    content={ 
                        data.map( (producer, index) =>
                        <LazyLoad offset={100}>

                            { index === 0 ? 
                            <Button id="provider-famosi" style={{borderTopWidth: 'thick'}} >
                                <span>PROVIDER FAMOSI</span>   
                            </Button> : '' }

                            <ProducerCard setSelected={setSelected} key={index} data={producer}/>

                            { index === data.length-1 ? 
                            <Button id="more-provider" onClick={ () => setOpenDialog(true)} style={{borderBottomWidth: 'thick'}} >
                                <span>MORE PROVIDER +</span>   
                            </Button> : '' }

                        </LazyLoad>     
                    )}
                    xs={12} sm={12} md={12}
                    width={"auto"}
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
    color: ${({theme}) => theme.palette.background};
    margin-top: 20px;

    @media ${device.tablet} {
        align-self: center;
    }
`
const Button = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid ${({theme}) => theme.palette.gradient};
    padding: 10px;
    margin: 0 auto;
    font-weight: bold;
    cursor: pointer;

    span { color: ${({theme}) => theme.palette.background}; }
    
    &#provider-famosi:hover {
        background-color: unset;
    }

    &#more-provider:hover {
        background-color: ${({theme}) => theme.palette.gradient};
        span { color: #fff; } 
    }
`



export default ProducersTable
