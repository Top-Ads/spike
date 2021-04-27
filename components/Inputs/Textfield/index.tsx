import { createStyles, InputAdornment, makeStyles, TextField, Theme } from '@material-ui/core'
import React, { Fragment, FunctionComponent } from 'react'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles<Theme, PageProps>(() =>
  createStyles({
    textField: {
        width: ({width}) => width ? width : '100%',
        backgroundColor: "inherit",
        zIndex: 100,

        '& .MuiInputBase-root': {
            backgroundColor: '#fff',
            color: '#ec564f',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '20px'
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 0
        },
        '& input::placeholder': {
          fontWeight: 'normal'
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
  placeholder?: string,
  handleOnFocus?: Function,
  handleOnBlur?: Function,
  width?: string,
  autoFocus?: boolean
}

const TextInput: FunctionComponent<PageProps> = (props) => {

    const {sm, searchIcon, placeholder, handleOnFocus, handleOnBlur, autoFocus} = props;

    const classes = useStyles(props)
        
    const search = () => {
      console.log("SEARCH ICON CLICKED");
    }

    const handleChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault()
      console.log('Onchange textfield ', event.target.value)
    }

    return (
        <Fragment>
            <form noValidate>
                <TextField 
                    autoFocus={autoFocus ? autoFocus : false}
                    className={classes.textField}
                    size={sm ? "small" : "medium"}
                    variant="outlined"
                    placeholder={placeholder ? placeholder : '' }
                    onChange={handleChange}
                    onFocus={() => handleOnFocus ? handleOnFocus() : ''}
                    onBlur={() => handleOnBlur ? handleOnBlur() : ''}
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
