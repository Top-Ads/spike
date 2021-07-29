import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import StarOutlineIcon from '@material-ui/icons/StarOutline'
import StarIcon from '@material-ui/icons/Star'

type PageProps = {
   size?: number,
   rating: number
};

const RatingStars: FunctionComponent<PageProps> = ({size=5, rating}) => 
    <Rating>
        { [...Array(size)].map( (_value, index) =>
        rating > index ? 
        <StarIcon key={index} className="star-icon"/> : <StarOutlineIcon key={index} className="star-icon"/>)}
    </Rating> 

const Rating = styled.div`
    width: max-content;

    .star-icon {
        font-size: 15px;
        color: ${({theme}) => theme.color.background};
    }
`

export default RatingStars
