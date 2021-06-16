import React, { Fragment, FunctionComponent, useEffect, useState } from "react"
import { ThemeProvider } from "styled-components"
import { Workbox } from "workbox-window"
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

        console.log(process.env.NODE_ENV)

        if ('serviceWorker' in navigator || process.env.NODE_ENV === "production") {
            window.addEventListener('load', () => {
                const wb = new Workbox("/sw.js", { scope: "/" })
                wb.register()
            })
          }

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
