import React, { FunctionComponent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import format from 'date-fns/format'
import styled from 'styled-components'
import { Article } from '../../../lib/schemas'
import { buildLink } from '../../../lib/utils/buildLink'
import { ellipsize } from '../../../lib/utils/ellipsize'

const cardHeight = 285

export const MainArticleCard: FunctionComponent<{ data: Article }> = ({
    data,
}) => {

    console.log(data.published_at)
    return (
        <Link href={buildLink(data)}>
            <ArticleCardContainer>
                <div className='image-container'>
                    <Image
                        alt={data.image.alternativeText}
                        height={285}
                        width={560}
                        src={`https://wincasinoblogassets.b-cdn.net${data.image.url}`}
                    />
                </div>

                <div className='text-container'>
                    <h1>{data.title}</h1>
                    <p>{ellipsize(data.description, 150)}</p>
                    <div style={{ marginTop: 'auto' }}>
                        <div className='divider' />
                        <p className='date'>{ data.published_at && `Pubblicato il ${format(
                            new Date(data.published_at),
                            'dd/MM/yyyy',
                        ).toString()}`}</p>
                    </div>
                </div>
            </ArticleCardContainer>
        </Link>
    )
}

export const ArticleCardContainer = styled.div`
    cursor: pointer;
    display: flex;
    margin-bottom: 1.5rem;
    border-radius: 4px;
    overflow: hidden;

    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    height: ${cardHeight}px;
    
    .wave {
        transform: rotate(-90deg);
        position: absolute;
        top: 0;
        left: -50px;
    }

    .image-container {
        width: 100%;
        height: 100%;
        background: ${({ theme }) => theme.palette.background};
    }

    .text-container {
        width: 100%;
        color: white;
        padding: 1rem;
        box-sizing: border-box;
        background: ${({ theme }) => theme.palette.background};
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        height: ${cardHeight}px;

        h1 {
            font-weight: 700;
            font-size: 22px;
        }

        p {
            line-height: 1.5rem;
        }

        .divider {
            width: 100%;
            height: 1px;
            margin: 0.5rem auto;
            background: white;
        }

        .date {
            margin-top: auto;
        }
    }

    img {
        object-fit: cover;
    }

`
