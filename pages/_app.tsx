import React, { Fragment, FunctionComponent, useEffect, useState } from "react"
import { ThemeProvider } from "styled-components"
import { removeLikeSlotContext } from "../lib/contexts"
import { GlobalStyle, styledTheme } from "../lib/theme"
import { Category } from "../lib/utils/constants"

interface IProps {
    Component: FunctionComponent
    pageProps: any
}

export default function App( {Component, pageProps}: IProps) {
    
    useEffect(()=> {
        if ( localStorage.getItem(Category.FAVORITES) === null ) 
            localStorage.setItem(Category.FAVORITES, '[]')
        
    }, [])

    const ContextProvider: FunctionComponent = ({ children }) => {

        const [removeLikeSlotId, setRemoveLikeSlotId] = useState('')

        return (
            <Fragment>
                <removeLikeSlotContext.Provider value={{removeLikeSlotId, setRemoveLikeSlotId}}>
                    {children}
                </removeLikeSlotContext.Provider>
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
