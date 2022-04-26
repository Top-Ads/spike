import React, { Fragment, FunctionComponent } from 'react'
import styled from 'styled-components'
import { MainArticleCard } from '../../components/Cards/BlogCard/MainArticleCard'
import { MainArticleCardSmall } from '../../components/Cards/BlogCard/SmallArticleCard'
import { LatestArticles } from '../../components/Commons/Articles/Blog/LatestArticles'
import { SideBanners } from '../../components/Commons/SideBanners'
import Layout from '../../components/Layout'
import ArgumentList from '../../components/Lists/ArgumentList'
import AquaClient from '../../lib/graphql/aquaClient'
import { NavbarData, Article, Banner } from '../../lib/schemas'
import { device } from '../../lib/utils/device'
import { BLOG_API } from '../../public/environment'

interface Iindex {
	navbarData: NavbarData
	homeData: Article[]
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
		<Layout title='Casino Squad | Blog'>
			<HomeContentContainer className='layout-container'>
				<div className='main-column'>
					<p className='intro'>
						Benvenuto nel nostro blog! La missione della{' '}
						<strong>SQUAD</strong> è quella di intrattenere i nostri
						followers ma anche di aggiornarli sulle ultime notizie
						sul mondo dei <strong>casinò online</strong>. Nel nostro
						blog troverai news e curiosità per rimanere sempre
						aggiornato su <strong>slot online</strong>,{' '}
						<strong>poker</strong> e <strong>giochi live</strong>.
					</p>
					<p>Casinò Squad ti augura una buona lettura!</p>

					<HighlightArticlesContainer>
						<MainArticleCard data={homeData[0]} />

						<div className='two-three-container'>
							<MainArticleCardSmall data={homeData[1]} />
							<MainArticleCardSmall data={homeData[2]} />
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
		margin-bottom: 1rem;
		line-height: 1.2rem;

		strong {
			font-weight: 700;
		}
	}

	.main-column {
		width: 70%;
		padding: 0rem 3rem;

		@media ${device.mobileL} {
			width: fill-available;
			padding: 0rem;
		}
	}

	.side-column {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 25%;
		margin-top: 1rem;

		@media ${device.mobileL} {
			width: 100%;
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
		query: HOME_QUERY_CASINO,
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
			lastFive: lastFive.data.data.casinoSquadBlogArticles,
			homeData: home.data.data.casinoSquadBlogArticles,
			banner: global.data.data.global.banner,
			slotMachineOnlineArticles:
				slotMachineOnlineArticles.data.data.casinoSquadBlogArticles,
			betsArticles: betsArticles.data.data.casinoSquadBlogArticles,
			casinoLiveArticles:
				casinoLiveArticles.data.data.casinoSquadBlogArticles,
			blackJackArticles:
				blackJackArticles.data.data.casinoSquadBlogArticles,
		},
		revalidate: 60,
	}
}

export const LAST_FIVE_BY_SECONDARY_ARGUMENT = /* GraphQL */ `
	query ($name: String) {
		casinoSquadBlogArticles(
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
		casinoSquadBlogArticles(sort: "published_at:desc", limit: 5) {
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

const HOME_QUERY_CASINO = /* GraphQL */ `
	query {
		casinoSquadBlogArticles(sort: "published_at:desc", limit: 3) {
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

export default Blog
