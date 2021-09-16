import React, { FunctionComponent, useState } from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'
import SlotCard from '../../components/Cards/SlotCard'
import Divider from '../../components/Divider'
import GridLayout from '../../components/GridLayout'
import Layout from '../../components/Layout'
import SlotsCounter from '../../components/SlotsCounter'
import { GridType, SlotFilterList, SlotType } from '../../lib/utils/constants'
import { device } from '../../lib/utils/device'
import CustomTextField from '../../components/Inputs/Textfield'
import CustomMenu from '../../components/CustomMenu'
import ShuffleIcon from '@material-ui/icons/Shuffle'
import { Fragment } from 'react'
import ProducersTable from '../../components/Tables/ProducersTable'
import Image from 'next/image'
import { CDN } from '../../public/environment'
import GiochiFooter from '../../components/GiochiFooter'
import Article from '../../components/Article'
import ProvidersDialog from '../../components/Modals/ProvidersDialog'
import { Bonus, Producer, Slot, ThemeSlot } from '../../lib/schemas'
import FreeBonusList from '../../components/FreeBonusList'
import { getBonuses } from '../../lib/graphql/queries/bonuses'
import { getProducers } from '../../lib/graphql/queries/producers'
import { getSlots } from '../../lib/graphql/queries/slots'
import { debounce } from "lodash"
import { format } from 'date-fns'
import { getTotalSlots } from '../../lib/api'

type PageProps = {
    giochiSlotsData: Slot [],
    slotsData: ThemeSlot,
    producersData: Producer [],
    freeBonusData: Bonus [],
    totalSlots: number
}

const GiochiPage: FunctionComponent<PageProps> = (props) => { 

    const { slotsData, giochiSlotsData, producersData, freeBonusData, totalSlots } = props
    const { newest, popular } = slotsData

    const listItems:string[] = [SlotFilterList.RTP, SlotFilterList.UPDATED_AT, SlotFilterList.CREATED_AT, SlotFilterList.ALPHABETIC]

    const [giochiSlots, setGiochiSlots] = useState<Slot[]>(giochiSlotsData)
    const [itemSelected, setItemSelected] = useState<string>(SlotFilterList.ALPHABETIC)
    const [, setProducerSelected] = useState<string>('')
    const [openDialog, setOpenDialog] = useState<boolean>(false)

    function getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    const loadMore = async () => {
        const moreFreeSlots = await getSlots({countryCode: 'it', limit: 12, start: giochiSlots.length})

        setGiochiSlots([...giochiSlots, ...moreFreeSlots])    
    }

    const shuffle = async () => {
        clear()

        setItemSelected(SlotFilterList.SHUFFLE)
        const shuffleFreeSlots = await getSlots({countryCode: 'it', limit: 36, start: getRandomInt(giochiSlots.length, 500)})

        setGiochiSlots(shuffleFreeSlots)    
    }

    const handleSearch = debounce( async(text: string) => {
        clear()
        
        if (text.length >= 2) {
            setGiochiSlots(await getSlots({name_contains: text}))
        } else 
            setGiochiSlots(giochiSlotsData)
    },500)
 
    const handleItemSelected = async (itemSelected: string) => {
        clear()

        const sortItem = itemSelected === SlotFilterList.ALPHABETIC ? 
        `${itemSelected.toLowerCase()}:asc` : `${itemSelected.toLowerCase()}:desc`
        
        const data = await getSlots({countryCode: "it", limit:36, start: 0, sort: sortItem})
        console.log(data) 
        setGiochiSlots(data)
        setItemSelected(itemSelected)
    }

    const handleProducerSelected = async (producerSelected: string) => {
        const sortItem = itemSelected.toLowerCase() === SlotFilterList.SHUFFLE ? SlotFilterList.ALPHABETIC : itemSelected.toLowerCase()

        const data = await getSlots({limit:36, start: 0, sort: sortItem, producer: producerSelected})
            
        setGiochiSlots(data)
        setProducerSelected(producerSelected)
    }

    const clear = () => setProducerSelected('')

    return (
        <Layout title="Giochi">

            <Header>
                <Intro>
                    <h2>
                        SLOT GRATIS – GIOCA ALLE SLOT MACHINE GRATIS ONLINE IN ITALIANO
                    </h2>
                    <span>Pubblicato: 31 Jul 2021 • Ultimo aggiornamento { format(new Date(Date.now()), 'dd MMM yyyy').toString()} </span> 
 
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
                        alt="Casino Squad"
                        src={`${CDN}/png/logo_white.png`}
                        layout="intrinsic"
                        priority={true}
                        width={200}
                        height={200}/>
                </Thumbnail>
            </Header>

            <br/>

            <div className="layout-container">
                <GridContainer id='ads-slots'>
                    <GridLayout
                        gridType={GridType.SLOTS} 
                        content={ newest.map( (slot: Slot) => 
                        <LazyLoad once key={slot.id} height={400} offset={300}>
                            <SlotCard key={slot.name} data={slot} type={SlotType.NEW}/>
                        </LazyLoad> )}
                        label="Nuove slot"
                        xs={12} sm={4} md={4}
                    />
                    <GridLayout
                        gridType={GridType.SLOTS}
                        content={ popular.map( (slot: Slot) =>  
                        <LazyLoad once key={slot.id} height={400} offset={300} >
                            <SlotCard key={slot.id} data={slot} type={SlotType.ONLINE}/>
                        </LazyLoad> )}
                        label="Le slot piu popolari"
                        xs={12} sm={4} md={4}
                    />
                </GridContainer>

                <Main>
                    <Title>
                        <h3>LA NOSTRA LIBRERIA DI SLOT - TUTTE DA GIOCARE GRATIS!</h3>
                        <Divider/>
                    </Title>

                    <Container>
                        <Aside>
                            <SlotsCounter total={totalSlots}/>
                            <ProducersTable data={producersData.slice(0,10)} setSelected={handleProducerSelected} setOpenDialog={setOpenDialog}/>
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
                                        <CustomMenu listItems={listItems} itemSelected={itemSelected} setItemSelected={handleItemSelected}/>

                                        <div id="shuffle"><ShuffleIcon fontSize={'large'} onClick={shuffle}/></div>                                    
                                </div>
                                
                                <div id="filter-providers" onClick={() => setOpenDialog(true)}><span>LIST PROVIDERS</span></div>
                            </Actions>
                            
                            <GridContainer id='free-slots'>
                                <GridLayout 
                                    gridType={GridType.GIOCHISLOTS} 
                                    content={ giochiSlots.map( (slot: Slot) => 
                                    <Fragment>
                                        <SlotInfo>
                                            {itemSelected === SlotFilterList.RTP ? slot.rtp ? `RTP: ${slot.rtp}%` : 'NA' : ''}
                                            {itemSelected === SlotFilterList.CREATED_AT ? slot.created_at ?
                                                `${format(new Date(slot.created_at), 'dd MMM yyyy').toString()}` : 'NA' : ''}
                                            { itemSelected === SlotFilterList.UPDATED_AT ? slot.created_at ?
                                                `${format(new Date(slot.updated_at), 'dd MMM yyyy').toString()}` : 'NA' : ''}
                                        </SlotInfo>
                                        <SlotCard key={slot.name} data={slot}/>
                                    </Fragment>
                                    )}
                                    width={'100%'}
                                    xs={6} sm={4} md={3}
                                />
                            </GridContainer>

                            <LoadMoreButton onClick={loadMore}>
                                <span>CARICA ALTRO</span>
                            </LoadMoreButton>

                        </Section>

                    </Container> 

                    <GiochiFooter totalSlots={totalSlots}/>
                </Main>

                <Article/>

                <ProvidersDialog open={openDialog} setOpen={setOpenDialog} data={producersData} setSelected={handleProducerSelected}/>
            </div>
        </Layout>
    ) 
}

