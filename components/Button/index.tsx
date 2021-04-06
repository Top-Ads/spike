import React, { Fragment, FunctionComponent } from 'react'
import styled from 'styled-components'

type PageProps = {
  label?: string,
  bgColor?: string,
  color?: string
};

const Button: FunctionComponent<PageProps> = ({label, bgColor, color}) => { 
    
    return (
        <Fragment>
            <Container bgColor={bgColor} color={color}>
                <span>{label}</span>
            </Container>
        </Fragment>
    ) 
}

const Container = styled.div<PageProps>`
    background-color: ${({bgColor}) => bgColor ? bgColor : '#fff' };
    border: 1px solid ${({theme}) => theme.colors.primary};
    color: ${({color, theme}) => color ? color : theme.colors.primary};
    border-radius: 5px;
    font-weight: normal;
    cursor: pointer;
    padding: 10px;
    width: fit-content;
`

export default Button
