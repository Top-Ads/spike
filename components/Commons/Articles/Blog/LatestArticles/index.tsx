import React, { FunctionComponent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import { Article } from '../../../../../lib/schemas'
import { buildLink } from '../../../../../lib/utils/buildLink'
import format from 'date-fns/format'
import { device } from '../../../../../lib/utils/device'
import italianLocale  from 'date-fns/locale/it'
import { useTranslation } from 'react-i18next'

export const LatestArticles: FunctionComponent<{ last: Article[] }> = ({
    last,
}) => {

    const { t } = useTranslation()

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
                                <div className='published_at'>
                                    {t("Pubblicato il")}
                                        <span style={{textTransform: 'capitalize', marginLeft: '5px'}}>
                                            { article.published_at && format(new Date(article.published_at), 'dd MMM yyyy', { locale: italianLocale }).toString()} 
                                        </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        )
    }

    return (
        <LatestArticleContainer>
            <h3>{t("Ultimi Articoli")}</h3>
            <LastPostsMapping />
        </LatestArticleContainer>
    )
}

export const LatestArticleContainer = styled.div`
    margin-top: 2rem;
    background: ${({ theme }) => theme.palette.background};
    padding: 0 0.7rem;
    border-radius: 6px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    width: 100%;

    @media ${device.mobileL} {
            width: 100%;
    }
        
    h3 {
        font-weight: 700;
        font-size: 1.5rem;
        color: white;
        margin: 10px 0;
    }

    .card-container {
        cursor: pointer;
        display: flex;
        background: white;
        margin-bottom: 0.4rem;
        padding: 0.4rem 0.4rem 0rem 0.4rem;
        border-radius: 6px;
        align-items: flex-start;
        position: relative;
        padding-bottom: 10px;

        &:hover {
            background-color: rgba(255, 255, 255, 0.9);
        }

        p {
            color: grey;
            font-size: 14px;
            line-height: initial;
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

            div {
                font-size: 0.85rem;
                margin: 0;
                
                @media ${device.mobileL} {
                    font-size: 0.95em;
                }

                &.published_at {
                    font-size: 0.7rem;
                    color: ${({ theme }) => theme.palette.background};
                   
                    display: flex;
                    position: absolute;
                    bottom: 2px;
                    right: 5px;
                }
            }
        }
    }
`
