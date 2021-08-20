import React, { FunctionComponent, Fragment } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Slide from '@material-ui/core/Slide'
import { TransitionProps } from '@material-ui/core/transitions'
import { createStyles, withStyles } from '@material-ui/core'
import styled from 'styled-components'
import Divider from '../../Divider'
import Routes from '../Routes'

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
      backgroundColor: 'unset'
    },
  })
)(Dialog)

type Props = {
    showNav: boolean
    setShowNav: Function
};

type NavProps = {
    expand: boolean
};

const NavProvider: FunctionComponent<Props> = ({showNav, setShowNav}) => {

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
            <Routes/>
          </Nav> 
        </DialogContent>
      </StyledDialog>
    </Fragment>
  )
}

const Nav = styled.nav<NavProps>`    
    background-color: ${({theme}) => theme.palette.background};
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

export default NavProvider



