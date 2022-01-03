import React, { Fragment, FunctionComponent } from 'react'
import styled from 'styled-components'
import { MainArticleCard } from '../../components/Cards/BlogCard/MainArticleCard'
import { MainArticleCardSmall } from '../../components/Cards/BlogCard/SmallArticleCard'
import { LatestArticles } from '../../components/Commons/LatestArticles'
import { SideBanners } from '../../components/Commons/SideBanners'
import Layout from '../../components/Layout'
import ArgumentList from '../../components/Lists/ArgumentList'
import AquaClient from '../../lib/graphql/aquaClient'
import { NavbarData, HomeData, Article, Banner } from '../../lib/schemas'
import { device } from '../../lib/utils/device'
import { BLOG_API } from '../../public/environment'

interface Iindex {
    navbarData: NavbarData
    homeData: HomeData
    lastFive: Article[]
    banners: Banner[]
    slotMachineOnlineArticles: Article[]
    betsArticles: Article[]
    casinoLiveArticles: Article[]
    blackJackArticles: Article[]
}

const Blog: FunctionComponent<Iindex> = ({
    homeData,
    lastFive,
    slotMachineOnlineArticles,
    betsArticles,
    casinoLiveArticles,
    blackJackArticles,
}) => { 
    return (
        <Layout title="Casino Squad | Blog">
                <HomeContentContainer className="layout-container">
                    <div className='main-column'>
                        <p className='intro'>
                            Benvenuto nel nostro blog! WinCasino è uno dei casinò
                            digitali più amati in Italia! In questa sezione trovi i
                            migliori contenuti relativi al{' '}
                            <strong>gioco da casinò online</strong>. Rimani sempre
                            aggiornato sul fantastico mondo delle{' '}
                            <strong>slot online</strong>, della{' '}
                            <strong>Roulette</strong> ma anche di{' '}
                            <strong>Poker</strong>, <strong>Baccarat</strong> e{' '}
                            <strong>Blackjack</strong>. Inoltre, qui puoi anche
                            leggere le ultime news sul mondo dei{' '}
                            <strong>Casinò Live</strong>.
                        </p>

                        <HighlightArticlesContainer>

                            <MainArticleCard data={homeData.mainArticle} />

                            <div className='two-three-container'>
                                <MainArticleCardSmall
                                    data={homeData.secondArticle}
                                />
                                <MainArticleCardSmall
                                    data={homeData.thirdArticle}
                                />
                            </div>
                        </HighlightArticlesContainer>

                        <Fragment>
                            <ArgumentList
                                argumentName='Nuove Slot'
                                partialSlug='/info-giochi/slot-machine-online'
                                articles={slotMachineOnlineArticles}
                            />

                            <ArgumentList
                                argumentName='Scommesse'
                                partialSlug='/info-giochi/scommesse'
                                articles={betsArticles}
                            />

                            <ArgumentList
                                argumentName='Casino Live'
                                partialSlug='/info-giochi/casino-live'
                                articles={casinoLiveArticles}
                            />

                            <ArgumentList
                                argumentName='Black Jack'
                                partialSlug='/info-giochi/slot-machine-online'
                                articles={blackJackArticles}
                            />
                        </Fragment>
                        
                    </div>

                    <div className='side-column'>
                        <SideBanners />
                        <LatestArticles last={lastFive} />
                    </div>
                </HomeContentContainer>
        </Layout>
    ) 
}


export const HighlightArticlesContainer = styled.div`
    .two-three-container {
        display: flex;
        justify-content: space-between;

        @media ${device.mobileL} {
           flex-direction: column;
        }
    }
`

export const HomeContentContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin: 1rem 1rem;

    @media ${device.mobileL} {

        flex-direction: column;

        &.layout-container {
            padding: 5px 0% 0px;
        }
    }
    
    .intro {
        margin-bottom: 2rem;
        line-height: 1.2rem;

        strong {
            font-weight: 700;
        }
    }

    .main-column {
        width: 75%;
        padding: 0rem 1rem;

        @media ${device.mobileL} {
            width: fill-available;
        }
    }

    .side-column {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 25%;
        margin-top: 0rem;

        @media ${device.mobileL} {
            width: 100%;
            margin-top: 2rem;
        }
    }
