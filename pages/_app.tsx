import React, { Fragment, FunctionComponent, useEffect, useState } from "react"
import { ThemeProvider } from "styled-components"
import { DislikedSlotContext } from "../contexts"
import { GlobalStyle, styledTheme } from "../theme"

interface IProps {
    Component: FunctionComponent
    pageProps: any
}

export default function App( {Component, pageProps}: IProps) {
    
    useEffect(()=> {
        if ( localStorage.getItem('favorites') === null ) 
            localStorage.setItem('favorites', '[]') 
    }, [])

    const ContextProvider: FunctionComponent = ({ children }) => {

        const [slotDislikedId, setSlotDislikedId] = useState('')

        return (
            <Fragment>
                <DislikedSlotContext.Provider value={{slotDislikedId, setSlotDislikedId}}>
                    {children}
                </DislikedSlotContext.Provider>
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
