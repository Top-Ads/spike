import { ClickAwayListener } from '@material-ui/core'
import Link from 'next/link';
import React, { FunctionComponent } from 'react'
import { Fragment } from 'react'
import styled from 'styled-components'
import { device } from '../../utils/device'
import Divider from '../Divider'
import { isMobile, deviceType } from "react-device-detect"

type PageProps = {
    showNav: boolean
    setShowNav: Function
};

type NavProps = {
    expand: boolean
};

const NavProvider: FunctionComponent<PageProps> = ({showNav, setShowNav}) => {
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
                    <Title>BENVENUTO</Title>
                    <Divider color={'#fff'}/>

                    <Link href={'/'}>
                        <a><Button>Home</Button></a>
                    </Link>

                    <Link href={'/comparator'}>
                        <a><Button>Comparator</Button></a>
                    </Link>

                    <Link href={'/giochi'}>
                        <a><Button>Giochi</Button></a>
                    </Link>

                    <Link href={'/squad'}>
                        <a><Button>Squad</Button></a>
                    </Link>

                    <Link href={'/shop'}>
                        <a><Button>Shop</Button></a>
                    </Link>

                    <Link href={'/live-stats/crazy-time'}>
                        <a><Button>Live Stats</Button></a>
                    </Link>
                </Nav> 

            </ClickAwayListener>
            
        </Fragment>
    )
} 

const Title = styled.h2`
    width: 100%;
    display: none;

    @media ${device.mobileL} {
        display: flex;
        justify-content: center;
    }
`

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

    @media ${device.mobileL} {
        background-color: ${({theme}) => theme.colors.background};
        position: fixed;
        top: 0;
        left: ${({expand}) => expand ? "0px" : "-80%"};

        display: inherit;
        flex-direction: column;
        align-items: flex-start;
        width: 80%;
        height: 100%;
        max-height: 100%;
        transition: left 0.2s linear;
        overflow: hidden;
  }
`

const Button = styled.div`
    color: ${({theme}) => theme.text.color.primary};
    margin: 0px 10px;
    padding: 10px 15px;
    font-weight: bold;

    &:hover {
      color: ${({theme}) => theme.colors.background};
      background-color: #fff;
    }
`

export default NavProvider


