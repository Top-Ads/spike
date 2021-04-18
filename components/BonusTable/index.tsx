
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
import { Bonus } from '../../pages/api/interfaces'
import styled from 'styled-components'
import RatingStars from '../RatingStars'
import RankingCard from '../Cards/RankingCard'

type PageProps = {
    data: Bonus[]
}

type BonusContainerType = {
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
                  <BonusImgContainer>
                      <Image
                          alt={row.name}
                          src={row.circular_image.url}
                          layout="responsive"
                          priority={true}
                          width={100}
                          height={'auto'}/>
                  </BonusImgContainer>
                </StyledTableCell>

                <StyledTableCell align="left">
                  
                  <span>{row.name}</span>
                  <RatingStars rating={row.rating}/>
                  
                </StyledTableCell>

                <StyledTableCell align="left">{row.withDeposit}</StyledTableCell>

                <StyledTableCell align="left">{row.description}</StyledTableCell>
                
                <StyledTableCell align="left">
                  <LicenceContainer>
                          <Image
                              alt="licence ADM"
                              src={'https://img.slotjava.it/wp-content/plugins/strove-casino/static/images/casino-license/adm.svg'}
                              layout="responsive"
                              priority={true}
                              width={23}
                              height={'auto'}/>
                  </LicenceContainer>

                  <ButtonContainer bgColor={row.backgroundColor} onClick={() => linkToBonus(row.link)}>
                    <span>SITO WEB</span>
                  </ButtonContainer>
                </StyledTableCell>

            </StyledTableRow>
          ))}
      </TableBody>
      </Table>
    </TableContainer>
  )
}

const BonusImgContainer = styled.div`
    width: 60px;
`

const ButtonContainer = styled.div<BonusContainerType>`
    background-color: ${({bgColor}) => bgColor ? bgColor : 'inherit'};
    color: ${({theme}) => theme.text.color.primary};
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    padding: 10px;
    width: max-content;

    &:hover {
      box-shadow: 0px 0px 5px 5px rgba(33,37,41,0.4);
      -webkit-box-shadow: 0px 0px 5px 5px rgba(33,37,41,0.4);
      -moz-box-shadow: 0px 0px 5px 5px rgba(33,37,41,0.4);
    }
`

const LicenceContainer = styled.div`
  width: 23px;
  position: absolute;
  bottom: 1px;
  right: 3px;
}
`

export default BonusTable
