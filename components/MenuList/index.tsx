import React from 'react'
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

const useStyles = makeStyles( () =>
  createStyles({
    root: {
      display: 'flex',

    },
    itemText: {
        width: '145px',
        color: '#ff1313'
    },
    itemIcon: {
        minWidth: '30px',
        color: '#ff1313'
    },
  }),
);

export default function MenuListComposition() {

  const listItems = ['RTP', 'Più votate', 'Aggiunte di recente', 'Data di rilascio', 'Nome']


  const classes = useStyles()

  const [open, setOpen] = React.useState<boolean>(false)
  const [itemSelected, setItemSelected] = React.useState<string>(listItems[0])

  const anchorRef = React.useRef<HTMLDivElement>(null)

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);


  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLDivElement)) {
      return
    }

    setOpen(false)
  };

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
            case 'RTP' :
                return  <EqualizerIcon fontSize="small" />
            case 'Più votate' :
                return  <ThumbUpAltIcon fontSize="small" />
            case 'Aggiunte di recente' :
                return  <ScheduleIcon fontSize="small" />
            case 'Data di rilascio' :
                return  <DateRangeIcon fontSize="small" />
            case 'Nome' :
                return  <SortByAlphaIcon fontSize="small" />
        }
  }

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  React.useEffect(() => {
    console.log('itemSelected ', itemSelected)
  }, [itemSelected]);

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
                           <ListItemText primary={item} />
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
    border: 1px solid ${({theme}) => theme.colors.background};
    color: ${({theme}) => theme.text.color.secondary};
    border-radius: ${({theme}) => theme.button.borderRadius};
    font-weight: normal;
    cursor: pointer;
    width: fit-content;
    text-transform: uppercase;
    margin: auto 0;
    display: flex;
    align-items: center;
`