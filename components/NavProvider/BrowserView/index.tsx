
import React, { FunctionComponent, Fragment } from 'react'
import { isMobile, deviceType } from "react-device-detect"
import { ClickAwayListener } from '@material-ui/core'
import styled from 'styled-components'
import Divider from '../../Divider'
import Routes from '../Routes'

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
                    <Divider color={'#fff'}/>
                    <Routes/>
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

export default NavProvider


