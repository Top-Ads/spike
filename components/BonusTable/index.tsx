
import React, { FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Bonus } from '../../pages/api/graphql/schemas/bonus'
import styled from 'styled-components'
import RatingStars from '../RatingStars'
import RankingCard from '../Cards/RankingCard'
import { CDN } from '../../public/environment'
import LazyLoad from 'react-lazyload'

type PageProps = {
    data: Bonus[]
}

type BonusType = {
  bgColor?: string
}

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      fontFamily: 'inherit',
      fontWeight: 'bold'
    },
    head: {
      backgroundColor: '#ff1313',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
      position: 'relative'
    },
  }),
)(TableCell)

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow)

const useStyles = makeStyles({
  table: {
    minWidth: 690,
  },
})

const BonusTable: FunctionComponent<PageProps> = ({data}) => {
  
  const classes = useStyles()
  
  const router = useRouter()

  const linkToBonus = (url: string) => {
    router.push(url)
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell>Casinò</StyledTableCell>
            <StyledTableCell align="left">Valutazione</StyledTableCell>
            <StyledTableCell align="left">Bonus Senza Deposito</StyledTableCell>
            <StyledTableCell align="left">Bonus di Benvenuto</StyledTableCell>
            <StyledTableCell align="left">Licenza</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
              <StyledTableRow key={index}>

                <StyledTableCell scope="row">
                  <RankingCard index={index+1} />
                </StyledTableCell>

                <StyledTableCell component="th" >
                  <Thumbnail>
                    <LazyLoad key={index} height={50} offset={200}>
                      <Image
                          alt={row.name}
                          src={row.circular_image.url}
                          layout="responsive"
                          priority={true}
                          width={100}
                          height={'auto'}/>
                    </LazyLoad>
                  </Thumbnail>
                </StyledTableCell>

                <StyledTableCell align="left">
                  
                  <span>{row.name}</span>
                  <RatingStars rating={row.rating}/>
                  
                </StyledTableCell>

                <StyledTableCell align="left">{row.withDeposit}</StyledTableCell>

                <StyledTableCell align="left">{row.description}</StyledTableCell>
                
                <StyledTableCell align="left">
                  <Licence>
                      <Image
                          alt="licence ADM"
                          src={`${CDN}/svg/adm.svg`}
                          layout="responsive"
                          priority={true}
                          width={'auto'}
                          height={'auto'}/>
                  </Licence>

                  <Button bgColor={row.backgroundColor} onClick={() => linkToBonus(row.link)}>
                    <span>SITO WEB</span>
                  </Button>
                </StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const Thumbnail = styled.div`
    width: 60px;
`

const Button = styled.div<BonusType>`
    background-color: ${({bgColor}) => bgColor ? bgColor : 'inherit'};
    color: ${({theme}) => theme.text.color.primary};
    border-radius: ${({theme}) => theme.button.borderRadius};
    font-weight: bold;
    cursor: pointer;
    padding: 10px;
    width: max-content;

    &:hover {
      box-shadow: ${({theme}) => theme.button.boxShadowX};
    }
`

const Licence = styled.div`
  width: 23px;
  position: absolute;
  bottom: 1px;
  right: 3px;
}
`

export default BonusTable
