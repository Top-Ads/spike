import React, { FunctionComponent } from 'react'
import { Fragment } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { createStyles, withStyles } from '@material-ui/core'

type Props = {
    show: boolean
};

const CircularProgressStyled = withStyles(() =>
  createStyles({
    root: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
        color: '#e2b96d',
        zIndex: 2
    },
  }),
)(CircularProgress)

const SpinnerLoader: FunctionComponent<Props> = ({show}) => {
    return (
        <Fragment>
            {show && <CircularProgressStyled role={'progressbar'} aria-label={'Progress Bar'} size={'30px'}/>}
        </Fragment>
    )
} 

export default React.memo(SpinnerLoader)
