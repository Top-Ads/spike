import React, { Fragment, FunctionComponent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { animateScroll as scroll } from "react-scroll"

type ScrollType = {
    show: boolean
}
const ScrollButton: FunctionComponent = () => { 
   
    const offsetY = 1000

    const [show, setShow] = useState<boolean>(false)

    const handleScroll = () => {
        window.scrollY >= offsetY ? setShow(true) : setShow(false)  
    };

    useEffect( () => {
        window.addEventListener('scroll', handleScroll, true)

        return () => window.removeEventListener('scroll', handleScroll, true)
    }, [])

    return (
        <Fragment>
            <Main show={show} onClick={ () => scroll.scrollToTop()}/>
        </Fragment>
    ) 
}

const Main = styled.div<ScrollType>`
    position: fixed;
    bottom: ${({show}) => show ? '62px' : '-62px'};
    right: 10px;
    background: ${({theme}) => theme.palette.gradient};
    width: 50px;
    height: 50px;
    box-shadow: 0px 0px 5px 5px rgba(33,37,41,0.4);
    display: flex;
    border-radius: 100px;
    cursor: pointer;
    z-index: 99;
    transition: bottom .2s ease-in-out,opacity .2s ease-in-out;

    &::after {
        content: "";
        padding: 0;
        display: inline-block;
        border-top: 4px solid #fff;
        border-right: 4px solid #fff;
        width: 10px;
        height: 10px;
        transform: rotate(315deg);
        margin: auto;
        margin-top: 20px;
    }
`

export default ScrollButton
