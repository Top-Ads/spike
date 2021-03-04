import React, { Fragment, FunctionComponent } from "react"

interface IProps {
    Component: FunctionComponent
    pageProps: any
}

export default function App( {Component, pageProps}: IProps) {
    
    const ContextProvider: FunctionComponent = ({ children }) => {

        return (
            <Fragment>
              {children}
            </Fragment>
        )
    }

    return (
        <ContextProvider>
          <Component {...pageProps} />
        </ContextProvider>
    )
}
