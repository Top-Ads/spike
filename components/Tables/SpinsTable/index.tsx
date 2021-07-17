
import React, { Fragment, FunctionComponent } from 'react'
import Image from 'next/image'
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import styled from 'styled-components'
import { Spins } from '../../../interfaces'
import { injectSymbolImage } from '../../../utils/injectSymbolTolmage'
import LazyLoad from 'react-lazyload'
import { TablePagination, TableSortLabel } from '@material-ui/core'
import { stableSort } from '../../../utils/stableSort'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import { LiveStats, SymbolLayout } from '../../../utils/constants'

type PageProps = {
    data: Spins[],
    gameType: LiveStats
}

type ThumbnailProps = {
  gameType: LiveStats
}

type Order = 'asc' | 'desc';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      fontFamily: 'inherit',
      fontWeight: 'bold',
      '& .table-head': {
        display: 'flex',
        alignItems: 'center',
      }
    },
    head: {
      backgroundColor: '#e2b96d',
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14,
      position: 'relative',
      
    },
  }),
)(TableCell)

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      '& .update-icon': {
        position: 'absolute',
        top: '3px',
        right: '3px'
      },
      '& .video-icon': {
        color: '#000'
      }
    },
  }),
)(TableRow)

const useStyles = makeStyles({
  paper: {
    position: 'relative',
    width: '100%',
  },
  table: {
    minWidth: 690,
  },
  pagination: {
    backgroundColor: '#e2b96d'
  }
})

const SpinsTable: FunctionComponent<PageProps> = ({data=[], gameType}) => {
  
  const classes = useStyles()
  
  const [orderBy, setorderBy] = React.useState<string>('date')
  const [order, setOrder] = React.useState<Order>('desc')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleSort = (key: string) => (_event: React.MouseEvent<unknown>) => {
      const isAsc = orderBy === key && order === 'asc'

      setorderBy(key)
      setOrder(isAsc ? 'desc' : 'asc');
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function _descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function _getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
      ? (a, b) => _descendingComparator(a, b, orderBy)
      : (a, b) => -_descendingComparator(a, b, orderBy);
  }

  return (

    <Paper className={classes.paper}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === 'date'}
                  direction={orderBy === 'date' ? order : 'desc'}
                  onClick={handleSort('date')}>
                  <div className="table-head">Alle ore</div>
                </TableSortLabel>
              
              </StyledTableCell>

              <StyledTableCell align="left"><div className="table-head">Risultato Ruota</div></StyledTableCell>
              
              { gameType === LiveStats.CRAZYTIME && 
                <StyledTableCell align="left"><div className="table-head">Risultato Slot</div></StyledTableCell>
              }

              <StyledTableCell align="left">
                <TableSortLabel
                    active={orderBy === 'multiplier'}
                    direction={orderBy === 'multiplier' ? order : 'desc'}
                    onClick={handleSort('multiplier')}>
                  <div className="table-head">Moltiplicatore</div>
                </TableSortLabel>
              </StyledTableCell>

              { gameType === LiveStats.MONOPOLY && 
                <Fragment>
                  <StyledTableCell align="left"><div className="table-head">Lancio Dadi</div></StyledTableCell>
                  <StyledTableCell align="left"><div className="table-head">Moltiplicatore Imprevisti</div></StyledTableCell>
                </Fragment>
              }

              <StyledTableCell align="left">
                <TableSortLabel
                    active={orderBy === 'totalWinners'}
                    direction={orderBy === 'totalWinners' ? order : 'desc'}
                    onClick={handleSort('totalWinners')}>
                  <div className="table-head">Vincitori Totali</div>
                </TableSortLabel>
              </StyledTableCell>

              <StyledTableCell align="left">
                <TableSortLabel
                      active={orderBy === 'totalPayout'}
                      direction={orderBy === 'totalPayout' ? order : 'desc'}
                      onClick={handleSort('totalPayout')}>
                  <div className="table-head">Payout Totale</div>
                </TableSortLabel>
              </StyledTableCell>

              <StyledTableCell align="center"><div className="table-head">Guarda Video</div></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(data, _getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index: number) => (
                <StyledTableRow key={index}>

                  <StyledTableCell scope="row" suppressHydrationWarning>
                    {new Date(row.date).toLocaleString()}
                  </StyledTableCell>

                  <StyledTableCell component="th">
                    <Thumbnail gameType={gameType}>
                      <LazyLoad height={200} offset={200}>
                        <Image
                              alt={row.spinResultSymbol}
                              src={injectSymbolImage(row.spinResultSymbol, gameType, SymbolLayout.TABLE).url}
                              layout="intrinsic"
                              priority={true}
                              width={injectSymbolImage(row.spinResultSymbol, gameType, SymbolLayout.TABLE).width}
                              height={injectSymbolImage(row.spinResultSymbol, gameType, SymbolLayout.TABLE).height}/>   
                      </LazyLoad>
                    </Thumbnail>
                  </StyledTableCell>

                  { gameType === LiveStats.CRAZYTIME && 
                    <StyledTableCell align="left">
                      <Thumbnail gameType={gameType}>
                        <LazyLoad height={200} offset={200}>
                          <Image
                              alt={row.spinResultSymbol}
                              src={injectSymbolImage(row.slotResultSymbol, gameType).url}
                              layout="intrinsic"
                              priority={true}
                              width={injectSymbolImage(row.slotResultSymbol, gameType).width}
                              height={injectSymbolImage(row.slotResultSymbol, gameType).height}/>      
                        </LazyLoad>
                      </Thumbnail>
                    </StyledTableCell>
                  }

                  <StyledTableCell align="left">{row.multiplier}</StyledTableCell>

                  { gameType === LiveStats.MONOPOLY && 
                    <Fragment>
                      <StyledTableCell align="left">{row.boardRolls}</StyledTableCell>
                      <StyledTableCell align="left">{row.chanceMultiplier}</StyledTableCell>
                    </Fragment>
                  }

                  <StyledTableCell align="left">{row.totalWinners}</StyledTableCell>
                  
                  <StyledTableCell align="left">{row.totalPayout}€</StyledTableCell>

                  <StyledTableCell align="center">
                      {row.watchVideo !== "no_video" && 
                        <a href={row.watchVideo}><PlayCircleOutlineIcon fontSize={'large'} className={'video-icon'}/></a> 
                      }
                  </StyledTableCell>

              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    
      <TablePagination
        className={classes.pagination}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}>
      </TablePagination>
    </Paper>

  )
}

const Thumbnail = styled.div<ThumbnailProps>`
    width: ${({gameType}) => gameType === LiveStats.CRAZYTIME ? '60px' : '100px'};
`

export default SpinsTable
