import React, { Fragment } from 'react'
import styled from 'styled-components'

type PageProps = {
    color?: string;
};

const Divider = (data: PageProps) => { 
    
    return (
        <Fragment>
            <HrContainer color={data.color}/>
        </Fragment>
    ) 
}

const HrContainer = styled.hr<PageProps>`
    border: 1px solid ${(props) => props.color ? props.color : '#fff'};
    background-color: ${(props) => props.color ? props.color : '#fff'};
    width: 100%;
    opacity: 0.6;
}
`

export default Divider
