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

                <div className='title'>About Me</div>

                <div className="divider"></div>

                <div className='profile'>
                    <div className='picture'>
                        <Image
                            src={author.picture.url ? author.picture.url : `${CDN}/svg/no_img_available.svg`}
                            alt={author.name}
                            width={author.picture.width ? author.picture.width : '100px'}
                            height={author.picture.height ? author.picture.height : '100px'}
                        />
                    </div>

                    <div className='info'>
                        <span>{author.name}</span>
                        <span>{author.email}</span>
                        <span className='more-article'>more articles</span>
                    </div>
                </div>
               
            </Main>
        </Fragment>
    )
} 

const Main = styled.div`
    margin-top: 1rem;
    background: rgba(226,185,109,1);
    padding: 0 0.7rem;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    width: fit-content;
    color: #fff;

    .title {
        margin: auto 1rem;
        padding: 3px 0px 0px;
        font-weight: bold;
    }

    .divider {
        background: #e8e8e8;
        width: 90%;
        margin: 0.3rem auto;
        height: 1px;
    }

    .profile {
        display: flex;

        .picture {
            width: 100px;
            height: 100px;
            background: #fff;
            margin: 1rem;
            border: 2px solid #fff;
        }

        .info {
            display: flex;
            flex-direction: column;
            margin: 1rem;
            position: relative;

            .more-article {
                position: absolute;
                bottom: 0;
                right: 0;
                border-bottom: 1px solid;
                cursor: pointer;
            }
        }
    }
`

export default AuthorCard
