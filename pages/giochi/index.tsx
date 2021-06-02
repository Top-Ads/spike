import React, { FunctionComponent, useState } from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'
import SlotCard from '../../components/Cards/SlotCard'
import Divider from '../../components/Divider'
import GridCards from '../../components/GridCards'
import Layout from '../../components/Layout'
import SlotsCounter from '../../components/SlotsCounter'
import { GridType, menuList } from '../../utils/constants'
import { device } from '../../utils/device'
import AquaClient from '../api/graphql/aquaClient'
import { SLOTS } from '../api/graphql/queries/slots'
import CustomTextField from '../../components/Inputs/Textfield'
import MenuList from '../../components/MenuList'
import ShuffleIcon from '@material-ui/icons/Shuffle'
import { Fragment } from 'react'
import { shortDate } from '../../utils/shortDate'
import { PRODUCERS } from '../api/graphql/queries/producers'
import ProvidersList from '../../components/ProvidersList'
import { BONUSES } from '../api/graphql/queries/bonuses'
import Image from 'next/image'
import { CDN } from '../../public/environment'
import BannerList from '../../components/BannerList'
import Article from '../../components/Article'
import DialogPopup from '../../components/Modals/DialogPopup'
import { Bonus, Producer, Slot } from '../../interfaces'
import FreeBonusList from '../../components/FreeBonusList'

type PageProps = {
    freeSlotsData: Slot [],
    newSlotsData: Slot [],
    pupularSlotsData: Slot [],
    producersData: Producer [],
    freeBonusData: Bonus []
}

