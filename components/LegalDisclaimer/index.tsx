import React, { Fragment, FunctionComponent } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { device } from '../../utils/device'
import { CDN } from '../../public/environment'

const LegalDisclaimer: FunctionComponent = () =>   
    <Fragment>
        <Main>
            <div className="legal-image">
                <Image
                    alt="Casino Legal Information"
                    src={`${CDN}/png/it_legal_logos.png`}
                    layout="responsive"
                    priority={true}
                    width={295}
                    height={56}
                />
            </div>
            <div className="legal-text">
                <p>Il gioco e vietato ai minori e puo causare dipendenza patologica - probabilita di vincita</p>
            </div>
        </Main>
    </Fragment>

const Main = styled.div`
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: auto;
    background-color: ${({theme}) => theme.colors.background};

    display: flex;
    flex-direction: center;
    align-items: inherit;
    flex-wrap: inherit;
    justify-content: center;
    z-index: 100;

    .legal-image {
        width: 130px;
        margin: 10px 15px;
        
        @media ${device.mobileL} {
            width: 170px;
          }
    }

    .legal-text {
        display: inherit;
        align-items: center;
        font-size: 11px;

        p { 
            color: ${({theme}) => theme.text.color.primary}; 
            line-height: revert;
        }
       
        @media ${device.mobileL} {
            font-size: 10px;
        }
    }
`
export default LegalDisclaimer
