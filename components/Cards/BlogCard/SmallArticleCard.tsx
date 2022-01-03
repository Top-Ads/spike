import React, { FunctionComponent } from 'react'
import styled, { CSSProperties } from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import { Article } from '../../../lib/schemas'
import { buildLink } from '../../../lib/utils/buildLink'
import { ellipsize } from '../../../lib/utils/ellipsize'
import { device } from '../../../lib/utils/device'

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
    width: 48%;
    border-radius: 4px;
    overflow: auto;
    flex-grow: 1;

    @media ${device.mobileL} {
        width: 100%;
        height: 120px;

        &:first-child {
            margin-bottom: 20px;
        }
    }
        
    .text-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: white;
        padding: 0.5rem;
        box-sizing: border-box;
        background: ${({ theme }) => theme.palette.background};
        width: 60%;

        @media ${device.mobileL} {
            width: 100%;
        }

        h1 {
            font-weight: 700;
            font-size: 18px;
        }

        p {
            
            display: block;
            font-size: 0.8rem;
            line-height: 1.1rem;

            @media ${device.mobileL} {
                display: none;
            }
        }
    }
`
