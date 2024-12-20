import React, { FunctionComponent } from 'react'
import { HomeContentContainer, NAVBAR_QUERY, LAST_FIVE_QUERY } from '../../..'
import Markdown from 'markdown-to-jsx'
import Image from 'next/image'
import { useRouter } from 'next/dist/client/router'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import { LatestArticles } from '../../../../../components/Commons/Articles/Blog/LatestArticles'
import { SideBanners } from '../../../../../components/Commons/SideBanners'
import Layout from '../../../../../components/Layout'
import AquaClient from '../../../../../lib/graphql/aquaClient'
import { Article, NavbarData } from '../../../../../lib/schemas'
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next'
import { BLOG_API } from '../../../../../public/environment'
import { styledTheme } from '../../../../../lib/theme'
import { device } from '../../../../../lib/utils/device'
import AuthorCard from '../../../../../components/Cards/AuthorCard'
import Head from 'next/head'

// @ts-ignore
// const ReactMarkdown = dynamic(() => import('react-markdown'))

interface Iindex {
	article: Article
	navbarData: NavbarData
	lastFive: Article[]
}

const index: FunctionComponent<Iindex> = ({ article, lastFive }) => {
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
			<Head>
				<title>{article.title} | Casino Squad</title>
				<meta name='description' content={article.description} />
			</Head>
			<HomeContentContainer className='layout-container'>
				<div className='main-column'>
					<ArticleContainer>
						<Image
							width={400}
							height={230}
							layout='responsive'
							src={`https://wincasinoblogassets.b-cdn.net${article.image.url}`}
							alt={article.image.alternativeText}
						/>
						<MarkdownStyleProvider>
							<Markdown
								options={{
									overrides: {
										img: {
											component: MarkdownImage,
										},
									},
								}}
							>
								{article.content}
							</Markdown>
						</MarkdownStyleProvider>
					</ArticleContainer>
				</div>

				<div className='side-column'>
					<SideBanners />

					<LatestArticles last={lastFive} />

					{article.author && <AuthorCard author={article.author} />}
				</div>
			</HomeContentContainer>
		</Layout>
	)
}

const MarkdownImage: FunctionComponent<{ src: string }> = ({
	src,
	...props
}) => {
	return (
		<Image
			width='100%'
			height='55%'
			layout='responsive'
			alt={(props as any).alt}
			src={`https://wincasinoblogassets.b-cdn.net${src}`}
			objectFit='contain'
		/>
	)
}

export const Breadcrumbs = styled.div`
	margin-bottom: 3rem;

	a {
		color: ${({ theme }) => theme.palette.backgroundImage};
		font-weight: 700;
	}
`

const ArticleContainer = styled.div`
	margin: 1rem 2rem;

	@media ${device.mobileL} {
		margin: auto;
	}

	img {
		border-radius: 4px;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	}
`

export const MarkdownStyleProvider = styled.div`
	margin-top: 2rem;
	line-height: 1.3rem;

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		color: ${({ theme }) => theme.palette.backgroundImage};
	}

	h1 {
		font-weight: 700;
		font-size: 1.5rem;
	}

	h2 {
		font-weight: 700;
		font-size: 1.3rem;
	}

	p {
		line-height: 1.3rem;
	}

	a {
		font-weight: bold;
		color: #4c8bf5;
	}

	strong {
		font-weight: bold;
		color: black;
	}

	em {
		font-style: italic;
	}

	ul {
		list-style-type: circle;
		list-style-position: inside;
		li {
			margin-left: 1rem;
		}
	}

	ol {
		list-style-type: decimal;
		list-style-position: inside;
	}

	li {
		padding: 0.5rem 0rem;
	}
`

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	const { firstLevel, secondLevel, slug } = ctx.params as any

	const aquaClient = new AquaClient(BLOG_API)

	const navbarData = await aquaClient.query({
		query: NAVBAR_QUERY,
		variables: {},
	})

	const lastFive = await aquaClient.query({
		query: LAST_FIVE_QUERY,
		variables: {},
	})

	const article = await aquaClient.query({
		query: ARTICLE_QUERY,
		variables: {
			mainArgumentSlug: firstLevel,
			secondaryArgumentSlug: secondLevel,
			articleSlug: slug,
		},
	})

	return {
		props: {
			article: article.data.data.casinoSquadBlogArticles[0],
			navbarData: navbarData.data.data.navbar,
			lastFive: lastFive.data.data.casinoSquadBlogArticles,
		},
	}
}

const ARTICLE_QUERY = /* GraphQL */ `
	query (
		$mainArgumentSlug: String
		$secondaryArgumentSlug: String
		$articleSlug: String
	) {
		casinoSquadBlogArticles(
			where: {
				main_argument: { slug: $mainArgumentSlug }
				secondaryArgument: { slug: $secondaryArgumentSlug }
				slug: $articleSlug
			}
		) {
			title
			content
			published_at
			description
			image {
				url
				alternativeText
			}
			main_argument {
				slug
				name
			}
			secondaryArgument {
				slug
				name
			}
			author {
				id
				name
				picture {
					id
				}
				email
				casino_squad_blog_articles {
					id
					title
					description
					content
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
					}
					published_at
					author {
						id
					}
				}
			}
		}
	}
`

export default index
