import React, { FunctionComponent } from 'react'
// import Image from 'next/image'
import styled from 'styled-components'

export const SideBanners: FunctionComponent = () => {
    return (
        <SideBannersContainer>
            {/* <div className='first-banner-wrapper'>
                <Image
                    width={350}
                    height={210}
                    quality={100}
                    src='/images/banners/wc-banner-1.jpg'
                    alt='wincasino candyland banner'
                />
            </div>
            <Image
                onClick={() => window.open('https://www.wincasino.it/')}
                width={350}
                height={210}
                quality={100}
                src='/images/banners/wc-banner-2.jpg'
                alt='wincasino register banner'
            /> */}
        </SideBannersContainer>
    )
}

export const SideBannersContainer = styled.div`
    cursor: pointer;

    .first-banner-wrapper {
        margin-bottom: 1rem;
    }

    img {
        border-radius: 4px;
    }
`
