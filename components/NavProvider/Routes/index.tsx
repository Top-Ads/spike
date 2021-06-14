
import React, { FunctionComponent, Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { device } from '../../../utils/device'

const Routes: FunctionComponent = () => {
    
    const router = useRouter()

    return (
        <Fragment>
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
        </Fragment>
    )
} 

const Button = styled.div`
    color: ${({theme}) => theme.text.color.primary};
    margin: 0px 10px;
    padding: 10px 15px;
    font-weight: bold;

    &:hover, &.active {
      color: ${({theme}) => theme.colors.background};
      background-color: #fff;
    }

    @media ${device.tablet} {
        &:hover{
            color: revert;
            background-color: revert;
        }

        &:active {
            color: ${({theme}) => theme.colors.background};
            background-color: #fff;
        }
    }
`

export default Routes


