import React, { Fragment, FunctionComponent } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid, { GridSize, GridSpacing } from '@material-ui/core/Grid'
import Divider from '../Divider'
import styled from 'styled-components'
import RankingCard from '../Cards/RankingCard'
import { GridType } from '../../utils/constants'
import Breadcrumbs from '../Breadcrumbs'

const useStyles = makeStyles<Theme, PageProps>(() =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: '5px',
      width: ({width, type}) => width ? width : type === GridType.SLOTS ? '45%;': 'fill-available',
      ['@media (max-width: 768px)']: {
        width: ({width}) => width ? width : 'fill-available',
        '& .MuiGrid-container' : {
          width: ({type}) => type === GridType.SLOTS ? '96vw': 'auto',
          flexWrap: ({type}) => type === GridType.BONUS ? 'nowrap': 'wrap',
          overflowX: ({type}) => type === GridType.BONUS ? 'scroll': 'unset',
          padding: '5px'
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
      width: ({type}) => type === GridType.TOPBONUS ? '25vw': 'unset',
      ['@media (max-width: 768px)']: {
        width: ({type}) => type === GridType.TOPBONUS ? '30vw': 'unset',
      },
      ['@media (max-width: 425px)']: {
        width: ({type}) => type ===  GridType.BONUS || type === GridType.TOPBONUS ? '80vw': 'auto',
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
    disableBorderRadius?: boolean,
    showBoxShadow?: boolean,
    bgColor?: string,
    spacing?: GridSpacing,
    breadcrumbIndex?: number
    breadcrumbSize?: number
}

type HeadType = {
  align?: string
}

const GridCards: FunctionComponent<PageProps> = (props) => {

  const {type, content, label, xs, sm, md, AlignItem, showIndex=false, spacing=2, breadcrumbIndex=0, breadcrumbSize} = props;

  const classes = useStyles(props)

  return (
    <div className={classes.root}>
       { label ? 
          <Head align={AlignItem}>
            
                <Fragment>
                  <Label> 
                    { label }
                    { type === GridType.SLOTS ? <Breadcrumbs currentIndex={breadcrumbIndex} size={breadcrumbSize}/> : '' }
                  </Label>
                  <Divider/>
                </Fragment>
              
          </Head>
          : '' }

        <Grid container item spacing={spacing}>
          {content.map((child: JSX.Element, index: number) => 
             <Grid item xs={xs} sm={sm} md={md} key={index}>
                <Paper className={classes.paper}>
                    {showIndex ? 
                      <div style={{position: 'absolute', top: '-10px', right: '0px'}}>
                        <RankingCard index={index+1} />
                      </div> : '' }
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
`

const Label = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: left;
`

export default GridCards
