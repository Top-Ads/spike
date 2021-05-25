import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { FunctionComponent } from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 60,
    }
  }),
);

const CustumSelect: FunctionComponent = () => {
  const classes = useStyles();

  const intervalTime: string[] = ['1h', '24h']

  const [time, setTime] = React.useState('24h');


  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTime(event.target.value as string);
  };

  return (
    <div>  
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Time
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={time}
          onChange={handleChange}
        >
         { intervalTime.map((value, index) => <MenuItem key={index} value={value}>{value}</MenuItem>)}
        
        </Select>
      </FormControl>
    </div>
  );
}

export default CustumSelect