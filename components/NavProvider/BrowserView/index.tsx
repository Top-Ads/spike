
import React, { FunctionComponent, Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { isMobile, deviceType } from "react-device-detect"
import { ClickAwayListener } from '@material-ui/core'
import styled from 'styled-components'
import Divider from '../../Divider'

type PageProps = {
    showNav: boolean
    setShowNav: Function
};

type NavProps = {
    expand: boolean
};

const NavProvider: FunctionComponent<PageProps> = ({showNav, setShowNav}) => {
    
    const router = useRouter()
    
    const handleClick = () => {
        isMobile && deviceType !== 'tablet' && setShowNav(false)
    };

    return (
        <Fragment>
            <ClickAwayListener 
                mouseEvent="onClick"
                touchEvent={false} 
                onClickAway={handleClick}>

                <Nav expand={showNav}>
                    <Divider color={'#fff'}/>

                    <Link href={'/'}>
                        <a><Button className={router.pathname === '/' ? 'active' : ''}>Home</Button></a>
                    </Link>

                    <Link href={'/comparator'}>
                        <a><Button className={router.pathname === '/comparator' ? 'active' : ''}>Comparator</Button></a>
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

                    <Link href={'/live-stats/crazy-time'}>
                        <a><Button className={router.pathname === '/live-stats/crazy-time' ? 'active' : ''}>Live Stats</Button></a>
                    </Link>
                </Nav> 

            </ClickAwayListener>
            
        </Fragment>
    )
} 

const Nav = styled.nav<NavProps>`    
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    flex-grow: 0;
    justify-content: flex-start;
    height: auto;
    max-height: ${({expand}) => expand ? "120px" : "0px"};
    transition: max-height 0.2s linear; 
    overflow: ${({expand}) => expand ? "visible" : "hidden"};
`

const Button = styled.div`
    color: ${({theme}) => theme.text.color.primary};
    margin: 0px 10px;
    padding: 10px 15px;
    font-weight: bold;

    &:hover, &.active {
      color: ${({theme}) => theme.colors.background};
      background-color: #fff;
    }
`

export default NavProvider


