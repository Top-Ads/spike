import React, { Fragment, FunctionComponent, useState, useEffect } from 'react'
import styled from 'styled-components'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'

type PageProps = {
   color?: string,
   active: boolean,
   setActive: Function
};

type LikeIconType = {
    color?: string
 };
 
const LikeIcon: FunctionComponent<PageProps> = ({color, active, setActive}) => { 
    
    const [fill, setFill] = useState<boolean>(active)

    const handleClick = (event: React.SyntheticEvent<HTMLElement>) => {
        event.stopPropagation()

        setActive()
        setFill(!active)
    }
    
    useEffect( () => {
        setFill(active)
    }, [active])

    return (
        <Fragment>
            <Like 
                onClick={handleClick} 
                onTouchStart={(event: React.SyntheticEvent<HTMLElement>) => event.stopPropagation()}
                onMouseEnter={() => setFill(true)}
                onMouseLeave={() => !active && setFill(false)}
                color={color}>
               
               { active || fill ?
               <FavoriteIcon className="icon"/> : <FavoriteBorderIcon className="icon"/>}

            </Like>
        </Fragment>
    ) 
}

const Like = styled.div<LikeIconType>`
    .icon {
        font-size: 30px;
        fill: #fff
    }
`

export default LikeIcon