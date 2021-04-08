import React, { Fragment, FunctionComponent } from 'react'

type PageProps = {
   data: string
};

const QuestionCard: FunctionComponent<PageProps> = ({data}) => { 
    
    return (
        <Fragment>
            {data}
        </Fragment>
    ) 
}

export default QuestionCard
