import { createStyles, InputAdornment, makeStyles, TextField } from '@material-ui/core'
import React, { Fragment, FunctionComponent } from 'react'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
    },
    textField: {
        width: '30ch',
        backgroundColor: "inherit",
        borderRadius: '10px',

        '& .MuiInputBase-root': {
            backgroundColor: '#fff',
            color: '#ec564f',
            fontSize: '14px',
            fontWeight: 'bold'
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 0
        },
        '& input::placeholder': {
          fontSize: '11px'
        },
        '& .MuiInputBase-input-focus': {
            color: '#000'
        },
        '& .MuiFormHelperText-root': {
          color: '#fff',
          fontSize: '0.60rem',
          textAlign: 'right'
        }
      }
  }),
);

type PageProps = {
  sm?: boolean,
  searchIcon?: boolean,
  placeholder?: string
}

const TextInput: FunctionComponent<PageProps> = ({sm, searchIcon, placeholder}) => {

    const classes = useStyles()
        
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
                    size={sm ? "small" : "medium"}
                    variant="outlined"
                    placeholder={placeholder ? placeholder : '' }
                    onChange={handleChange}
                    InputProps={searchIcon ? {
                        endAdornment: (
                          <InputAdornment position="end">
                            <SearchIcon 
                              style={{ color: '#ec564', fontSize: '30px', cursor: 'pointer'}}
                              onClick={search}/>
                          </InputAdornment>
                        )
                    } : undefined }
                />
            </form>
        </Fragment>
    ) 
}

export default TextInput