const GiochiPage: FunctionComponent<PageProps> = (props) => { 

    const { newSlotsData, pupularSlotsData, freeSlotsData, producersData, freeBonusData } = props;

    const aquaClient = new AquaClient()

    const listItems:string[] = [menuList.RTP, menuList.LIKES, menuList.UPDATED_AT, menuList.CREATED_AT, menuList.ALPHABETIC]

    const [freeSlots, setFreeSlots] = useState<Slot[]>(freeSlotsData)
    const [itemSelected, setItemSelected] = useState<string>(menuList.ALPHABETIC)
    const [producerSelected, setProducerSelected] = useState<string>('')
    const [openDialog, setOpenDialog] = useState<boolean>(false)


    function getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    const fetchSlotsData = async (limit: number, start: number, sortBy?: string, producer?: string) => {
        const request =  await aquaClient.query({ 
            query: SLOTS, 
            variables: { 
                countryCode: 'it',
                limit: limit,
                start: start,
                sort: sortBy,
                producer: producer
             } 
        })

        return request.data.data.slots
    }

    const loadMore = async () => {
        const moreFreeSlots = await fetchSlotsData(12, freeSlots.length)

        setFreeSlots([...freeSlots, ...moreFreeSlots])    
    }

    const shuffle = async () => {
        clear()

        setItemSelected(menuList.SHUFFLE)
        const shuffleFreeSlots = await fetchSlotsData(36, getRandomInt(freeSlots.length, 500))

        setFreeSlots(shuffleFreeSlots)    
    }

    const handleSearch = (text: string) => {
        clear()
        
        if (!text.length) {
            setFreeSlots(freeSlotsData)
        }

        if (text.length >= 2) {

            setTimeout( async () => {
                const searchSlotRequest =  await aquaClient.query({ 
                    query: SLOTS, 
                    variables: { countryCode: 'it', name_contains: text } 
                })
    
                const newData = searchSlotRequest.data.data.slots
                
                setFreeSlots(newData)
            }, 750);
        }
    }
 
    const handleItemSelected = async (itemSelected: string) => {
        clear()

        const sortItem = itemSelected === menuList.ALPHABETIC ? 
        `${itemSelected.toLowerCase()}:asc` : `${itemSelected.toLowerCase()}:desc`
        
        const data = await fetchSlotsData(36, 0, sortItem)
            
        setFreeSlots(data)
        setItemSelected(itemSelected)
    }

    const handleProducerSelected = async (producerSelected: string) => {
        const sortBy = itemSelected.toLowerCase() === menuList.SHUFFLE ? menuList.ALPHABETIC : itemSelected.toLowerCase()

        const data = await fetchSlotsData(36, 0, sortBy, producerSelected)
            
        setFreeSlots(data)
        setProducerSelected(producerSelected)
    }

    const clear = () => {
        setProducerSelected('')
    }

    return (
        <Layout title="Giochi">

            <Header>
                <Intro>
                    <h2>
                        SLOT GRATIS – GIOCA ALLE SLOT MACHINE GRATIS ONLINE IN ITALIANO
                    </h2>
                    <span>Pubblicato: 2019-06-11 • Ultimo aggiornamento: 2021-05-07</span>
                    <p>
                        Prima di tutto, benvenuto! Sappiamo che ti piace giocare alle slot machine
                        gratis online: è per quello che sei qui! La buona notizia e che anche noi 
                        piacciono molto le slot machine e abbiamo una grande collezione di giochi 
                        disponibile. Sfoglia la nostra selezione delle migliori slot machines, scegli 
                        una che ti piace e divertiti. Senza download o registrazione.
                    </p>
                </Intro>
                
                <Thumbnail>
                    <Image
                        alt="Spike poster"
                        src={`${CDN}/png/logo_white.png`}
                        layout="intrinsic"
                        priority={true}
                        width={200}
                        height={200}/>
                </Thumbnail>
            </Header>

            <div className="space-around">
                <Grids id='ads-slots'>
                    <GridCards
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
                    <GridCards
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
                        <Aside>
                            <SlotsCounter total={1528}/>
                            <ProvidersList data={producersData.slice(0,10)} setSelected={handleProducerSelected} setOpenDialog={setOpenDialog}/> <br/>
                            <FreeBonusList data={freeBonusData} label="I MIGLIORI CASINÒ CON GIRI GRATIS"/>
                        </Aside>

                        <Section>
                            <Actions>
                                <div id="search-input">
                                    <CustomTextField
                                        onChange={handleSearch}
                                        size={'small'}
                                        borderRadius={'5px'}
                                        searchIcon
                                        placeholder="Cerca una slot..."/>
                                </div>

                                <div id='filter-slots'>
                                        <MenuList listItems={listItems} itemSelected={itemSelected} setItemSelected={handleItemSelected}/>

                                        <div id="shuffle"><ShuffleIcon fontSize={'small'} onClick={shuffle}/></div>                                    
                                </div>
                                
                                <div id="filter-providers" onClick={() => setOpenDialog(true)}><span>LIST PROVIDERS</span></div>
                            </Actions>

                            <br/>
                            
                            <Grids id='free-slots'>
                                <GridCards 
                                    type={GridType.SLOTS} 
                                    content={ freeSlots.map( (slot: Slot) => 
                                    <Fragment>
                                        <SlotInfo>
                                            <div className="producer">{ producerSelected ?  slot.producer.name : ''}</div>

                                            {itemSelected === menuList.RTP ? slot.rtp ? `RTP: ${slot.rtp}%` : 'NA' : ''}
                                            {itemSelected === menuList.LIKES ? slot.likes ? `${slot.likes} likes`: 'NA' : ''}
                                            {itemSelected === menuList.CREATED_AT ? slot.created_at ?
                                                `${shortDate(slot.created_at)}`: 'NA' : ''}
                                            {itemSelected === menuList.UPDATED_AT ? slot.created_at ?
                                                `${shortDate(slot.updated_at)}`: 'NA' : ''}
                                        </SlotInfo>
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

                        </Section>

                    </Container> 

                    <BannerList totalSlots={1528}/>
                </Main>

                <Article/>

                <DialogPopup open={openDialog} setOpen={setOpenDialog} data={producersData} setSelected={handleProducerSelected}/>
            </div>
        </Layout>
    ) 
}

const Header = styled.div`
    background-image: linear-gradient(180deg, ${({theme}) => theme.colors.background} 0%, ${({theme}) => theme.colors.gradient} 50%);
    padding: 0 10%;
    margin-top: 20px;
    color: #fff;
    display: flex;
    flex=direction: row;
    flex-wrap: wrap;
    
    span {
        font-size: small;
    }

    p {
        color: #fff;
    }
`

const Intro = styled.div`
    width: 50%;
    flex-grow: 1;
`

const Thumbnail = styled.div`
    margin: 15px auto;

    @media ${device.tablet} {
        display: none;
    }
`

const SlotInfo = styled.div` 
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
    margin-bottom: 20px;
`

const Aside = styled.div`
    display: inherit;  
    flex-direction: column;
    margin-right: 20px;
    width: 280px;
    height: min-content;
    
    @media ${device.tablet} {
       display: none;
    }
`

const Section = styled.div`
    display: inherit;
    flex-direction: column;
    flex-grow: 2;
`

const Actions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    flex-wrap: wrap;

    #search-input {
        display: inherit;
        flex-grow: 2;
        border: 1px solid ${({theme}) => theme.colors.background};
        border-radius: 5px;
       
        @media ${device.mobileL} {
            margin-bottom: 10px;
        }
    }

    #filter-providers {
        display: none;
        justify-content: center;
        border: 1px solid ${({theme}) => theme.colors.background};
        border-radius: 5px;
        padding: 12px;
        margin-top: 10px;
        color: #212530;
        background-color: #fff;
        cursor: pointer;
        flex-grow: 0;

        @media ${device.tablet} {
            display: flex;
            padding: 10px 25px;
        }

        @media ${device.mobileL} {
            flex-grow: 1;
            padding: 10px 0px;
        }

        &:hover {
            color: ${({theme}) => theme.colors.background};
        }
    }

    #filter-slots {
        display: inherit;
        flex-direction: row;
        justify-content: flex-end;
        flex-grow: 1;
        z-index: 99;
        
        @media ${device.mobileL} {
            justify-content: space-between;
        }

        #shuffle {
            border: 1px solid #e2b96d;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-grow: 0;
            border-radius: 5px;
           
            color: #212530;
            background-color: #fff;
            width: 50px;
            cursor: pointer;
    
            &:hover {
                color: #e2b96d;
            }
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
        variables: { countryCode: 'it', limit: 6, start: 0 } })

    const popularSlotsRequest =  await aquaClient.query({ 
        query: SLOTS, 
        variables: { countryCode: 'it', limit: 6, start: 6 } })

    const freeSlotsRequest =  await aquaClient.query({ 
        query: SLOTS, 
        variables: { countryCode: 'it', limit: 36, start: 0 } })

    
    const producersRequest =  await aquaClient.query({ 
        query: PRODUCERS, 
        variables: { countryCode: 'it', start: 0, sort: 'name:asc' } })

    const freeBonusRequest =  await aquaClient.query({ 
        query: BONUSES, 
        variables: { countryCode: 'it', limit: 5, start: 5 } })

    return {
        props: {
            newSlotsData: newSlotsRequest.data.data.slots,
            pupularSlotsData: popularSlotsRequest.data.data.slots,
            freeSlotsData: freeSlotsRequest.data.data.slots,
            producersData: producersRequest.data.data.producers,
            freeBonusData: freeBonusRequest.data.data.bonuses,
        }
    }
}

export default GiochiPage
