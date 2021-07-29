import React from 'react'
import { FunctionComponent } from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import { ListItemIcon, ListItemText } from '@material-ui/core'
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha'
import DateRangeIcon from '@material-ui/icons/DateRange'
import ScheduleIcon from '@material-ui/icons/Schedule'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ShuffleIcon from '@material-ui/icons/Shuffle'
import { SlotFilterList } from '../../utils/constants'

const useStyles = makeStyles( () =>
  createStyles({
    root: {
      display: 'flex',
    },
    itemText: {
        width: '145px',
        color: '#e2b96d'
    },
    itemIcon: {
        minWidth: '30px',
        color: '#e2b96d'
    },
  }),
);

type PageProps = {
  itemSelected: string,
  setItemSelected: Function,
  listItems: string []
}

const CustomMenu: FunctionComponent<PageProps> = ({itemSelected, setItemSelected, listItems}) => {

  const classes = useStyles()

  const [open, setOpen] = React.useState<boolean>(false)

  const anchorRef = React.useRef<HTMLDivElement>(null)

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)


  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLDivElement)) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleSelectedItem = (item: string) => {
    setItemSelected(item)
    setOpen(false)
  }

  const renderIconForItem = (value: string) => {
        switch(value) {
            case SlotFilterList.RTP :
                return  <EqualizerIcon fontSize="small" />
            case SlotFilterList.LIKES :
                return  <ThumbUpAltIcon fontSize="small" />
            case SlotFilterList.UPDATED_AT :
                return  <ScheduleIcon fontSize="small" />
            case SlotFilterList.CREATED_AT :
                return  <DateRangeIcon fontSize="small" />
            case SlotFilterList.ALPHABETIC :
                return  <SortByAlphaIcon fontSize="small" />
            case SlotFilterList.SHUFFLE :
              return  <ShuffleIcon fontSize="small" />
        }
  }

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open])

  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
            <MenuItem>
                <ListItemIcon className={classes.itemIcon}>
                {renderIconForItem(itemSelected)}
                </ListItemIcon>
                <ListItemText className={classes.itemText} primary={itemSelected} />
            </MenuItem>

            {open ?  <ExpandMoreIcon/> : <ExpandLessIcon/> } 
        </Button>

        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      
                      {listItems.map( (item, index) => 
                        <MenuItem key={index} onClick={() => handleSelectedItem(item)}>
                           <ListItemIcon>
                               {renderIconForItem(item)}
                           </ListItemIcon>
                           <ListItemText primary={`${item.charAt(0).toUpperCase()}${item.slice(1)}`} />
                       </MenuItem>
                      )}

                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

const Button = styled.div`
    background-color: #fff;
    border: 1px solid ${({theme}) => theme.palette.background};
    color: ${({theme}) => theme.text.color.black};
    border-radius: ${({theme}) => theme.button.borderRadius};
    font-weight: normal;
    cursor: pointer;
    text-transform: uppercase;
    margin: auto 0;
    display: flex;
    align-items: center;
`

export default CustomMenu