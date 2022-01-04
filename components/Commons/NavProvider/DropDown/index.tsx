import React, { FunctionComponent } from 'react'
import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { device } from '../../../../lib/utils/device'
import { useRouter } from 'next/router'
import {isMobile} from 'react-device-detect'

type Props = {
   header: string
   children: React.ReactNode
   slug?: string
};

type ButtonProps = {
    active?: boolean
}

type MenuProps = {
    show?: boolean
}

const DropDown: FunctionComponent<Props> = ({header, children, slug}) => {

    const router = useRouter()

    const [show, setShow] = useState<boolean>(false)

    useEffect( () => {
        isMobile && setShow(router.pathname.includes(`${slug}`)) 
    }, [])

    return (
        <Fragment>
            <div className="dropdown" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
                <Link passHref href={`/${slug}`}>
                    <a><Button 
                        onClick={(event: React.SyntheticEvent) => {
                            if (slug === 'live-stats') {
                                event.preventDefault()
                            }   
                            setShow(!show)
                           
                           
                        }} 
                        className={'dropdown-menu'}>
                            {header}
                            <ExpandMoreIcon fontSize={'small'} />
                    </Button></a>
                </Link>

                <DropDownMenu show={show}>
                        {children}
                </DropDownMenu>
            </div>
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

const DropDownMenu = styled.div<MenuProps>`
    position: absolute;
    z-index: 999;
    height: auto; 
    max-height: ${({show}) => show ?  '300px' : 0};
    transition: max-height 0.2s ease-in-out;
    overflow: hidden;

    @media ${device.mobileL} { 
        position: relative;
    }
`

export default DropDown
