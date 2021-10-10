import React, { FunctionComponent, Fragment } from 'react'
import { NextPageContext } from 'next'
import Image from 'next/image'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'
import Layout from '../../../components/Layout'
import { device } from '../../../lib/utils/device'
import { Producer, Slot } from '../../../lib/schemas'
import { getProducers } from '../../../lib/graphql/queries/producers'
import { CDN } from '../../../public/environment'
import Divider from '../../../components/Divider'
import Markdown from 'markdown-to-jsx'
import { getSlots } from '../../../lib/graphql/queries/slots'
import { GridType } from '../../../lib/utils/constants'
import GridLayout from '../../../components/GridLayout'
import SlotCard from '../../../components/Cards/SlotCard'

type PageProps = {
    producerData: Producer
    slotsData: Slot[]
}

const SoftwarePage: FunctionComponent<PageProps> = ({producerData, slotsData}) => {

    return (
        <Layout title={producerData.name}> 
            <div className="layout-container" style={{ width: 'fill-available'}}>
          
                <Title>SLOT MACHINE E CASINÒ CON SOFTWARE { producerData.name } </Title>
                
                <Divider/>
                
                <br/>

                <Main> 
                    <Section>
                        <div style={{position: "sticky", top: "20px"}}>
                            <Thumbnail>
                                <LazyLoad key={producerData.id} height={85} offset={200}>
                                    <Image
                                        alt={producerData.name}
                                        src={producerData.image && producerData.image[0].url ? producerData.image[0].url : `${CDN}/svg/no_img_available.svg`} 
                                        layout="responsive"
                                        priority={true}
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
                    <h2 style={{textTransform: 'uppercase'}}>TUTTE LE NOSTRE SLOT {producerData.name}</h2>
                    <Divider/>

                    <GridContainer>
                        <GridLayout 
                            gridType={GridType.GIOCHISLOTS} 
                            content={ slotsData.map( (slot: Slot) => 
                            <Fragment>
                                <SlotCard key={slot.name} data={slot}/>
                            </Fragment>
                            )}
                            width={'fill-available'}
                            xs={6} sm={3} md={2}
                        />
                    </GridContainer>
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
    margin-bottom: 0px;
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

export default SoftwarePage
