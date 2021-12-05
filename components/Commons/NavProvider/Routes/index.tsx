
import React, { FunctionComponent, Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { device } from '../../../../lib/utils/device'
import { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useEffect } from 'react'
import {isMobile} from 'react-device-detect'

type ButtonProps = {
    active?: boolean
}

type MenuProps = {
    show?: boolean
}

const Routes: FunctionComponent = () => {
    
    const router = useRouter()

    const [show, setShow] = useState<boolean>(false)
    const [activeRoute, setActiveRoute] = useState<boolean>(false)

    useEffect( () => {
        setActiveRoute(router.pathname.includes('/live-stats/'))
        isMobile && setShow(router.pathname.includes('/live-stats/'))
    }, [])

    return (
        <Fragment>
            <Link href={'/'}>
                <a><Button className={router.pathname === '/' ? 'active' : ''}>Home</Button></a>
            </Link>

            <Link href={'/offerte-bonus-casino'}>
                <a><Button className={router.pathname === '/offerte-bonus-casino' ? 'active' : ''}>Offerte Bonus Casino</Button></a>
            </Link>

            <Link href={'/giochi'}>
                <a><Button className={router.pathname === '/giochi' ? 'active' : ''}>Giochi</Button></a>
            </Link>

            <Link href={'/squad'}>
                <a><Button className={router.pathname === '/squad' ? 'active' : ''}>Squad</Button></a>
            </Link>

            <Link href={'/shop'}>
                <a><Button className={router.pathname === '/shop' ? 'active' : ''}>Shop</Button></a>
            </Link>
            
            <div className="dropdown" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
                <a><Button 
                    onClick={() => setShow(!show)} 
                    id="dropdown-menu" 
                    className={activeRoute || show ? 'active' : ''}>
                            Live Stats
                            <ExpandMoreIcon fontSize={'small'} />
                </Button></a>
                
                <DropDownMenu show={show}>
                        <Link href={'/live-stats/crazy-time'}>
                            <a><Button active={activeRoute} className={`dropdown-link ${router.pathname === '/live-stats/crazy-time' ? 'active' : ''}`} >CrazyTime</Button></a>
                        </Link>

                        <Link href={'/live-stats/monopoly'}>
                            <a><Button active={activeRoute} className={`dropdown-link ${router.pathname === '/live-stats/monopoly' ? 'active' : ''}`}>Monopoly</Button></a>
                        </Link>

                        <Link href={'/live-stats/dream-catcher'}>
                            <a><Button active={activeRoute} className={`dropdown-link ${router.pathname === '/live-stats/dream-catcher' ? 'active' : ''}`}>Dream Catcher</Button></a>
                        </Link>
                </DropDownMenu>
            </div>

            <Link href={'/blog'}>
                <a><Button className={router.pathname === '/blog' ? 'active' : ''}>Blog</Button></a>
            </Link>
           
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

    &#dropdown-menu {
        width: 100px;
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
        width: 100px;
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

const DropDownMenu = styled.div<MenuProps>`
    position: absolute;
    z-index: 999;
    height: auto; 
    max-height: ${({show}) => show ?  '300px' : 0};
    transition: max-height 0.2s ease-in-out;
    overflow: hidden;
`

export default Routes


