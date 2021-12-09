
import React, { FunctionComponent, Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { device } from '../../../../lib/utils/device'
import { useState } from 'react'
import { useEffect } from 'react'
import {isMobile} from 'react-device-detect'
import DropDown from '../DropDown'

type ButtonProps = {
    active?: boolean
}

export const Routes: FunctionComponent = () => {
    
    const router = useRouter()

    const [,setShow] = useState<boolean>(false)
    const [activeRoute, setActiveRoute] = useState<boolean>(false)

    useEffect( () => {
        setActiveRoute(router.pathname.includes('/live-stats/'))
        isMobile && setShow(router.pathname.includes('/live-stats/'))
    }, [])

    return (
        <Fragment>
            <Link passHref href={'/'}>
                <a><Button className={router.pathname === '/' ? 'active' : ''}>Home</Button></a>
            </Link>

            <Link passHref href={'/offerte-bonus-casino'}>
                <a><Button className={router.pathname === '/offerte-bonus-casino' ? 'active' : ''}>Offerte Bonus Casino</Button></a>
            </Link>

            <Link passHref href={'/giochi'}>
                <a><Button className={router.pathname === '/giochi' ? 'active' : ''}>Giochi</Button></a>
            </Link>

            <Link passHref href={'/squad'}>
                <a><Button className={router.pathname === '/squad' ? 'active' : ''}>Squad</Button></a>
            </Link>

            <Link passHref href={'/shop'}>
                <a><Button className={router.pathname === '/shop' ? 'active' : ''}>Shop</Button></a>
            </Link>
            
            <DropDown header="Live Stats" slug={'live-stats'}>
                <Fragment>
                    <Link passHref href={'/live-stats/crazy-time'}>
                        <a><Button active={activeRoute} className={`dropdown-link ${router.pathname === '/live-stats/crazy-time' ? 'active' : ''}`} >CrazyTime</Button></a>
                    </Link>

                    <Link passHref href={'/live-stats/monopoly'}>
                        <a><Button active={activeRoute} className={`dropdown-link ${router.pathname === '/live-stats/monopoly' ? 'active' : ''}`}>Monopoly</Button></a>
                    </Link>

                    <Link passHref href={'/live-stats/dream-catcher'}>
                        <a><Button active={activeRoute} className={`dropdown-link ${router.pathname === '/live-stats/dream-catcher' ? 'active' : ''}`}>Dream Catcher</Button></a>
                    </Link>
                </Fragment>
            </DropDown>

            <DropDown header="Blog" slug={'blog'}>
                <Fragment>
                    <Link passHref href={'/blog/info-giochi'}>
                        <a><Button active={activeRoute} className={`dropdown-link ${router.pathname === '/blog/info-giochi' ? 'active' : ''}`} >Info Giochi</Button></a>
                    </Link>

                    <Link passHref href={'/blog/strategie-di-gioco'}>
                        <a><Button active={activeRoute} className={`dropdown-link ${router.pathname === '/blog/strategie-di-gioco' ? 'active' : ''}`}>Strategie di Gioco</Button></a>
                    </Link>

                    <Link passHref href={'/blog/ultima-ora'}>
                        <a><Button active={activeRoute} className={`dropdown-link ${router.pathname === '/blog/ultima-ora' ? 'active' : ''}`}>Ultima Ora</Button></a>
                    </Link>

                    <Link passHref href={'/blog/comparazione-casino'}>
                        <a><Button active={activeRoute} className={`dropdown-link ${router.pathname === '/blog/comparazione-casino' ? 'active' : ''}`}>Comparazione Casino</Button></a>
                    </Link>

                    <Link passHref href={'/blog/dicci-la-tua'}>
                        <a><Button active={activeRoute} className={`dropdown-link ${router.pathname === '/blog/dicci-la-tua' ? 'active' : ''}`}>Dicci la tua</Button></a>
                    </Link>

                    <Link passHref href={'/blog/guide'}>
                        <a><Button active={activeRoute} className={`dropdown-link ${router.pathname === '/blog/guide' ? 'active' : ''}`}>Guide</Button></a>
                    </Link>
                </Fragment>
            </DropDown>
        </Fragment>
    )
} 

const Button = styled.div<ButtonProps>`
    color: ${({theme}) => theme.text.color.white};
    margin: 0px 10px;
    padding: 10px 15px;
    
    &.active:not(#dropdown-menu, .dropdown-link) {
        background-color: #fff;
        color: ${({theme}) => theme.palette.background}; 
    }

    &:hover:not(#dropdown-menu, .dropdown-link) { 
        background-color: #fff;
        color: ${({theme}) => theme.palette.background};

        @media ${device.tablet} { 
            color: #fff;
            background-color: ${({theme}) => theme.palette.background}; 
        }
    }

    &.dropdown-menu {
        width: auto;
        display: flex;
        align-items: center;
        flex-direction: row;

        &.active {
            background-color: #fff;
            color: ${({theme}) => theme.palette.background}; 
        }

        @media ${device.tablet} {
            &.active {
                background-color: ${({theme}) => theme.palette.background}; 
                color: #fff;
            }
        }
    }

    &.dropdown-link {
        width: auto;
        text-align: left;
        color: #fff; 
        background-color: ${({theme}) => theme.palette.background};

        &.active { 
            background-color: #fff;
            color: ${({theme}) => theme.palette.background};  
        }

        &:hover:not(.active) { 
            background-color: #cda65f;
        }

        @media ${device.tablet} {
            background-color: ${({theme}) => theme.palette.background};

            &.active {
                background-color: #fff;
                color: ${({theme}) => theme.palette.background};  
            }

            &:hover:not(.active) { 
                background-color: ${({theme}) => theme.palette.background}; 
                color: #fff;
            }
        }
    }


    @media ${device.tablet} {
        &:hover{
            color: revert;
            background-color: revert;
        }

        &:active {
            color: ${({theme}) => theme.palette.background};
            background-color: #fff;
        }
    }
`

export default Routes