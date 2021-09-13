import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import { TransitionProps } from '@material-ui/core/transitions'
import { FunctionComponent } from 'react'
import { Fragment } from 'react'
import { createStyles, withStyles } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import styled from 'styled-components'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) { return <Slide direction="left" ref={ref} {...props} />; });

const StyledDialog = withStyles(() =>
  createStyles({
    paper: {
      width: '28vw',
      height: '99.8%',
      margin: '0',
      maxWidth: '100%',
      maxHeight: 'none',
      borderRadius: '0',
      position: 'fixed',
      right: '0',
      ['@media (max-width: 768px)']: { width: '50vw' },
      ['@media (max-width: 425px)']: { width: '85vw' }
    },
  })
)(Dialog)

const StyledDialogActions = withStyles(() =>
  createStyles({
    root: {
      position: 'absolute',
      right: '0px'
    },
  })
)(DialogActions)

const StyledDialogTitle = withStyles(() =>
  createStyles({
    root: {
      textTransform: 'capitalize',
      '& .MuiTypography-root': {
        fontWeight: 'bold'
      }
    }
  })
)(DialogTitle)

type Props = {
  open: boolean
  setOpen: Function
  category: string,
  content: JSX.Element[]
};

const SliderDialog: FunctionComponent<Props> = ({open, setOpen, category, content}) => 
  <Fragment>
    <StyledDialog 
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpen(false)}>

      <StyledDialogActions>
        <Button onClick={() => setOpen(false)} color="default">
          <CloseIcon/>
        </Button>
      </StyledDialogActions>

      <StyledDialogTitle>{category} {content.length ? '(' + content.length + ')' : '' }</StyledDialogTitle>
      
      <DialogContent>
        { content.length ? 
          content.map( (child: JSX.Element, index: number) => <Fragment key={index}>{child}</Fragment> ) 
          : <EmtyContent><p> No card have been added to {category} yet.</p></EmtyContent>
        }
      </DialogContent>
    </StyledDialog>
  </Fragment>

export default SliderDialog

const EmtyContent = styled.div`
  .icon {
    font-size: 30px;
    fill: red;
  }
`
