import React, { FunctionComponent } from 'react'
import styled, { CSSProperties } from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import { Article } from '../../../lib/schemas'
import { buildLink } from '../../../lib/utils/buildLink'
import { ellipsize } from '../../../lib/utils/ellipsize'

export const MainArticleCardSmall: FunctionComponent<{
    data: Article
    style?: CSSProperties
}> = ({ data, style }) => {
    return (
        <Link href={buildLink(data)}>
            <SmallArticleCardContainer style={style}>
                <div className='text-container'>
                    <h1>{data.title}</h1>
                    <p>{ellipsize(data.description, 150)}</p>
                </div>
                <Image
                    width={250}
                    height={150}
                    src={`https://wincasinoblogassets.b-cdn.net${data.image.url}`}
                    alt={data.image.alternativeText}
                />
            </SmallArticleCardContainer>
        </Link>
    )
}

export const SmallArticleCardContainer = styled.div`
    cursor: pointer;
    display: inline-flex;
    width: 100%;
    border-radius: 4px;
    margin-bottom: 1rem;
    overflow: auto;

    .text-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: white;
        padding: 0.5rem;
        box-sizing: border-box;
        background: ${({ theme }) => theme.palette.background};
        max-width: 50%;

        h1 {
            font-weight: 700;
            font-size: 18px;
            margin-bottom: 1rem;
        }

        p {
            display: none;
            display: block;
            font-size: 0.8rem;
            line-height: 1.1rem;
        }
    }
`
