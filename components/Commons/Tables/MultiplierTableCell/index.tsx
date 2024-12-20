import React, { FunctionComponent } from 'react'
import { TableCell } from '@material-ui/core'
import Image from 'next/image'
import styled from 'styled-components'
import { Spin } from '../../../../lib/schemas'

interface Props {
    spin : Spin
}

const MultiplierTableCell : FunctionComponent<Props>= ({spin}) => {

    // helper render method for the multiplier column (Might be refactored in it's own component)
    const renderMultiplierCell = (spin : Spin) => {
        if(spin.multiplierInfo === 'none') return (
            <TableCell 
                style={{fontFamily : 'Montserrat', fontWeight : spin.sameSlotAndSpinResult ? 'bold' : 'normal', fontSize : spin.sameSlotAndSpinResult ? '1.1rem' : ''}}
                align="left">
                    {spin.multiplier}
            </TableCell>
        )

        if(spin.multiplierInfo === 'heads') return (
            <TableCell 
                style={{fontFamily : 'Montserrat', fontWeight : spin.sameSlotAndSpinResult ? 'bold' : 'normal', fontSize : spin.sameSlotAndSpinResult ? '1.1rem' : ''}} 
                align="left">
                <span style={{display : 'flex', alignItems : 'center', justifyContent : 'flex-start'}}>
                    <p style={{marginRight : '1rem'}}>{spin.multiplier}</p>
                    <Image width='36px' height='36px' src='/images/icons/crazy-time/heads.svg'/> 
                </span>
            </TableCell>
        )
        if(spin.multiplierInfo === 'tails') return (
            <TableCell 
                style={{fontFamily : 'Montserrat', fontWeight : spin.sameSlotAndSpinResult ? 'bold' : 'normal', fontSize : spin.sameSlotAndSpinResult ? '1.1rem' : ''}} 
                align="left">
                <span style={{display : 'flex', alignItems : 'center', justifyContent : 'flex-start'}}>
                    <p style={{marginRight : '1rem'}}>{spin.multiplier}</p>
                    <Image width='36px' height='36px' src='/images/icons/crazy-time/tails.svg'/> 
                </span>
            </TableCell>
        )

        if(spin.multiplierInfo === 'ct') {
            const pieces = spin.multiplier.split('-')
            const first = pieces[0]
            const second = pieces[1]
            const third = pieces[2]

            return (
                <TableCell 
                    style={{
                        fontFamily : 'Montserrat',
                        fontWeight : spin.sameSlotAndSpinResult ? 'bold' : 'normal', 
                        fontSize : spin.sameSlotAndSpinResult ? '1.1rem' : ''
                    }} 
                    align="left">

                   

                    <div style={{ display : 'flex', alignItems : 'center'}}>

                        <TriangleImage src='/images/icons/crazy-time/green_triangle.svg'/>

                        <span>
                            {first}
                        </span>

                        <TriangleImage src='/images/icons/crazy-time/blue_triangle.svg'/>
                        <span>
                            {second}
                        </span>

                        <TriangleImage src='/images/icons/crazy-time/yellow_triangle.svg'/>
                        <span>
                            {third}
                        </span>
                    </div>
                    
                    
                </TableCell>
            )
        }

        return <div></div>
    }

    return renderMultiplierCell(spin)
}

const TriangleImage = styled.img`
    width : 22px;
    height : 22px;
    margin : .2rem;
`

export default MultiplierTableCell