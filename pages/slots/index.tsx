import React, { FunctionComponent, useState } from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'
import SlotCard from '../../components/Cards/SlotCard'
import Divider from '../../components/Divider'
import GridSlots from '../../components/GridSlots'
import Layout from '../../components/Layout'
import SlotsCounter from '../../components/SlotsCounter'
import { GridType, menuList } from '../../utils/constants'
import { device } from '../../utils/device'
import AquaClient from '../api/graphql/aquaClient'
import { SLOTS } from '../api/graphql/queries/slots'
import TextInput from '../../components/Inputs/Textfield'
import MenuList from '../../components/MenuList'
import ShuffleIcon from '@material-ui/icons/Shuffle'
import { Slot } from '../api/graphql/schemas/slot'
import { Fragment } from 'react'
import { shortDate } from '../../utils/shortDate'
import { PRODUCERS } from '../api/graphql/queries/producers'
import { Producer } from '../api/graphql/schemas/producer'
import ProvidersList from '../../components/ProvidersList'

type PageProps = {
    freeSlotsData: Slot [],
    newSlotsData: Slot [],
    pupularSlotsData: Slot [],
    producersData: Producer []
}

const Slots: FunctionComponent<PageProps> = ({newSlotsData, pupularSlotsData, freeSlotsData, producersData}) => { 

    const aquaClient = new AquaClient()

    const listItems:string[] = [menuList.RTP, menuList.LIKES, menuList.UPDATED_AT, menuList.CREATED_AT, menuList.ALPHABETIC]

    const [freeSlots, setFreeSlots] = useState<Slot[]>(freeSlotsData)
    const [itemSelected, setItemSelected] = useState<string>(menuList.ALPHABETIC)
    const [producerSelected, setProducerSelected] = useState<string>('')

    function getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    const fetchData = async (limit: number, start: number, sortBy?: string, producer?: string) => {
        const request =  await aquaClient.query({ 
            query: SLOTS, 
            variables: { 
                code: 'it',
                limit: limit,
                start: start,
                sort: sortBy,
                producer: producer
             } 
        })

        return request.data.data.slots
    }

    const loadMore = async () => {
        const moreFreeSlots = await fetchData(12, freeSlots.length)

        setFreeSlots([...freeSlots, ...moreFreeSlots])    
    }

    const shuffle = async () => {
        setProducerSelected('')
        setItemSelected(menuList.SHUFFLE)
        const shuffleFreeSlots = await fetchData(36, getRandomInt(freeSlots.length, 500))

        setFreeSlots(shuffleFreeSlots)    
    }

    const handleSearch = async (text: string) => {
        setProducerSelected('')
        
        if (!text.length) {
            setFreeSlots(freeSlotsData)
        }

        if (text.length > 3) {
            const searchSlotRequest =  await aquaClient.query({ 
                query: SLOTS, 
                variables: { code: 'it', name_contains: text } 
            })

            const newData = searchSlotRequest.data.data.slots
            setFreeSlots(newData)
        }

    }
 
    const handleItemSelected = async (itemSelected: string) => {
        setProducerSelected('')

        const data = await fetchData(36, 0, itemSelected.toLowerCase())
            
        setFreeSlots(data)
        setItemSelected(itemSelected)
    }

    const handleProducerSelected = async (producerSelected: string) => {
        const sortBy = itemSelected.toLowerCase() === menuList.SHUFFLE ? menuList.ALPHABETIC : itemSelected.toLowerCase()

        const data = await fetchData(36, 0, sortBy, producerSelected)
            
        setFreeSlots(data)
        setProducerSelected(producerSelected)
    }

    return (
        <Layout title="Free Slots">
        <div className="space-around">
            <Grids id='ads-slots'>
                <GridSlots
                    type={GridType.SLOTS} 
                    content={ newSlotsData.map( (slot) => 
                    <LazyLoad once key={slot.id} height={400} offset={300}>
                        <SlotCard key={slot.name} data={slot}/>
                    </LazyLoad> )}
                    label="Nuove slot."
                    xs={6} sm={4} md={4}
                    breadcrumbIndex={0}
                    breadcrumbSize={2}
                />
                <GridSlots
                    type={GridType.SLOTS}
                    content={ pupularSlotsData.map( (slot) =>  
                    <LazyLoad once key={slot.id} height={400} offset={300} >
                        <SlotCard key={slot.id} data={slot}/>
                    </LazyLoad> )}
                    label="Le slot piu popolari."
                    xs={6} sm={4} md={4}
                    breadcrumbIndex={1}
                    breadcrumbSize={2}   
                />
            </Grids>

            <Main>
                <Title>
                    <h3>LA NOSTRA LIBRERIA DI SLOT - TUTTE DA GIOCARE GRATIS!</h3>
                    <Divider/>
                </Title>

                <Container>
                    <Section>
                        <SlotsCounter total={1528}/>
                        <ProvidersList data={producersData} setSelected={handleProducerSelected}/> 
                    </Section>

                    <Article>
                        <Actions>

                            <div className="search-input">
                                <TextInput
                                    onSearch={handleSearch}
                                    onChange={handleSearch}
                                    size={'small'}
                                    borderRadius={'5px'}
                                    searchIcon
                                    placeholder="Cerca una slot..."/>
                            </div>

                            <div className="menu-list">
                                <MenuList listItems={listItems} itemSelected={itemSelected} setItemSelected={handleItemSelected}/>

                                <div className="shuffle">
                                    <ShuffleIcon fontSize={'small'} onClick={shuffle}/>
                                </div>
                            </div>

                        </Actions>

                        <Grids id='free-slots'>
                            <GridSlots 
                                type={GridType.SLOTS} 
                                content={ freeSlots.map( (slot: Slot) => 
                                <Fragment>
                                    <Info>
                                        <div className="producer">{ producerSelected ?  slot.producer.name : ''}</div>

                                        {itemSelected === menuList.RTP ? slot.rtp ? `RTP: ${slot.rtp}%` : 'NA' : ''}
                                        {itemSelected === menuList.LIKES ? slot.likes ? `${slot.likes} likes`: 'NA' : ''}
                                        {itemSelected === menuList.CREATED_AT ? slot.created_at ?
                                             `${shortDate(slot.created_at)}`: 'NA' : ''}
                                        {itemSelected === menuList.UPDATED_AT ? slot.created_at ?
                                             `${shortDate(slot.updated_at)}`: 'NA' : ''}
                                    </Info>
                                    <SlotCard key={slot.name} data={slot}/>
                                </Fragment>
                                )}
                                width={'100%'}
                                xs={6} sm={4} md={3}
                            />
                        </Grids>

                        <Button onClick={loadMore}>
                            <span>CARICA ALTRO</span>
                        </Button>

                    </Article>
                </Container>  
            </Main>
        </div>
        </Layout>
    ) 
}

