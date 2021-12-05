import React, { FunctionComponent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import { Article } from '../../../lib/schemas'
import { buildLink } from '../../../lib/utils/buildLink'
import format from 'date-fns/format'

export const LatestArticles: FunctionComponent<{ last: Article[] }> = ({
    last,
}) => {
    const LastPostsMapping: FunctionComponent = () => {
        return (
            <div>
                {last.map((article, i) => (
                    <Link href={buildLink(article)} key={`${i}-latest-article`}>
                        <div
                            className='card-container'
                            key={`div-${i}-latest-article`}
                        >
                            <div className='image'>
                                <Image
                                    layout='fixed'
                                    width={50}
                                    height={50}
                                    src={`https://wincasinoblogassets.b-cdn.net${article.image.url}`}
                                    alt={article.image.alternativeText}
                                />
                            </div>

                            <div className='card-info-container'>
                                <p className='title'>{article.title}</p>
                                <p>
                                    {article.published_at && format(
                                        new Date(article.published_at),
                                        'dd/M/yyyy',
                                    )}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        )
    }

    return (
        <LatestArticleContainer>
            <h3>Ultimi Articoli</h3>
            <LastPostsMapping />
        </LatestArticleContainer>
    )
}

export const LatestArticleContainer = styled.div`
    margin-top: 1rem;
    background: ${({ theme }) => theme.palette.background};
    padding: 0.7rem;
    border-radius: 6px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    h3 {
        font-weight: 700;
        font-size: 1.5rem;
        color: white;
        margin-bottom: 0.8rem;
    }

    .card-container {
        cursor: pointer;
        display: flex;
        background: white;
        margin-bottom: 0.4rem;
        padding: 0.4rem;
        border-radius: 6px;
        align-items: center;

        p {
            color: grey;
            font-size: 14px;
            padding: 0.3rem 0rem;
        }

        .title {
            color: black;
        }

        .image {
            margin-right: 1rem;

            img {
                object-fit: cover;
                border-radius: 50%;
            }
        }

        .card-info-container {
            display: flex;
            flex-direction: column;
            justify-content: center;

            p {
                font-size: 0.8rem;
            }
        }
    }
`
