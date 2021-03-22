import { createStyles, InputAdornment, makeStyles, TextField, Theme } from '@material-ui/core'
import React, { Fragment } from 'react'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      height: '40px'
    },
    textField: {
        width: '25ch',
        backgroundColor: "white",
        borderRadius: '10px',

        '& .MuiInputBase-root': {
            color: "#ec564f",
            fontSize: "14px",
            fontStyle: "italic",
            fontWeight: "bold"
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 0
        },
        '& input::placeholder': {
          fontSize: "11px"
        }
      }
  }),
);

const TextInput = () => { 
    const classes = useStyles();
    
    const search = () => {
      console.log("SEARCH");
    }

    const handleChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault()
      console.log(event.target.value)
    }

    return (
        <Fragment>
            <form className={classes.root} noValidate>
                <TextField
                    className={classes.textField}
                    size="small"
                    variant="outlined"
                    placeholder="cerca una slot, un casino..."
                    onChange={handleChange}
                    autoFocus={true}
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <SearchIcon 
                              style={{ color: '#ec564', fontSize: '30px', cursor: 'pointer'}}
                              onClick={search}/>
                          </InputAdornment>
                        )
                    }}
                />
            </form>
        </Fragment>
    ) 
}

export default TextInput
