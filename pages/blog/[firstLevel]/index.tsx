import React, { FunctionComponent } from 'react'
import { GetStaticPropsContext } from 'next'
import {
    NAVBAR_QUERY,
    LAST_FIVE_QUERY,
    HomeContentContainer,
    LAST_FIVE_BY_SECONDARY_ARGUMENT,
} from '..'
import { useRouter } from 'next/dist/client/router'
import { LatestArticles } from '../../../components/Commons/Articles/Blog/LatestArticles'
import { SideBanners } from '../../../components/Commons/SideBanners'
import Layout from '../../../components/Layout'
import ArgumentList, { ArticleCard } from '../../../components/Lists/ArgumentList'
import AquaClient from '../../../lib/graphql/aquaClient'
import { Article, NavbarData } from '../../../lib/schemas'
import Loader from 'react-loader-spinner'
import { BLOG_API } from '../../../public/environment'
import { styledTheme } from '../../../lib/theme'
import styled from 'styled-components'
import { device } from '../../../lib/utils/device'

interface Iindex {
    firstLevel: string
    firstLevelName: string
    lastFive: Article[]
    navbarData: NavbarData
    arguments: Article[][]
    args: any
}

const FirstLevel: FunctionComponent<Iindex> = ({
    firstLevel,
    lastFive,
    args,
}) => {
    const router = useRouter()

    if (router.isFallback) {
        return (
            <div
                style={{
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Loader
                    type='TailSpin'
                    color={styledTheme.palette.background}
                    height={40}
                    width={40}
                />
            </div>
        )
    }

    return (
        <Layout>
          
            <HomeContentContainer className="layout-container">
                <div className='main-column'>
                    {firstLevel === 'info-giochi' ? (
                        args.map((arg: any) => (
                            <ArgumentList
                                key={arg.argumentName}
                                argumentName={arg.argumentName}
                                partialSlug={arg.argumentSlug}
                                articles={arg.articles}
                            />
                        ))
                    ) : (
                        <CardsContainer>
                            {args[0].articles.map((article: any, index: number) => (
                                <ArticleCard
                                    key={index}
                                    style={{ marginBottom: '1rem' }}
                                    article={article}
                                />
                            ))}
                        </CardsContainer>
                    )}
                </div>
                <div className='side-column'>
                    <SideBanners />
                    <LatestArticles last={lastFive} />
                </div>
            </HomeContentContainer>
        </Layout>
    )
}

const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    @media ${device.mobileL} {
        justify-content: center;
    }
`

export const getStaticPaths = () => {
    return {
        paths: [
            { params: { firstLevel: 'info-giochi' } },
            { params: { firstLevel: 'comparazione-casino' } },
            { params: { firstLevel: 'dicci-la-tua' } },
            { params: { firstLevel: 'guide' } },
            { params: { firstLevel: 'altri-giochi' } },
            { params: { firstLevel: 'strategie-di-gioco' } },
            { params: { firstLevel: 'ultima-ora' } },
        ],
        fallback: true,
    }
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
    const { firstLevel } = ctx.params as any

    const aquaClient = new AquaClient(BLOG_API)

    const navbarData = await aquaClient.query({
        query: NAVBAR_QUERY,
        variables: {},
    })

    const lastFive = await aquaClient.query({
        query: LAST_FIVE_QUERY,
        variables: {},
    })

    const newSlotsArticles = aquaClient.query({
        query: LAST_FIVE_BY_SECONDARY_ARGUMENT,
        variables: {
            name: 'Nuove Slot',
        },
    })

    const slotMachineOnlineArticles = aquaClient.query({
        query: LAST_FIVE_BY_SECONDARY_ARGUMENT,
        variables: {
            name: 'Slot Machine Online',
        },
    })

    const casinoLiveArticles = aquaClient.query({
        query: LAST_FIVE_BY_SECONDARY_ARGUMENT,
        variables: {
            name: 'Casino Live',
        },
    })

    const betsArticles = aquaClient.query({
        query: LAST_FIVE_BY_SECONDARY_ARGUMENT,
        variables: {
            name: 'Scommesse',
        },
    })

    const blackJackArticles = aquaClient.query({
        query: LAST_FIVE_BY_SECONDARY_ARGUMENT,
        variables: {
            name: 'Blackjack',
        },
    })

    const rouletteArticles = aquaClient.query({
        query: LAST_FIVE_BY_SECONDARY_ARGUMENT,
        variables: {
            name: 'Roulette',
        },
    })

    const bingoArticles = aquaClient.query({
        query: LAST_FIVE_BY_SECONDARY_ARGUMENT,
        variables: {
            name: 'Bingo',
        },
    })

    const grattaEVinciArticles = aquaClient.query({
        query: LAST_FIVE_BY_SECONDARY_ARGUMENT,
        variables: {
            name: 'Gratta e Vinci',
        },
    })

    const scommesseVirtualiArticles = aquaClient.query({
        query: LAST_FIVE_BY_SECONDARY_ARGUMENT,
        variables: {
            name: 'Scommesse Viruali',
        },
    })

    const pokerArticles = aquaClient.query({
        query: LAST_FIVE_BY_SECONDARY_ARGUMENT,
        variables: {
            name: 'Poker',
        },
    })

    let args = []

    if (firstLevel === 'info-giochi') {
        const argumentsRequest = await Promise.all([
            newSlotsArticles,
            slotMachineOnlineArticles,
            casinoLiveArticles,
            betsArticles,
            blackJackArticles,
            rouletteArticles,
            bingoArticles,
            grattaEVinciArticles,
            scommesseVirtualiArticles,
            pokerArticles,
        ])

        args = argumentsRequest
            .map((response: any, i) => {
                if (i === 0)
                    return {
                        argumentName: 'Nuove Slot',
                        argumentSlug: 'nuove-slot',
                        articles: response.data.data.casinoSquadBlogArticles,
                    }
                if (i === 1)
                    return {
                        argumentName: 'Slot Machine Online',
                        argumentSlug: 'slot-machine-online',
                        articles: response.data.data.casinoSquadBlogArticles,
                    }
                if (i === 2)
                    return {
                        argumentName: 'Casino Live',
                        argumentSlug: 'casino-live',
                        articles: response.data.data.casinoSquadBlogArticles,
                    }
                if (i === 3)
                    return {
                        argumentName: 'Scommesse',
                        argumentSlug: 'scommesse',
                        articles: response.data.data.casinoSquadBlogArticles,
                    }
                if (i === 4)
                    return {
                        argumentName: 'Black Jack',
                        argumentSlug: 'black-jack',
                        articles: response.data.data.casinoSquadBlogArticles,
                    }
                if (i === 5)
                    return {
                        argumentName: 'Roulette',
                        argumentSlug: 'roulette',
                        articles: response.data.data.casinoSquadBlogArticles,
                    }
                if (i === 6)
                    return {
                        argumentName: 'Bingo',
                        argumentSlug: 'bingo',
                        articles: response.data.data.casinoSquadBlogArticles,
                    }
                if (i === 7)
                    return {
                        argumentName: 'Gratta e vinci',
                        argumentSlug: 'gratta-e-vinci',
                        articles: response.data.data.casinoSquadBlogArticles,
                    }
                if (i === 8)
                    return {
                        argumentName: 'Scommesse Virtuali',
                        argumentSlug: 'scommesse-virtuali',
                        articles: response.data.data.casinoSquadBlogArticles,
                    }

                if (i === 9)
                    return {
                        argumentName: 'Poker',
                        argumentSlug: 'poker',
                        articles: response.data.data.casinoSquadBlogArticles,
                    }

                return undefined
            })
            .filter((it) => it !== undefined)
    } else {
        const r = await aquaClient.query({
            query: `query($mainArgumentSlug: String){
                casinoSquadBlogArticles(
                    sort: "published_at:desc" 
                    where: {
                    main_argument: {
                        slug:$mainArgumentSlug
                    }
                    }
                ){
                        title
                            published_at
                            description
                            slug
                            image {
                                url
                                alternativeText
                            }
                            main_argument{
                                slug
                            }
                            secondaryArgument{
                                slug
                            }
                }
                }`,
            variables: {
                mainArgumentSlug: firstLevel,
            },
        })

        args = [
            {
                argumentName: '',
                argumentSlug: '',
                articles: r.data.data.casinoSquadBlogArticles,
            },
        ]
    }

    let firstLevelName = ''

    switch (firstLevel) {
        case 'info-giochi':
            firstLevelName = 'Info Giochi'
            break
        case 'strategie-di-gioco':
            firstLevelName = 'Strategie di gioco'
            break

        case 'ultima-ora':
            firstLevelName = 'Ultima Ora'
            break

        case 'comparazione-casino':
            firstLevelName = 'Comparazione Casino'
            break

        case 'dicci-la-tua':
            firstLevelName = 'Dicci la tua'
            break

        case 'guide':
            firstLevelName = 'Guide'
            break

        default:
            firstLevelName = 'Info Giochi'
    }

    return {
        props: {
            firstLevel,
            firstLevelName,
            navbarData: navbarData.data.data.navbar,
            lastFive: lastFive.data.data.casinoSquadBlogArticles,
            args,
        },
        revalidate: 180,
    }
}

export default FirstLevel
