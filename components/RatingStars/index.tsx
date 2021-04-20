import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import StarOutlineIcon from '@material-ui/icons/StarOutline'
import StarIcon from '@material-ui/icons/Star'

type PageProps = {
   size?: number,
   rating: number
};

const RatingStars: FunctionComponent<PageProps> = ({size, rating}) => { 
    
    return (
            <RatingContainer>
                { [...Array(size ? size : 5)].map( (_value, index) =>
                rating > index ? 
                <StarIcon key={index} className="star-icon"/> : <StarOutlineIcon key={index} className="star-icon"/>)}
            </RatingContainer> 
    ) 
}

const RatingContainer = styled.div`
    width: max-content;

    .star-icon {
        font-size: 17px;
        color: ${({theme}) => theme.colors.backGround};
    }
`

export default RatingStars
