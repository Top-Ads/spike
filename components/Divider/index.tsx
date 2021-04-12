import React, { Fragment, FunctionComponent } from 'react'
import styled from 'styled-components'

type PageProps = {
    color?: string,
    width?: string
};

const Divider: FunctionComponent<PageProps> = (data) => { 
    
    return (
        <Fragment>
            <HrContainer width={data.width} color={data.color} />
        </Fragment>
    ) 
}

const HrContainer = styled.hr<PageProps>`
    border: 1px solid ${({color}) => color ? color : '#ff1313'};
    background-color: ${({color}) => color ? color : '#ff1313'};
    width:  ${({width}) => width ? width : '100%'};
    height: 0px;
    opacity: 0.6;
}
`

export default Divider
