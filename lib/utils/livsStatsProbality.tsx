import { Fragment } from "react"

export const crazyTimeProbability = (str : string) => {
    if(str === 'one') return(
        <Fragment>
          Probabilità di base: 21 / 54 (38.89%)
        </Fragment>
    )
    if(str === 'two') return(
        <Fragment>
           Probabilità di base: 13 / 54 (24.07%)  
        </Fragment>
    )
    if(str === 'five') return(
        <Fragment>
           Probabilità di base: 7 / 54 (12.96%) 
        </Fragment>
    )
    if(str === 'ten') return(
        <Fragment>
          Probabilità di base: 4 / 54 (7.41%) 
        </Fragment>
    )
    if(str === 'cashhunt') return(
        <Fragment>
          Probabilità di base: 2 / 54 (3.70%) 
        </Fragment>
    )
    if(str === 'coinflip') return(
        <Fragment>
            Probabilità di base: 4 / 54 (7.41%) 
        </Fragment>
    )
    if(str === 'pachinko') return(
        <Fragment>
           Probabilità di base: 2 / 54 (3.70%) 
        </Fragment>
    )
    if(str === 'crazytime') return(
        <Fragment>
          Probabilità di base: 1 / 54 (1.85%) 
        </Fragment>
    )
}

export const monopolyProbability = (str : string) => {
    if(str === 'one') return(
        <Fragment>
            Probabilità di base: 22 / 54 (40.74%) 
        </Fragment>
    )
    if(str === 'two') return(
        <Fragment>
           Probabilità di base: 15 / 54 (27.28%) 
        </Fragment>
    )
    if(str === 'five') return(
        <Fragment>
           Probabilità di base: 7 / 54 (12.96%) 
        </Fragment>
    )
    if(str === 'ten') return(
        <Fragment>
           Probabilità di base: 4 / 54 (7.41%) 
        </Fragment>
    )
    if(str === 'tworolls') return(
        <Fragment>
           Probabilità di base: 3 / 54 (5.56%) 
        </Fragment>
    )
    if(str === 'fourrolls') return(
        <Fragment>
           Probabilità di base: 1 / 54 (1.85%) 
        </Fragment>
    )
    if(str === 'chance') return(
        <Fragment>
           Probabilità di base: 2 / 54 (3.70%) 
        </Fragment>
    )
}

export const dreamCatcherProbability = (str : string) => {
    if(str === 'one') return(
        <Fragment>
            Probabilità di base: 21 / 54 (38.89%) 
        </Fragment>
    )
    if(str === 'two') return(
        <Fragment>
           Probabilità di base: 13 / 54 (24.07%) 
        </Fragment>
    )
    if(str === 'five') return(
        <Fragment>
           Probabilità di base: 7 / 54 (12.96%) 
        </Fragment>
    )
    if(str === 'ten') return(
        <Fragment>
           Probabilità di base: 4 / 54 (7.41%) 
        </Fragment>
    )
    if(str === 'twenty') return(
        <Fragment>
           Probabilità di base: 2 / 54 (3.70%) 
        </Fragment>
    )
    if(str === 'fourty') return(
        <Fragment>
           Probabilità di base: 4 / 54 (7.41%) 
        </Fragment>
    )
    if(str === 'twox') return(
        <Fragment>
           Probabilità di base: 2 / 54 (3.70%) 
        </Fragment>
    )
    if(str === 'sevenx') return(
        <Fragment>
           Probabilità di base: 1 / 54 (1.85%) 
        </Fragment>
    )
}