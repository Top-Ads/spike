import React, { FunctionComponent } from 'react'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import { HomeContentContainer, NAVBAR_QUERY, LAST_FIVE_QUERY } from '../..'

import Loader from 'react-loader-spinner'
import Layout from '../../../../components/Layout'
import { LatestArticles } from '../../../../components/Commons/Articles/Blog/LatestArticles'
import { SideBanners } from '../../../../components/Commons/SideBanners'
import { ArticleCard } from '../../../../components/Lists/ArgumentList'
import AquaClient from '../../../../lib/graphql/aquaClient'
import { Article, NavbarData } from '../../../../lib/schemas'
import { BLOG_API } from '../../../../public/environment'
import { styledTheme } from '../../../../lib/theme'
import styled from 'styled-components'
import { device } from '../../../../lib/utils/device'
import Markdown from 'markdown-to-jsx'
import { MarkdownStyleProvider } from './[slug]'

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

const SecondLevel: FunctionComponent<Iindex> = ({ lastFive, args }) => {
	const router = useRouter()
	console.log(router.asPath)

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
			{router.asPath.includes('nuove-slot') && (
				<MarkdownStyleProvider
					style={{
						maxWidth: '1500px',
						margin: '2rem auto',
						padding: '0rem 2rem',
					}}
				>
					<Markdown>
						{`#Nuove Slot Casinò Squad 
                    
Benvenuto nella sezione del blog di Casinò Squad dedicata al rilascio delle nuove slot machine gratis. Qui, **puoi trovare tutte le informazioni relative ai nuovi giochi slot online, le loro caratteristiche principali e le loro funzioni Bonus**. 

Dopo aver consultato la descrizione, puoi inserire le slot machine gratis nella lista delle tue preferite, cliccando sul simbolo del cuore. 

A questo punto, i giochi slot online selezionati sono disponibili in modalità di prova gratuita,che permette ai singoli utenti di intrattenersi senza l’utilizzo di soldi reali e senza dover effettuare la	procedura di registrazione.`}
					</Markdown>
				</MarkdownStyleProvider>
			)}

			<HomeContentContainer className='layout-container'>
				<MainColumn>
					{args[0].articles.map((article: any, index: any) => (
						<ArticleCard
							style={{ marginBottom: '1rem' }}
							key={index}
							article={article}
						/>
					))}
				</MainColumn>
				<div className='side-column'>
					<SideBanners />
					<LatestArticles last={lastFive} />
				</div>
			</HomeContentContainer>
		</Layout>
	)
}

const MainColumn = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	width: 70%;
	height: min-content;
	padding: 0rem 2rem;

	a {
		margin-bottom: 1rem;
	}

	@media ${device.mobileL} {
		margin: auto;
		justify-content: center;
	}
`

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
            casinoSquadBlogArticles(
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
			articles: r.data.data.casinoSquadBlogArticles,
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
			lastFive: lastFive.data.data.casinoSquadBlogArticles,
			args,
		},
		revalidate: 60,
	}
}

export default SecondLevel
