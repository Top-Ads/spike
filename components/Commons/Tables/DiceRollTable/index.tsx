import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { MonopolyTableRow } from '../../../../lib/schemas'
import { createStyles, makeStyles, Paper, Theme } from '@material-ui/core'
import { injectDiceToImage } from '../../../../lib/utils/injectDiceToImage'
import Divider from '../../Divider'

type Props = {
   data: MonopolyTableRow [],
   type: 'low' | 'mid' | 'high'
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
      margin: theme.spacing(1),
      flexGrow: 1,
      ['@media (max-width: 768px)']: { 
          width: '46%',
          flexGrow: 0,
        },
      ['@media (max-width: 425px)']: { 
        flexGrow: 1,
        },
    },
  }),
);

const DiceRollTable: FunctionComponent<Props> = ({data, type}) => {

    const classes = useStyles()

    const renderRow = (i : number, row : MonopolyTableRow) => {
        
        if(type === 'low'){
            switch(i){
                case 0: 
                    return (
                         <RowContainer key={i}>
                            <div style={{display : 'flex'}}>
                                <DiceImage src={injectDiceToImage(1)}/>
                                <DiceImage src={injectDiceToImage(1)}/>
                            </div>
                            <Container>
                                <span>{row.percentage}%</span>
                            </Container>

                            <Container>
                                {`${row.lands}/${row.total}`}
                            </Container>
                        </RowContainer>
                    )

                case 1: 
                    return (
                         <RowContainer key={i}>
                            <div style={{display : 'flex'}}>
                                <DiceImage src={injectDiceToImage(1)}/>
                                <DiceImage src={injectDiceToImage(2)}/>
                            </div>
                            <Container>
                                
                                <span>{row.percentage}%</span>
                            </Container>

                            <Container>
                                
                                {`${row.lands}/${row.total}`}
                            </Container>
                        </RowContainer>
                    )

                case 2: 
                    return (
                         <RowContainer key={i}>
                            <div style={{display : 'flex'}}>
                                <DiceImage src={injectDiceToImage(1)}/>
                                <DiceImage src={injectDiceToImage(3)}/>
                            </div>
                            <Container>
                                
                                <span>{row.percentage}%</span>
                            </Container>

                            <Container>
                                
                                {`${row.lands}/${row.total}`}
                            </Container>
                        </RowContainer>
                    )

                case 3: 
                    return (
                         <RowContainer key={i}>
                            <div style={{display : 'flex'}}>
                                <DiceImage src={injectDiceToImage(1)}/>
                                <DiceImage src={injectDiceToImage(4)}/>
                            </div>
                            <Container>
                                
                                <span>{row.percentage}%</span>
                            </Container>

                            <Container>
                                
                                {`${row.lands}/${row.total}`}
                            </Container>
                        </RowContainer>
                    )

                case 4: 
                    return (
                         <RowContainer key={i}>
                            <div style={{display : 'flex'}}>
                                <DiceImage src={injectDiceToImage(1)}/>
                                <DiceImage src={injectDiceToImage(5)}/>
                            </div>
                            <Container>
                                
                                <span>{row.percentage}%</span>
                            </Container>

                            <Container>
                                
                                {`${row.lands}/${row.total}`}
                            </Container>
                        </RowContainer>
                    )

                case 5: 
                    return (
                         <RowContainer key={i}>
                            <div style={{display : 'flex'}}>
                                <DiceImage src={injectDiceToImage(1)}/>
                                <DiceImage src={injectDiceToImage(6)}/>
                            </div>
                            <Container>
                                
                                <span>{row.percentage}%</span>
                            </Container>

                            <Container>
                                
                                {`${row.lands}/${row.total}`}
                            </Container>
                        </RowContainer>
                    )

                case 6: 
                    return (
                         <RowContainer key={i}>
                            <div style={{display : 'flex'}}>
                                <DiceImage src={injectDiceToImage(1)}/>
                                <DiceImage src={injectDiceToImage(1)}/>
                            </div>
                            <Container>
                                
                                <span>{row.percentage}%</span>
                            </Container>

                            <Container>
                                
                                {`${row.lands}/${row.total}`}
                            </Container>
                        </RowContainer>
                    )

                default : 
                    return <div></div>
            }
        }

        if(type === 'mid'){
            switch(i){
                case 0: 
                    return (
                         <RowContainer key={i}>
                            <div style={{display : 'flex'}}>
                                <DiceImage src={injectDiceToImage(2)}/>
                                <DiceImage src={injectDiceToImage(3)}/>
                            </div>
                            <Container>
                                
                                <span>{row.percentage}%</span>
                            </Container>

                            <Container>
                                
                                {`${row.lands}/${row.total}`}
                            </Container>
                        </RowContainer>
                    )

                case 1: 
                    return (
                         <RowContainer key={i}>
                            <div style={{display : 'flex'}}>
                                <DiceImage src={injectDiceToImage(2)}/>
                                <DiceImage src={injectDiceToImage(4)}/>
                            </div>
                            <Container>
                                
                                <span>{row.percentage}%</span>
                            </Container>

                            <Container>
                                
                                {`${row.lands}/${row.total}`}
                            </Container>
                        </RowContainer>
                    )

                case 2: 
                    return (
                         <RowContainer key={i}>
                            <div style={{display : 'flex'}}>
                                <DiceImage src={injectDiceToImage(2)}/>
                                <DiceImage src={injectDiceToImage(5)}/>
                            </div>
                            <Container>
                                
                                <span>{row.percentage}%</span>
                            </Container>

                            <Container>
                                
                                {`${row.lands}/${row.total}`}
                            </Container>
                        </RowContainer>
                    )

                case 3: 
                    return (
                         <RowContainer key={i}>
                            <div style={{display : 'flex'}}>
                                <DiceImage src={injectDiceToImage(2)}/>
                                <DiceImage src={injectDiceToImage(6)}/>
                            </div>
                            <Container>
                                
                                <span>{row.percentage}%</span>
                            </Container>

                            <Container>
                                
                                {`${row.lands}/${row.total}`}
                            </Container>
                        </RowContainer>
                    )

                case 4: 
                    return (
                         <RowContainer key={i}>
                            <div style={{display : 'flex'}}>
                                <DiceImage src={injectDiceToImage(3)}/>
                                <DiceImage src={injectDiceToImage(3)}/>
                            </div>
                            <Container>
                                
                                <span>{row.percentage}%</span>
                            </Container>

                            <Container>
                                
                                {`${row.lands}/${row.total}`}
                            </Container>
                        </RowContainer>
                    )

                case 5: 
                    return (
                         <RowContainer key={i}>
                            <div style={{display : 'flex'}}>
                                <DiceImage src={injectDiceToImage(3)}/>
                                <DiceImage src={injectDiceToImage(4)}/>
                            </div>
                            <Container>
                                
                                <span>{row.percentage}%</span>
                            </Container>

                            <Container>
                                
                                {`${row.lands}/${row.total}`}
                            </Container>
                        </RowContainer>
                    )

                case 6: 
                    return (
                         <RowContainer key={i}>
                            <div style={{display : 'flex'}}>
                                <DiceImage src={injectDiceToImage(3)}/>
                                <DiceImage src={injectDiceToImage(5)}/>
                            </div>
                            <Container>
                                
                                <span>{row.percentage}%</span>
                            </Container>

                            <Container>
                                
                                {`${row.lands}/${row.total}`}
                            </Container>
                        </RowContainer>
                    )

                default : 
                    return <div></div>
            }
        }

        if(type === 'high'){
            switch(i){
                case 0: 
                    return (
                         <RowContainer key={i}>
                            <div style={{display : 'flex'}}>
                                <DiceImage src={injectDiceToImage(3)}/>
                                <DiceImage src={injectDiceToImage(6)}/>
                            </div>
                            <Container>
                                
                                <span>{row.percentage}%</span>
                            </Container>

                            <Container>
                                
                                {`${row.lands}/${row.total}`}
                            </Container>
                        </RowContainer>
                    )

                case 1: 
                    return (
                         <RowContainer key={i}>
                            <div style={{display : 'flex'}}>
                                <DiceImage src={injectDiceToImage(4)}/>
                                <DiceImage src={injectDiceToImage(4)}/>
                            </div>
                            <Container>
                                
                                <span>{row.percentage}%</span>
                            </Container>

                            <Container>
                                
                                {`${row.lands}/${row.total}`}
                            </Container>
                        </RowContainer>
                    )

                case 2: 
                    return (
                         <RowContainer key={i}>
                            <div style={{display : 'flex'}}>
                                <DiceImage src={injectDiceToImage(4)}/>
                                <DiceImage src={injectDiceToImage(5)}/>
                            </div>
                            <Container>
                                
                                <span>{row.percentage}%</span>
                            </Container>

                            <Container>
                                
                                {`${row.lands}/${row.total}`}
                            </Container>
                        </RowContainer>
                    )

                case 3: 
                    return (
                         <RowContainer key={i}>
                            <div style={{display : 'flex'}}>
                                <DiceImage src={injectDiceToImage(4)}/>
                                <DiceImage src={injectDiceToImage(6)}/>
                            </div>
                            <Container>
                                
                                <span>{row.percentage}%</span>
                            </Container>

                            <Container>
                                
                                {`${row.lands}/${row.total}`}
                            </Container>
                        </RowContainer>
                    )

                case 4: 
                    return (
                         <RowContainer key={i}>
                            <div style={{display : 'flex'}}>
                                <DiceImage src={injectDiceToImage(5)}/>
                                <DiceImage src={injectDiceToImage(5)}/>
                            </div>
                            <Container>
                                
                                <span>{row.percentage}%</span>
                            </Container>

                            <Container>
                                
                                {`${row.lands}/${row.total}`}
                            </Container>
                        </RowContainer>
                    )

                case 5: 
                    return (
                         <RowContainer key={i}>
                            <div style={{display : 'flex'}}>
                                <DiceImage src={injectDiceToImage(5)}/>
                                <DiceImage src={injectDiceToImage(6)}/>
                            </div>
                            <Container>
                                <span>{row.percentage}%</span>
                            </Container>

                            <Container>
                                {`${row.lands}/${row.total}`}
                            </Container>
                        </RowContainer>
                    )

                case 6: 
                    return (
                         <RowContainer key={i}>
                            <div style={{display : 'flex'}}>
                                <DiceImage src={injectDiceToImage(6)}/>
                                <DiceImage src={injectDiceToImage(6)}/>
                            </div>
                            <Container>
                                <span>{row.percentage}%</span>
                            </Container>

                            <Container>
                                {`${row.lands}/${row.total}`}
                            </Container>
                        </RowContainer>
                    )

                default : 
                    return <div></div>
            }
        }
    }

    const typeToHeader = () => {
        if(type === 'low') return 'Low Rolls'
        if(type === 'mid') return 'Mid Rolls'
        if(type === 'high') return 'High Rolls'
    }

    return (
        <Paper className={classes.root}>
            <h1 style={{margin: '10px auto', fontSize : '2rem'}}>{typeToHeader()}</h1>
            
            <Divider />
            
            <RowContainer>
                <div style={{marginLeft: '20px'}}><h6>Results</h6></div>
                <Container> 
                    <h6>Percentage</h6>
                </Container>

                <Container>
                    <h6>Lands</h6>
                </Container>
            </RowContainer>

            { data.map((r : MonopolyTableRow, index : number) => renderRow(index, r)) }
        </Paper>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const RowContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 5px 0px;

    span { font-size: 1rem; min-width: 50px; }

    h6 {
        color: tomato;
        margin: 2px auto;
        font-size: 1.2rem;
    }
`

const DiceImage = styled.img`
    width: 45px;
    margin: 3px;
`
export default DiceRollTable
