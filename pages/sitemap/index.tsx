import React from 'react'
import { FunctionComponent } from 'react'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import { getTotalBonuses, getTotalProducers, getTotalSlots } from '../../lib/api'
import { getBonuses } from '../../lib/graphql/queries/bonuses'
import { getProducers } from '../../lib/graphql/queries/producers'
import { getSlots } from '../../lib/graphql/queries/slots'
import { Slot, Producer, Bonus } from '../../lib/schemas'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { device } from '../../lib/utils/device'
import { useTranslation } from 'react-i18next'

const SLOTS = `
    query slots(
        $limit: Int,
        $start: Int, 
        $sort: String, 
        ) {
        slots( 
                where : { 
                country : {code : "it"},
                type: "online"
                },
                limit: $limit,
                start: $start,
                sort: $sort
                ) {
                    id
                    slug
                    name
            }
    }
`

const BONUSES = `
    query bonuses(
        $limit: Int,
        $start: Int, 
        $sort: String,
        ) {
        bonuses( 
                where : { 
                country : {code : "it"}, 
                },
                limit: $limit,
                start: $start
                sort: $sort
        ) {
            id
            link
            name
        }
    }
` 

const PRODUCERS = `
    query producers(
        $start: Int, 
        $sort: String, 
        ) {
        producers(
            start: $start,
            sort: $sort,
            where : { 
                country : {code : "it"}, 
            },
            ) {
            id
            name
            slug
        }
    }
`

type PageProps = {
    slotsData: Slot[]
    producersData: Producer[]
    bonusesData: Bonus[]
    totalSlots: number
    totalBonuses: number
    totalProducers: number
}

enum MapMenu  {
    CASINO,
    FORNITORI,
    SLOT
}

const SiteMap:FunctionComponent<PageProps> = (props) => { 
    
    const { t } = useTranslation()

    const {slotsData, producersData, bonusesData, totalSlots, totalBonuses, totalProducers} = props

    const router = useRouter()

    const [slots, setSlots] = useState<Slot[]>(slotsData)
    const [bonuses, setBonuses] = useState<Bonus[]>(bonusesData)
    const [producers, setProducers] = useState<Producer[]>(producersData)

    const goToSlot = (slug: string) => {
        router.push({
            pathname: '/slot/[slug]',
            query: { slug }
        })
    }

    const goToSoftware = (slug: string) => {
        router.push({
            pathname: '/software/[slug]',
            query: { slug }
        })
    }

    const loadMore = async (map: MapMenu) => {

        switch(map) {
            case MapMenu.CASINO:
                const moreBonuses = await getBonuses({limit: 30, start: bonuses.length, sort: 'name:asc'}, BONUSES)
                setBonuses([...bonuses, ...moreBonuses])    
                break;
            case MapMenu.FORNITORI:
                const moreProducers = await getProducers({limit: 30, start: producers.length, sort: 'name:asc'}, PRODUCERS)
                setProducers([...producers, ...moreProducers])    
                break;
            case MapMenu.SLOT:
                const moreSlots = await getSlots({limit: 30, start: slots.length, sort: 'name:asc'}, SLOTS)
                setSlots([...slots, ...moreSlots])    
                break;
        }
       
    }

    return (
        <Layout title="Casino Squad | Site Map">
             
            <Header>
                <h2>{t("SITEMAP")}</h2>
                <h4>{t("Trova ciò che stai cercando su casinosquad.com")}</h4>
                <div className="menu-map">
                    <a className="item-map" href="#fornitori"><div>{t("FORNITORI")}</div></a>
                    <a className="item-map" href="#casino"><div>{t("CASINÒ")}</div></a>
                    <a className="item-map" href="#slot"><div>{t("SLOT")}</div></a>
                </div>
                <br/>
            </Header>
           
            <Main className="layout-container">
                    <Section id="fornitori">
                        <Label>{t("FORNITORI")}</Label>
                        <ul className="list-name">
                            { producers.map((producer: Producer) => 
                                <li>
                                    <span onClick={() => goToSoftware(producer.slug)}>{producer.name}</span>
                                </li>
                            )}
                            <li onClick={() => loadMore(MapMenu.FORNITORI)}><span className="more-data">{t("Mostra tutti i")} {totalProducers - producers.length} {t("fornitori di giochi")}</span></li>
                        </ul>
                    </Section>

                    <Section id="casino">
                        <Label>{t("CASINÒ")}</Label>
                        <ul className="list-name">
                        { bonuses.map((bonus: Bonus) => 
                            <li>
                                <span><a href={bonus.link}>{bonus.name}</a></span>
                            </li>
                        )}
                            <li onClick={() => loadMore(MapMenu.CASINO)}><span className="more-data">+ {t("Mostra tutti i")} {totalBonuses - bonuses.length} {t("casinò")}</span></li>
                         </ul>
                    </Section>

                    <Section id="slot">
                        <Label>{t("SLOT")}</Label>
                        <ul className="list-name">
                        { slots.map((slot: Slot) => 
                            <li onClick={() => goToSlot(slot.slug)}>
                                <span>{slot.name}</span>
                            </li>
                        )}
                            <li onClick={() => loadMore(MapMenu.SLOT)}><span className="more-data">+ {t("Mostra tutti i")} {totalSlots - slots.length} {t("slot")}</span></li>
                         </ul>
                    </Section>
                </Main>
        </Layout>
    ) 
}

const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: linear-gradient(0deg, ${({theme}) => theme.palette.background} 0%, ${({theme}) => theme.palette.gradient} 50%);
    color: #fff;

    h1 {
        font-size: 2em;
        margin: 10px 0px;
    }

    @media ${device.mobileL} {
        h4 {
            text-align: center;
        }
    }
   

   .menu-map {
        display: flex;
        text-align: center;

        @media ${device.mobileL} {
            flex-direction: column;

            a.item-map {
                margin-bottom: 10px;
            }
        }

        div {
            border: 3px solid #fff;
            width: 100px;
            padding: 5px;
            margin: 0px 5px;
            font-weight: 600;
            cursor: pointer;
        }
   }
`

const Main = styled.div`  
`

const Label = styled.span`
  color: ${({theme}) => theme.palette.background};
  font-weight: 600;
`

const Section = styled.section`
    display: flex;
    flex-direction: column;
    margin: 20px 0px;


    ul.list-name{
        display: flex;
        flex-wrap: wrap;

    li { 
        width: 30%; 
        cursor: pointer;

        @media ${device.mobileL} {
            margin-right: 20px;
            flex-grow: 1;
        }

        .more-data { color: red; }
    }

    li span:hover { 
        border-bottom: 1px solid;
    }

   }
`

export async function getServerSideProps() {

    return {
        props: {
                slotsData: await getSlots({ start: 0, limit: 30, sort: 'name:asc' }, SLOTS),
                producersData: await getProducers({ start: 0, limit: 30, sort: 'name:asc' }, PRODUCERS),
                bonusesData: await getBonuses({ start: 0, limit: 30, sort: 'name:asc' }, BONUSES),
                totalSlots: await getTotalSlots(),
                totalBonuses: await getTotalBonuses(),
                totalProducers: await getTotalProducers()
        }
    }
}

export default SiteMap
