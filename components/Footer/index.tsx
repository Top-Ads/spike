import React, { FunctionComponent, Fragment } from 'react'
import styled from 'styled-components'
import Divider from '../Divider'
import { device } from '../../lib/utils/device'
import Link from 'next/link'

const Footer: FunctionComponent = () => {
    return (
        <Fragment>
            <Main>
                <Container>
                    <List>
                        <strong>slots</strong>
                        <Link href={'/giochi'}>
                            <a>Giochi</a>
                        </Link>
                        <Link href={'/comparator'}>
                            <a>Comparator</a>
                        </Link>
                        <a href={'https://casino-squad.com/shop/'}>Shop</a>
                    </List>
                    <List>
                        <strong>bonuses</strong>
                        <a>Nuovi Casinò Online</a>
                        <a>Casinò in Italia</a>
                        <a>Casinò AAMS – ADM</a>
                        <a>Casinò Sicuri</a>
                        <a>Casinò Online Italiani</a>
                    </List>
                    <List>
                        <strong>casino games</strong>
                        <a>Roulette</a>
                        <a>Blackjack</a>
                        <a>Live – Dal Vivoò</a>
                    </List>
                    <List>
                        <strong>Social Networks</strong>
                        <a href="https://discord.gg/eXxhPXWHmY">Discord</a>
                        <a href="https://www.facebook.com/casinosquad">Facebook</a>
                        <a href="https://www.instagram.com/casino.squad.team/">Instagram</a>
                        <a href="https://t.me/casino_squad">Telegram</a>
                        <a href="https://www.youtube.com/channel/UClcCLY3FE_pGY20jlxjc8gw">YouTube</a>
                    </List>
                    <List>
                    <strong>contacts</strong>
                    <a>info@casinosquad.com</a>
                </List>
                </Container>
                
                <Divider color="#f2f2f2"/>

            </Main>

        </Fragment>
    )
} 

const Main = styled.div`
    background-color: ${({theme}) => theme.palette.background};
    color: #fff;
    display: flex;
    flex-direction: column;
    margin-bottom: 33px;
    padding: 5px;

    @media ${device.tablet} {
        margin-bottom: 44px;
    }

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
        margin: 3px;
        text-align: left;
        color: inherit;
    }
`

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
    padding: 20px;    

    @media ${device.tablet} {
        justify-content: space-between;
    }
`

const List = styled.div`
    display: inherit;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    @media ${device.tablet} {
        margin-right: 10px;
    }

    @media ${device.mobileL} {
        width: 50%;
        flex-grow: 1;
        margin-right: 0px;
    }
`

export default Footer
