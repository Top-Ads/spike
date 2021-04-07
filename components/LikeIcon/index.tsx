import React, { Fragment, FunctionComponent, useState } from 'react'
import styled from 'styled-components'

type PageProps = {
   strokeColor: string,
   fillColor: string,
   active: boolean,
   setActive: Function
};

const LikeIcon: FunctionComponent<PageProps> = ({strokeColor, fillColor, active, setActive}) => { 
    
    const [fill, setFill] = useState<string>(active? fillColor : "transparent")

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        setActive()
        setFill(active ? "transparent" : fillColor)
    }

    return (
        <Fragment>
            <LikeContainer onClick={handleClick}>
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 391.837 391.837" xmlSpace="preserve">
                    <g>
                        <path className="path" strokeWidth="20" stroke={strokeColor} fill={fill} d="M285.257,35.528c58.743,0.286,106.294,47.836,106.58,106.58
                            c0,107.624-195.918,214.204-195.918,214.204S0,248.165,0,142.108c0-58.862,47.717-106.58,106.58-106.58l0,0
                            c36.032-0.281,69.718,17.842,89.339,48.065C215.674,53.517,249.273,35.441,285.257,35.528z"/>
                    </g>
                </svg>
            </LikeContainer>
        </Fragment>
    ) 
}

const LikeContainer = styled.div`
  &: hover {
      svg > g > path { 
          fill: #ff1313
      }
  }
`

export default LikeIcon
