import React, { Fragment, FunctionComponent } from 'react'
import styled from 'styled-components'

type PageProps = {
    color?: string,
    width?: string
};

const Divider: FunctionComponent<PageProps> = (data) => { 
    
    return (
        <Fragment>
            <Main width={data.width} color={data.color} />
        </Fragment>
    ) 
}

const Main = styled.hr<PageProps>`
    border: 1px solid ${({color}) => color ? color : '#e1ba6f'};
    background-color: ${({color}) => color ? color : '#e1ba6f'};
    width:  ${({width}) => width ? width : '100%'};
    height: 0px;
    opacity: 0.6;
}
`

export default Divider
