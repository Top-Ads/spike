import React, { Fragment, FunctionComponent } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { device } from '../../utils/device'

const LegalDisclaimer: FunctionComponent = () =>   
    <Fragment>
        <MainContainer>
            <div className="legal-image">
                <Image
                    alt="Casino Legal Information"
                    src="/png/it-legal-logos.png"
                    layout="responsive"
                    priority={true}
                    width={295}
                    height={56}
                />
            </div>
            <div className="legal-text">
            <p>Il gioco e vietato ai minori e puo causare dipendenza patologica - probabilita di vincita</p>
            </div>
        </MainContainer>
    </Fragment>

const MainContainer = styled.div`
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: auto;
    background-image: linear-gradient(180deg, ${({theme}) => theme.colors.backGround} 0%, ${({theme}) => theme.colors.gradient} 50%);
    display: flex;
    flex-direction: center;
    align-items: inherit;
    flex-wrap: inherit;
    justify-content: center;
    z-index: 100;

    .legal-image {
        width: 120px;
        margin: 10px 15px;
        
        @media ${device.mobileL} {
            width: 160px;
          }
    }

    .legal-text {
        display: inherit;
        align-items: center;
        font-size: 10px;
        p { color: ${({theme}) => theme.text.color.primary}; }
    }
`
export default LegalDisclaimer
