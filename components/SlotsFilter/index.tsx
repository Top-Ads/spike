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
import EqualizerIcon from '@material-ui/icons/Equalizer'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ShuffleIcon from '@material-ui/icons/Shuffle'
import { SlotFilterList } from '../../lib/utils/constants'


const useStyles = makeStyles( () =>
  createStyles({
    root: {
      display: 'flex',
      height: 'inherit',
      width: '270px'
    },
    itemText: {
        width: '145px',
        color: '#e2b96d'
    },
    listItemText: {
      '& span': {
        fontSize: '0.95rem'
      }
    },
    itemIcon: {
        minWidth: '30px',
        color: '#e2b96d',
    },
    menuItem: {
      height: '40px',
      width: 'inherit'
    },
    menuList: {
      width: '270px',
      marginTop: '1px'
    }
  }),
);

type Props = {
  itemSelected: string,
  setItemSelected: Function,
  listItems: string []
}

const SlotsFilter: FunctionComponent<Props> = ({itemSelected, setItemSelected, listItems}) => {

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
            case SlotFilterList.UPDATED_AT :
                return  <ScheduleIcon fontSize="small" />
            case SlotFilterList.CREATED_AT :
                return  <DateRangeIcon fontSize="small" />
            case SlotFilterList.NAME :
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
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
            <MenuItem className={classes.menuItem}>
                <ListItemIcon className={classes.itemIcon}>
                {renderIconForItem(itemSelected)}
                </ListItemIcon>
                <ListItemText className={classes.itemText} primary={itemSelected} />
            </MenuItem>

            {open ?  <ExpandMoreIcon/> : <ExpandLessIcon/> } 
        </Button>

        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal placement="bottom-start">
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'bottom left' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList className={classes.menuList} autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      
                      {listItems.map( (item, index) => 
                      <MenuItem key={index} onClick={() => handleSelectedItem(item)}>
                          <ListItemIcon className={classes.itemIcon}>
                              {renderIconForItem(item)}
                          </ListItemIcon>
                          <ListItemText className={classes.listItemText} primary={`${item}`} />
                      </MenuItem>    
                      )}

                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
  );
}

const Button = styled.div`
    background-color: #fff;
    border: 1px solid ${({theme}) => theme.palette.background};
    color: ${({theme}) => theme.text.color.black};
    border-radius: 5px 0px 0px 5px;
    font-weight: normal;
    cursor: pointer;
    text-transform: uppercase;
    margin: auto 0;
    display: flex;
    align-items: center;
    height: inherit;
    width: 270px;
`

export default SlotsFilter