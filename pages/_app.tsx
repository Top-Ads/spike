import React, { Fragment, FunctionComponent, useEffect, useState } from "react"
import { ThemeProvider } from "styled-components"
import { removeLikeSlotContext } from "../lib/contexts"
import { GlobalStyle, styledTheme } from "../lib/theme"
import { Category } from "../lib/utils/constants"
import { I18nextProvider } from 'react-i18next'
import i18n from '../lib/i18n'


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
                    <I18nextProvider i18n={i18n}>
                        <GlobalStyle />
                        <Component {...pageProps} />
                    </I18nextProvider> 
                </ThemeProvider>
        </ContextProvider>
    )
}
