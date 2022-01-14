import { createStyles, InputAdornment, makeStyles, TextField, Theme } from '@material-ui/core'
import React, { Fragment, FunctionComponent, useEffect, useRef } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Clear'
import { BaseTextFieldProps } from '@material-ui/core/TextField'

const useStyles = makeStyles<Theme, Props>(() =>
  createStyles({
    root:{
      maxHeight: '100%',
      width: '100%'
    },
    textField: {
        width: ({width}) => width ? width : '100%',
        height: '100%',
        backgroundColor: "inherit",
        zIndex: ({zIndex}) => zIndex ? zIndex : 10,

        '& .MuiInputBase-root': {
            backgroundColor: '#fff',
            color: '#212530',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: ({borderRadius}) => borderRadius ? borderRadius: '10px',
            height: '100%'
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

type Props = {
  size?: BaseTextFieldProps['size'],
  searchIcon?: boolean
  placeholder?: string
  handleOnFocus?: Function
  handleOnBlur?: Function
  width?: string
  autoFocus?: boolean
  zIndex? :number
  borderRadius?: string
  onChange: Function
  value?: string
  clearField?: boolean

}

const CustomTextField: FunctionComponent<Props> = (props) => {

    const {size='medium', searchIcon=false, placeholder, handleOnFocus, handleOnBlur, autoFocus=false, onChange, clearField, value=''} = props

    const classes = useStyles(props)
    
    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault()
      onChange(event.target.value)
    }

    const handleClearField = () => {
      if (inputRef.current !== null && onChange) {
        inputRef.current.value = ''
        onChange('')
      }
    }

    useEffect( () => {
      if (clearField)
        handleClearField()
    }, [clearField])

    return (
        <Fragment>
            <form noValidate className={classes.root}>
                <TextField 
                    inputRef={inputRef}
                    autoFocus={autoFocus ? autoFocus : false}
                    className={classes.textField}
                    size={size}
                    variant="outlined"
                    placeholder={placeholder ? placeholder : '' }
                    value={value}
                    onChange={handleChange}
                    onFocus={ () => handleOnFocus ? handleOnFocus() : ''}
                    onBlur={ () => handleOnBlur ? handleOnBlur() : ''}
                    InputProps={searchIcon ? {
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon fontSize={'default'} color='inherit'/>
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <ClearIcon onClick={handleClearField} fontSize={'default'} color='inherit' style={{cursor: 'pointer', visibility: value.length > 0 ? 'visible' : 'hidden'}}/> 
                          </InputAdornment>
                        )
                    } : undefined }
                />
            </form>
        </Fragment>
    ) 
}

export default CustomTextField
