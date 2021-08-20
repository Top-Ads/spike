import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { FunctionComponent } from 'react'
import { Producer } from '../../../lib/schemas'
import { Fragment } from 'react'
import styled from 'styled-components'
import Divider from '../../Divider'
import ProducerCard from '../../Cards/ProducerCard'
import { Button, createStyles, DialogActions, withStyles } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { device } from '../../../lib/utils/device'

type Props = {
    open: boolean
    setOpen: Function,
    data: Producer[],
    setSelected: Function
}

const StyledDialogActions = withStyles(() =>
  createStyles({
    root: {
      position: 'absolute',
      right: '0px'
    },
  })
)(DialogActions)

const DialogPopup: FunctionComponent<Props> = ({open, setOpen, data, setSelected}) => {

  let categoryIndex = data && data[0]?.name.charAt(0).toUpperCase()

  const descriptionElementRef = React.useRef<HTMLElement>(null)

  const handleSelected = (selected: string) => {
    setOpen(false)
    setSelected(selected)
  }

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open]);

  return (
    <Fragment>
      
      <Dialog
        fullWidth
        maxWidth={'sm'}
        open={open}
        onClose={() => setOpen(false)}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >

        <StyledDialogActions>
          <Button onClick={() => setOpen(false)} color="default">
            <CloseIcon/>
          </Button>
        </StyledDialogActions>

        <DialogTitle id="scroll-dialog-title">
          <b>Providers ({data.length})</b>
        </DialogTitle>
        
        <DialogContent dividers={true}>
        <Main>
          <CategoryList>
            <h4>[0-9]</h4>
            <Divider/>
          </CategoryList>

          { data?.map( (producer: Producer, index: number) => 

            <Fragment key={index}>
              { producer.name.charAt(0).toUpperCase() ===  categoryIndex ?  '' :
                <CategoryList>
                  <h4>{ categoryIndex = producer.name.charAt(0).toUpperCase() && producer.name.charAt(0).toUpperCase()}</h4>
                  <Divider/>
                </CategoryList>
              }
              <Card>
                <ProducerCard data={producer} setSelected={handleSelected}/>
              </Card>
            </Fragment>
          
          )}
          </Main>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

const Main = styled.div `
 display: flex;
 flex-wrap: wrap;
`

const CategoryList = styled.div `
  width: 100%;
`

const Card = styled.div `
  width: 220px;
  margin: 5px;

  @media ${device.mobileL} {
    flex-grow: 1;
  }
`


export default DialogPopup