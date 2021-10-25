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
import GiochiArticle from '../../components/Articles/Giochi'
import ProvidersDialog from '../../components/Modals/ProvidersDialog'
import { Bonus, Producer, Slot, ThemeSlot } from '../../lib/schemas'
import FreeBonusList from '../../components/FreeBonusList'
import { getBonuses } from '../../lib/graphql/queries/bonuses'
import { getProducers } from '../../lib/graphql/queries/producers'
import { getSlots } from '../../lib/graphql/queries/slots'
import { debounce } from "lodash"
import { format } from 'date-fns'
import italianLocale  from 'date-fns/locale/it'
import { getTotalSlots } from '../../lib/api'
import Head from 'next/head'
import { getRandomInt } from '../../lib/utils/getRandomInt'

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

    const famousProducersList = producersData.filter((producer: Producer) => {
        if( ['Novomatic', 'NetEnt', 'BTG', 'Thunderkick', 'iSoftBet', 'Pragmatic Play', "Play'n GO"].includes(producer.name))
            return producer
    })

    const listItems:string[] = [SlotFilterList.RTP, SlotFilterList.UPDATED_AT, SlotFilterList.CREATED_AT, SlotFilterList.NAME]

    const [giochiSlots, setGiochiSlots] = useState<Slot[]>(giochiSlotsData)
    const [itemSelected, setItemSelected] = useState<SlotFilterList>(SlotFilterList.SHUFFLE)
    const [, setProducerSelected] = useState<string>('')
    const [openDialog, setOpenDialog] = useState<boolean>(false)

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

    const searchSlot = debounce( async(text: string) => {
        clear()
        
        if (text.length >= 2) {
            setGiochiSlots(await getSlots({countryCode: 'it', name_contains: text}))
        } else 
            setGiochiSlots(giochiSlotsData)
    },500)
 
    const filterListSlot = async (itemSelected: SlotFilterList) => {
        clear()

        const keyFilter = Object.keys(SlotFilterList)[Object.values(SlotFilterList).indexOf(itemSelected)]

        const sortItem = keyFilter === "NAME" ? 
        `${keyFilter.toLowerCase()}:asc` : `${keyFilter.toLowerCase()}:desc`
        
        const data = await getSlots({countryCode: "it", limit:36, start: 0, sort: sortItem})
        setGiochiSlots(data)
        setItemSelected(itemSelected)
    }

    const filterByProducerName = async (producerSelected: string) => {

        let  keyFilter = Object.keys(SlotFilterList)[Object.values(SlotFilterList).indexOf(itemSelected)].toLowerCase()

        let response
        
        if (keyFilter ===  'shuffle') {
            response = await getSlots({
                countryCode: "it", 
                limit:36, 
                start: 0,
                producer: producerSelected
            })
        } else {
            response = await getSlots({
                countryCode: "it", 
                limit:36, 
                start: 0,
                producer: producerSelected,
                sort: keyFilter
            })
        }

        setGiochiSlots(response)

        setProducerSelected(producerSelected) 
    }

    const clear = () => setProducerSelected('')

    return (
        <Layout title="I migliori Casinò e Slot Machine Online con le nuove offerte Casino Bonus">
            <Head>
                <meta 
                property="og:description" 
                content="Gioca alle slot machine gratis online reali su Casino Squad! Prova le migliori slot online senza soldi veri e senza scaricare app." 
                key="description"/>
            </Head>
            <Header className='layout-container'>
                <Intro>
                    <h2>
                        SLOT GRATIS – GIOCA ALLE SLOT MACHINE GRATIS ONLINE IN ITALIANO
                    </h2>

                    <span>Pubblicato: 31 lug 2021 • Ultimo aggiornamento 
                        <span style={{textTransform: 'capitalize'}}> { format(new Date(Date.now()), 'dd MMM yyyy', { locale: italianLocale }).toString() } </span> 
                    </span> 
 
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
                            <ProducersTable data={famousProducersList} setSelected={filterByProducerName} setOpenDialog={setOpenDialog}/>
                            <FreeBonusList data={freeBonusData} label="I MIGLIORI CASINÒ CON GIRI GRATIS"/>
                        </Aside>

                        <Section>
                            <Actions>
                                <div id="search-input">
                                    <CustomTextField
                                        onChange={searchSlot}
                                        size={'small'}
                                        borderRadius={'5px'}
                                        searchIcon
                                        placeholder="Cerca una slot..."/>
                                </div>

                                <div id='filter-slots'>
                                        <CustomMenu listItems={listItems} itemSelected={itemSelected} setItemSelected={filterListSlot}/>

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

                <GiochiArticle/>

                <ProvidersDialog open={openDialog} setOpen={setOpenDialog} data={producersData} setSelected={filterByProducerName}/>
            </div>
        </Layout>
    ) 
}

const Header = styled.div`
    background-image: linear-gradient(0deg, ${({theme}) => theme.palette.background} 0%, ${({theme}) => theme.palette.gradient} 50%);
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
        height: 35px;

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
        height: 35px;

        @media ${device.mobileL} {
            justify-content: space-between;
        }

        #shuffle {
            border: 1px solid #e2b96d;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-grow: 0;
            border-radius: 0px 5px 5px 0px;
            color: #212530;
            background-color: #fff;
            width: 45px;
            height: inherit;
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

    const PAGE_BONUSES = ["LeoVegas", "StarCasinò", "WinCasino", "NetBet", "King Casino"]

    const pageBonusRemapping: any = {
        LeoVegas: "https://ads.leovegas.com/redirect.aspx?pid=3704489&bid=14965",
        StarCasinò: "https://record.starcasino.it/_SEA3QA6bJTNXl890vMAfUGNd7ZgqdRLk/131/",
        WinCasino: "https://vincipromo.it/wincasino/?mp=42794b32-7604-49d2-92d0-8adf67a6b173",
        NetBet: "https://banners.livepartners.com/view.php?z=139080",
        "King Casino": "https://spikeslot.kingcasino.it",
    }

    return {
        props: {
                slotsData: { 
                newest: await getSlots({ limit: 6, start: 0, sort: 'created_at:desc' }),
                popular: await getSlots({ limit: 6, start: 0, sort: 'updated_at:desc' })
            },
            giochiSlotsData: await await getSlots({countryCode: 'it', limit: 36, start: getRandomInt(0, 500)}),
            producersData: await getProducers({ start: 0, sort: 'name:asc' }),
            freeBonusData: (await getBonuses({ names: PAGE_BONUSES, sort: 'rating:desc'})).map((b) => {
                b.link = pageBonusRemapping[b.name]
                return b
            }),
            totalSlots: await getTotalSlots()
        }
    }
}

export default GiochiPage
