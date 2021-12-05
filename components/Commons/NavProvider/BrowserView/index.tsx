
import React, { FunctionComponent, Fragment } from 'react'
import { isMobile, deviceType } from "react-device-detect"
import { ClickAwayListener } from '@material-ui/core'
import styled from 'styled-components'
import Divider from '../../Divider'
import Routes from '../Routes'

type Props = {
    showNav: boolean
    setShowNav: Function
};

type NavProps = {
    expand: boolean
};

const NavProvider: FunctionComponent<Props> = ({showNav, setShowNav}) => {
        
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
                    <Divider color={'#fff'} />
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
    max-height: ${({expand}) => expand ? "60px" : "0px"};
    transition: max-height 0.2s ease-in-out; 
    overflow: ${({expand}) => expand ? "visible" : "hidden"};
`

export default NavProvider