const Info = styled.div` 
    display: flex;
    justify-content: flex-end;
    font-weight: normal;
    font-size: 10px;
    padding: 5px;
    height: auto;

    .producer {
        display: inherit;
        flex-direction: row;
        flex-grow: 1;
    }
`

const Grids = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    color: ${({theme}) => theme.colors.background};

    @media ${device.tablet} {
        &#ads-slots {
            flex-wrap: nowrap;
            overflow-x: scroll;
        }
    }
`

const Main = styled.div`
    display: flex;
    flex-direction: column;
`
const Title = styled.div`
    color: ${({theme}) => theme.colors.background};
    flex-grow: 1;
    h3 { margin-bottom: 0; }
`

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
`
const Section = styled.div`
    display: inherit;  
    flex-direction: column;
    margin-right: 20px;
    width: 250px;

    @media ${device.tablet} {
       display: none;
    }
`
const Article = styled.div`
    display: inherit;
    flex-direction: column;
    flex-grow: 2;
`

const Actions = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px 30px;
    flex-wrap: wrap;

    .search-input {
        flex-grow: 2;
        border: 1px solid ${({theme}) => theme.colors.background};
        border-radius: 5px;

        @media ${device.mobileL} {
            margin-bottom: 20px;
        }
    }

    .menu-list {
        display: inherit;
        flex-grow: 1;
        justify-content: flex-end;
        z-index: 99;
    }

    .shuffle {
        border: 1px solid #ff1313;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 0;
        border-radius: 5px;
       
        color: #212530;
        background-color: #fff;
        width: 40px;
        cursor: pointer;

        &:hover {
            color: #ff1313;
        }
    }
`

const Button = styled.div`
    background-color: ${({theme}) => theme.colors.background};
    border: 2px solid ${({theme}) => theme.colors.background};
    color: #fff;
    border-radius: ${({theme}) => theme.button.borderRadius};
    font-weight: normal;
    cursor: pointer;
    padding: 15px;
    width: fit-content;
    text-transform: uppercase;

    display: flex;
    align-self: center;

    &:hover {
      box-shadow: ${({theme}) => theme.button.boxShadowX};
    }
`
export async function getStaticProps() {
    const aquaClient = new AquaClient()

    const newSlotsRequest =  await aquaClient.query({ 
        query: SLOTS, 
        variables: { code: 'it', limit: 6, start: 0 } })

    const popularSlotsRequest =  await aquaClient.query({ 
        query: SLOTS, 
        variables: { code: 'it', limit: 6, start: 6 } })

    const freeSlotsRequest =  await aquaClient.query({ 
        query: SLOTS, 
        variables: { code: 'it', limit: 36, start: 0 } })

    
    const producersRequest =  await aquaClient.query({ 
        query: PRODUCERS, 
        variables: { limit: 10, start: 0 } })

    return {
        props: {
            newSlotsData: newSlotsRequest.data.data.slots,
            pupularSlotsData: popularSlotsRequest.data.data.slots,
            freeSlotsData: freeSlotsRequest.data.data.slots,
            producersData: producersRequest.data.data.producers
        }
    }
}

export default Slots
