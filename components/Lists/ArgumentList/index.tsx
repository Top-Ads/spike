import React, { CSSProperties, FunctionComponent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import { Article } from '../../../lib/schemas'
import format from 'date-fns/format'
import { buildLink } from '../../../lib/utils/buildLink'

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
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 1440 320'
                            className='wave'
                        >
                            <path
                                fill='#ffffff'
                                fillOpacity='1'
                                d='M0,160L48,138.7C96,117,192,75,288,74.7C384,75,480,117,576,144C672,171,768,181,864,186.7C960,192,1056,192,1152,170.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
                            ></path>
                        </svg>
                        <div className='article-title'>{article.title}</div>
                    </div>

                    <div className='divider' />

                    <p className='date'>
                        {`Pubblicato il ${article.published_at && format(
                            new Date(article.published_at),
                            'dd/MM/yyyy',
                        )}`}
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
    height: 245px;
    background: white;
    
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
            transform: scale(1.3);
        }
    }

    .date {
        font-size: 0.7rem;
        text-align: right !important;
        letter-spacing: 0.1rem;
        margin-top: auto;
        padding: 0.4rem;
    }

    .article-title {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
        background: white;

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

    a:last-child div {
        margin-right: 0;
    }

`

export default ArgumentList
