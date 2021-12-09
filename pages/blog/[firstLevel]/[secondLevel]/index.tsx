import React, { FunctionComponent } from 'react'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import {
    HomeContentContainer,
    NAVBAR_QUERY,
    LAST_FIVE_QUERY,
} from '../..'

import Loader from 'react-loader-spinner'
import Layout from '../../../../components/Layout'
import { LatestArticles } from '../../../../components/Commons/LatestArticles'
import { SideBanners } from '../../../../components/Commons/SideBanners'
import { ArticleCard } from '../../../../components/Lists/ArgumentList'
import AquaClient from '../../../../lib/graphql/aquaClient'
import { Article, NavbarData } from '../../../../lib/schemas'
import { BLOG_API } from '../../../../public/environment'
import { styledTheme } from '../../../../lib/theme'

interface Iindex {
    firstLevel: string
    firstLevelName: string
    firstLevelSlug: string
    secondLevel: string
    secondLevelName: string
    secondLevelSlug: string
    lastFive: Article[]
    navbarData: NavbarData
    arguments: Article[][]
    args: any
}

const SecondLevel: FunctionComponent<Iindex> = ({
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
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'flex-start',
                        }}
                    >
                        {args[0].articles.map((article: any, index: any) => (
                            <ArticleCard
                                style={{ marginBottom: '1rem' }}
                                key={index}
                                article={article}
                            />
                        ))}
                    </div>
                </div>
                <div className='side-column'>
                    <SideBanners />
                    <LatestArticles last={lastFive} />
                </div>
            </HomeContentContainer>
        </Layout>
    )
}

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: true,
    }
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
    const { firstLevel, secondLevel } = ctx.params as any

    const aquaClient = new AquaClient(BLOG_API)

    const navbarData = await aquaClient.query({
        query: NAVBAR_QUERY,
        variables: {},
    })

    const lastFive = await aquaClient.query({
        query: LAST_FIVE_QUERY,
        variables: {},
    })

    let args = []

    const r = await aquaClient.query({
        query: `query($mainArgumentSlug: String, $secondArgumentSlug : String){
                articles(
                    sort: "published_at:desc"
                    where: {
                        main_argument: {
                            slug:$mainArgumentSlug
                        }
                        secondaryArgument:{
                            slug:$secondArgumentSlug
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
            secondArgumentSlug: secondLevel,
        },
    })

    args = [
        {
            argumentName: '',
            argumentSlug: '',
            articles: r.data.data.articles,
        },
    ]

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

    let secondLevelName = ''

    switch (secondLevel) {
        case 'slot-machine-online':
            secondLevelName = 'Slot Machine Online'
            break
        case 'nuove-slot':
            secondLevelName = 'Nuove Slot'
            break

        case 'casino-live':
            secondLevelName = 'Casino Live'
            break

        case 'black-jack':
            secondLevelName = 'Black Jack'
            break

        case 'roulette':
            secondLevelName = 'Roulette'
            break

        case 'bingo':
            secondLevelName = 'Bingo'
            break

        case 'gratta-e-vinci':
            secondLevelName = 'Gratta e Vinci'
            break

        case 'scommesse-virtuali':
            secondLevelName = 'Scommesse Virtuali'
            break

        case 'scommesse':
            secondLevelName = 'Scommesse'
            break

        case 'poker':
            secondLevelName = 'Poker'
            break

        default:
            secondLevelName = 'Info Giochi'
    }

    return {
        props: {
            firstLevel,
            firstLevelName,
            firstLevelSlug: firstLevel,
            secondLevel,
            secondLevelName,
            secondLevelSlug: secondLevel,
            navbarData: navbarData.data.data.navbar,
            lastFive: lastFive.data.data.articles,
            args,
        },
        revalidate: 60,
    }
}

export default SecondLevel
