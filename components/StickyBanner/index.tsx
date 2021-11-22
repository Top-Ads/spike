import React, { Fragment, FunctionComponent } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { device } from '../../lib/utils/device'
import { CDN } from '../../public/environment'

const StickyBanner: FunctionComponent = () =>   
    <Fragment>
        <Main>
            <div className="keywords left">
                <span>Casino online</span>
            </div>
            <div className="legal-image">
                <Image
                    alt="Casino Legal Information"
                    src={`${CDN}/png/it_legal_logos.png`}
                    layout="responsive"
                    sizes={"30vw"}
                    priority={true}
                    width={295}
                    height={56}
                />
            </div>
            <div className="legal-text">
                <p>Il gioco e vietato ai minori e puo causare dipendenza patologica - probabilita di vincita </p>
            </div>
            <div className="keywords right">
                <span>Slot online</span>
            </div>
        </Main>
    </Fragment>

const Main = styled.div`
    position: fixed;
    bottom: 0px;
    width: 100%;
    max-width: 1920px;
    height: auto;
    background-color: ${({theme}) => theme.palette.background};
    display: flex;
    flex-direction: center;
    align-items: center;
    flex-wrap: inherit;
    justify-content: center;
    z-index: 100;
    font-size: 12px;

    .legal-image {
        width: 130px;
        margin: 10px 10px;
        
        @media ${device.mobileL} {
            width: 170px;
        }
    }

    .legal-text {
        display: inherit;
        align-items: center;
        margin-right: 10px;
        
        p { 
            color: ${({theme}) => theme.text.color.white}; 
            line-height: revert;
        }
       
        @media ${device.mobileL} {
            display: none;
        }
    }

    .keywords {
        color: #fff;
        text-align: center;
        
        &.left {
            border-right: 1px solid;
            padding: 0 10px;
        }

        &.right {
            border-left: 1px solid;
            padding: 0 10px;
        }
     
    }
`

export default StickyBanner
