import React, { FunctionComponent } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid, { GridSize } from '@material-ui/core/Grid'
import Divider from '../Divider'
import styled from 'styled-components'

const useStyles = makeStyles<Theme, PageProps>((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: ({width}) => width ? width : '400px;',
      margin: '10px 10px;'
    },
    paper: {
      padding: '12px',
      textAlign: ({textAlign}) => textAlign ? 'left' : 'center',
      fontWeight: 'bold',
      color: "#fff",
      height:  ({height}) => height ? height : 'min-content;',
      position: 'relative',
      borderRadius: ({disableBorderRadius}) => disableBorderRadius ? '0px;' : '4px;',
      boxShadow: ({disableBoxShadow}) => disableBoxShadow ? 'none;' : 'auto;',
      backgroundColor: '#ff1313',
      '& .slot-index': {
        top: '-10px',
        right: '0px',
        position: 'absolute',
        fontSize: '22px',
        border: '2px solid #ff1313',
        color: '#ff1313',
        backgroundColor: '#fff',
        borderRadius: '69px',
        width: '30px',
        height: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }
  }),
);

type PageProps = {
    data?: string[],
    label?: string,
    width?: string,
    height?: string, 
    row: number,
    column: number,
    xs: GridSize,
    sm: GridSize,
    md: GridSize,
    labelAlign?: string,
    showIndex?: boolean,
    disableBorderRadius?: boolean,
    disableBoxShadow?: boolean,
    textAlign?: string,
    padding?: boolean
}

type LabelContainerType = {
  align?: string
}

const GridSlots: FunctionComponent<PageProps> = (props) => {

  const {data, label, row, column, xs, sm, md, labelAlign, showIndex} = props;

  const classes = useStyles(props)

  let index: number = 1
  
  const FormRow = () => 
    <React.Fragment>
      {[...Array(row)].map( () =>
        <Grid item xs={xs} sm={sm} md={md} key={index}>
            <Paper className={classes.paper}>
                {showIndex ? 
                  <div className="slot-index">
                    {index}
                  </div> 
                  : '' }
                { data && data[index-1] ? data[index-1]  : `EMPTYCARD` }
                <div style={{display: 'none'}}>{index++}</div>
            </Paper>
        </Grid>
      )}
    </React.Fragment>

  return (
    <div className={classes.root}>
        <LabelContainer align={labelAlign}>
            {label}
            {label ? <Divider marginBottom="25px"/> : ''}
        </LabelContainer>

        <Grid container item spacing={2}>
          {[...Array(column)].map((value:any, index: number) => <FormRow key={index}/> )}
        </Grid>
    </div>
  );
}

const LabelContainer = styled.div<LabelContainerType>`
  text-align: ${({align}) => align ? align : 'unset'};
`
export default GridSlots
