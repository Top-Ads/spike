import React, { FunctionComponent, Fragment } from 'react'
import styled from 'styled-components'
import Divider from '../Divider'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import YouTubeIcon from '@material-ui/icons/YouTube'
import { device } from '../../utils/device'

const Footer: FunctionComponent = () => {
    return (
        <Fragment>
            <Main>
                <Container>
                    <List>
                        <strong>slots</strong>
                        <a>Video</a>
                        <a>Giochi Slot Machine Gratis</a>
                    </List>
                    <List>
                        <strong>casinos</strong>
                        <a>Nuovi Casinò Online</a>
                        <a>Casinò in Italia</a>
                        <a>Casinò AAMS – ADM</a>
                        <a>Casinò Sicuri</a>
                        <a>Casinò Online Italiani</a>
                        <a>Siti Scommesse</a>
                        <a>Siti Ippica</a>
                    </List>
                    <List>
                        <strong>casino games</strong>
                        <a>Roulette</a>
                        <a>Blackjack</a>
                        <a>Live – Dal Vivoò</a>
                    </List>
                    <List>
                        <strong>promotion</strong>
                        <a>Bonus Casino Senza Deposito</a>
                        <a>Free Spin</a>
                        <a>Bonus Casinò</a>
                        <a>Codici bonus casinò</a>
                        <a>Bonus scommesse</a>
                    </List>
                    <List>
                    <strong>contacts</strong>
                    <a>Email</a>
                    <a>Address</a>
                </List>
                </Container>
                <Divider color="#f2f2f2"/>

                <SocialNetworks>
                    <FacebookIcon fontSize={'large'}/>
                    <InstagramIcon fontSize={'large'}/>
                    <YouTubeIcon fontSize={'large'}/>
                    <LinkedInIcon fontSize={'large'}/>
                </SocialNetworks>

            </Main>

        </Fragment>
    )
} 

const Main = styled.div`
    background-color: ${({theme}) => theme.colors.background};
    color: #fff;
    display: flex;
    flex-direction: column;
    margin-bottom: 44px;
    padding: 5px;

    strong {
        font-weight: bold;
        font-size: 17px;
        color: #fff;
        text-transform: uppercase;
        margin-bottom: 7px;

        @media ${device.mobileL} {
            margin-bottom: 7px;
            margin-top: 7px;
        }
    }

    a {
        font-size: 13px;
        margin: 3px 0px;
        text-align: left;
    }
`

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
    padding: 20px;    
`

const List = styled.div`
    display: inherit;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    @media ${device.mobileL} {
        width: 50%;
        flex-grow: 1;
    }
`

const SocialNetworks = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 5px;
`

export default Footer
