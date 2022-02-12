import React, { Fragment, FunctionComponent } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid, { GridSize, GridSpacing } from '@material-ui/core/Grid'
import styled from 'styled-components'
import RankingCard from '../../Cards/RankingCard'
import { GridType } from '../../../lib/utils/constants'
import { device } from '../../../lib/utils/device'

const useStyles = makeStyles<Theme, Props>(() =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: '10px',
      width: ({width, gridType}) => width ? width : gridType === GridType.SLOTS ? '45%': 'fill-available',

      [`@media ${device.tablet}`]: {
        width: ({width}) => width ? width : 'fill-available',
        '& .MuiGrid-container' : {
          flexWrap: ({gridType}) => gridType === GridType.BONUS || gridType === GridType.SLOTS ? 'nowrap' : 'wrap',
          overflowX: ({gridType}) => gridType === GridType.BONUS || gridType ===  GridType.SLOTS ? 'scroll': 'unset',
          padding: '5px 0px'
        }
      }
    },
    paper: {
      position: 'relative',
      margin: '0 auto',
      padding: '0px',
      textAlign: ({textAlign}) => textAlign ? 'left' : 'center',
      fontWeight: 'bold',
      height: 'auto',
      borderRadius: ({disableBorderRadius}) => disableBorderRadius ? '0px' : '5px',
      boxShadow: ({showBoxShadow}) => showBoxShadow ? 'auto' : 'none',
      backgroundColor: ({bgColor}) => bgColor ? bgColor : 'transparent',

      [`@media ${device.tablet}`]: {
        width: ({gridType}) => {
          if (gridType === GridType.TOPBONUS)
           return '30vw'
          else if (gridType === GridType.SLOTS)
            return '25vw'
          else
            return 'unset'
        },
      },
      
      [`@media ${device.mobileL}`]: {
        width: ({gridType}) => { 
            if (gridType ===  GridType.BONUS || gridType === GridType.TOPBONUS) 
              return '80vw'
            else if (gridType ===  GridType.SLOTS) 
              return '50vw'
            else return 'auto'
        },
      }
    }
  }),
);

type Props = {
    gridType: GridType
    content: JSX.Element[]
    label?: string
    xs: GridSize
    sm: GridSize
    md: GridSize
    width?: string
    AlignItem?: string
    textAlign?: string
    showIndex?: boolean
    disableBorderRadius?: boolean
    showBoxShadow?: boolean
    bgColor?: string
    spacing?: GridSpacing
}

type HeadType = {
  align?: string
  gridType?: GridType
}

const GridLayout: FunctionComponent<Props> = (props) => {

  const {gridType, content, label, xs, sm, md, AlignItem, showIndex=false, spacing=2} = props;

  const classes = useStyles(props)

  return (
    <div className={classes.root}>
       { label && 
          <Head align={AlignItem} gridType={gridType}>
              <Fragment>
                <h2>{ label }</h2>
              </Fragment>    
          </Head>
         }

        <Grid container item spacing={spacing}>
          {content.map((child: JSX.Element, index: number) => 
             <Grid item xs={xs} sm={sm} md={md} key={index}>
                <Paper className={classes.paper}>

                  { showIndex && 
                    <div style={{position: 'absolute', top: '-10px', right: '0px'}}>
                      <RankingCard index={index+1} />
                    </div> 
                  }
                  
                  {child}

                </Paper>
            </Grid>
          )}
        </Grid>
    </div>
  );
}

const Head = styled.div<HeadType>`
  text-align: ${({align}) => align ? align : 'unset'};
  font-weight: bold;
  margin-bottom: 15px;
  border-bottom: 3px solid ${({theme, gridType}) => gridType === GridType.TOPBONUS ? '#f2f2f2' : theme.palette.background };;
  display: flex;
  justify-content: ${({gridType}) => gridType === GridType.TOPBONUS ? 'center' : 'flex-start' };

  h2 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
    text-transform: uppercase;
    color: ${({theme, gridType}) => gridType === GridType.TOPBONUS ? theme.palette.background : '#f2f2f2' };
    font-size: 1rem;
    margin: 0;
    padding: 3px 5px;
    border: ${({theme, gridType}) => gridType === GridType.TOPBONUS ? '' : `3px solid ${theme.palette.background}` };
    width: fit-content;
    margin-bottom: -3px;
    background-color: ${({theme, gridType}) => gridType === GridType.TOPBONUS ? '#f2f2f2' : theme.palette.background };
    border-top-right-radius: 5px;
    border-top-left-radius: ${({gridType}) => gridType === GridType.TOPBONUS ? '5px' : '0px' };
  }
`

export default GridLayout
