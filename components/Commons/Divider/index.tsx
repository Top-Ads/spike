import React, { Fragment, FunctionComponent } from 'react'
import styled from 'styled-components'

type Props = {
    color?: string,
    width?: string
};

const Divider: FunctionComponent<Props> = (data) => { 
    
    return (
        <Fragment>
            <Main width={data.width} color={data.color} />
        </Fragment>
    ) 
}

const Main = styled.hr<Props>`
    border: 1px solid ${({color, theme}) => color ? color : theme.palette.background };
    background-color: ${({color, theme}) => color ? color : theme.palette.background };
    width:  ${({width}) => width ? width : '100%'};
    border-width: 0.5px;
    height: 0px;
    opacity: 0.6;
    font-size: 0.8rem;
`

export default Divider
