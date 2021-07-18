import { Fragment } from "react"

export const crazyTimeProbability = (str : string) => {
    if(str === 'one') return(
        <Fragment>
          Expected: 21 / 54 (38.89%)
        </Fragment>
    )
    if(str === 'two') return(
        <Fragment>
           Expected: 13 / 54 (24.07%)  
        </Fragment>
    )
    if(str === 'five') return(
        <Fragment>
           Expected: 7 / 54 (12.96%) 
        </Fragment>
    )
    if(str === 'ten') return(
        <Fragment>
          Expected: 4 / 54 (7.41%) 
        </Fragment>
    )
    if(str === 'cashhunt') return(
        <Fragment>
          Expected: 2 / 54 (3.70%) 
        </Fragment>
    )
    if(str === 'coinflip') return(
        <Fragment>
            Expected: 4 / 54 (7.41%) 
        </Fragment>
    )
    if(str === 'pachinko') return(
        <Fragment>
           Expected: 2 / 54 (3.70%) 
        </Fragment>
    )
    if(str === 'crazytime') return(
        <Fragment>
          Expected: 1 / 54 (1.85%) 
        </Fragment>
    )
}

export const monopolyProbability = (str : string) => {
    if(str === 'one') return(
        <Fragment>
            Expected: 22 / 54 (40.74%) 
        </Fragment>
    )
    if(str === 'two') return(
        <Fragment>
           Expected: 15 / 54 (27.28%) 
        </Fragment>
    )
    if(str === 'five') return(
        <Fragment>
           Expected: 7 / 54 (12.96%) 
        </Fragment>
    )
    if(str === 'ten') return(
        <Fragment>
           Expected: 4 / 54 (7.41%) 
        </Fragment>
    )
    if(str === 'tworolls') return(
        <Fragment>
           Expected: 3 / 54 (5.56%) 
        </Fragment>
    )
    if(str === 'fourrolls') return(
        <Fragment>
           Expected: 1 / 54 (1.85%) 
        </Fragment>
    )
    if(str === 'chance') return(
        <Fragment>
           Expected: 2 / 54 (3.70%) 
        </Fragment>
    )
}