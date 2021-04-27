import React, { FunctionComponent } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid, { GridSize, GridSpacing } from '@material-ui/core/Grid'
import Divider from '../Divider'
import styled from 'styled-components'
import RankingCard from '../Cards/RankingCard'

const useStyles = makeStyles<Theme, PageProps>(() =>
  createStyles({
    root: {
      flexGrow: 1,
      width: ({width}) => width ? width : 'fill-available',
      margin: '10px 10px',

      '& .MuiGrid-container' : {
        flexWrap: ({noWrap}) => noWrap ? 'nowrap' : 'wrap',
        overflowX:  ({noWrap}) => noWrap ? 'scroll' : 'unset'
      }
    },
    paper: {
      width: ({noWrap}) => noWrap ? '275px' : 'auto',
      padding: '0px',
      textAlign: ({textAlign}) => textAlign ? 'left' : 'center',
      fontWeight: 'bold',
      color: "#fff",
      height: 'auto',
      borderRadius: ({disableBorderRadius}) => disableBorderRadius ? '0px' : '8px',
      boxShadow: ({disableBoxShadow}) => disableBoxShadow ? 'none' : 'auto',
      backgroundColor: ({bgColor}) => bgColor ? bgColor : '#ff1313',
      position: 'relative'
    }
  }),
);

type PageProps = {
    content: JSX.Element[],
    label?: string,
    width?: string,
    xs: GridSize,
    sm: GridSize,
    md: GridSize,
    AlignItem?: string,
    showIndex?: boolean,
    disableBorderRadius?: boolean,
    disableBoxShadow?: boolean,
    textAlign?: string,
    bgColor?: string,
    spacing?: GridSpacing,
    noWrap?: boolean,
    reversed?: boolean
  }

type LabelType = {
  align?: string
}

const GridSlots: FunctionComponent<PageProps> = (props) => {

  const {content, label, xs, sm, md, AlignItem, showIndex, spacing, reversed} = props;

  const classes = useStyles(props)

  return (
    <div className={classes.root}>
        <Label align={AlignItem}>
            {label}
            { label ? <Divider/> : '' }
        </Label>

        <Grid container item spacing={spacing === undefined ? 2 : spacing}>
          {content.map((child: JSX.Element, index: number) => 
             <Grid item xs={xs} sm={sm} md={md} key={index}>
                <Paper className={classes.paper}>
                    {showIndex ? 
                      <div style={{position: 'absolute', top: '-10px', right: '0px'}}>
                        <RankingCard index={ reversed ? (content.length-index) : (index+1) } />
                      </div> : '' }
                    {child}
                </Paper>
            </Grid>
          )}
        </Grid>
    </div>
  );
}

const Label = styled.div<LabelType>`
  text-align: ${({align}) => align ? align : 'unset'};
  font-weight: bold;
  margin-bottom: 20px;
`
export default GridSlots
