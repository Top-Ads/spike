import React, { FunctionComponent, Fragment, useState } from 'react'
import { NextPageContext } from 'next'
import Image from 'next/image'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'
import Layout from '../../../components/Layout'
import { device } from '../../../lib/utils/device'
import { Producer, Slot } from '../../../lib/schemas'
import { getProducers } from '../../../lib/graphql/queries/producers'
import { CDN } from '../../../public/environment'
import Divider from '../../../components/Commons/Divider'
import { getSlots } from '../../../lib/graphql/queries/slots'
import { GridType } from '../../../lib/utils/constants'
import GridLayout from '../../../components/Commons/GridLayout'
import SlotCard from '../../../components/Cards/SlotCard'
import { injectCDN } from '../../../lib/utils/injectCDN'
import Markdown from 'markdown-to-jsx'
import { useTranslation } from 'react-i18next'

type PageProps = {
    producerData: Producer
    slotsData: Slot[]
}

const SoftwarePage: FunctionComponent<PageProps> = ({producerData, slotsData}) => {

    const { t } = useTranslation()

    const [slots, setSlots] = useState<Slot[]>(slotsData)

    const loadMore = async () => {
        const moreFreeSlots = await getSlots({limit: 12, start: slots.length})
        
        setSlots([...slots, ...moreFreeSlots])    
    }

    return (
        <Layout title={producerData.name}> 
            <div className="layout-container" style={{ width: 'fill-available'}}>
          
                <Title>{t("SLOT MACHINE E CASINÒ CON SOFTWARE")} { producerData.name } </Title>
                
                <Divider/>
                
                <br/>

                <Main> 
                    <Section>
                        <div style={{position: "sticky", top: "20px"}}>
                            <Thumbnail>
                                <LazyLoad key={producerData.id} height={85} offset={200}>
                                    <Image
                                        alt={producerData.name}
                                        src={producerData.image && producerData.image[0].url ? injectCDN(producerData.image[0].url) : `${CDN}/svg/no_img_available.svg`} 
                                        layout="responsive"
                                        priority={true}
                                        sizes={"30vw"}
                                        width={1145}
                                        height={644}
                                        quality={80}
                                    />
                                </LazyLoad>
                            </Thumbnail>
                        </div>
                    </Section>

                    <Article>
                        <h2>{producerData.name}</h2>
                        <MarkDownContainer>
                            <Markdown>{String(producerData?.description)}</Markdown>
                        </MarkDownContainer>

                    </Article>

                <div style={{width: '100%'}}>
                    <h2 style={{textTransform: 'uppercase'}}>{t("TUTTE LE NOSTRE SLOT")} {producerData.name}</h2>
                    <Divider/>

                    <GridContainer>
                        <GridLayout 
                            gridType={GridType.GIOCHISLOTS} 
                            content={ slots.map( (slot: Slot) => 
                            <Fragment>
                                <SlotCard key={slot.name} data={slot}/>
                            </Fragment>
                            )}
                            width={'fill-available'}
                            xs={6} sm={3} md={2}
                        />
                    </GridContainer>

                    <LoadMoreButton onClick={loadMore}>
                        <span>{t("CARICA ALTRO")}</span>
                    </LoadMoreButton>

                </div>
            </Main>

            </div>
        </Layout>       
    )
}
 
export async function getServerSideProps(context : NextPageContext) {
    
    const slug = context.query.slug as string

    return {
        props: {
            producerData: (await getProducers({ slug: slug }))[0],
            slotsData: await getSlots({countryCode: "it", limit: 24, start: 0, producer: slug, sort: 'created_at:desc'})
        }
    }
}

const Title = styled.h2`
`

const Main = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    h2 { font-weight: bold; }
`

const Section = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    @media ${device.mobileL} {
        width: 100%;
    }
`

const Thumbnail = styled.div`
    border-radius: 5px;
    overflow: hidden;
`

const Article = styled.article`
    margin-bottom: 0px;
    flex-grow: 2;
    padding: 10px 25px;
    width: min-content;
    overflow: hidden;

    img {
        display: none;
    }

    @media ${device.mobileL} {
        padding: 0px 2px;
        width: fill-available;
    }
`

const MarkDownContainer = styled.div`
    display: none;
`

const GridContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    color: ${({theme}) => theme.palette.background};

    @media ${device.tablet} {
        flex-direction: column;
        flex-wrap: nowrap;
        overflow-x: scroll;
        overflow-y: hidden;
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
    margin: 30px auto;
`

export default SoftwarePage
