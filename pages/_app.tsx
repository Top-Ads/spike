import React, { Fragment, FunctionComponent } from "react"
import { ThemeProvider } from "styled-components"
import { GlobalStyle, styledTheme } from "../theme"

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
                <ThemeProvider theme={styledTheme}>
                    <GlobalStyle />
                    <Component {...pageProps} />
                </ThemeProvider>
        </ContextProvider>
    )
}
