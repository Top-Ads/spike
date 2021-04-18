import React, { FunctionComponent } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid, { GridSize } from '@material-ui/core/Grid'
import Divider from '../Divider'
import styled from 'styled-components'
import RankingCard from '../Cards/RankingCard'

const useStyles = makeStyles<Theme, PageProps>(() =>
  createStyles({
    root: {
      flexGrow: 1,
      width: ({width}) => width ? width : '400px',
      margin: '10px 10px'
    },
    paper: {
      padding: '0px',
      textAlign: ({textAlign}) => textAlign ? 'left' : 'center',
      fontWeight: 'bold',
      color: "#fff",
      height: 'auto',
      borderRadius: ({disableBorderRadius}) => disableBorderRadius ? '0px' : '8px',
      boxShadow: ({disableBoxShadow}) => disableBoxShadow ? 'none' : 'auto',
      backgroundColor: '#ff1313',
      position: 'relative'
    }
  }),
);

type PageProps = {
    data: any,
    label?: string,
    width?: string,
    xs: GridSize,
    sm: GridSize,
    md: GridSize,
    AlignItem?: string,
    showIndex?: boolean,
    disableBorderRadius?: boolean,
    disableBoxShadow?: boolean,
    textAlign?: string
  }

type LabelContainerType = {
  align?: string
}

const GridSlots: FunctionComponent<PageProps> = (props) => {

  const {data, label, xs, sm, md, AlignItem, showIndex} = props;

  const classes = useStyles(props)

  return (
    <div className={classes.root}>
        <LabelContainer align={AlignItem}>
            {label}
            { label ? <Divider/> : '' }
        </LabelContainer>

        <Grid container item spacing={2}>
          {data.map((value: [], index: number) => 
             <Grid item xs={xs} sm={sm} md={md} key={index}>
                <Paper className={classes.paper}>
                    {showIndex ? 
                      <div style={{position: 'absolute', top: '-10px', right: '0px'}}>
                        <RankingCard index={index+1} />
                      </div> : '' }
                    {value}
                </Paper>
            </Grid>
          )}
        </Grid>
    </div>
  );
}

const LabelContainer = styled.div<LabelContainerType>`
  text-align: ${({align}) => align ? align : 'unset'};
  font-weight: bold;
  margin-bottom: 20px;
`
export default GridSlots
