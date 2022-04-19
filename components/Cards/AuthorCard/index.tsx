import React, { FunctionComponent, useState } from 'react'
import { Fragment } from 'react'
import styled from 'styled-components'
import { Article, Writer } from '../../../lib/schemas'
import Image from 'next/image'
import { CDN } from '../../../public/environment'
import Link from 'next/link'
import { buildLink } from '../../../lib/utils/buildLink'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

type Props = {
   author: Writer
};

type ArticleListProps = {
    expand: boolean
 };

const AuthorCard: FunctionComponent<Props> = ({author}) => {

    const [expand, setExpand] = useState<boolean>(false)

    const triggerList = () => setExpand(!expand)

    return (
        <Fragment>
            <Main expand={expand}>

                <div className='header'>
                    <div className='logo'>
                        <Image
                            src={author.picture &&  author.picture.url ? author.picture.url : `${CDN}/png/logo_white.png`}
                            alt={author.name}
                            width={'1000px'}
                            height={'1000px'}/>
                    </div>

                    <div className='author-name'>About {author.name}</div>
                </div>


                <div className='author-info'>
                
                    <span>Title: Blogger</span>
                    <span>Email: {author.email}</span>
                    <span className='more-article' onClick={triggerList}>
                        more articles from this author 
                        {!expand ? <ExpandMoreIcon/> : <ExpandLessIcon/> }
                    
                    </span>
                    <ul className='list-articles'>
                        {
                            author.casino_squad_blog_articles.map((article: Article) => 
                                <Link key={article.id} passHref href={buildLink(article)}>
                                    <li>{article.title}</li>
                                </Link>
                            )
                        }
                    </ul>
                </div>
               
            </Main>
        </Fragment>
    )
} 

const Main = styled.div<ArticleListProps>`
    margin-top: 2rem;
    background: rgba(226,185,109,1);
    padding: 0 0.7rem;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    color: #fff;
    width: 100%;
    position: sticky;
    top: 20px;

    .header {
        display: flex;
        height: 45px;
        align-items: center;

        .logo {
            width: 45px;
            height: inherit;
        }

        .author-name {
            margin: auto 1rem;
            font-weight: bold;
            font-size: 1.2rem;
        }
    }

    .divider {
        background: #e8e8e8;
        width: 90%;
        margin: 0.3rem auto;
        height: 1px;
    }

    .author-info {
        display: flex;
        flex-direction: column;
        margin: 1rem;
        position: relative;

        .more-article {
            width: fit-content;
            margin-top: 1rem;
            border-bottom: 1px solid;
            cursor: pointer;
            display: flex;
            align-items: center;
        }

        ul.list-articles {
            margin: 0;
            padding: 1rem 1rem 0rem;

            height: auto;

            max-height: ${({expand}) => expand ? '700px' : '0px'};
            overflow-y: hidden;
            transition: max-height 0.2s ease-in-out;

            li:hover {
                text-decoration: underline;
                cursor: pointer;
                text-underline-offset: 5px;
            }
        }
    }
`

export default AuthorCard
