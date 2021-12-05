import React, { Fragment, FunctionComponent } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/dist/client/router'

interface IHead {
    title: string
    description: string
    image: string
    url: string
    baseUrl: string
}

const SeoHead: FunctionComponent<IHead> = ({
    title,
    description,
    image,
    url,
    baseUrl
}) => {
    const router = useRouter()

    return (
        <Fragment>
            <Head>
                <title>{title}</title>
                <link
                    rel='canonical'
                    href={`https://casino-squad.com${router.asPath}`}
                />
                <meta name='description' content={description} />

                <meta property='og:title' content={title} />
                <meta property='og:type' content='article' />
                <meta property='og:url' content={`${baseUrl}${url}`} />
                <meta property='og:image' content={image} />
                <meta property='og:description' content={description} />
            </Head>
        </Fragment>
    )
}

export default SeoHead