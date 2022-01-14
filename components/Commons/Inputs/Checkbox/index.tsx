import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { FunctionComponent } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core'



const useStyles = makeStyles<Theme>(() =>
  createStyles({
    root: {
      '& .MuiTypography-body1': {
        fontSize: '10px',
        color: '#fff'

      },
      '& .MuiIconButton-root': {
        color: '#fff'
      }
    }
    
  }),
);

type Props = {
  label?: string
  handleOnCheck: Function
  isChecked: boolean
}

const CustomCheckbox: FunctionComponent<Props> = ({label, handleOnCheck, isChecked}) => {

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <FormControlLabel
        value="end"
        control={<Checkbox color="secondary" onChange={(e) => handleOnCheck(e)} checked={isChecked}/>}
        label={label}
        labelPlacement="end"
      />
    </div>
  );
}

export default CustomCheckbox