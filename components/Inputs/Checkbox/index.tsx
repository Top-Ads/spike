import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { FunctionComponent } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core'

type PageProps = {
  label?: string
}

const useStyles = makeStyles<Theme>(() =>
  createStyles({
    root: {
      '& .MuiTypography-body1': {
        fontSize: '10px',
        fontFamily: 'Montserrat-light'

      },
      '& .MuiIconButton-root': {
        color: '#fff'
      }
    }
    
  }),
);

const CheckboxInput: FunctionComponent<PageProps> = ({label}) => {

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <FormControlLabel
        value="end"
        control={<Checkbox color="secondary" />}
        label={label}
        labelPlacement="end"
      />
    </div>
  );
}

export default CheckboxInput