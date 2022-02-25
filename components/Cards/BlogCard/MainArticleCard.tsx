import React, { Fragment, FunctionComponent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import format from 'date-fns/format'
import styled from 'styled-components'
import { Article } from '../../../lib/schemas'
import { buildLink } from '../../../lib/utils/buildLink'
import { ellipsize } from '../../../lib/utils/ellipsize'
import { device } from '../../../lib/utils/device'
import italianLocale  from 'date-fns/locale/it'

const cardHeight = 250

export const MainArticleCard: FunctionComponent<{ data: Article }> = ({
    data,
}) => {

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
                    <div className='published-section'>
                        <div className='divider' />
                        <div className='published_at'>
                         {data.published_at && 
                            <Fragment>
                                Pubblicato il
                                <div style={{textTransform: 'capitalize', marginLeft: '5px'}}>
                                    { format(new Date(data.published_at), 'dd MMM yyyy', { locale: italianLocale }).toString()} 
                                </div>
                            </Fragment>
                        }
                        </div>
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
    
    @media ${device.mobileL} {
        flex-direction: column;
        height: 100%;
    }


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
        display: flex;
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
        height: inherit;
        
        @media ${device.mobileL} {
            height: auto;
        }

        h1 {
            font-weight: 700;
            font-size: 22px;
            margin: 0px;
            @media ${device.mobileL} {
                font-size: 16px;
            }
        }

        p {
            line-height: 1.5rem;

            @media ${device.mobileL} {
                line-height: 1.3rem;
                margin-bottom: 2rem;
            }
        }

        .published-section {
            position: absolute;
            bottom: 0;
            right: 10px;
            width: 95%;
            text-align: right;
            height: 40px;
            
            .divider {
                width: 100%;
                height: 1px;
                margin: 0.5rem auto;
                background: white;
            }

            .published_at {
                margin-top: auto;
                color: ${({ theme }) => theme.text.color.white};
                font-size: 0.8rem;
                display: flex;
                justify-content: flex-end;
            }
        }
       
    }

    img {
        object-fit: cover;
    }

`
