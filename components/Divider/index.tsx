import React, { Fragment, FunctionComponent } from 'react'
import styled from 'styled-components'

type PageProps = {
    color?: string;
    marginBottom?: string
};

const Divider: FunctionComponent<PageProps> = (data) => { 
    
    return (
        <Fragment>
            <HrContainer color={data.color} marginBottom={data.marginBottom}/>
        </Fragment>
    ) 
}

const HrContainer = styled.hr<PageProps>`
    border: 1px solid ${(props) => props.color ? props.color : '#ff1313'};
    background-color: ${(props) => props.color ? props.color : '#ff1313'};
    width: 100%;
    opacity: 0.6;
    margin-bottom: ${(props) => props.marginBottom ? props.marginBottom : '0px'};
}
`

export default Divider
