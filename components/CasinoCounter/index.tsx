import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { device } from '../../lib/utils/device'

type Props = {
   totalSlots: number
   totalBonuses: number
   totalProducers: number
};

const CasinoCounter: FunctionComponent<Props> = ({totalSlots, totalBonuses}) => {
    return (
        <Main>
            <ul>
                <li>
                    <span className="type">Slots</span>
                    <span className="total">{totalSlots}</span>
                </li>

                {/* <li>
                    <span className="type">Casinos in Fornitori</span>
                    <span className="total">{totalProducers}</span>
                </li> */}

                <li>
                    <span className="type">Bonus di Benvenuto</span>
                    <span className="total">{totalBonuses}</span>
                </li>
            </ul>
        </Main>
    )
} 

const Main = styled.div`
    width: 250px;
    height: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(255,255,255, 0.85);
    border-radius: 15px;
    font-weight: bold;
    font-size: 1.7rem;

    @media ${device.mobileL} {
        flex-grow: 1;
    } 

    ul {
        list-style-type: none;
        padding: 0;
        text-align: center;

        li { 
            display: flex;
            flex-direction: column;

            span.type {
                font-style: italic;
                color: ${({theme}) => theme.text.color.black};
            }

            span.total{
                color: ${({theme}) => theme.palette.background};
                font-size: 2.5rem;
                font-family: 'Montserrat-ExtraBold';
            }
        }
    }
`
export default CasinoCounter
