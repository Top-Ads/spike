import React, { FunctionComponent } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid, { GridSize } from '@material-ui/core/Grid'
import Divider from '../Divider'
import styled from 'styled-components'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '400px',
      margin: '10px'
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: 'min-content',
      position: 'relative',

      '& .slot-index': {
        top: '-10px',
        right: '1px',
        position: 'absolute',
        fontSize: '22px',
        border: '2px solid #ff1313',
        color: '#ff1313',
        backgroundColor: '#fff',
        borderRadius: '69px',
        width: '32px',
        height: '32px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    },
  }),
);

type PageProps = {
    label?: string, 
    row: number,
    column: number,
    xs: GridSize,
    sm: GridSize,
    md: GridSize,
    labelAlign?: string,
    showIndex?: boolean
}

type LabelContainerType = {
  align?: string
}

const GridSlots: FunctionComponent<PageProps> = (props) => {

  const {label, row, column, xs, sm, md, labelAlign, showIndex} = props;

  const classes = useStyles()

  const FormRow = () => {
    
    return (
      <React.Fragment>
        {[...Array(row)].map((value: any, index: number) =>
          <Grid item xs={xs} sm={sm} md={md}>
             
              <Paper className={classes.paper}>
                {showIndex ? 
                  <div className="slot-index">
                    {(index+1)}
                  </div> 
                  : '' }
               
                SLOT CARD
              </Paper>
          </Grid>
        )}
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
        <LabelContainer align={labelAlign}>
            {label}
            {label ? <Divider marginBottom="25px"/> : ''}
        </LabelContainer>

        <Grid container item spacing={2}>
          {[...Array(column)].map(() =><FormRow /> )}
        </Grid>

    </div>
  );
}

const LabelContainer = styled.div<LabelContainerType>`
  text-align: ${props => props.align ? props.align : 'unset'};
`
export default GridSlots
