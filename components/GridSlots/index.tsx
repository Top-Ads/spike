import React, { FunctionComponent } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid, { GridSize, GridSpacing } from '@material-ui/core/Grid'
import Divider from '../Divider'
import styled from 'styled-components'
import RankingCard from '../Cards/RankingCard'
import { GridType } from '../../utils/constants'

const useStyles = makeStyles<Theme, PageProps>(() =>
  createStyles({
    root: {
      flexGrow: 1,
      width: ({width}) => width ? width : 'fill-available',
      margin: '10px 10px',

      ['@media (max-width: 425px)']: {
        '& .MuiGrid-container' : {
          width: ({type}) => type === GridType.SLOTS ? '90vw': 'auto',
          flexWrap: ({type}) => type === GridType.BONUS ? 'nowrap': 'wrap',
          overflowX: ({type}) => type === GridType.BONUS ? 'scroll': 'unset',
          padding: '5px'
        }
      }
    },
    paper: {
      padding: '0px',
      textAlign: ({textAlign}) => textAlign ? 'left' : 'center',
      fontWeight: 'bold',
      color: "#fff",
      height: 'auto',
      borderRadius: ({disableBorderRadius}) => disableBorderRadius ? '0px' : '8px',
      boxShadow: ({disableBoxShadow}) => disableBoxShadow ? 'none' : 'auto',
      backgroundColor: ({bgColor}) => bgColor ? bgColor : '#ff1313',
      position: 'relative',
      ['@media (max-width: 425px)']: {
        width: ({type}) => type === GridType.BONUS ? '80vw': 'auto'
      }
    }
  }),
);

type PageProps = {
    type: GridType,
    content: JSX.Element[],
    label?: string,
    xs: GridSize,
    sm: GridSize,
    md: GridSize,
    width?: string,
    AlignItem?: string,
    textAlign?: string,
    showIndex?: boolean,
    reversedList?: boolean,
    disableBorderRadius?: boolean,
    disableBoxShadow?: boolean,
    bgColor?: string,
    spacing?: GridSpacing
}

type LabelType = {
  align?: string
}

const GridSlots: FunctionComponent<PageProps> = (props) => {

  const {content, label, xs, sm, md, AlignItem, showIndex, reversedList, spacing} = props;

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
                        <RankingCard index={ reversedList ? (content.length-index) : (index+1) } />
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
