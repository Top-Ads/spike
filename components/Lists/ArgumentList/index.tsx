import React, { CSSProperties, Fragment, FunctionComponent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import { Article } from '../../../lib/schemas'
import format from 'date-fns/format'
import { buildLink } from '../../../lib/utils/buildLink'
import italianLocale  from 'date-fns/locale/it'

interface Props {
    argumentName: string
    partialSlug: string
    articles: Article[]
}

const ArgumentList: FunctionComponent<Props> = ({
    argumentName,
    articles,
}) => {
    return (
        <Container>
            <h3 className='section-header'>{argumentName}</h3>
            <ArgumentListContainer className="custom-scroll">
                {articles.map((article) => (
                    <ArticleCard key={article.title} article={article} />
                ))}
            </ArgumentListContainer>
        </Container>
    )
}

const Container = styled.div`
    
    &:first-child h3 {
        margin-top: 0;
    }

    .section-header {
        padding: 1rem;
        color: white;
        font-weight: 700;
        border-radius: 6px;
        background: ${({ theme }) => theme.palette.backgroundImage};
    }
`

export const ArticleCard: FunctionComponent<{
    article: Article
    style?: CSSProperties
}> = ({ article, style }) => {
    return (
        <Link
            passHref
            href={buildLink(article)}
        >
            <a>
                <ArticleCardContainer style={style}>
                    <Image
                        layout='fixed'
                        height={150}
                        width={270}
                        alt={article.image.alternativeText}
                        src={`https://wincasinoblogassets.b-cdn.net${article.image.url}`}
                    />

                    <div
                        style={{
                            padding: '.7rem .5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'end',
                            position: 'relative',
                            background: 'white',
                        }}
                    >
                      
                        <div className='article-title'>{article.title}</div>
                    </div>

                    <div className='divider' />

                    <p className='published_at'>
                         {article.published_at && 
                            <Fragment>
                                Pubblicato il 
                                <div style={{textTransform: 'capitalize', marginLeft: '5px'}}>
                                    { format(new Date(article.published_at), 'dd MMM yyyy', { locale: italianLocale }).toString()} 
                                </div>
                            </Fragment>
                        }
                    </p>
                </ArticleCardContainer>
            </a>
        </Link>
    )
}

const ArticleCardContainer = styled.div`
    display: flex;
    cursor: pointer;
    flex-direction: column;
    margin-right: 1rem;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    border-radius: 4px;
    width: 270px;
    background: white;
    height: fit-content;
    overflow: hidden;
    
    .wave {
        left: 0;
        position: absolute;
        top: -48px;
    }

    img {
        object-fit: cover;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        transition: transform 0.3s ease;
    }

    :hover {
        img {
            transform: scale(1.1);
        }
    }

    .published_at {
        font-size: 0.7rem;
        text-align: right !important;
        letter-spacing: 0.03rem;
        margin: 0;
        padding: 0 0.4rem;
        color: ${({ theme }) => theme.palette.background};
        display: flex;
        justify-content: flex-end;
    }

    .article-title {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
        background: white;
        height: 55px;
        font-weight: 700;
        color: ${({ theme }) => theme.palette.background};
    }

    .divider {
        background: #e8e8e8;
        width: 90%;
        margin: 0.3rem auto;
        height: 1px;
    }
`

const ArgumentListContainer = styled.div`
    background-color: white;
    display: flex;
    overflow: auto;
    padding: 5px;
`

export default ArgumentList