`

export const getStaticProps = async () => {
    const aquaClient = new AquaClient(BLOG_API)

    const navbarData = await aquaClient.query({
        query: NAVBAR_QUERY,
        variables: {},
    })

    const home = await aquaClient.query({
        query: HOME_QUERY,
        variables: {},
    })

    const lastFive = await aquaClient.query({
        query: LAST_FIVE_QUERY,
        variables: {},
    })

    const global = await aquaClient.query({
        query: GLOBAL_QUERY,
        variables: {},
    })

    const slotMachineOnlineArticles = await aquaClient.query({
        query: LAST_FIVE_BY_SECONDARY_ARGUMENT,
        variables: {
            name: 'Nuove Slot',
        },
    })

    const betsArticles = await aquaClient.query({
        query: LAST_FIVE_BY_SECONDARY_ARGUMENT,
        variables: {
            name: 'Scommesse',
        },
    })

    const casinoLiveArticles = await aquaClient.query({
        query: LAST_FIVE_BY_SECONDARY_ARGUMENT,
        variables: {
            name: 'Casino Live',
        },
    })

    const blackJackArticles = await aquaClient.query({
        query: LAST_FIVE_BY_SECONDARY_ARGUMENT,
        variables: {
            name: 'Blackjack',
        },
    })

    return {
        props: {
            navbarData: navbarData.data.data.navbar,
            lastFive: lastFive.data.data.articles,
            homeData: home.data.data.homepage,
            banner: global.data.data.global.banner,
            slotMachineOnlineArticles:
                slotMachineOnlineArticles.data.data.articles,
            betsArticles: betsArticles.data.data.articles,
            casinoLiveArticles: casinoLiveArticles.data.data.articles,
            blackJackArticles: blackJackArticles.data.data.articles,
        },
        revalidate: 60,
    }
}

export const LAST_FIVE_BY_SECONDARY_ARGUMENT = /* GraphQL */ `
    query ($name: String) {
        articles(
            sort: "published_at:desc"
            limit: 4
            where: { secondaryArgument: { name: $name } }
        ) {
            title
            published_at
            description
            slug
            image {
                url
                alternativeText
            }
            main_argument {
                slug
            }
            secondaryArgument {
                slug
            }
        }
    }
`

const GLOBAL_QUERY = /* GraphQL */ `
    query {
        global {
            banner {
                link
                image {
                    url
                    alternativeText
                }
            }
        }
    }
`

export const LAST_FIVE_QUERY = /* GraphQL */ `
    query {
        articles(sort: "published_at:desc", limit: 5) {
            title
            published_at
            slug
            image {
                url
                alternativeText
            }
            main_argument {
                slug
            }
            secondaryArgument {
                slug
                name
                mainArgument {
                    slug
                }
            }
        }
    }
`

export const NAVBAR_QUERY = /* GraphQL */ `
    query {
        navbar {
            logo {
                url
                alternativeText
            }
            items {
                mainArgument {
                    name
                    slug
                    secondaryArguments {
                        slug
                        name
                    }
                }
            }
            externalLinks {
                label
                link
                rel
            }
        }
    }
`

const HOME_QUERY = /* GraphQL */ `
    query {
        homepage {
            mainArticle {
                title
                description
                slug
                published_at
                image {
                    url
                    alternativeText
                }
                main_argument {
                    name
                    slug
                }
                secondaryArgument {
                    name
                    slug
                    mainArgument {
                        slug
                    }
                }
            }
            secondArticle {
                title
                description
                slug
                image {
                    url
                    alternativeText
                }
                main_argument {
                    name
                    slug
                }
                secondaryArgument {
                    name
                    slug
                    mainArgument {
                        slug
                    }
                }
            }
            thirdArticle {
                title
                description
                slug
                image {
                    url
                    alternativeText
                }
                main_argument {
                    name
                    slug
                }
                secondaryArgument {
                    name
                    slug
                    mainArgument {
                        slug
                    }
                }
            }
        }
    }
`

export default Blog