const Header = styled.div`
    background-image: linear-gradient(0deg, ${({theme}) => theme.palette.background} 0%, ${({theme}) => theme.palette.gradient} 50%);
    padding: 0px 7%;
    color: #fff;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    
    span { font-size: small; }

    p { color: #fff; }
`

const Intro = styled.div`
    width: 70%;
   
    @media ${device.mobileL} {
        flex-grow: 1;
    }
`

const Thumbnail = styled.div`
    margin: auto;

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

const GridContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    color: ${({theme}) => theme.palette.background};

    @media ${device.tablet} {
        &#ads-slots {
            flex-direction: column;
            flex-wrap: nowrap;
            overflow-x: scroll;
            overflow-y: hidden;
        }
    }
`

const Main = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
`

const Title = styled.div`
    color: ${({theme}) => theme.palette.background};
    flex-grow: 1;
    h3 { margin-bottom: 0; }
`

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    margin: 10px 0px;
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
    flex-wrap: wrap;

    #search-input {
        display: inherit;
        flex-grow: 2;
        border: 1px solid ${({theme}) => theme.palette.background};
        border-radius: 5px;
       
        @media ${device.mobileL} {
            margin-bottom: 10px;
        }
    }

    #filter-providers {
        display: none;
        justify-content: center;
        border: 1px solid ${({theme}) => theme.palette.background};
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
            color: ${({theme}) => theme.palette.background};
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
            width: 45px;
            cursor: pointer;
    
            &:hover {
                color: #e2b96d;
            }

            @media ${device.mobileL} {
                width: fill-available;
            }
        }
    }
`

const LoadMoreButton = styled.div`
    background-color: ${({theme}) => theme.palette.background};
    border: 2px solid ${({theme}) => theme.palette.background};
    color: #fff;
    border-radius: ${({theme}) => theme.button.borderRadius};
    font-weight: bold;
    cursor: pointer;
    padding: 15px;
    width: fit-content;
    text-transform: uppercase;
    display: flex;
    align-self: center;
`

export async function getStaticProps() {
    return {
        props: {
                slotsData: { 
                newest: await getSlots({ countryCode: 'it', limit: 6, start: 0, sort: 'created_at:desc' }),
                popular: await getSlots({ countryCode: 'it', limit: 6, start: 0, sort: 'updated_at:desc' })
            },
            giochiSlotsData: await getSlots({ countryCode: 'it', limit: 28, start: 0, sort: 'name:asc' }),
            producersData: await getProducers({ countryCode: 'it', start: 0, sort: 'name:asc' }),
            freeBonusData: await getBonuses({ countryCode: 'it', limit: 5, start: 5, sort: "updated_at:desc" }),
            totalSlots: await getTotalSlots()
        }
    }
}

export default GiochiPage
