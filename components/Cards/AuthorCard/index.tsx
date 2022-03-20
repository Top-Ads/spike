import React, { FunctionComponent } from 'react'
import { Fragment } from 'react'
import styled from 'styled-components'
import { Writer } from '../../../lib/schemas'
import Image from 'next/image'
import { CDN } from '../../../public/environment'

type Props = {
   author: Writer
};

const AuthorCard: FunctionComponent<Props> = ({author}) => {

    return (
        <Fragment>
            <Main>


            <div className='header'>
                <div className='logo'>
                    <Image
                        src={author.picture.url ? author.picture.url : `${CDN}/png/logo_white.png`}
                        alt={author.name}
                        width={'1000px'}
                        height={'1000px'}/>
                </div>

                <div className='author-name'>About {author.name}</div>

            
            </div>


            <div className='author-info'>
              
                <span>Title: Blogger</span>
                <span>Email: {author.email}</span>
                <span className='more-article'>more articles from this author</span>
                <ul>
                    
                </ul>
            </div>
               
            </Main>
        </Fragment>
    )
} 

const Main = styled.div`
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
        }
    }
`

export default AuthorCard
