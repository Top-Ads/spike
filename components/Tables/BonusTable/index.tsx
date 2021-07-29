
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
import styled from 'styled-components'
import RatingStars from '../../RatingStars'
import RankingCard from '../../Cards/RankingCard'
import { CDN } from '../../../public/environment'
import LazyLoad from 'react-lazyload'
import { Bonus } from '../../../interfaces'
import { replaceAll } from '../../../utils/replaceAll'

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
      backgroundColor: '#e2b96d',
      color: theme.palette.common.white,
      padding: '7px'
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
            <StyledTableCell align="center">#</StyledTableCell>
            <StyledTableCell align="left">Casinò</StyledTableCell>
            <StyledTableCell align="left">Valutazione</StyledTableCell>
            <StyledTableCell align="left">Bonus Senza Deposito</StyledTableCell>
            <StyledTableCell align="left">Bonus di Benvenuto</StyledTableCell>
            <StyledTableCell align="center">Licenza</StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>
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

                <StyledTableCell align="left" dangerouslySetInnerHTML={{__html: String(replaceAll(row.noDeposit, "+", "<br/>"))}}/>

                <StyledTableCell align="left" dangerouslySetInnerHTML={{__html: String(replaceAll(row.description, "+", "<br/>"))}}/>
                
                <StyledTableCell align="center">
                  <LicenceContainer>
                      <div className="licence-icon">
                          <Image
                              alt="licence ADM"
                              src={`${CDN}/svg/adm.svg`}
                              layout="responsive"
                              quality={50}
                              priority={true}
                              width={'1141'}
                              height={'760'}/>
                      </div>

                      <span> Licenza ADM</span>

                  </LicenceContainer>
                </StyledTableCell>

                <StyledTableCell align="left">
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
    color: ${({theme}) => theme.text.color.white};
    border-radius: ${({theme}) => theme.button.borderRadius};
    font-weight: bold;
    cursor: pointer;
    padding: 10px;
    width: max-content;

    &:hover {
      
    }
`

const LicenceContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    .licence-icon {
        width: 40px;
    }

    span {
        font-size: 11px;
        font-weight: normal;
        margin-left: 3px;
    }
}

`

export default BonusTable


