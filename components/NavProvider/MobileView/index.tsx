import React, { FunctionComponent, Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Slide from '@material-ui/core/Slide'
import { TransitionProps } from '@material-ui/core/transitions'
import { createStyles, withStyles } from '@material-ui/core'
import styled from 'styled-components'
import Divider from '../../Divider'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) { return <Slide direction="right" ref={ref} {...props} />; });

const StyledDialog = withStyles(() =>
  createStyles({
    paper: {
      height: '99.8%',
      margin: '0',
      maxWidth: '100%',
      maxHeight: 'none',
      borderRadius: '0',
      backgroundColor: 'unset',
      position: 'fixed',
    },
  })
)(Dialog)

type PageProps = {
    showNav: boolean
    setShowNav: Function
};

type NavProps = {
    expand: boolean
};

const NavProvider: FunctionComponent<PageProps> = ({showNav, setShowNav}) => {

  const router = useRouter()

  return (
    <Fragment>
    <StyledDialog 
      open={showNav}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setShowNav(false)}>
      
      <DialogContent>
        <Nav expand={showNav}>
            <Title>BENVENUTO</Title>

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
      </DialogContent>
    </StyledDialog>
  </Fragment>
  )
}
const Nav = styled.nav<NavProps>`    

    background-color: ${({theme}) => theme.colors.background};
    color: white;
    position: fixed;
    top: 0;
    left: 0px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 80%;
    height: 100%;
    overflow: hidden;

    span {
        color: white;
        font-weight: bold;
        text-transform: none;
        font-size: initial;
        margin: 0px 10px;
    }
`

const Title = styled.h2`
    width: 100%;
    display: flex;
    justify-content: center;
`

const Button = styled.div`
    color: ${({theme}) => theme.text.color.primary};
    margin: 0px 10px;
    padding: 10px 15px;
    font-weight: bold;

    &:active,  &.active {
      color: ${({theme}) => theme.colors.background};
      background-color: #fff;
    }

`

export default NavProvider



